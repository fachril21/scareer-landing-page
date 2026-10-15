import { Button } from '../ui/Button'
import { QuickChip } from '../ui/Primitives'
import { CONSULT_MESSAGES, CTA_SHEET } from '../../content/content'
import { waLink } from '../../lib/whatsapp'
import './cta-sheet.css'

/** CTA penutup varian "Lembar": panel ungu bersudut atas membulat. Footer menimpa tepi bawahnya. */
export function ClosingCtaSheet() {
  return (
    <section id="cta" className="cta-sheet" aria-labelledby="cta-title">
      <div className="cta-sheet__panel on-ink">
        <div className="container container--content cta-sheet__inner">
          <h2 id="cta-title" className="cta-sheet__title">
            {CTA_SHEET.title.map((part, i) =>
              'mark' in part ? (
                <mark key={i} className="cta-sheet__mark">{part.text}</mark>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h2>
          <p className="cta-sheet__lead">{CTA_SHEET.lead}</p>
          <div className="cta-sheet__actions">
            <Button variant="whatsapp" onInk href={waLink('CTA penutup', CONSULT_MESSAGES.general)} target="_blank">
              Tanya via WhatsApp
            </Button>
            <Button variant="outline" onInk href="#program">Lihat program</Button>
          </div>
          <div className="cta-sheet__chips">
            <QuickChip href={waLink('CTA penutup', CONSULT_MESSAGES.fresh)}>Cocok buat aku?</QuickChip>
            <QuickChip href={waLink('CTA penutup', CONSULT_MESSAGES.installment)}>{CONSULT_MESSAGES.installment}</QuickChip>
            <QuickChip href={waLink('CTA penutup', CONSULT_MESSAGES.compare)}>Bedanya sama bootcamp lain?</QuickChip>
          </div>
        </div>
      </div>
    </section>
  )
}
