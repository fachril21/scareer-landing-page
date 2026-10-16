import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { ToolsOriginal } from './ToolsOriginal'
import { ToolsTiles } from './ToolsTiles'

/** 5. Tools. Layout dipilih lewat panel tweak halaman detail: original (sel dengan fade) atau ubin monogram yang disorot. */
export function Tools({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  return tweaks.toolsLayout === 'tiles' ? <ToolsTiles program={program} /> : <ToolsOriginal program={program} />
}
