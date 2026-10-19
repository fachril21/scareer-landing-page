import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import type { JobSample } from '../../content/job-samples'

/** Penjadwalan simulasi (ms). Total sekitar 2,3 detik dari kursor muncul sampai kartu berganti. */
const CURSOR_TO_SEARCH_AT = 80
const CLICK_SEARCH_AT = 520
const TYPING_STARTS_AT = 680
const TYPE_BASE_MS = 20
const TYPE_JITTER_MS = 16
const AFTER_TYPING_MS = 160
const CURSOR_TO_ROW_AFTER_RESULTS_MS = 300
const CLICK_ROW_AFTER_MOVE_MS = 430
const PICK_AFTER_CLICK_MS = 220

interface Point {
  x: number
  y: number
}

type Phase = 'search' | 'results'

interface JobBrowseProps {
  target: JobSample
  decoys: readonly [JobSample, JobSample]
  /** Dipanggil saat kursor "mengeklik" lowongan target; kartu lalu diganti isi lowongan itu. */
  onPicked: () => void
}

/** Titik tengah `el` relatif terhadap `root`, digeser `offsetX` dari sisi kirinya. */
function pointIn(root: HTMLElement, el: HTMLElement, offsetX: number): Point {
  const r = root.getBoundingClientRect()
  const e = el.getBoundingClientRect()
  return { x: e.left - r.left + offsetX, y: e.top - r.top + e.height / 2 }
}

/**
 * Simulasi orang mencari lowongan di situs kerja: kursor bergerak ke kolom cari, mengeklik, mengetik,
 * lalu memilih satu lowongan dari hasil. Murni hiasan (aria-hidden); kartu asli diganti oleh induknya lewat `onPicked`.
 */
export function JobBrowse({ target, decoys, onPicked }: JobBrowseProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const targetRowRef = useRef<HTMLLIElement>(null)
  const pickedRef = useRef(onPicked)
  pickedRef.current = onPicked

  // Posisi target di antara pengecoh dibuat sekali, supaya urutan tidak berubah saat render ulang.
  const [rows] = useState(() => [decoys[0], target, decoys[1]])
  const [phase, setPhase] = useState<Phase>('search')
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState<Point | null>(null)
  const [focused, setFocused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clickKey, setClickKey] = useState(0)
  const [pressed, setPressed] = useState(false)

  // Kursor mulai dari dekat tombol (kanan bawah), sebelum frame pertama dicat.
  useLayoutEffect(() => {
    const root = rootRef.current
    if (root) setCursor({ x: root.clientWidth * 0.8, y: root.clientHeight + 4 })
  }, [])

  useEffect(() => {
    const timers: number[] = []
    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms))
    }
    const root = rootRef.current
    const input = inputRef.current
    if (!root || !input) return

    at(CURSOR_TO_SEARCH_AT, () => setCursor(pointIn(root, input, 72)))
    at(CLICK_SEARCH_AT, () => {
      setFocused(true)
      setClickKey((k) => k + 1)
    })

    // Mengetik judul lowongan, lebih lama di spasi seperti orang sungguhan.
    const text = target.title
    let elapsed = TYPING_STARTS_AT
    for (let i = 1; i <= text.length; i += 1) {
      const slice = text.slice(0, i)
      at(elapsed, () => setQuery(slice))
      elapsed += TYPE_BASE_MS + Math.random() * TYPE_JITTER_MS + (text[i - 1] === ' ' ? 35 : 0)
    }

    const resultsAt = elapsed + AFTER_TYPING_MS
    at(resultsAt, () => {
      setFocused(false)
      setPhase('results')
    })
    const moveAt = resultsAt + CURSOR_TO_ROW_AFTER_RESULTS_MS
    at(moveAt, () => {
      const row = targetRowRef.current
      if (row) setCursor(pointIn(root, row, row.offsetWidth * 0.62))
    })
    const clickAt = moveAt + CLICK_ROW_AFTER_MOVE_MS
    at(moveAt + 270, () => setHovering(true))
    at(clickAt, () => {
      setPressed(true)
      setClickKey((k) => k + 1)
    })
    at(clickAt + PICK_AFTER_CLICK_MS, () => pickedRef.current())

    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [target.title])

  return (
    <div ref={rootRef} className="jbrowse" aria-hidden="true">
      <div ref={inputRef} className={`jbrowse__search${focused ? ' is-focused' : ''}`}>
        <Search size={16} strokeWidth={2} />
        <span className="jbrowse__query">
          {query || <span className="jbrowse__placeholder">Cari posisi atau perusahaan</span>}
          {focused && <i className="jbrowse__caret" />}
        </span>
      </div>

      {phase === 'results' && (
        <>
          <ul className="jbrowse__rows">
            {rows.map((row) => {
              const isTarget = row === target
              return (
                <li
                  key={row.title}
                  ref={isTarget ? targetRowRef : undefined}
                  className={`jbrowse__row${isTarget && hovering ? ' is-hover' : ''}${isTarget && pressed ? ' is-pressed' : ''}`}
                >
                  <span className="jbrowse__title">{row.title}</span>
                  <span className="jbrowse__company">{row.company}</span>
                </li>
              )
            })}
          </ul>
        </>
      )}

      {cursor && (
        <span className="jbrowse__cursor" style={{ translate: `${cursor.x}px ${cursor.y}px` }}>
          <svg width="20" height="22" viewBox="0 0 20 22" focusable="false">
            <path d="M2 1.5 L2 17 L6.2 13.2 L9 19.5 L11.6 18.4 L8.9 12.2 L14.5 12.2 Z" fill="#17181A" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          {clickKey > 0 && <span key={clickKey} className="jbrowse__ripple" />}
        </span>
      )}
    </div>
  )
}
