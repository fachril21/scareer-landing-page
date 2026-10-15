import { Button } from '../ui/Button'
import { Section } from '../layout/Section'
import { CONSULT_MESSAGES, WHAT_IS } from '../../content/content'
import { waLink } from '../../lib/whatsapp'
import './what-is-scareer.css'

type Variant = 'definition' | 'sentence'

function Items() {
  return (
    <ul className="what__items">
      {WHAT_IS.items.map((item) => (
        <li key={item.question} className="what__item">
          <h3>{item.question}</h3>
          <p>
            <strong>{item.answer}</strong> {item.body}
          </p>
        </li>
      ))}
    </ul>
  )
}

function Actions() {
  return (
    <div className="what__actions">
      <Button href="#program">Lihat program</Button>
      <Button variant="link" href={waLink('Apa itu scareer', CONSULT_MESSAGES.general)} target="_blank">
        Ngobrol dulu lewat WhatsApp
      </Button>
    </div>
  )
}

/**
 * Section "scareer itu apa" tepat di bawah hero. Tugasnya definisi: apa, untuk siapa, dapat apa.
 * Heading berupa pertanyaan yang bermakna supaya bisa dipindai (pola layer-cake).
 */
export function WhatIsScareer({ variant }: { variant: Variant }) {
  if (variant === 'sentence') {
    return (
      <Section id="apa-itu-scareer" tone="surface" labelledBy="what-title" className="what what--sentence">
        <h2 id="what-title" className="what__sentence">
          {WHAT_IS.sentence.map((part, i) =>
            'mark' in part ? (
              <span key={i} className="what__key">{part.text}</span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </h2>
        <p className="what__lead">{WHAT_IS.lead}</p>
        <Items />
        <Actions />
      </Section>
    )
  }

  return (
    <Section id="apa-itu-scareer" tone="surface" labelledBy="what-title" className="what what--definition">
      <div className="what__intro">
        <h2 id="what-title">{WHAT_IS.title}</h2>
        <p className="what__lead">{WHAT_IS.lead}</p>
        <Actions />
      </div>
      <Items />
    </Section>
  )
}
