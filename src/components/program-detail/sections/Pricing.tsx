import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { PricingAligned } from './PricingAligned'
import { PricingOriginal } from './PricingOriginal'
import { PricingTable } from './PricingTable'
import { PricingTiers } from './PricingTiers'

/**
 * 11. Harga. Layout dipilih lewat panel tweak halaman detail: satu harga (original), dua paket (kartu Paper atau kaca),
 * atau tiga varian sejajar (sel gelap, sel terang, dan tabel perbandingan).
 */
export function Pricing({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  switch (tweaks.pricingLayout) {
    case 'original':
      return <PricingOriginal program={program} />
    case 'tiers':
      return <PricingTiers program={program} />
    case 'glass':
      return <PricingTiers program={program} glass />
    case 'aligned-light':
      return <PricingAligned program={program} light />
    case 'table':
      return <PricingTable program={program} />
    default:
      return <PricingAligned program={program} />
  }
}
