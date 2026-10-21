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
  heroLayout: 'original' | 'centered' | 'vibrant-stage' | 'vibrant-poster'
  wordSet: 'tuntutan' | 'jawaban' | 'santai'
  wordStyle: 'ungu' | 'stabilo' | 'lavender'
  wordLoop: 'infinite' | 'three'
  navStyle: 'original' | 'floating'
  navTop: 'overlay' | 'bar'
  /** Dropdown Program di navbar: daftar teks, atau kartu berikon. */
  programMenu: 'list' | 'cards'
  navBlur: 'low' | 'mid' | 'high'
  navWidth: 'compact' | 'wide'
  programLayout: 'grid' | 'carousel'
  whyLayout: 'original' | 'editorial'
  whyTilt: 'tilted' | 'straight'
  /** Homepage Kenapa scareer (layout editorial): kartu kutipan, atau foto dengan ornamen. */
  whyCard: 'quote' | 'photo'
  whyPanel: 'hidden' | 'shown'
  /** Homepage Kenapa scareer (layout editorial): tiga pilar polos, atau kartu berwarna dengan ikon. */
  whyPillars: 'plain' | 'cards'
  learnLayout: 'original' | 'columns' | 'timeline'
  worksSection: 'hidden' | 'shown'
  mentorSection: 'hidden' | 'shown'
  faqSection: 'hidden' | 'shown'
  endLayout: 'original' | 'sheet'
  whatIs: 'hidden' | 'definition' | 'sentence'
  problem: 'hidden' | 'square' | 'cycle' | 'loop' | 'sides'
  pageOrder: 'story' | 'previous'
  /** Homepage: lapisan gerak (reveal bervariasi, progres scroll, efek kursor). Dasar = fade-up lama. */
  motion: 'basic' | 'interactive'
  /** Homepage Hero: kartu lowongan statis, atau bisa diganti contoh lowongan lain lewat tombol refresh. */
  heroJobs: 'static' | 'refresh'
  /** Hero vibrant panggung: kartu lowongan menimpa tepi foto (isinya mengikuti `heroJobs`). */
  vibrantJobCard: 'off' | 'on'
  /** Homepage Program: kotak "Cari program yang cocok" (profil mengetik sendiri, chip, rekomendasi). */
  programFinder: 'off' | 'on'
  /** Halaman detail bootcamp: section Harga. */
  pricingLayout: 'original' | 'tiers' | 'glass' | 'aligned' | 'aligned-light' | 'table'
  /** Halaman detail bootcamp: hero. */
  programHeroLayout: 'original' | 'split'
  /** Halaman detail bootcamp: gerak hero Terbelah (masuk berurutan, miring ke kursor, hover baris ringkasan). */
  programHeroMotion: 'still' | 'live'
  /** Halaman detail bootcamp: section Kenapa kami. */
  whyUsLayout: 'original' | 'bento'
  /** Halaman detail bootcamp: section Kurikulum. */
  curriculumLayout: 'original' | 'timeline'
  /** Halaman detail bootcamp: tombol unduh silabus. */
  syllabusGate: 'direct' | 'form'
  /** Halaman detail bootcamp: section Tools. */
  toolsLayout: 'original' | 'tiles'
  /** Halaman detail bootcamp: section Mentor. */
  mentorLayout: 'original' | 'spotlight'
  /** Halaman detail bootcamp: fase tujuan akhir di section Jadwal. */
  journeyGoal: 'plain' | 'highlight'
  /** Halaman detail bootcamp: tabel "Batch yang sedang dibuka" di section Jadwal. */
  journeyBatches: 'hidden' | 'shown'
  /** Halaman detail bootcamp: section Karya. Kartu terbuka semua, atau akordeon yang membuka saat hover. */
  programWorksLayout: 'accordion' | 'cards'
  /** Halaman detail bootcamp: tabel spesifikasi (level, durasi, bahasa, prasyarat, dst.) di section Untuk siapa. */
  programSpecs: 'hidden' | 'shown'
  /** Halaman detail bootcamp: judul "Program ini untuk siapa" di atas tiga persona. */
  personasHeading: 'hidden' | 'shown'
  /** Halaman detail bootcamp: blok "Kenapa program ini" di section Kenapa kami (juga hilang dari daftar isi). */
  programReasons: 'hidden' | 'shown'
  /** Halaman detail bootcamp: section FAQ. */
  faqLayout: 'original' | 'cards'
  /** Halaman detail bootcamp: CTA penutup di atas footer (hanya dengan footer Lembar). */
  programCta: 'hidden' | 'shown'
  /** Halaman detail bootcamp: section Masalah dan solusi (juga hilang dari daftar isi). */
  programProblem: 'hidden' | 'shown'
  /** Halaman detail bootcamp: kolom "Output yang dibawa pulang" di tabel Skill dan output. */
  skillsOutputColumn: 'hidden' | 'shown'
  /** Halaman detail bootcamp: skill ditampilkan sebagai tabel atau kartu ringkas. */
  skillsLayout: 'table' | 'cards'
  /** Halaman detail bootcamp: daftar isi di gutter kiri (sidebar dan rail). */
  navContainer: 'plain' | 'boxed'
}

