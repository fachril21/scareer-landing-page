import { useRef, useState } from 'react'
import { MessageCircle, Pause, Play } from 'lucide-react'
import type { ChatLine } from '../../../content/program-detail.types'
import { useScrollDepthOnce } from '../../../hooks/useScrollDepthOnce'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

interface WhyChatCardProps {
  title: string
  body: string
  label: string
  lines: readonly ChatLine[]
}

const START_VISIBILITY = 0.6

function TypingDots() {
  return (
    <span className="wchat__typing" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

/**
 * Kartu "Kakak tingkat": contoh obrolan yang tampil bubble demi bubble, dengan titik "sedang mengetik" sebelum
 * balasan tim. Murni CSS keyframes (satu kelas memicu), diulang. Tinggi semua bubble sudah dipesan sejak awal, jadi
 * tidak ada pergeseran layout. Semua teks ada di DOM untuk pembaca layar; tombol Jeda menghentikan gerak (WCAG 2.2.2).
 */
export function WhyChatCard({ title, body, label, lines }: WhyChatCardProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  useScrollDepthOnce(rootRef, () => setStarted(true), START_VISIBILITY)

  const className = ['wchat', started && 'is-playing', paused && 'is-paused'].filter(Boolean).join(' ')

  return (
    <article className="wb-card wb-card--chat" aria-labelledby="wchat-title">
      <div className="wb-card__top">
        <span className="wb-icon" aria-hidden="true"><MessageCircle size={20} strokeWidth={1.75} /></span>
        {!reduced && (
          <button type="button" className="wchat__pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused ? <Play size={14} strokeWidth={2} aria-hidden="true" /> : <Pause size={14} strokeWidth={2} aria-hidden="true" />}
            {paused ? 'Putar' : 'Jeda'}
            <span className="sr-only"> animasi contoh percakapan</span>
          </button>
        )}
      </div>

      <div ref={rootRef} className={className} role="group" aria-label="Contoh percakapan">
        {lines.map((line, i) => (
          <div key={line.text} className={`wchat__row wchat__row--${line.from}`}>
            {line.from === 'team' && <TypingDots />}
            <p className={`wchat__bubble wchat__bubble--${line.from} wchat__b${i + 1}`}>
              <span className="sr-only">{line.from === 'visitor' ? 'Calon peserta: ' : 'Tim scareer: '}</span>
              {line.text}
            </p>
          </div>
        ))}
        <p className="wchat__label">{label}</p>
      </div>

      <h3 id="wchat-title" className="wb-card__title">{title}</h3>
      <p className="wb-card__body">{body}</p>
    </article>
  )
}
