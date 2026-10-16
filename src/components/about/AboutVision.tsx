import { Section } from '../layout/Section'
import { ABOUT_VISION } from '../../content/about'
import './about.css'

const { vision, mission } = ABOUT_VISION

/** 3. Visi dan misi: band Ink dengan dua sel bergaris tipis. Stabilo hanya di atas Ink (Design.md 3.1). */
export function AboutVision() {
  return (
    <Section id="visi-misi" tone="ink" labelledBy="vm-title">
      <h2 id="vm-title" className="about-title about-title--on-ink">{ABOUT_VISION.title}</h2>
      <div className="vm">
        <section className="vm__cell" aria-labelledby="vm-vision">
          <h3 id="vm-vision">{vision.label}</h3>
          <p className="vm__statement">
            {vision.statement.map((part, i) =>
              'mark' in part ? (
                <mark key={i} className="vm__mark">{part.text}</mark>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
        </section>
        <section className="vm__cell" aria-labelledby="vm-mission">
          <h3 id="vm-mission">{mission.label}</h3>
          <ol className="vm__list">
            {mission.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </div>
      <p className="vm__draft">{ABOUT_VISION.draft}</p>
    </Section>
  )
}
