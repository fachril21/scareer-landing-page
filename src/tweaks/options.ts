/** Satu sumber kebenaran untuk panel tweak: tipe, pilihan, dan nilai bawaan. */

export interface TweakOption<V extends string> {
  value: V
  label: string
}

export interface TweakGroup<K extends keyof Tweaks> {
  key: K
  title: string
  options: readonly TweakOption<Tweaks[K]>[]
}

export type Tweaks = {
  heroLayout: 'original' | 'centered'
  wordSet: 'tuntutan' | 'jawaban' | 'santai'
  wordStyle: 'ungu' | 'stabilo' | 'lavender'
  wordLoop: 'infinite' | 'three'
  navStyle: 'original' | 'floating'
  navBlur: 'low' | 'mid' | 'high'
  navWidth: 'compact' | 'wide'
  programLayout: 'grid' | 'carousel'
  programCount: 'two' | 'real' | 'many'
  whyLayout: 'original' | 'editorial'
  whyTilt: 'tilted' | 'straight'
  whyPanel: 'hidden' | 'shown'
  learnLayout: 'original' | 'columns'
  worksSection: 'hidden' | 'shown'
  mentorSection: 'hidden' | 'shown'
  faqSection: 'hidden' | 'shown'
  endLayout: 'original' | 'sheet'
  whatIs: 'hidden' | 'definition' | 'sentence'
  problem: 'hidden' | 'loop' | 'sides'
  pageOrder: 'story' | 'previous'
}

/** Bawaan = desain baru yang sudah disetujui. Pilihan "Original" di panel tetap menampilkan tampilan lama. */
export const DEFAULT_TWEAKS: Tweaks = {
  heroLayout: 'centered',
  wordSet: 'tuntutan',
  wordStyle: 'ungu',
  wordLoop: 'infinite',
  navStyle: 'floating',
  navBlur: 'mid',
  navWidth: 'compact',
  programLayout: 'carousel',
  programCount: 'real',
  whyLayout: 'editorial',
  whyTilt: 'tilted',
  whyPanel: 'hidden',
  learnLayout: 'columns',
  worksSection: 'hidden',
  mentorSection: 'hidden',
  faqSection: 'hidden',
  endLayout: 'sheet',
  whatIs: 'definition',
  problem: 'loop',
  pageOrder: 'story',
}

export const HERO_GROUPS = [
  {
    key: 'heroLayout',
    title: 'Layout hero',
    options: [
      { value: 'original', label: 'Original' },
      { value: 'centered', label: 'Terpusat' },
    ],
  },
  {
    key: 'wordSet',
    title: 'Set kata (layout terpusat)',
    options: [
      { value: 'tuntutan', label: 'Tuntutan loker' },
      { value: 'jawaban', label: 'Jawaban kita' },
      { value: 'santai', label: 'Curhat santai' },
    ],
  },
  {
    key: 'wordStyle',
    title: 'Gaya sorotan kata',
    options: [
      { value: 'ungu', label: 'Teks ungu' },
      { value: 'stabilo', label: 'Stabilo' },
      { value: 'lavender', label: 'Lavender' },
    ],
  },
  {
    key: 'wordLoop',
    title: 'Putaran kata (tiap 2 detik)',
    options: [
      { value: 'infinite', label: 'Terus' },
      { value: 'three', label: '3 putaran' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const NAV_GROUPS = [
  {
    key: 'navStyle',
    title: 'Gaya navbar',
    options: [
      { value: 'original', label: 'Original' },
      { value: 'floating', label: 'Transparan lalu pill' },
    ],
  },
  {
    key: 'navBlur',
    title: 'Blur pill',
    options: [
      { value: 'low', label: 'Rendah' },
      { value: 'mid', label: 'Sedang' },
      { value: 'high', label: 'Tinggi' },
    ],
  },
  {
    key: 'navWidth',
    title: 'Lebar pill',
    options: [
      { value: 'compact', label: 'Ringkas' },
      { value: 'wide', label: 'Lebar' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PROGRAM_GROUPS = [
  {
    key: 'programLayout',
    title: 'Layout list program',
    options: [
      { value: 'grid', label: 'Grid (original)' },
      { value: 'carousel', label: 'Horizontal + filter' },
    ],
  },
  {
    key: 'programCount',
    title: 'Jumlah program',
    options: [
      { value: 'two', label: '2 program' },
      { value: 'real', label: '4 (asli)' },
      { value: 'many', label: '12 (dummy)' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const WHY_GROUPS = [
  {
    key: 'whyLayout',
    title: 'Layout Kenapa scareer',
    options: [
      { value: 'original', label: 'Original' },
      { value: 'editorial', label: 'Editorial' },
    ],
  },
  {
    key: 'whyTilt',
    title: 'Kartu ungu (layout editorial)',
    options: [
      { value: 'tilted', label: 'Miring' },
      { value: 'straight', label: 'Lurus' },
    ],
  },
  {
    key: 'whyPanel',
    title: 'Section "Terjangkau, bukan asal-asalan..."',
    options: [
      { value: 'hidden', label: 'Sembunyikan' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const LEARN_GROUPS = [
  {
    key: 'learnLayout',
    title: 'Layout Cara belajar',
    options: [
      { value: 'original', label: 'Original' },
      { value: 'columns', label: '4 kolom' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const WORKS_GROUPS = [
  {
    key: 'worksSection',
    title: 'Section "Karya peserta dari tiap program"',
    options: [
      { value: 'hidden', label: 'Sembunyikan' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const SECTION_VISIBILITY_GROUPS = [
  {
    key: 'mentorSection',
    title: 'Section Mentor',
    options: [
      { value: 'hidden', label: 'Sembunyikan' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
  {
    key: 'faqSection',
    title: 'Section FAQ',
    options: [
      { value: 'hidden', label: 'Sembunyikan' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const END_GROUPS = [
  {
    key: 'endLayout',
    title: 'Layout CTA dan footer',
    options: [
      { value: 'original', label: 'Original' },
      { value: 'sheet', label: 'Lembar' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const WHAT_IS_GROUPS = [
  {
    key: 'whatIs',
    title: 'Section "scareer itu apa" (di bawah hero)',
    options: [
      { value: 'hidden', label: 'Sembunyikan' },
      { value: 'definition', label: 'Definisi + 3 poin' },
      { value: 'sentence', label: 'Kalimat isian' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PROBLEM_GROUPS = [
  {
    key: 'problem',
    title: 'Section masalah (di bawah Kenapa scareer)',
    options: [
      { value: 'hidden', label: 'Sembunyikan' },
      { value: 'loop', label: 'Lingkaran' },
      { value: 'sides', label: 'Dua sisi' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const ORDER_GROUPS = [
  {
    key: 'pageOrder',
    title: 'Urutan halaman',
    options: [
      { value: 'story', label: 'Cerita (Program di bawah Masalah)' },
      { value: 'previous', label: 'Sebelumnya (Program di atas)' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const ALL_GROUPS: readonly TweakGroup<keyof Tweaks>[] = [
  ...HERO_GROUPS,
  ...NAV_GROUPS,
  ...PROGRAM_GROUPS,
  ...WHY_GROUPS,
  ...LEARN_GROUPS,
  ...WORKS_GROUPS,
  ...SECTION_VISIBILITY_GROUPS,
  ...END_GROUPS,
  ...WHAT_IS_GROUPS,
  ...PROBLEM_GROUPS,
  ...ORDER_GROUPS,
] as never
