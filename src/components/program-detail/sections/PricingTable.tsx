import { Check, Minus } from 'lucide-react'
import { Button } from '../../ui/Button'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import { PricingShell } from './PricingShell'
import './pricing-aligned.css'

/**
 * 11. Harga, tabel perbandingan. Kolom pertama berisi nama butir; tiap paket satu kolom berisi harga, "cocok untuk",
 * centang atau strip per butir, lalu tombol. Tabel sungguhan (`<table>`), jadi baris otomatis lurus dan terbaca
 * pembaca layar sebagai perbandingan.
 */
export function PricingTable({ program }: { program: ProgramDetail }) {
  const { plans } = program
  // Butir gabungan semua paket, urutan kemunculan pertama.
  const features = [...new Set(plans.flatMap((p) => p.includes))]

  return (
    <PricingShell program={program} tone="surface" className="tiers--table">
      {() => (
        <div className="ptable-wrap">
          <table className="ptable">
            <caption className="sr-only">Perbandingan {plans.map((p) => p.name).join(' dan ')}</caption>
            <thead>
              <tr>
                <td className="ptable__corner"><span className="sr-only">Yang dibandingkan</span></td>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className={p.recommended ? 'is-rec' : undefined}>
                    <span className="ptable__name">{p.name}</span>
                    {p.recommended && <span className="ptable__rec">Direkomendasikan</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Harga mulai</th>
                {plans.map((p) => (
                  <td key={p.id} className={`ptable__price num${p.recommended ? ' is-rec' : ''}`}>{p.price}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Cocok untuk</th>
                {plans.map((p) => (
                  <td key={p.id} className={p.recommended ? 'is-rec' : undefined}>{p.audience}</td>
                ))}
              </tr>
              {features.map((feature) => (
                <tr key={feature}>
                  <th scope="row">{feature}</th>
                  {plans.map((p) => {
                    const has = p.includes.includes(feature)
                    return (
                      <td key={p.id} className={`ptable__mark${p.recommended ? ' is-rec' : ''}`}>
                        {has ? <Check size={20} strokeWidth={1.75} aria-hidden="true" /> : <Minus size={20} strokeWidth={1.75} aria-hidden="true" />}
                        <span className="sr-only">{has ? 'Termasuk' : 'Tidak termasuk'}</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr>
                <th scope="row">Yang tidak termasuk</th>
                {plans.map((p) => (
                  <td key={p.id} className={p.recommended ? 'is-rec' : undefined}>{p.excludes}</td>
                ))}
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="ptable__corner" />
                {plans.map((p) => (
                  <td key={p.id} className={`ptable__cta${p.recommended ? ' is-rec' : ''}`}>
                    <Button
                      variant={p.recommended ? 'primary' : 'outline'}
                      href={waLink('Detail: Harga', `Aku mau daftar ${p.name} (${program.name})`)}
                      target="_blank"
                      onClick={() => track('click_wa_pricing', { sumber: `plan-${p.id}` })}
                    >
                      Pilih {p.name}
                      <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
                    </Button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </PricingShell>
  )
}
