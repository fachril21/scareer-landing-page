import { useRef, useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { Button } from '../../ui/Button'
import { Section } from '../../layout/Section'
import type { PricingPlan, ProgramDetail } from '../../../content/program-detail.types'
import { useScrollDepthOnce } from '../../../hooks/useScrollDepthOnce'
import { scrollToElement } from '../../../lib/scrollTo'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import { PricingCompare } from './PricingCompare'
import './pricing-tiers.css'

interface PlanCardProps {
  plan: PricingPlan
  programName: string
  onDetail: () => void
}

function PlanCard({ plan, programName, onDetail }: PlanCardProps) {
  const href = waLink('Detail: Harga', `Aku mau daftar ${plan.name} (${programName})`)
  return (
    <article className="plan" aria-labelledby={`plan-${plan.id}`}>
      <h3 id={`plan-${plan.id}`} className="plan__name">{plan.name}</h3>
      <p className="plan__price num">
        <span className="plan__from">mulai</span>
        <strong>{plan.price}</strong>
      </p>
      <p className="plan__audience">{plan.audience}</p>
      <ul className="plan__list">
        {plan.includes.map((item) => (
          <li key={item}>
            <Check size={16} strokeWidth={2} aria-hidden="true" />
            <span><span className="sr-only">Termasuk: </span>{item}</span>
          </li>
        ))}
        <li className="plan__excluded">
          <Minus size={16} strokeWidth={2} aria-hidden="true" />
          <span><span className="sr-only">Tidak termasuk: </span>{plan.excludes}</span>
        </li>
      </ul>
      <div className="plan__actions">
        <Button variant="primary" href={href} target="_blank" onClick={() => track('click_wa_pricing', { sumber: `plan-${plan.id}` })}>
          Pilih {plan.name}
          <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
        </Button>
        <Button variant="link" onClick={onDetail} aria-controls="bandingkan-program">
          Detail
          <span className="sr-only"> {plan.name}: buka perbandingan program</span>
        </Button>
      </div>
    </article>
  )
}

/**
 * 11. Harga, layout dua paket di band Ink: judul besar, dua kartu Paper (kanan sedikit turun di desktop),
 * catatan jujur soal harga dan refund, lalu akordeon perbandingan. Tanpa form: daftar lewat WhatsApp.
 */
export function PricingTiers({ program }: { program: ProgramDetail }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [compareOpen, setCompareOpen] = useState(false)
  useScrollDepthOnce(rootRef, () => track('scroll_depth_pricing'))

  const showCompare = () => {
    setCompareOpen(true)
    track('click_pricing_detail')
    const compare = document.getElementById('bandingkan-program')
    if (compare) scrollToElement(compare)
  }

  return (
    <Section id="harga" tone="ink" labelledBy="harga-title">
      <div ref={rootRef} className="tiers">
        <p className="tiers__lead">Mulai dari ±Rp3 juta. Isinya segini. Yang nggak termasuk juga kami tulis.</p>
        <h2 id="harga-title" className="tiers__title">Harga</h2>

        <div className="tiers__plans">
          {program.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} programName={program.name} onDetail={showCompare} />
          ))}
        </div>

        <div className="tiers__notes">
          <p>Harga per paket dikonfirmasi lewat WhatsApp sebelum kamu memutuskan. Harga resmi: [ISI: kisaran harga].</p>
          <p><strong>Refund dan pindah batch:</strong> {program.refundPolicy}</p>
          <p>Pendaftaran lewat WhatsApp. Kamu akan diarahkan ke chat dengan pesan yang sudah terisi program pilihanmu.</p>
        </div>

        <PricingCompare
          plans={program.plans}
          rows={program.planCompare}
          open={compareOpen}
          onToggle={(next) => {
            setCompareOpen(next)
            if (next) track('open_pricing_compare')
          }}
        />
      </div>
    </Section>
  )
}
