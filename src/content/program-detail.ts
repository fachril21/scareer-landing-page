/**
 * Data halaman detail program. Semua fakta yang belum dikonfirmasi tetap `[ISI]`.
 * Teks bertanda "draf" hanya contoh agar struktur terlihat; final dari tim.
 *
 * Nama, durasi, format, level, dan harga mulai dibaca dari `PROGRAMS` (content.ts) supaya satu fakta
 * hanya punya satu sumber. Keempat program memakai kerangka lengkap yang sama sampai tim mengisi datanya.
 */
import { PROGRAMS, type FaqItem, type Program } from './content'
import type {
  Batch,
  CurriculumModule,
  ProgramDetail,
  ProgramMentor,
  Skill,
  Tool,
} from './program-detail.types'

const ISI = '[ISI]'
const FAQ_PENDING = '[ISI] Jawaban resmi dari tim, maksimal 60 kata.'

const TOOL_CATEGORIES = ['Kategori A', 'Kategori B', 'Kategori C'] as const
const TOOL_ICONS: Tool['icon'][] = ['code', 'layout', 'database', 'chart', 'pen', 'git', 'terminal', 'users']

const MODULES: readonly CurriculumModule[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: `modul-${n}`,
  name: `Modul ${n} [ISI]`,
  duration: '[ISI] minggu',
  sessions: '[ISI] pertemuan',
  topics: [`Topik ${n}.1 [ISI]`, `Topik ${n}.2 [ISI]`, `Topik ${n}.3 [ISI]`, `Topik ${n}.4 [ISI]`],
  toolIds: [`tool-${n}`, `tool-${n + 1}`],
  output: `Output modul ${n} [ISI]`,
  isProject: n === 3 || n === 6,
}))

const TOOLS: readonly Tool[] = TOOL_ICONS.map((icon, i) => ({
  id: `tool-${i + 1}`,
  name: `Nama tool ${i + 1}`,
  category: TOOL_CATEGORIES[i % TOOL_CATEGORIES.length],
  purpose: 'Dipakai untuk [ISI]',
  level: i % 3 === 2 ? 'Menengah' : 'Dasar',
  moduleIds: [`modul-${Math.min(i + 1, 6)}`],
  icon,
}))

const SKILLS: readonly Skill[] = [
  { skill: 'Skill [ISI] 1', kind: 'hard', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]', moduleId: 'modul-2' },
  { skill: 'Skill [ISI] 2', kind: 'hard', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]', moduleId: 'modul-3' },
  { skill: 'Skill [ISI] 3', kind: 'hard', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]', moduleId: 'modul-5' },
  { skill: 'Skill [ISI] 4', kind: 'soft', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]' },
  { skill: 'Skill [ISI] 5', kind: 'soft', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]' },
]

const MENTORS: readonly ProgramMentor[] = [
  // consent: true hanya untuk prototype. Di produksi diisi dari persetujuan tertulis tiap mentor.
  { name: 'Nama mentor [ISI]', role: 'Peran [ISI]', company: 'Perusahaan [ISI]', experience: ISI, field: ISI, roleInProgram: 'Peran di program [ISI]', consent: true, featured: true, photo: 'mentor-1' },
  { name: 'Nama mentor [ISI]', role: 'Peran [ISI]', company: 'Perusahaan [ISI]', experience: ISI, field: ISI, roleInProgram: 'Peran di program [ISI]', consent: true, featured: true, photo: 'mentor-2' },
  ...[1, 2, 3, 4].map((n) => ({
    name: `Mentor ${n} [ISI]`,
    role: 'Peran [ISI]',
    company: 'Perusahaan [ISI]',
    experience: ISI,
    field: ISI,
    roleInProgram: 'Peran di program [ISI]',
    consent: true,
    featured: false,
  })),
]

const BATCHES: readonly Batch[] = [
  { id: 'batch-1', name: 'Batch [ISI]', startsOn: null, startLabel: '[tanggal ISI]', schedule: ISI, format: ISI, quota: ISI, status: 'dibuka' },
  { id: 'batch-2', name: 'Batch [ISI]', startsOn: null, startLabel: '[tanggal ISI]', schedule: ISI, format: ISI, quota: ISI, status: 'segera' },
  { id: 'batch-3', name: 'Batch [ISI]', startsOn: null, startLabel: '[tanggal ISI]', schedule: ISI, format: ISI, quota: ISI, status: 'segera' },
]

