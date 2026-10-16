import { Check, CircleCheck, CircleMinus, Minus } from 'lucide-react'
import { Button } from '../../ui/Button'
import type { PricingPlan, ProgramDetail } from '../../../content/program-detail.types'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import { PricingShell } from './PricingShell'
import './pricing-tiers.css'
import './pricing-glass.css'

interface PlanCardProps {
  plan: PricingPlan
  programName: string
  onDetail: () => void
  /** Gaya kaca: pil nama, ikon centang bulat, dan sorotan paket yang direkomendasikan. */
  glass: boolean
}

function PlanCard({ plan, programName, onDetail, glass }: PlanCardProps) {
  const href = waLink('Detail: Harga', `Aku mau daftar ${plan.name} (${programName})`)
  const recommended = glass && plan.recommended === true
  const Yes = glass ? CircleCheck : Check
  const No = glass ? CircleMinus : Minus
  return (
    <article className={`plan${glass ? ' plan--glass' : ''}${recommended ? ' plan--rec' : ''}`} aria-labelledby={`plan-${plan.id}`}>
      <div className="plan__top">
        <h3 id={`plan-${plan.id}`} className="plan__name">{plan.name}</h3>
        {recommended && <span className="plan__rec">Direkomendasikan</span>}
      </div>
      <p className="plan__price num">
        <span className="plan__from">mulai</span>
        <strong>{plan.price}</strong>
      </p>
      <p className="plan__audience">{plan.audience}</p>
      <ul className="plan__list">
        {plan.includes.map((item) => (
          <li key={item}>
            <Yes size={glass ? 18 : 16} strokeWidth={glass ? 1.75 : 2} aria-hidden="true" />
            <span><span className="sr-only">Termasuk: </span>{item}</span>
          </li>
        ))}
        <li className="plan__excluded">
          <No size={glass ? 18 : 16} strokeWidth={glass ? 1.75 : 2} aria-hidden="true" />
          <span><span className="sr-only">Tidak termasuk: </span>{plan.excludes}</span>
        </li>
      </ul>
      <div className="plan__actions">
        <Button variant={recommended ? 'light' : 'primary'} href={href} target="_blank" onClick={() => track('click_wa_pricing', { sumber: `plan-${plan.id}` })}>
          Pilih {plan.name}
          <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
        </Button>
        <Button variant="link" onInk={glass} onClick={onDetail} aria-controls="bandingkan-program">
          Detail
          <span className="sr-only"> {plan.name}: buka perbandingan program</span>
        </Button>
      </div>
    </article>
  )
}

/** 11. Harga, kartu terpisah di band Ink: kartu Paper ("tiers") atau kartu kaca ("glass"). Tinggi kartu sama, tanpa stagger. */
export function PricingTiers({ program, glass = false }: { program: ProgramDetail; glass?: boolean }) {
  return (
    <PricingShell program={program} tone="ink">
      {({ showCompare }) => (
        <div className={`tiers__plans${glass ? ' tiers__plans--glass' : ''}`}>
          {program.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} programName={program.name} onDetail={showCompare} glass={glass} />
          ))}
        </div>
      )}
    </PricingShell>
  )
}
