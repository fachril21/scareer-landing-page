import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { MentorSectionOriginal } from './MentorSectionOriginal'
import { MentorSpotlight } from './MentorSpotlight'

/** 7. Mentor. Layout dipilih lewat panel tweak halaman detail: original (kartu potret) atau sorotan satu mentor. */
export function MentorSection({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  return tweaks.mentorLayout === 'spotlight' ? <MentorSpotlight program={program} /> : <MentorSectionOriginal program={program} />
}
