/** 12 section halaman detail program (brief bab 5), urutan tetap. Satu sumber untuk halaman dan daftar isi. */
export type SectionTone = 'surface' | 'paper' | 'ink'

export interface ProgramSection {
  id: string
  /** Nama pendek di daftar isi (maksimal dua kata). */
  tocLabel: string
  title: string
  tone: SectionTone
}

export const PROGRAM_SECTIONS: readonly ProgramSection[] = [
  { id: 'ringkasan', tocLabel: 'Ringkasan', title: 'Ringkasan program', tone: 'surface' },
  { id: 'masalah-solusi', tocLabel: 'Masalah dan solusi', title: 'Masalah dan solusi', tone: 'paper' },
  { id: 'kenapa-kami', tocLabel: 'Kenapa kami', title: 'Kenapa Scareer, dan kenapa program ini', tone: 'ink' },
  { id: 'kurikulum', tocLabel: 'Kurikulum', title: 'Yang kamu pelajari, modul demi modul', tone: 'surface' },
  { id: 'tools', tocLabel: 'Tools', title: 'Alat yang kamu pakai selama belajar', tone: 'paper' },
  { id: 'skill-output', tocLabel: 'Skill dan output', title: 'Setelah selesai, kamu bisa apa dan bawa pulang apa', tone: 'surface' },
  { id: 'mentor', tocLabel: 'Mentor', title: 'Dibimbing langsung oleh praktisi di bidangnya', tone: 'paper' },
  { id: 'jadwal', tocLabel: 'Jadwal', title: 'Perjalanan belajarmu dan jadwal batch', tone: 'surface' },
  { id: 'karya', tocLabel: 'Karya', title: 'Karya yang dibuat di program ini', tone: 'ink' },
  { id: 'detail-program', tocLabel: 'Detail program', title: 'Detail program, dan apakah ini cocok untukmu', tone: 'paper' },
  { id: 'harga', tocLabel: 'Harga', title: 'Mulai dari ±Rp3 juta, tanpa kejutan', tone: 'surface' },
  { id: 'faq', tocLabel: 'FAQ', title: 'Pertanyaan tentang program ini', tone: 'paper' },
]

/* ---------- Daftar isi halaman (brief bab 6): 12 item dalam 4 grup ---------- */

export interface TocChild {
  /** Id elemen pembungkus anak section di dalam section induk. */
  id: string
  label: string
}

export interface TocItem {
  id: string
  label: string
  children?: readonly TocChild[]
}

export interface TocGroup {
  label: string
  items: readonly TocItem[]
}

const label = (id: string) => PROGRAM_SECTIONS.find((s) => s.id === id)?.tocLabel ?? id
const item = (id: string, children?: readonly TocChild[]): TocItem => ({ id, label: label(id), children })

export const PROGRAM_TOC: readonly TocGroup[] = [
  {
    label: 'Kenali',
    items: [
      item('ringkasan'),
      item('masalah-solusi'),
      item('kenapa-kami', [
        { id: 'kenapa-brand', label: 'Kenapa Scareer' },
        { id: 'kenapa-program', label: 'Kenapa program ini' },
      ]),
    ],
  },
  { label: 'Isi program', items: [item('kurikulum'), item('tools'), item('skill-output'), item('mentor')] },
  { label: 'Jalani', items: [item('jadwal'), item('karya'), item('detail-program', [{ id: 'untuk-siapa', label: 'Untuk siapa' }])] },
  { label: 'Daftar', items: [item('harga'), item('faq')] },
]

/** Id anak -> id section induk. */
export const TOC_PARENT: Readonly<Record<string, string>> = Object.fromEntries(
  PROGRAM_TOC.flatMap((g) => g.items.flatMap((it) => (it.children ?? []).map((c) => [c.id, it.id] as const))),
)
