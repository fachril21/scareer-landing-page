import { useEffect, useRef, useState } from 'react'
import { TocList } from './TocList'

const FOCUSABLE = 'a[href], button:not([disabled])'
const CLOSE_MS = 200
const DRAG_CLOSE_PX = 80

interface TocSheetProps {
  open: boolean
  onClose: () => void
  activeId: string
  activeChild: string | null
  onSelect: (id: string) => void
}

/**
 * Bottom sheet daftar isi: naik 250 ms dengan scrim Ink 45%, tinggi maksimal 70%, role dialog.
 * Scroll halaman dikunci, fokus terkunci di dalam sheet. Tutup lewat scrim, Esc, atau geser ke bawah.
 */
export function TocSheet({ open, onClose, activeId, activeChild, onSelect }: TocSheetProps) {
  const [mounted, setMounted] = useState(open)
  const [shown, setShown] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startY: number; dy: number } | null>(null)

  // Pasang dulu, tampilkan di frame berikutnya supaya transisi naik berjalan.
  useEffect(() => {
    if (open) {
      setMounted(true)
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      return () => cancelAnimationFrame(frame)
    }
    setShown(false)
    const timer = window.setTimeout(() => setMounted(false), CLOSE_MS)
    return () => window.clearTimeout(timer)
  }, [open])

  // Panel baru ada di DOM setelah `mounted`, jadi fokus awal dipasang di sini, bukan saat `open` berubah.
  useEffect(() => {
    if (!open || !mounted) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('[aria-current="location"]')?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [open, mounted])

  if (!mounted) return null

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const items = [...(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter((el) => !el.closest('[inert]'))
    if (items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // Geser ke bawah pada pegangan: sheet mengikuti jari, lewat 80 px menutup.
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startY: e.clientY, dy: 0 }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !panelRef.current) return
    drag.current.dy = Math.max(0, e.clientY - drag.current.startY)
    panelRef.current.style.transition = 'none'
    panelRef.current.style.transform = `translateY(${drag.current.dy}px)`
  }
  const onPointerUp = () => {
    const state = drag.current
    drag.current = null
    if (!state || !panelRef.current) return
    panelRef.current.style.transition = ''
    panelRef.current.style.transform = ''
    if (state.dy > DRAG_CLOSE_PX) onClose()
  }

  return (
    <div className={`sheet${shown ? ' is-shown' : ''}`} onKeyDown={onKeyDown}>
      <div className="sheet__scrim" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className="sheet__panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div
          className="sheet__grab"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span className="sheet__handle" aria-hidden="true" />
        </div>
        <h2 id="sheet-title" className="sheet__title">Daftar isi</h2>
        <div className="sheet__scroll">
          <TocList variant="sheet" activeId={activeId} activeChild={activeChild} onSelect={onSelect} />
        </div>
      </div>
    </div>
  )
}
