import { useCallback, useEffect, useRef, useState } from 'react'
import { useProgramSections } from '../../../hooks/useProgramSections'
import { TocList } from './TocList'
import type { ProgramToc } from '../../../hooks/useProgramToc'

const CLOSE_DELAY_MS = 200

/**
 * Rail 56 px (1280 sampai 1439 px, perangkat dengan pointer). Garis kecil per item dan chip nama pada item aktif.
 * Hover, fokus, atau klik membuka panel 220 px yang melayang di atas konten tanpa menggesernya.
 * Garis hanya dekorasi: yang bisa difokus adalah satu tombol, lalu daftar tautan di dalam panel.
 */
export function Rail({ toc, boxed = false }: { toc: ProgramToc; boxed?: boolean }) {
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { sections, toc: tocGroups } = useProgramSections()
  const activeLabel = sections.find((s) => s.id === toc.activeId)?.tocLabel

  const schedule = useCallback((next: boolean, delay: number) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(next), delay)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <nav
      className={`rail${open ? ' is-open' : ''}${boxed ? ' rail--boxed' : toc.onInk ? ' is-ink' : ''}`}
      aria-label="Daftar isi halaman"
      onPointerEnter={(e) => e.pointerType === 'mouse' && schedule(true, 0)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && schedule(false, CLOSE_DELAY_MS)}
      onFocus={() => schedule(true, 0)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) schedule(false, 0)
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Escape' || !open) return
        window.clearTimeout(timer.current)
        setOpen(false)
        toggleRef.current?.focus()
      }}
    >
      <div className="rail__dashes" aria-hidden="true">
        {tocGroups.map((group) => (
          <div key={group.label} className="rail__group">
            {group.items.map((it) => {
              const active = it.id === toc.activeId
              return (
                <span key={it.id} className={`rail__dash${active ? ' is-active' : ''}`}>
                  {active && <span className="rail__chip">{activeLabel}</span>}
                </span>
              )
            })}
          </div>
        ))}
      </div>
      <button
        ref={toggleRef}
        type="button"
        className="rail__toggle"
        aria-expanded={open}
        aria-controls="rail-panel"
        aria-label="Daftar isi halaman"
        onClick={() => {
          window.clearTimeout(timer.current)
          setOpen((v) => !v)
        }}
      />
      <div id="rail-panel" className="rail__panel" hidden={!open}>
        <TocList
          activeId={toc.activeId}
          activeChild={toc.activeChild}
          onSelect={(id) => {
            setOpen(false)
            toc.select(id, 'rail')
          }}
        />
      </div>
    </nav>
  )
}
