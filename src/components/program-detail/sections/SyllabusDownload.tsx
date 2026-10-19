import { useState } from 'react'
import { Button } from '../../ui/Button'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { track } from '../../../lib/track'
import { useTweaks } from '../../../tweaks/TweakContext'
import { SyllabusDialog } from './SyllabusDialog'

/**
 * Tombol "Unduh silabus". Dengan pengaturan tweak "Form dulu" (default), tombol membuka dialog form sebelum mengunduh;
 * dengan "Langsung unduh", berkas diunduh seperti biasa.
 */
export function SyllabusDownload({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  const [open, setOpen] = useState(false)
  const { syllabus } = program.curriculum

  if (tweaks.syllabusGate === 'direct') {
    return (
      <Button href={syllabus.href} download onClick={() => track('download_syllabus', { program: program.slug })}>
        Unduh silabus
      </Button>
    )
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} aria-haspopup="dialog">
        Unduh silabus
      </Button>
      <SyllabusDialog open={open} onClose={() => setOpen(false)} programName={program.name} programSlug={program.slug} fileHref={syllabus.href} />
    </>
  )
}
