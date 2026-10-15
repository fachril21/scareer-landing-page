import { Button } from '../ui/Button'
import { CheckRow, QuickChip } from '../ui/Primitives'
import { CONSULT_MESSAGES, CTA, FACTS } from '../../content/content'
import { waLink } from '../../lib/whatsapp'
import './cta.css'

/** Rata tengah (pengecualian di Design.md 3.3). Pola titik hanya latar kontainer. Tanpa label section. */
export function ClosingCta() {
  return (
    <section id="cta" className="cta" aria-labelledby="cta-title">
      <div className="container container--content">
        <div className="cta__box">
          <h2 id="cta-title">{CTA.title}</h2>
          <div className="cta__actions">
            <Button variant="whatsapp" href={waLink('CTA penutup', CONSULT_MESSAGES.general)} target="_blank">
              Tanya via WhatsApp
            </Button>
            <Button href="#program">Lihat program</Button>
          </div>
          <CheckRow items={FACTS} className="cta__facts" />
          <div className="cta__chips">
            <QuickChip href={waLink('CTA penutup', CONSULT_MESSAGES.fresh)}>Cocok buat aku?</QuickChip>
            <QuickChip href={waLink('CTA penutup', CONSULT_MESSAGES.installment)}>{CONSULT_MESSAGES.installment}</QuickChip>
            <QuickChip href={waLink('CTA penutup', CONSULT_MESSAGES.compare)}>Bedanya sama bootcamp lain?</QuickChip>
          </div>
        </div>
      </div>
    </section>
  )
}
