import { DUMMY_PROGRAMS, PROGRAMS, type Program } from '../content/content'
import type { Tweaks } from '../tweaks/options'

const FEW_COUNT = 2

/** Daftar program untuk homepage sesuai tweak "Jumlah program". Menu dan halaman detail tetap memakai PROGRAMS. */
export function selectPrograms(count: Tweaks['programCount']): readonly Program[] {
  if (count === 'two') return PROGRAMS.slice(0, FEW_COUNT)
  if (count === 'many') return [...PROGRAMS, ...DUMMY_PROGRAMS]
  return PROGRAMS
}
