import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { ProgramHeroOriginal } from './ProgramHeroOriginal'
import { ProgramHeroSplit } from './ProgramHeroSplit'

/** 1. Hero. Layout dipilih lewat panel tweak halaman detail: original (foto lebar) atau terbelah (teks kiri, panel ungu kanan). */
export function ProgramHero({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  return tweaks.programHeroLayout === 'split' ? <ProgramHeroSplit program={program} /> : <ProgramHeroOriginal program={program} />
}
