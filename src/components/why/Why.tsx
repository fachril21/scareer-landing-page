import { Check, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/Primitives'
import { Section } from '../layout/Section'
import { Doodle } from './Doodles'
import { WHY } from '../../content/content'
import './why.css'

const { transparency: t } = WHY

/** Band 4a: kalimat pernyataan + tiga pilar. Satu-satunya tempat penanda stabilo. */
export function WhyStatement() {
  return (
    <Section id="kenapa-scareer" tone="surface" labelledBy="kenapa-title">
      <div className="statement">
        <h2 id="kenapa-title" className="sr-only">Kenapa scareer</h2>
        <SectionLabel>Kenapa scareer</SectionLabel>
        <p className="statement__text">
          {WHY.statement.map((part, i) =>
            'mark' in part ? (
              <mark key={i} className="mark">{part.text}</mark>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
      </div>

      <ul className="pillars" data-reveal-group="">
        {WHY.pillars.map((p) => (
          <li key={p.title} className="pillar">
            <Doodle name={p.icon} />
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function ListCell({ title, items, kind }: { title: string; items: readonly string[]; kind: 'reduced' | 'kept' }) {
  const Icon = kind === 'reduced' ? X : Check
  return (
    <div className="panel__cell">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>
              <span className="sr-only">{kind === 'reduced' ? 'Dikurangi: ' : 'Dipertahankan: '}</span>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Band 4b: panel transparansi harga, statis. */
export function WhyPanel() {
  return (
    <Section id="transparan" tone="ink" labelledBy="transparan-title">
      <p className="panel__label">
        <span className="panel__box" aria-hidden="true" />
        {t.label}
      </p>
      <h2 id="transparan-title" className="panel__title">{t.title}</h2>

      <div className="panel" data-reveal-group="">
        <ListCell title={t.reduced.title} items={t.reduced.items} kind="reduced" />
        <ListCell title={t.kept.title} items={t.kept.items} kind="kept" />
        <div className="panel__cell panel__cell--wide">
          <h3>{t.promise.title}</h3>
          <p>{t.promise.body}</p>
        </div>
        <div className="panel__cell panel__cell--wide panel__cell--price">
          <p className="num">{t.price}</p>
          <Button variant="whatsapp" onInk href="#program">
            Lihat program
          </Button>
        </div>
      </div>
    </Section>
  )
}
