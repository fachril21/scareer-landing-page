import { Check, Minus } from 'lucide-react'
import { Button } from '../../ui/Button'
import type { PricingPlan, ProgramDetail } from '../../../content/program-detail.types'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import { PricingShell } from './PricingShell'
import './pricing-aligned.css'

/** Baris tetap di atas daftar: pil nama, harga, "cocok untuk". Daftar butir lalu tombol menyusul. */
const HEAD_ROWS = 3

function PlanCell({ plan, includeRows, programName, onDetail, light }: { plan: PricingPlan; includeRows: number; programName: string; onDetail: () => void; light: boolean }) {
  const recommended = plan.recommended === true
  const padding = Array.from({ length: includeRows - plan.includes.length })
  // Baris: pil nama, harga, "cocok untuk", butir-butir (+ butir "tidak termasuk"), lalu tombol.
  const span = HEAD_ROWS + includeRows + 1 + 1

  return (
    <article className={`pcell${recommended ? ' pcell--rec' : ''}`} style={{ '--span': span } as React.CSSProperties} aria-labelledby={`pcell-${plan.id}`}>
      <div className="pcell__top">
        <h3 id={`pcell-${plan.id}`} className="pcell__name">{plan.name}</h3>
        {recommended && <span className="pcell__rec">Direkomendasikan</span>}
      </div>
      <p className="pcell__price num">
        <span>mulai</span>
        <strong>{plan.price}</strong>
      </p>
      <p className="pcell__audience">{plan.audience}</p>
      <ul className="pcell__list" style={{ '--rows': includeRows + 1 } as React.CSSProperties}>
        {plan.includes.map((item) => (
          <li key={item}>
            <Check size={20} strokeWidth={1.75} aria-hidden="true" />
            <span><span className="sr-only">Termasuk: </span>{item}</span>
          </li>
        ))}
        {padding.map((_, i) => (
          <li key={`pad-${i}`} aria-hidden="true"><span>&nbsp;</span></li>
        ))}
        <li className="pcell__excluded">
          <Minus size={20} strokeWidth={1.75} aria-hidden="true" />
          <span><span className="sr-only">Tidak termasuk: </span>{plan.excludes}</span>
        </li>
      </ul>
      <div className="pcell__actions">
        <Button
          variant={recommended ? 'light' : 'primary'}
          href={waLink('Detail: Harga', `Aku mau daftar ${plan.name} (${programName})`)}
          target="_blank"
          onClick={() => track('click_wa_pricing', { sumber: `plan-${plan.id}` })}
        >
          Pilih {plan.name}
          <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
        </Button>
        <Button variant="link" onInk={recommended || !light} onClick={onDetail} aria-controls="bandingkan-program">
          Detail
          <span className="sr-only"> {plan.name}: buka perbandingan program</span>
        </Button>
      </div>
    </article>
  )
}

/**
 * 11. Harga, sel bergaris yang sejajar. Satu kontainer berborder dengan satu sel per paket (Design.md 4.8 dan 4.9):
 * tiap sel mewarisi baris dari kontainer lewat subgrid, jadi pil nama, harga, butir daftar, dan tombol selalu lurus
 * lintas paket walau teksnya berbeda panjang. `light` memakai band terang, selain itu band Ink.
 */
export function PricingAligned({ program, light = false }: { program: ProgramDetail; light?: boolean }) {
  const includeRows = Math.max(...program.plans.map((p) => p.includes.length))
  return (
    <PricingShell program={program} tone={light ? 'surface' : 'ink'} className="tiers--aligned">
      {({ showCompare }) => (
        <div className="pal" style={{ '--plans': program.plans.length } as React.CSSProperties}>
          {program.plans.map((plan) => (
            <PlanCell key={plan.id} plan={plan} includeRows={includeRows} programName={program.name} onDetail={showCompare} light={light} />
          ))}
        </div>
      )}
    </PricingShell>
  )
}
