import { Button } from '../ui/Button'
import { Placeholder } from '../ui/Primitives'
import { Section } from '../layout/Section'
import { ABOUT_CONTACT } from '../../content/about'
import { CONSULT_MESSAGES } from '../../content/content'
import { waLink } from '../../lib/whatsapp'
import './about.css'

const { rows, email } = ABOUT_CONTACT

/** 5. Alamat dan kontak. Hanya email yang sudah pasti; sisanya `[ISI]`. Peta berupa placeholder, tanpa sematan pihak ketiga. */
export function AboutContact() {
  return (
    <Section id="kontak" tone="paper" labelledBy="contact-title">
      <h2 id="contact-title" className="about-title">{ABOUT_CONTACT.title}</h2>
      <div className="contact">
        <address className="contact__card">
          <dl>
            {rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${email}`}>{email}</a></dd>
            </div>
          </dl>
          <div className="contact__actions">
            <Button variant="whatsapp" href={waLink('Tentang', CONSULT_MESSAGES.general)} target="_blank">
              Tanya via WhatsApp
              <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
            </Button>
            <Button variant="outline" href={`mailto:${email}`}>Kirim email</Button>
          </div>
        </address>
        <Placeholder label={ABOUT_CONTACT.mapLabel} ratio="4 / 3" className="contact__map" />
      </div>
    </Section>
  )
}