const INCLUDES: readonly string[] = [
  'Video belajar yang bisa ditonton kapan saja [ISI]',
  'Kelas live Zoom bareng mentor [ISI]',
  'Program internship di dunia kerja nyata [ISI]',
  'Yang termasuk lainnya [ISI]',
]

const FAQ_ITEMS: readonly FaqItem[] = [
  { id: 'pengalaman', question: 'Apakah perlu pengalaman atau latar belakang tertentu?', answer: FAQ_PENDING },
  { id: 'laptop', question: 'Spesifikasi laptop yang dibutuhkan?', answer: FAQ_PENDING },
  { id: 'refund', question: 'Bagaimana kebijakan refund dan pindah batch?', answer: FAQ_PENDING },
  {
    id: 'jaminan-kerja',
    question: 'Apakah ada jaminan kerja?',
    answer: 'Nggak. Kami nggak menjanjikan pekerjaan tetap. Yang kami janjikan: skill yang dipakai industri dan panggung untuk membuktikan kemampuanmu lewat internship.',
  },
  { id: 'cara-daftar', question: 'Bagaimana cara daftar dan bayar?', answer: FAQ_PENDING },
]

function buildDetail(base: Program): ProgramDetail {
  return {
    ...base,
    summary: 'Belajar [bidang] lewat video dan kelas live Zoom, lalu praktik langsung lewat internship. [ISI] Draf subhead dari tim.',
    language: ISI,
    hoursPerWeek: '[ISI] jam',
    device: ISI,
    prerequisite: ISI,
    quota: ISI,
    certificate: ISI,
    materialAccess: ISI,
    hero: { photo: base.image, lead: 'Belajar dari dasar bareng mentor, lalu praktik langsung lewat internship. Mulai dari ±Rp3 juta.' },
    pas: {
      statement: [
        { text: 'Lowongan bilang fresh graduate welcome, tapi syaratnya ' },
        { text: 'pengalaman', mark: true },
        { text: ' dan ' },
        { text: 'portofolio', mark: true },
        { text: '. Di sini kamu belajar sambil membuatnya.' },
      ],
      problem: { title: 'Masalah konkret di bidang ini', body: 'Lowongan [posisi] bilang fresh graduate welcome, tapi syaratnya pengalaman 2 tahun. [ISI] Draf, perlu dikonfirmasi tim.' },
      agitate: { title: 'Akibatnya kalau dibiarkan', body: 'Belajar sendiri dari tutorial, tapi nggak tahu arahnya benar atau nggak. Portofolio kosong, CV pun terasa kosong. [ISI] Draf.' },
      solution: { title: 'Cara program ini membantu', body: 'Belajar bareng mentor, lalu praktik langsung lewat internship. [ISI] Perlu dikonfirmasi tim.' },
    },
    whyBrand: [
      { title: 'Kakak tingkat, bukan institusi', body: 'Kami bicara dari samping: jujur soal susahnya cari kerja dan selalu bilang ayo, aku bantu mulai.' },
      { title: 'Supported by Dibimbing', body: 'Didukung jaringan mitra internship ekosistem Dibimbing. Peran Dibimbing yang benar-benar ada di program ini: [ISI].' },
      { title: 'Yang nggak kami janjikan', body: 'Kami nggak janji kamu langsung kerja. Tapi kami pastikan kamu punya pengalaman nyata untuk ditunjukkan lewat internship.' },
    ],
    whyProgram: [
      { title: 'Belajar lewat proyek', body: '[ISI] proyek, jenisnya [ISI].' },
      { title: 'Tools yang dipakai di industri', body: '[ISI] Daftar tools dari tim.', link: { label: 'Lihat tools', sectionId: 'tools' } },
      { title: 'Mentor praktisi aktif', body: '[ISI] Latar belakang mentor dari tim.', link: { label: 'Lihat mentor', sectionId: 'mentor' } },
    ],
    curriculum: {
      stats: { modules: `${MODULES.length} modul`, weeks: '[ISI] minggu', projects: '[ISI] proyek', hoursPerWeek: '[ISI] jam per minggu' },
      syllabus: { fileName: `Silabus ${base.name}`, size: '[ukuran file]', updated: 'diperbarui [ISI]', href: '/files/silabus-contoh.pdf' },
      modules: MODULES,
    },
    tools: TOOLS,
    toolCategories: TOOL_CATEGORIES,
    skills: SKILLS,
    takeHome: [
      { title: 'Portofolio', body: '[ISI] proyek yang bisa kamu tunjukkan.' },
      { title: 'Sertifikat [ISI]', body: 'Hanya jika ada, dengan syarat yang jelas.' },
      { title: 'Review CV [ISI]', body: 'Bentuk dan batasnya dari tim.' },
      { title: 'Akses materi [ISI]', body: 'Berapa lama dan apa saja dari tim.' },
    ],
    mentors: MENTORS,
    mentorAccess: { liveSessions: '[ISI] sesi', reviews: '[ISI]', oneOnOne: '[ISI]', ratio: '[ISI]' },
    journey: [
      { name: 'Persiapan [ISI]', duration: '[ISI] minggu', summary: 'Ringkasan fase satu baris [ISI].' },
      { name: 'Belajar inti dan proyek [ISI]', duration: '[ISI] minggu', summary: 'Ringkasan fase satu baris [ISI].' },
      { name: 'Portofolio dan persiapan karier [ISI]', duration: '[ISI] minggu', summary: 'Ringkasan fase satu baris [ISI].' },
    ],
    batches: BATCHES,
    portfolio: [1, 2, 3, 4, 5].map((n) => ({
      image: `work-${n}`,
      title: `Proyek ${n} [ISI]`,
      role: 'Peran peserta [ISI]',
      tools: ['Tool A', 'Tool B'],
      summary: 'Ringkasan satu kalimat tentang proyek ini [ISI].',
      label: 'Contoh dari tim mentor',
    })),
    specs: [
      { key: 'level', label: 'Level', value: base.level },
      { key: 'durasi', label: 'Durasi total', value: base.duration },
      { key: 'jam', label: 'Waktu belajar per minggu', value: '[ISI] jam' },
      { key: 'format', label: 'Format', value: base.format },
      { key: 'bahasa', label: 'Bahasa pengantar', value: ISI },
      { key: 'perangkat', label: 'Perangkat minimum', value: ISI, faqId: 'laptop' },
      { key: 'prasyarat', label: 'Prasyarat', value: ISI, faqId: 'pengalaman' },
      { key: 'akses', label: 'Akses materi dan rekaman', value: ISI },
      { key: 'sertifikat', label: 'Sertifikat', value: ISI },
      { key: 'kuota', label: 'Kuota per batch', value: ISI },
    ],
    personas: ['Fresh graduate', 'Career switcher', 'Pemula tanpa latar belakang'].map((name) => ({
      name,
      fits: ['Cocok kalau kamu [ISI]', 'Cocok kalau kamu [ISI]'],
      notFits: ['Mungkin belum cocok kalau kamu [ISI]'],
      quickQuestion: `Aku ${name.toLowerCase()}, cocok nggak?`,
    })),
    includes: INCLUDES,
    refundPolicy: '[ISI] Kebijakan pengembalian dana atau pindah batch, dituliskan dalam bahasa sederhana oleh tim.',
    faq: FAQ_ITEMS,
  }
}

const DETAILS: ReadonlyMap<string, ProgramDetail> = new Map(PROGRAMS.map((p) => [p.slug, buildDetail(p)]))

export function getProgram(slug: string): ProgramDetail | null {
  return DETAILS.get(slug) ?? null
}

/** Batch yang belum lewat. Batch bertanggal `null` (masih [ISI]) selalu dianggap aktif. */
export function upcomingBatches(batches: readonly Batch[], today: Date = new Date()): readonly Batch[] {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
  return batches.filter((b) => b.startsOn === null || new Date(b.startsOn).getTime() >= startOfToday)
}
