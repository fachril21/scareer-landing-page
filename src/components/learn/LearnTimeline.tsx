import { useRef } from 'react'
import { Section } from '../layout/Section'
import { Doodle } from '../why/Doodles'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { LEARN } from '../../content/content'
import './learn-timeline.css'

const { timeline: t } = LEARN

/** Varian "Garis waktu": tiga langkah di satu garis, dari belajar sampai internship. Titik terakhir = tujuan akhir. */
export function LearnTimeline({ tone = 'paper' }: { tone?: 'paper' | 'surface' }) {
  const listRef = useRef<HTMLOListElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const interactive = useInteractiveMotion()
  // --p (0 sampai 1) mengisi garis antar titik dan menyalakan titiknya mengikuti scroll; penuh saat atas daftar di 65% layar (sebelum section sampai di tengah).
  useScrollProgress(listRef, interactive, { start: 1, endTop: 0.65 })
  // Stabilo di judul tersapu mengikuti scroll, sama seperti judul CTA penutup.
  useScrollProgress(titleRef, interactive, { start: 1, end: 0.85, smooth: true })

  return (
    <Section id="cara-belajar" tone={tone} labelledBy="learn-title">
      <div className="ltl__head">
        <h2 ref={titleRef} id="learn-title" className="ltl__title">
          {t.titleLines.map((line) => (
            <span key={line} className="ltl__line">{line}</span>
          ))}
          <mark className="ltl__mark">{t.titleAccent}</mark>
        </h2>
        <p className="ltl__lead">{t.lead}</p>
      </div>

      <ol ref={listRef} className="ltl" data-reveal-group="">
        {t.steps.map((step, i) => (
          <li
            key={step.title}
            className={`ltl__item${i === t.steps.length - 1 ? ' ltl__item--goal' : ''}`}
            style={{ '--i': i } as React.CSSProperties}
          >
            <span className="ltl__node num" aria-hidden="true">{i + 1}</span>
            <Doodle name={step.icon} size={36} className="ltl__icon" />
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
