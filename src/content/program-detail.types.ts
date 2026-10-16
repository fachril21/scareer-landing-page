/**
 * Model data halaman detail program (brief bab 8). Satu objek per program, dibaca semua section.
 * Butir yang datanya belum ada dihapus dari halaman produksi, bukan diisi tanda strip.
 */
import type { FaqItem, Program } from './content'

export type ToolLevel = 'Dasar' | 'Menengah'
export type SkillKind = 'hard' | 'soft'
export type BatchStatus = 'dibuka' | 'segera' | 'hampir-penuh' | 'penuh'

export interface Source {
  label: string
  year: number
  url: string
}

export interface ProblemAgitateSolution {
  statement: readonly { text: string; mark?: boolean }[]
  problem: { title: string; body: string }
  agitate: { title: string; body: string }
  solution: { title: string; body: string }
  /** Opsional. Tanpa sumber terverifikasi, baris statistik tidak dirender. */
  statistic?: { text: string; source: Source }
}

export interface WhyItem {
  title: string
  body: string
  /** Menggulung ke section lain di halaman yang sama. */
  link?: { label: string; sectionId: string }
  /** Klaim relevansi bidang wajib bersumber. Butir dengan `requiresSource` tanpa `source` tidak ditampilkan. */
  requiresSource?: boolean
  source?: Source
}

export interface CurriculumModule {
  id: string
  name: string
  duration: string
  sessions: string
  topics: readonly string[]
  toolIds: readonly string[]
  output: string
  /** Modul yang menghasilkan proyek portofolio. */
  isProject: boolean
}

export interface Syllabus {
  fileName: string
  /** Contoh: "1,2 MB". */
  size: string
  updated: string
  href: string
}

export interface Tool {
  id: string
  name: string
  category: string
  purpose: string
  level: ToolLevel
  moduleIds: readonly string[]
  /** Kunci ikon generik (Lucide). Tidak memakai logo merek. */
  /** Singkatan 1 sampai 3 huruf untuk monogram di layout ubin (bukan logo merek). */
  abbr: string
  icon: 'code' | 'layout' | 'database' | 'chart' | 'pen' | 'git' | 'terminal' | 'users'
}

export interface Skill {
  skill: string
  kind: SkillKind
  proof: string
  output: string
  moduleId?: string
}

export interface TakeHome {
  title: string
  body: string
}

export interface ProgramMentor {
  name: string
  role: string
  company: string
  experience: string
  field: string
  roleInProgram: string
  /** Persetujuan tampil. Mentor tanpa izin tidak dirender. */
  consent: boolean
  /** Dua mentor unggulan memakai potret besar, sisanya kartu kecil. */
  featured: boolean
  photo?: 'mentor-1' | 'mentor-2'
  /** Kutipan mentor. Hanya kutipan asli yang boleh tampil; draf wajib berlabel contoh. */
  quote?: string
}

export interface MentorAccess {
  liveSessions: string
  reviews: string
  oneOnOne: string
  ratio: string
  /** Bentuk dan frekuensi bimbingan, untuk layout sorotan mentor. */
  form: string
  frequency: string
}

export interface JourneyPhase {
  name: string
  duration: string
  summary: string
}

export interface Batch {
  id: string
  name: string
  /** Tanggal ISO (YYYY-MM-DD). `null` selama masih `[ISI]`. */
  startsOn: string | null
  startLabel: string
  schedule: string
  format: string
  location?: string
  quota: string
  status: BatchStatus
}

export interface PortfolioItem {
  image: string
  title: string
  role: string
  tools: readonly string[]
  summary: string
  /** Label jujur: "Dikerjakan peserta batch [ISI]" atau "Contoh dari tim mentor". */
  label: string
  href?: string
}

export interface Persona {
  name: string
  fits: readonly string[]
  notFits: readonly string[]
  /** Pesan awal WhatsApp dari chip tanya cepat. */
  quickQuestion: string
}

export interface SpecRow {
  key: string
  label: string
  value: string
  /** Menaut ke butir FAQ yang menjelaskan. */
  faqId?: string
}

export interface ProgramDetail extends Program {
  summary: string
  language: string
  hoursPerWeek: string
  device: string
  prerequisite: string
  quota: string
  certificate: string
  materialAccess: string
  hero: { photo: string; lead: string }
  pas: ProblemAgitateSolution
  whyBento: WhyBento
  whyBrand: readonly WhyItem[]
  whyProgram: readonly WhyItem[]
  curriculum: {
    stats: { modules: string; weeks: string; projects: string; hoursPerWeek: string }
    /** Tiga angka ringkasan di layout timeline. `suffix` kosong untuk nilai yang masih [ISI]. */
    overview: readonly { value: string; suffix: string; label: string }[]
    syllabus: Syllabus
    modules: readonly CurriculumModule[]
  }
  tools: readonly Tool[]
  toolCategories: readonly string[]
  skills: readonly Skill[]
  takeHome: readonly TakeHome[]
  mentors: readonly ProgramMentor[]
  mentorAccess: MentorAccess
  journey: readonly JourneyPhase[]
  batches: readonly Batch[]
  portfolio: readonly PortfolioItem[]
  specs: readonly SpecRow[]
  personas: readonly Persona[]
  /** Yang termasuk dalam harga mulai dari ±Rp3 juta. */
  includes: readonly string[]
  /** Paket harga untuk layout dua paket. */
  plans: readonly PricingPlan[]
  /** Baris tabel "Bandingkan program": satu nilai per paket, urutan sama dengan `plans`. */
  planCompare: readonly PlanCompareRow[]
  refundPolicy: string
  faq: readonly FaqItem[]
}

export interface PricingPlan {
  id: string
  name: string
  /** Harga mulai per paket, mis. "Rp [ISI]". */
  price: string
  audience: string
  /** Butir yang termasuk di paket. */
  includes: readonly string[]
  /** Butir yang tidak termasuk, ditulis jujur. */
  excludes: string
}

export interface PlanCompareRow {
  label: string
  values: readonly string[]
}

export interface ChatLine {
  from: 'visitor' | 'team'
  text: string
}

/** Isi layout bento "Kenapa kami". */
export interface WhyBento {
  title: string
  /** Baris kedua judul, disorot stabilo kuning. */
  accent: string
  chat: { title: string; body: string; label: string; lines: readonly ChatLine[] }
  dibimbing: { title: string; body: string }
  affordable: { title: string; reducedLabel: string; reduced: string; keptLabel: string; kept: string }
  promise: { title: string; body: string }
  reasonsTitle: string
  reasons: readonly { title: string; body: string }[]
}
