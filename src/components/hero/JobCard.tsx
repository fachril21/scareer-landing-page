import { useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { JOB_SAMPLES } from '../../content/job-samples'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { JobBrowse } from './JobBrowse'

/** Dua contoh lowongan selain `target`, dipakai sebagai hasil pencarian pengecoh. */
function pickDecoys(target: number): readonly [(typeof JOB_SAMPLES)[number], (typeof JOB_SAMPLES)[number]] {
  const others = JOB_SAMPLES.filter((_, i) => i !== target)
  const first = Math.floor(Math.random() * others.length)
  const second = (first + 1 + Math.floor(Math.random() * (others.length - 1))) % others.length
  return [others[first], others[second]]
}

/** Indeks acak yang berbeda dari `current`, supaya refresh selalu menampilkan lowongan lain. */
function nextIndex(current: number): number {
  const offset = 1 + Math.floor(Math.random() * (JOB_SAMPLES.length - 1))
  return (current + offset) % JOB_SAMPLES.length
}

/**
 * Kartu lowongan. Coretan digambar sekali saat kartu terlihat.
 * Dengan `refreshable`, tombol di dasar kartu mensimulasikan pencarian di situs lowongan:
 * kursor mengetik di kolom cari lalu mengeklik satu lowongan, kemudian kartu berganti dan coretannya digambar ulang.
 */
export function JobCard({ drawn, refreshable = false }: { drawn: boolean; refreshable?: boolean }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [pending, setPending] = useState<number | null>(null)
  const [redraw, setRedraw] = useState(false)
  const frames = useRef<number[]>([])

  useEffect(() => {
    const pendingFrames = frames.current
    return () => {
      pendingFrames.forEach((f) => window.cancelAnimationFrame(f))
    }
  }, [])

  const searching = pending !== null

  // Tanpa refresh, kartu selalu memakai contoh pertama (isi bawaan).
  const sample = JOB_SAMPLES[refreshable ? index : 0]

  const releaseRedraw = () => {
    // Dua frame supaya reset coretan sempat dirender sebelum transisinya dilepas.
    const first = window.requestAnimationFrame(() => {
      frames.current.push(window.requestAnimationFrame(() => setRedraw(false)))
    })
    frames.current.push(first)
  }

  const refresh = () => {
    if (searching) return
    const next = nextIndex(index)
    setRedraw(true)
    if (reduced) {
      setIndex(next)
      releaseRedraw()
      return
    }
    setPending(next)
  }

  const onPicked = () => {
    if (pending === null) return
    setIndex(pending)
    setPending(null)
    releaseRedraw()
  }

  // Dua lowongan pengecoh untuk daftar hasil simulasi: bukan yang dituju.
  const decoys = pending === null ? null : pickDecoys(pending)

  return (
    <figure className={`job${drawn ? ' is-drawn' : ''}${redraw ? ' is-redraw' : ''}`} aria-label={sample.ariaLabel}>
      <div className={`job__card${refreshable ? ' job__card--refresh' : ''}${searching ? ' is-searching' : ''}`} aria-busy={searching}>
        <div className="job__stack">
          <div key={index} className="job__body">
            <p className="job__title">{sample.title}</p>
            <p className="job__company">{sample.company}</p>
            <p className="job__heading">{sample.heading}</p>
            <ul className="job__list">
              {sample.items.map((item, i) => (
                <li key={item} className={i === sample.struckIndex ? 'job__item job__item--struck' : 'job__item'}>
                  <span className="job__text">{item}</span>
                  {i === sample.struckIndex && (
                    <svg className="job__strike" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                      <path
                        d="M3 14 C40 6, 70 19, 108 11 S176 7, 217 12"
                        pathLength="1"
                        fill="none"
                        stroke="var(--purple)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {refreshable && pending !== null && decoys && (
            <JobBrowse key={pending} target={JOB_SAMPLES[pending]} decoys={decoys} onPicked={onPicked} />
          )}
        </div>
        {refreshable && (
          <button type="button" className="job__refresh" onClick={refresh} disabled={searching}>
            <RefreshCw size={16} strokeWidth={2} aria-hidden="true" />
            {searching ? 'Mencari…' : 'Cari lowongan lain'}
          </button>
        )}
      </div>
      <figcaption className="job__note">{sample.note}</figcaption>
      {refreshable && (
        <p className="sr-only" role="status">
          {searching ? 'Mencari lowongan' : `Contoh lowongan: ${sample.title}`}
        </p>
      )}
    </figure>
  )
}
