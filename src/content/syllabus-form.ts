/** Teks dan opsi form unduh silabus. Mode prototype: data tidak disimpan ke mana pun (lihat lib/leads.ts). */

export const SYLLABUS_STATUS_OPTIONS = [
  'Mahasiswa',
  'Fresh graduate/sedang mencari kerja',
  'Ingin pindah karier (career switcher)',
  'Bekerja',
  'Lainnya',
] as const

export type SyllabusStatus = (typeof SYLLABUS_STATUS_OPTIONS)[number]

export const SYLLABUS_FORM = {
  intro: 'Isi data singkat dulu, lalu silabus langsung terunduh.',
  introDirect: 'Unduh langsung, tanpa daftar.',
  /** Pemberitahuan pemakaian data: teks resmi menunggu kebijakan privasi dari tim. */
  notice: '[ISI: pemakaian data sesuai kebijakan privasi]',
  success: 'Silabusmu mulai terunduh. Kalau belum mulai, pakai tautan di bawah.',
} as const