/** Halaman yang punya panel tweak sendiri. Pilihan di satu halaman tidak menyentuh halaman lain, kecuali grup bersama. */
export type TweakScope = 'home' | 'detail'

/** Bawaan = desain baru yang sudah disetujui. Pilihan "Original" di panel tetap menampilkan tampilan lama. */
export const DEFAULT_TWEAKS: Tweaks = {
  heroLayout: 'vibrant-stage',
  wordSet: 'tuntutan',
  wordStyle: 'ungu',
  wordLoop: 'infinite',
  navStyle: 'floating',
  navTop: 'bar',
  programMenu: 'cards',
  navBlur: 'mid',
  navWidth: 'compact',
  programLayout: 'carousel',
  whyLayout: 'editorial',
  whyTilt: 'tilted',
  whyCard: 'photo',
  whyPanel: 'hidden',
  whyPillars: 'cards',
  learnLayout: 'timeline',
  worksSection: 'hidden',
  mentorSection: 'hidden',
  faqSection: 'hidden',
  endLayout: 'sheet',
  whatIs: 'hidden',
  problem: 'square',
  pageOrder: 'story',
  motion: 'interactive',
  heroJobs: 'refresh',
  vibrantJobCard: 'on',
  programFinder: 'off',
  pricingLayout: 'glass',
  programHeroLayout: 'split',
  programHeroMotion: 'live',
  whyUsLayout: 'bento',
  curriculumLayout: 'timeline',
  syllabusGate: 'form',
  toolsLayout: 'tiles',
  mentorLayout: 'spotlight',
  journeyGoal: 'highlight',
  journeyBatches: 'hidden',
  programWorksLayout: 'cards',
  programSpecs: 'hidden',
  personasHeading: 'hidden',
  programReasons: 'hidden',
  faqLayout: 'cards',
  programCta: 'shown',
  programProblem: 'hidden',
  skillsOutputColumn: 'hidden',
  skillsLayout: 'cards',
  navContainer: 'boxed',
}

