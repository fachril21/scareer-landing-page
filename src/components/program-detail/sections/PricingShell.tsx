import { useRef, useState, type ReactNode } from 'react'
import { Section } from '../../layout/Section'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { useScrollDepthOnce } from '../../../hooks/useScrollDepthOnce'
import { scrollToElement } from '../../../lib/scrollTo'
import { track } from '../../../lib/track'
import { PricingCompare } from './PricingCompare'
import './pricing-tiers.css'

interface PricingShellProps {
  program: ProgramDetail
  /** `ink` untuk band gelap, `surface` untuk band terang. */
  tone: 'ink' | 'surface'
  /** Kelas tambahan pada pembungkus, mis. gaya paket. */
  className?: string
  /** Isi utama (kartu, sel, atau tabel). `showCompare` membuka dan menggulung ke akordeon perbandingan. */
  children: (api: { showCompare: () => void }) => ReactNode
}

/**
 * 11. Harga: kerangka bersama semua layout dua paket. Menyediakan kalimat pembuka, judul "Harga" dengan jarak lega ke isi,
 * catatan jujur (harga, refund, WhatsApp), dan akordeon "Bandingkan program". Tanpa form: daftar lewat WhatsApp.
 */
export function PricingShell({ program, tone, className = '', children }: PricingShellProps) {
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
    <Section id="harga" tone={tone} labelledBy="harga-title">
      <div ref={rootRef} className={`tiers${tone === 'surface' ? ' tiers--light' : ''} ${className}`.trim()}>
        <p className="tiers__lead">Mulai dari ±Rp3 juta. Isinya segini. Yang nggak termasuk juga kami tulis.</p>
        <h2 id="harga-title" className="tiers__title">Harga</h2>

        {children({ showCompare })}

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
