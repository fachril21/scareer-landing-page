import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import type { PricingPlan, PlanCompareRow } from '../../../content/program-detail.types'

const DURATION_OPEN = 340
const DURATION_CLOSE = 260
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface PricingCompareProps {
  plans: readonly PricingPlan[]
  rows: readonly PlanCompareRow[]
  open: boolean
  onToggle: (open: boolean) => void
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Akordeon "Bandingkan program": `<details>` native supaya tetap bisa diakses tanpa JS,
 * dengan tinggi isi dianimasikan lewat Web Animations API. Atribut `open` baru dilepas
 * setelah animasi tutup selesai, jadi isi tidak hilang mendadak.
 */
export function PricingCompare({ plans, rows, open, onToggle }: PricingCompareProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const isFirstRun = useRef(true)

  useEffect(() => {
    const details = detailsRef.current
    const body = bodyRef.current
    if (!details || !body) return

    animationRef.current?.cancel()
    const skip = isFirstRun.current || prefersReducedMotion()
    isFirstRun.current = false

    if (skip) {
      details.open = open
      return
    }

    const startHeight = details.open ? body.getBoundingClientRect().height : 0
    if (open) details.open = true
    const endHeight = open ? body.scrollHeight : 0

    const animation = body.animate(
      [
        { height: `${startHeight}px`, opacity: open ? 0 : 1 },
        { height: `${endHeight}px`, opacity: open ? 1 : 0 },
      ],
      // fill: 'forwards' menahan keadaan akhir sampai `open` dilepas, supaya tidak ada kilasan tinggi penuh.
      { duration: open ? DURATION_OPEN : DURATION_CLOSE, easing: EASE_OUT, fill: 'forwards' },
    )
    animationRef.current = animation
    animation.onfinish = () => {
      if (!open) details.open = false
      animation.cancel()
    }
    animation.oncancel = () => {
      animationRef.current = null
    }
  }, [open])

  return (
    <details ref={detailsRef} id="bandingkan-program" className="compare" data-open={open}>
      <summary
        className="compare__summary"
        onClick={(e) => {
          e.preventDefault()
          onToggle(!open)
        }}
      >
        <span>Bandingkan program</span>
        <ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" className="compare__chevron" />
      </summary>
      <div ref={bodyRef} className="compare__body">
        <table className="compare__table">
          <caption className="sr-only">Perbandingan {plans.map((p) => p.name).join(' dan ')}</caption>
          <thead>
            <tr>
              <th scope="col">Yang dibandingkan</th>
              {plans.map((p) => (
                <th key={p.id} scope="col">{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, i) => (
                  <td key={plans[i]?.id ?? i} data-label={plans[i]?.name}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}
