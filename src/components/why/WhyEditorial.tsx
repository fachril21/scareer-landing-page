import { Section } from '../layout/Section'
import { WHY } from '../../content/content'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { useInViewOnce } from '../../hooks/useInView'
import { usePointerTilt } from '../../hooks/usePointerTilt'
import './why-editorial.css'

const { editorial: e } = WHY

/** Varian layout "Kenapa scareer": heading + kartu kutipan ungu, lalu tiga pilar bertingkat. */
export function WhyEditorial() {
  const interactive = useInteractiveMotion()
  // Kartu terlihat: stabilo tersapu. Kursor di atas kartu: cahaya mengikuti (--tx, --ty).
  const [cardRef, seen] = useInViewOnce<HTMLQuoteElement>(0.5)
  usePointerTilt(cardRef, interactive)

  return (
    <Section id="kenapa-scareer" tone="paper" labelledBy="kenapa-title">
      <div className="why-ed__top">
        <div>
          <h2 id="kenapa-title" className="why-ed__title">
            {e.title} <span>{e.titleAccent}</span>
          </h2>
          <p className="why-ed__lead">{e.lead}</p>
        </div>
        <blockquote ref={cardRef} className={`why-ed__card${seen ? ' is-seen' : ''}`}>
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
