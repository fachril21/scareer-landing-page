import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { CurriculumOriginal } from './CurriculumOriginal'
import { CurriculumTimeline } from './CurriculumTimeline'

/** 4. Kurikulum. Layout dipilih lewat panel tweak halaman detail: original (tab dan panel) atau timeline akordeon. */
export function Curriculum({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  return tweaks.curriculumLayout === 'timeline' ? <CurriculumTimeline program={program} /> : <CurriculumOriginal program={program} />
}
