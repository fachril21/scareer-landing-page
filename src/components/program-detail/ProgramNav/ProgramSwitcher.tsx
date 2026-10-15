import { useCallback, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PROGRAM_SECTIONS } from '../../../content/program-sections'
import { TocSheet } from './TocSheet'
import type { ProgramToc } from '../../../hooks/useProgramToc'
import './toc.css'

const SHEET_CLOSE_MS = 220
const TOTAL = PROGRAM_SECTIONS.length

/** Di bawah 1280 px: bilah 52 px di bawah navbar (nama section, "n dari 12", garis kemajuan) yang membuka bottom sheet. */
export function ProgramSwitcher({ toc }: { toc: ProgramToc }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const index = PROGRAM_SECTIONS.findIndex((s) => s.id === toc.activeId)
  const section = PROGRAM_SECTIONS[Math.max(index, 0)]

  const close = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  // Ketuk item: sheet menutup dulu, baru halaman menggulung (fokus berpindah ke judul section).
  const select = useCallback(
    (id: string) => {
      setOpen(false)
      window.setTimeout(() => toc.select(id, 'sheet'), SHEET_CLOSE_MS)
    },
    [toc],
  )

  return (
    <>
      <div className="switcher">
        <button
          ref={buttonRef}
          type="button"
          className="switcher__btn"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="switcher__name">
            <span key={section.id} className="switcher__label">{section.tocLabel}</span>
            <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="switcher__count num">{index + 1} dari {TOTAL}</span>
        </button>
        <span className="switcher__progress" aria-hidden="true" style={{ transform: `scaleX(${(index + 1) / TOTAL})` }} />
      </div>
      <TocSheet open={open} onClose={close} activeId={toc.activeId} activeChild={toc.activeChild} onSelect={select} />
    </>
  )
}
