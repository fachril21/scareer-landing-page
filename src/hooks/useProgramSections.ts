import { useMemo } from 'react'
import { PROGRAM_SECTIONS, PROGRAM_TOC } from '../content/program-sections'
import { useTweaks } from '../tweaks/TweakContext'

/** Section dan anak daftar isi yang disembunyikan lewat tweak. Daftar isi dan penghitung "n dari N" ikut menyesuaikan. */
const HIDDEN_BY_TWEAK = { programProblem: 'masalah-solusi', programReasons: 'kenapa-program' } as const

/** Section dan daftar isi halaman detail setelah tweak penyembunyian diterapkan. */
export function useProgramSections() {
  const { tweaks } = useTweaks()
  const hiddenIds = Object.entries(HIDDEN_BY_TWEAK)
    .filter(([key]) => tweaks[key as keyof typeof HIDDEN_BY_TWEAK] === 'hidden')
    .map(([, id]) => id)
  const hiddenKey = hiddenIds.join(',')

  return useMemo(() => {
    const hidden = new Set(hiddenKey ? hiddenKey.split(',') : [])
    return {
      sections: PROGRAM_SECTIONS.filter((s) => !hidden.has(s.id)),
      toc: PROGRAM_TOC.map((g) => ({
        ...g,
        items: g.items
          .filter((it) => !hidden.has(it.id))
          .map((it) => (it.children ? { ...it, children: it.children.filter((c) => !hidden.has(c.id)) } : it)),
      })).filter((g) => g.items.length > 0),
    }
  }, [hiddenKey])
}