export const HERO_GROUPS = [
  {
    key: 'heroLayout',
    title: 'Layout hero',
    options: [
      { value: 'original', label: 'Original' },
      { value: 'centered', label: 'Terpusat (bawaan)' },
      { value: 'vibrant-stage', label: 'Vibrant: panggung merah' },
      { value: 'vibrant-poster', label: 'Vibrant: poster' },
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
      { value: 'ungu', label: 'Teks merah' },
      { value: 'stabilo', label: 'Stabilo' },
      { value: 'lavender', label: 'Putih Tulang' },
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
  {
    key: 'heroJobs',
    title: 'Kartu lowongan di foto',
    options: [
      { value: 'static', label: 'Satu contoh (bawaan)' },
      { value: 'refresh', label: 'Bisa di-refresh (lowongan acak)' },
    ],
  },
  {
    key: 'vibrantJobCard',
    title: 'Kartu lowongan di hero vibrant panggung',
    options: [
      { value: 'off', label: 'Tanpa kartu (bawaan)' },
      { value: 'on', label: 'Tampilkan di tepi foto' },
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
    key: 'navTop',
    title: 'Navbar di puncak homepage',
    options: [
      { value: 'overlay', label: 'Transparan menimpa hero (lama)' },
      { value: 'bar', label: 'Bar putih terpisah (bawaan)' },
    ],
  },
  {
    key: 'programMenu',
    title: 'Dropdown Program',
    options: [
      { value: 'list', label: 'Daftar teks (lama)' },
      { value: 'cards', label: 'Kartu ikon (bawaan)' },
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
    key: 'programFinder',
    title: 'Kotak "Cari program yang cocok"',
    options: [
      { value: 'off', label: 'Sembunyikan (bawaan)' },
      { value: 'on', label: 'Tampilkan' },
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
    key: 'whyCard',
    title: 'Kartu di samping judul (layout editorial)',
    options: [
      { value: 'quote', label: 'Kutipan (lama)' },
      { value: 'photo', label: 'Foto + ornamen (bawaan)' },
    ],
  },
  {
    key: 'whyTilt',
    title: 'Kemiringan kartu kutipan (layout editorial)',
    options: [
      { value: 'tilted', label: 'Miring' },
      { value: 'straight', label: 'Lurus' },
    ],
  },
  {
    key: 'whyPillars',
    title: 'Tiga pilar (layout editorial)',
    options: [
      { value: 'plain', label: 'Polos (lama)' },
      { value: 'cards', label: 'Kartu berwarna + ikon (bawaan)' },
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
      { value: 'timeline', label: 'Garis waktu 3 langkah (bawaan)' },
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
      { value: 'square', label: 'Siklus persegi (bawaan)' },
      { value: 'cycle', label: 'Siklus lingkaran' },
      { value: 'loop', label: 'Garis lurus (lama)' },
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

export const MOTION_GROUPS = [
  {
    key: 'motion',
    title: 'Gerak halaman',
    options: [
      { value: 'basic', label: 'Dasar (fade-up)' },
      { value: 'interactive', label: 'Interaktif' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PRICING_GROUPS = [
  {
    key: 'pricingLayout',
    title: 'Layout Harga',
    options: [
      { value: 'original', label: 'Original (satu harga)' },
      { value: 'tiers', label: 'Dua paket + bandingkan' },
      { value: 'glass', label: 'Dua paket kaca + rekomendasi' },
      { value: 'aligned', label: 'Sejajar: sel gelap bergaris' },
      { value: 'aligned-light', label: 'Sejajar: sel terang bergaris' },
      { value: 'table', label: 'Sejajar: tabel perbandingan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PROGRAM_HERO_GROUPS = [
  {
    key: 'programHeroLayout',
    title: 'Layout hero',
    options: [
      { value: 'original', label: 'Original (foto lebar)' },
      { value: 'split', label: 'Terbelah + panel merah' },
    ],
  },
  {
    key: 'programHeroMotion',
    title: 'Gerak hero (layout Terbelah)',
    options: [
      { value: 'still', label: 'Diam (lama)' },
      { value: 'live', label: 'Hidup (bawaan)' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const WHY_US_GROUPS = [
  {
    key: 'whyUsLayout',
    title: 'Layout Kenapa kami',
    options: [
      { value: 'original', label: 'Original (sel bergaris)' },
      { value: 'bento', label: 'Bento + obrolan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const CURRICULUM_GROUPS = [
  {
    key: 'curriculumLayout',
    title: 'Layout Kurikulum',
    options: [
      { value: 'original', label: 'Original (tab + panel)' },
      { value: 'timeline', label: 'Timeline akordeon' },
    ],
  },
  {
    key: 'syllabusGate',
    title: 'Unduh silabus',
    options: [
      { value: 'direct', label: 'Langsung unduh' },
      { value: 'form', label: 'Form dulu (popup)' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const TOOLS_GROUPS = [
  {
    key: 'toolsLayout',
    title: 'Layout Tools',
    options: [
      { value: 'original', label: 'Original (sel + fade)' },
      { value: 'tiles', label: 'Ubin monogram + sorot' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const MENTOR_LAYOUT_GROUPS = [
  {
    key: 'mentorLayout',
    title: 'Layout Mentor',
    options: [
      { value: 'original', label: 'Original (kartu potret)' },
      { value: 'spotlight', label: 'Sorotan satu mentor' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const JOURNEY_GROUPS = [
  {
    key: 'journeyGoal',
    title: 'Fase tujuan akhir',
    options: [
      { value: 'plain', label: 'Sama seperti fase lain' },
      { value: 'highlight', label: 'Kotak pembeda (merah + pil kuning)' },
    ],
  },
  {
    key: 'journeyBatches',
    title: 'Batch yang sedang dibuka',
    options: [
      { value: 'hidden', label: 'Sembunyikan (bawaan)' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const FAQ_LAYOUT_GROUPS = [
  {
    key: 'faqLayout',
    title: 'Layout FAQ',
    options: [
      { value: 'original', label: 'Original (baris bergaris)' },
      { value: 'cards', label: 'Kartu + pil kategori' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PROGRAM_CTA_GROUPS = [
  {
    key: 'programCta',
    title: 'CTA penutup (footer Lembar)',
    options: [
      { value: 'hidden', label: 'Sembunyikan' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PROGRAM_PROBLEM_GROUPS = [
  {
    key: 'programProblem',
    title: 'Masalah dan solusi',
    options: [
      { value: 'hidden', label: 'Sembunyikan (bawaan)' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const SKILLS_OUTPUT_GROUPS = [
  {
    key: 'skillsLayout',
    title: 'Layout Skill',
    options: [
      { value: 'table', label: 'Tabel (lama)' },
      { value: 'cards', label: 'Kartu ringkas (bawaan)' },
    ],
  },
  {
    key: 'skillsOutputColumn',
    title: 'Kolom output di tabel Skill',
    options: [
      { value: 'hidden', label: 'Sembunyikan (bawaan)' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PROGRAM_WORKS_GROUPS = [
  {
    key: 'programWorksLayout',
    title: 'Layout Karya',
    options: [
      { value: 'accordion', label: 'Akordeon hover (lama)' },
      { value: 'cards', label: 'Semua terlihat (bawaan)' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PROGRAM_SPEC_GROUPS = [
  {
    key: 'programSpecs',
    title: 'Tabel spesifikasi (level, durasi, prasyarat, dst.)',
    options: [
      { value: 'hidden', label: 'Sembunyikan (bawaan)' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
  {
    key: 'personasHeading',
    title: 'Judul "Program ini untuk siapa"',
    options: [
      { value: 'hidden', label: 'Sembunyikan (bawaan)' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const PROGRAM_REASONS_GROUPS = [
  {
    key: 'programReasons',
    title: 'Blok "Kenapa program ini"',
    options: [
      { value: 'hidden', label: 'Sembunyikan (bawaan)' },
      { value: 'shown', label: 'Tampilkan' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

export const NAV_CONTAINER_GROUPS = [
  {
    key: 'navContainer',
    title: 'Daftar isi di kiri (layar lebar)',
    options: [
      { value: 'plain', label: 'Melayang tanpa latar' },
      { value: 'boxed', label: 'Dalam kontainer berlatar' },
    ],
  },
] as const satisfies readonly TweakGroup<keyof Tweaks>[]

type AnyGroups = readonly TweakGroup<keyof Tweaks>[]

/** Bagian panel per halaman, berurutan. Navbar serta CTA dan footer dipakai kedua halaman, jadi muncul di keduanya. */
export const SCOPE_SECTIONS: Readonly<Record<TweakScope, readonly { title: string; groups: AnyGroups }[]>> = {
  home: [
    { title: 'Struktur halaman', groups: ORDER_GROUPS as AnyGroups },
    { title: 'Gerak', groups: MOTION_GROUPS as AnyGroups },
    { title: 'Apa itu scareer', groups: WHAT_IS_GROUPS as AnyGroups },
    { title: 'Masalah', groups: PROBLEM_GROUPS as AnyGroups },
    { title: 'Hero', groups: HERO_GROUPS as AnyGroups },
    { title: 'Navbar (semua halaman)', groups: NAV_GROUPS as AnyGroups },
    { title: 'Program', groups: PROGRAM_GROUPS as AnyGroups },
    { title: 'Kenapa scareer', groups: WHY_GROUPS as AnyGroups },
    { title: 'Cara belajar', groups: LEARN_GROUPS as AnyGroups },
    { title: 'Karya', groups: WORKS_GROUPS as AnyGroups },
    { title: 'Mentor dan FAQ', groups: SECTION_VISIBILITY_GROUPS as AnyGroups },
    { title: 'CTA dan footer (semua halaman)', groups: END_GROUPS as AnyGroups },
  ],
  detail: [
    { title: 'Navigasi halaman', groups: NAV_CONTAINER_GROUPS as AnyGroups },
    { title: 'Hero', groups: PROGRAM_HERO_GROUPS as AnyGroups },
    { title: 'Masalah dan solusi', groups: PROGRAM_PROBLEM_GROUPS as AnyGroups },
    { title: 'Kenapa kami', groups: WHY_US_GROUPS as AnyGroups },
    { title: 'Kenapa program ini', groups: PROGRAM_REASONS_GROUPS as AnyGroups },
    { title: 'Kurikulum', groups: CURRICULUM_GROUPS as AnyGroups },
    { title: 'Tools', groups: TOOLS_GROUPS as AnyGroups },
    { title: 'Skill dan output', groups: SKILLS_OUTPUT_GROUPS as AnyGroups },
    { title: 'Mentor', groups: MENTOR_LAYOUT_GROUPS as AnyGroups },
    { title: 'Jadwal', groups: JOURNEY_GROUPS as AnyGroups },
    { title: 'Karya', groups: PROGRAM_WORKS_GROUPS as AnyGroups },
    { title: 'Untuk siapa', groups: PROGRAM_SPEC_GROUPS as AnyGroups },
    { title: 'FAQ', groups: FAQ_LAYOUT_GROUPS as AnyGroups },
    { title: 'CTA penutup', groups: PROGRAM_CTA_GROUPS as AnyGroups },
    { title: 'Harga', groups: PRICING_GROUPS as AnyGroups },
    { title: 'Navbar (semua halaman)', groups: NAV_GROUPS as AnyGroups },
    { title: 'Footer (semua halaman)', groups: END_GROUPS as AnyGroups },
  ],
}

/** Key tweak yang dikelola panel suatu halaman. */
export const scopeKeys = (scope: TweakScope): readonly (keyof Tweaks)[] =>
  SCOPE_SECTIONS[scope].flatMap((s) => s.groups.map((g) => g.key))

export const ALL_GROUPS: AnyGroups = [
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
  ...MOTION_GROUPS,
  ...PRICING_GROUPS,
  ...PROGRAM_HERO_GROUPS,
  ...PROGRAM_PROBLEM_GROUPS,
  ...WHY_US_GROUPS,
  ...PROGRAM_REASONS_GROUPS,
  ...CURRICULUM_GROUPS,
  ...TOOLS_GROUPS,
  ...SKILLS_OUTPUT_GROUPS,
  ...MENTOR_LAYOUT_GROUPS,
  ...JOURNEY_GROUPS,
  ...PROGRAM_WORKS_GROUPS,
  ...PROGRAM_SPEC_GROUPS,
  ...FAQ_LAYOUT_GROUPS,
  ...PROGRAM_CTA_GROUPS,
  ...NAV_CONTAINER_GROUPS,
] as never
