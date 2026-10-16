import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { ProgramFaqCards } from './ProgramFaqCards'
import { ProgramFaqOriginal } from './ProgramFaqOriginal'

/** 12. FAQ. Layout dipilih lewat panel tweak halaman detail: original (baris bergaris) atau kartu dengan pil kategori. */
export function ProgramFaq({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  return tweaks.faqLayout === 'cards' ? <ProgramFaqCards program={program} /> : <ProgramFaqOriginal program={program} />
}
