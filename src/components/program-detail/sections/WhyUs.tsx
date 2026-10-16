import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { WhyUsBento } from './WhyUsBento'
import { WhyUsOriginal } from './WhyUsOriginal'

/** 3. Kenapa kami. Layout dipilih lewat panel tweak halaman detail: original (sel bergaris) atau bento dengan obrolan. */
export function WhyUs({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  return tweaks.whyUsLayout === 'bento' ? <WhyUsBento program={program} /> : <WhyUsOriginal program={program} />
}
