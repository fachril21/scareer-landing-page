import { Section } from '../layout/Section'
import { WHY } from '../../content/content'
import './why-editorial.css'

const { editorial: e } = WHY

/** Varian layout "Kenapa scareer": heading + kartu kutipan ungu, lalu tiga pilar bertingkat. */
export function WhyEditorial() {
  return (
    <Section id="kenapa-scareer" tone="paper" labelledBy="kenapa-title">
      <div className="why-ed__top">
        <div>
          <h2 id="kenapa-title" className="why-ed__title">
            {e.title} <span>{e.titleAccent}</span>
          </h2>
          <p className="why-ed__lead">{e.lead}</p>
        </div>
        <blockquote className="why-ed__card">
          <p>
            “
            {e.quote.map((part, i) =>
              'mark' in part ? (
                <mark key={i} className="why-ed__mark">{part.text}</mark>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
            ”
          </p>
        </blockquote>
      </div>

      <ul className="why-ed__pillars" data-reveal-group="">
        {WHY.pillars.map((p) => (
          <li key={p.title} className="why-ed__pillar">
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
