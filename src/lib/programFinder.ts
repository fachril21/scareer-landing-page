import type { ProgramField } from '../content/content'

/**
 * Pencocokan profil singkat ke program, murni di browser dan berbasis kata kunci (bukan AI).
 * Dipakai kotak "Cari program yang cocok" (tweak). Bobot di sini asumsi awal untuk dikoreksi tim.
 */
export type FinderField = ProgramField
export type CriterionKind = 'background' | 'interest' | 'goal'

export const KIND_LABEL: Readonly<Record<CriterionKind, string>> = {
  background: 'Latar',
  interest: 'Minat',
  goal: 'Tujuan',
}

const KINDS: readonly CriterionKind[] = ['background', 'interest', 'goal']

interface Rule {
  kind: CriterionKind
  label: string
  pattern: RegExp
  weights: Readonly<Partial<Record<FinderField, number>>>
}

const RULES: readonly Rule[] = [
  // Latar belakang (jurusan)
  { kind: 'background', label: 'Ekonomi', pattern: /ekonomi|keuangan|perbankan/i, weights: { 'Data Analyst': 0.3 } },
  { kind: 'background', label: 'Statistik atau matematika', pattern: /statistik|matematika|sains data|fisika/i, weights: { 'Data Analyst': 1 } },
  { kind: 'background', label: 'Informatika', pattern: /informatika|ilmu komputer|sistem informasi|teknik komputer|\bti\b/i, weights: { 'Cyber Security': 1, 'Data Analyst': 0.6 } },

  // Minat
  { kind: 'interest', label: 'Angka dan laporan', pattern: /angka|hitung|teliti|laporan keuangan|pajak|pembukuan/i, weights: { 'Data Analyst': 0.3 } },
  { kind: 'interest', label: 'Data dan analisis', pattern: /\bdata\b|analisis|analitik|dashboard|excel|riset|visualisasi/i, weights: { 'Data Analyst': 1 } },
  { kind: 'interest', label: 'Keamanan jaringan', pattern: /keamanan|security|siber|cyber|hack|jaringan|bug/i, weights: { 'Cyber Security': 1 } },

  // Tujuan kerja
  { kind: 'goal', label: 'Agensi atau startup', pattern: /agensi|agency|startup|e-?commerce|marketplace/i, weights: { 'Data Analyst': 0.4 } },
  { kind: 'goal', label: 'Perusahaan teknologi', pattern: /perusahaan teknologi|perusahaan it|software house|\btech\b/i, weights: { 'Cyber Security': 0.8, 'Data Analyst': 0.8 } },
]

export interface Signal {
  kind: CriterionKind
  label: string
}

export interface Match {
  field: FinderField
  /** Jumlah kriteria (latar, minat, tujuan) yang cocok, 0 sampai 3. */
  matched: number
  score: number
  reasons: readonly Signal[]
}

export interface FinderResult {
  signals: readonly Signal[]
  /** Program yang punya sedikitnya satu kecocokan, dari yang paling cocok. */
  matches: readonly Match[]
}

const FIELDS: readonly FinderField[] = ['Data Analyst', 'Cyber Security']

/** Contoh profil untuk tombol refresh. Semua buatan, tanpa nama atau lembaga nyata. */
export const FINDER_EXAMPLES: readonly string[] = [
  'Lulusan Teknik Informatika, penasaran soal keamanan jaringan, pengen kerja di perusahaan teknologi',
  'Lulusan Statistik, suka olah data dan bikin dashboard, pengen kerja di startup',
  'Lulusan Ekonomi, suka analisis laporan keuangan, pengen kerja di perusahaan fintech',
]

export function analyze(text: string): FinderResult {
  const hits = RULES.filter((rule) => rule.pattern.test(text))
  const signals: Signal[] = hits.map(({ kind, label }) => ({ kind, label }))

  const matches = FIELDS.flatMap((field): Match[] => {
    const reasons: Signal[] = []
    let score = 0
    for (const kind of KINDS) {
      const best = hits
        .filter((rule) => rule.kind === kind && (rule.weights[field] ?? 0) > 0)
        .sort((a, b) => (b.weights[field] ?? 0) - (a.weights[field] ?? 0))[0]
      if (!best) continue
      score += best.weights[field] ?? 0
      reasons.push({ kind, label: best.label })
    }
    return reasons.length > 0 ? [{ field, matched: reasons.length, score, reasons }] : []
  })

  // sort stabil: urutan FIELDS menjadi pemutus seri
  const ranked = [...matches].sort((a, b) => b.score - a.score || b.matched - a.matched)
  return { signals, matches: ranked }
}
