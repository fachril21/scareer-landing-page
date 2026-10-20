import { Section } from '../layout/Section'
import { Doodle, type DoodleName } from './Doodles'
import { WHY } from '../../content/content'
import { useTweaks } from '../../tweaks/TweakContext'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { useInViewOnce } from '../../hooks/useInView'
import { usePointerTilt } from '../../hooks/usePointerTilt'
import './why-editorial.css'

const { editorial: e } = WHY

/** Varian layout "Kenapa scareer": heading + kartu kutipan ungu, lalu tiga pilar bertingkat. */
export function WhyEditorial() {
  const interactive = useInteractiveMotion()
  const cards = useTweaks().tweaks.whyPillars === 'cards'
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

      <ul className={`why-ed__pillars${cards ? ' why-ed__pillars--cards' : ''}`} data-reveal-group="">
        {WHY.pillars.map((p) => (
          <li key={p.title} className="why-ed__pillar">
            {cards ? (
              <PillarCard icon={p.icon} title={p.title} body={p.body} interactive={interactive} />
            ) : (
              <>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** Satu warna per pilar, semuanya dari palet merek: lavender, tinta, ungu. */
const PILLAR_TONE: Partial<Record<DoodleName, 'lavender' | 'ink' | 'purple'>> = {
  senior: 'lavender',
  support: 'ink',
  price: 'purple',
}

interface PillarCardProps {
  icon: DoodleName
  title: string
  body: string
  interactive: boolean
}

/** Kartu pilar: lencana ikon yang bergerak saat kartu disorot, dan cahaya yang mengikuti kursor (mode Interaktif). */
function PillarCard({ icon, title, body, interactive }: PillarCardProps) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.4)
  usePointerTilt(ref, interactive)

  return (
    <div ref={ref} className={`why-pc why-pc--${PILLAR_TONE[icon] ?? 'lavender'}${seen ? ' is-seen' : ''}`}>
      <span className="why-pc__badge">
        <Doodle name={icon} size={36} />
      </span>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}
