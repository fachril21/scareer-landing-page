import { useRef } from 'react'
import { Check } from 'lucide-react'
import { Button } from '../../ui/Button'
import { QuickChip, SectionLabel } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { useScrollDepthOnce } from '../../../hooks/useScrollDepthOnce'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import './pricing.css'

/**
 * 11. Harga. Satu harga mulai dari ±Rp3 juta, apa yang termasuk, dan kebijakan refund yang selalu terlihat.
 * Tanpa form atau checkout: daftar dan tanya lewat WhatsApp. Tanpa harga dicoret, "paling laris", atau hitung mundur.
 */
export function PricingOriginal({ program }: { program: ProgramDetail }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  useScrollDepthOnce(sectionRef, () => track('scroll_depth_pricing'))

  const ask = (text: string) => waLink('Detail: Harga', `${text} (${program.name})`)

  return (
    <Section id="harga" tone="surface" labelledBy="harga-title">
      <div ref={sectionRef}>
        <SectionLabel>Harga</SectionLabel>
        <h2 id="harga-title" className="pricing-title">Mulai dari ±Rp3 juta, tanpa kejutan</h2>

        <div className="price-card">
          <div className="price-card__main">
            <p className="price-card__label">Harga {program.name}</p>
            <p className="price-card__amount num">
              Mulai dari <strong>{program.startingPrice}</strong>
            </p>
            <p className="price-card__note">Harga pasti per batch dikonfirmasi lewat WhatsApp sebelum kamu memutuskan.</p>
            <Button
              variant="primary"
              href={ask('Aku mau daftar')}
              target="_blank"
              onClick={() => track('click_wa_pricing', { sumber: 'cta' })}
            >
              Tanya dan daftar via WhatsApp
            </Button>
          </div>
          <div className="price-card__list">
            <h3>Yang kamu dapat</h3>
            <ul>
              {program.includes.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="info-card" aria-labelledby="info-refund">
          <h3 id="info-refund">Kebijakan refund dan pindah batch</h3>
          <p>{program.refundPolicy}</p>
        </section>

        <div className="pricing-ask">
          <p>Belum yakin?</p>
          <div className="pricing-ask__chips">
            <QuickChip href={ask('Internship-nya seperti apa?')} onClick={() => track('click_wa_pricing', { sumber: 'chip' })}>
              Internship-nya seperti apa?
            </QuickChip>
            <QuickChip href={ask('Aku fresh graduate, cocok nggak?')} onClick={() => track('click_wa_pricing', { sumber: 'chip' })}>
              Aku fresh graduate, cocok nggak?
            </QuickChip>
          </div>
        </div>
      </div>
    </Section>
  )
}
