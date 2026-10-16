import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Photo } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import type { ProgramDetail } from '../../../content/program-detail.types'
import './mentor-spotlight.css'

const SWIPE_PX = 50
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * 7. Mentor, layout sorotan: satu mentor tampil, dipilih lewat M1 sampai Mn, tombol panah, panah keyboard, atau geser.
 * Hanya mentor yang sudah memberi izin tampil yang dirender. Tanpa auto-advance. Kutipan draf berlabel contoh.
 */
export function MentorSpotlight({ program }: { program: ProgramDetail }) {
  const mentors = program.mentors.filter((m) => m.consent)
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const swipeFrom = useRef<number | null>(null)
  if (mentors.length === 0) return null

  const count = mentors.length
  const mentor = mentors[active]
  const go = (index: number, { focus = false } = {}) => {
    const next = (index + count) % count
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    go(keys[e.key], { focus: true })
  }

  const { form, frequency, ratio } = program.mentorAccess
  const access = [
    { label: 'Bentuk', value: form },
    { label: 'Frekuensi', value: frequency },
    { label: 'Rasio', value: ratio },
  ].filter((a) => a.value.trim() !== '')

  return (
    <Section id="mentor" tone="paper" labelledBy="mentor-title">
      <div className="sp">
        <h2 id="mentor-title" className="sp__title">Siapa yang membimbing kamu.</h2>
        <p className="sp__note">[ISI: mentor asli beserta izin tampil. Yang di bawah ini contoh tampilan, bukan orang sungguhan.]</p>

        <div
          id={`mentor-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`mentor-tab-${active}`}
          className="sp__stage"
          onPointerDown={(e) => {
            swipeFrom.current = e.pointerType === 'touch' ? e.clientX : null
          }}
          onPointerUp={(e) => {
            if (swipeFrom.current === null) return
            const delta = e.clientX - swipeFrom.current
            swipeFrom.current = null
            if (Math.abs(delta) >= SWIPE_PX) go(active + (delta < 0 ? 1 : -1))
          }}
        >
          <div key={`id-${active}`} className="sp__id">
            <div className="sp__media">
              {mentor.photo ? (
                <Photo name={mentor.photo} alt="Potret contoh mentor." width={1792} height={2400} sizes="(min-width: 1024px) 360px, 90vw" className="sp__photo" />
              ) : (
                <div className="sp__blank" aria-hidden="true">M{active + 1}</div>
              )}
              <span className="sp__tag">ilustrasi</span>
            </div>
            <h3>{mentor.name}</h3>
            <p>{program.name} • {mentor.company}</p>
          </div>

          <div key={`detail-${active}`} className="sp__detail">
            <p className="sp__count num">
              <span aria-hidden="true">{pad(active + 1)} / {pad(count)}</span>
              <span className="sr-only">Mentor {active + 1} dari {count}</span>
            </p>
            {mentor.quote && <blockquote className="sp__quote">{mentor.quote}</blockquote>}
            <ul className="sp__chips" aria-label="Sekilas mentor">
              <li className="sp__chip--field">{mentor.field}</li>
              <li>Pengalaman: <strong>{mentor.experience}</strong></li>
            </ul>
            <p className="sp__sample">Kutipan contoh, perlu persetujuan mentor.</p>

            <div className="sp__foot">
              <p className="sp__hint">Geser atau pakai tombol panah ← →</p>
              <div className="sp__arrows">
                <button type="button" className="sp__arrow" aria-label="Mentor sebelumnya" onClick={() => go(active - 1)}>
                  <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
                <button type="button" className="sp__arrow" aria-label="Mentor berikutnya" onClick={() => go(active + 1)}>
                  <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sp__bar">
          <div role="tablist" aria-label="Pilih mentor" className="sp__tabs" onKeyDown={onTabKeyDown}>
            {mentors.map((m, i) => (
              <button
                key={`${m.name}-${i}`}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`mentor-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`mentor-panel-${i}`}
                aria-label={`Mentor ${i + 1}: ${m.name}`}
                tabIndex={i === active ? 0 : -1}
                className="sp__tab"
                onClick={() => go(i)}
              >
                M{i + 1}
              </button>
            ))}
          </div>
          {access.length > 0 && (
            <ul className="sp__access" aria-label="Akses ke mentor">
              {access.map((a) => (
                <li key={a.label}>
                  {a.label}: <strong>{a.value}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  )
}
