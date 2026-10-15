import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { CONSULT_MESSAGES, NAV_ITEMS, PROGRAMS } from '../../content/content'
import { waLink } from '../../lib/whatsapp'
import { useHomeHref } from '../../app/router'
import { useTweaks } from '../../tweaks/TweakContext'
import { hiddenSectionIds } from '../../tweaks/sections'

const FOCUSABLE = 'a[href], button:not([disabled])'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/** Panel penuh: scroll halaman dikunci, fokus terkunci di dalam panel, Esc menutup. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [programOpen, setProgramOpen] = useState(false)
  const home = useHomeHref()
  const hidden = hiddenSectionIds(useTweaks().tweaks)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (!nodes || nodes.length === 0) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      id="menu-mobile"
      ref={panelRef}
      className="mobile-menu"
      data-open={open}
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onKeyDown={onKeyDown}
    >
      <ul className="mobile-menu__list">
        <li>
          <button
            type="button"
            className="mobile-menu__item"
            aria-expanded={programOpen}
            onClick={() => setProgramOpen((v) => !v)}
          >
            Program
            <ChevronDown
              size={20}
              strokeWidth={1.75}
              aria-hidden="true"
              className={`mobile-menu__chevron${programOpen ? ' is-open' : ''}`}
            />
          </button>
          {programOpen && (
            <ul className="mobile-menu__sub">
              {PROGRAMS.map((p) => (
                <li key={p.slug}>
                  <a href={`/program/${p.slug}`}>{p.name}</a>
                </li>
              ))}
              <li>
                <a href="/program">Lihat semua program</a>
              </li>
            </ul>
          )}
        </li>
        {NAV_ITEMS.filter((item) => !hidden.includes(item.id)).map((item) => (
          <li key={item.id}>
            <a className="mobile-menu__item" href={home(`#${item.id}`)} onClick={onClose}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mobile-menu__foot">
        <Button
          variant="whatsapp"
          fullWidth
          href={waLink('Navbar', CONSULT_MESSAGES.general)}
          target="_blank"
        >
          Tanya via WhatsApp
        </Button>
      </div>
    </div>
  )
}
