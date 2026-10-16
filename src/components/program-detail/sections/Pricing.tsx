import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { PricingOriginal } from './PricingOriginal'
import { PricingTiers } from './PricingTiers'

/** 11. Harga. Layout dipilih lewat panel tweak halaman detail: satu harga (original) atau dua paket. */
export function Pricing({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  return tweaks.pricingLayout === 'tiers' ? <PricingTiers program={program} /> : <PricingOriginal program={program} />
}
