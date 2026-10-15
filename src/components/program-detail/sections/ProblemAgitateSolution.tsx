import { ExternalLink } from 'lucide-react'
import { Section } from '../../layout/Section'
import { SectionLabel } from '../../ui/Primitives'
import type { ProgramDetail } from '../../../content/program-detail.types'
import '../../why/why.css'
import './pas.css'

/**
 * 2. Problem Agitate Solution. Satu layar, statis (tanpa animasi masuk dan tanpa hover).
 * Kalimat pernyataan dan tiga pilar memakai gaya "Kenapa scareer" homepage. Statistik hanya tampil bila bersumber.
 */
export function ProblemAgitateSolution({ program }: { program: ProgramDetail }) {
  const { pas } = program
  const columns = [
    { tag: 'Problem', ...pas.problem },
    { tag: 'Agitate', ...pas.agitate },
    { tag: 'Solution', ...pas.solution },
  ]

  return (
    <Section id="masalah-solusi" tone="paper" labelledBy="masalah-solusi-title">
      <div className="statement">
        <SectionLabel>Masalah dan solusi</SectionLabel>
        <h2 id="masalah-solusi-title" className="statement__text">
          {pas.statement.map((part, i) =>
            part.mark ? (
              <mark key={i} className="mark">{part.text}</mark>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </h2>
      </div>

      <ul className="pillars pas__cols">
        {columns.map((c) => (
          <li key={c.tag} className="pillar">
            <span className="pas__tag">{c.tag}</span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>

      {pas.statistic && (
        <p className="pas__stat">
          {pas.statistic.text} ·{' '}
          <a href={pas.statistic.source.url} target="_blank" rel="noopener noreferrer">
            {pas.statistic.source.label}, {pas.statistic.source.year}
            <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only"> (membuka di tab baru)</span>
          </a>
        </p>
      )}
    </Section>
  )
}
