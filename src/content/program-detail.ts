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
  PlanCompareRow,
  WhyBento,
  PricingPlan,
  ProgramDetail,
  ProgramMentor,
  Skill,
  Tool,
} from './program-detail.types'

const ISI = '[ISI]'
const FAQ_PENDING = '[ISI] Jawaban resmi dari tim, maksimal 60 kata.'

const TOOL_CATEGORIES = ['Kategori A', 'Kategori B', 'Kategori C'] as const
const TOOL_ICONS: Tool['icon'][] = ['code', 'layout', 'database', 'chart', 'pen', 'git', 'terminal', 'users']

const MODULE_COUNT = 5

const MODULES: readonly CurriculumModule[] = Array.from({ length: MODULE_COUNT }, (_, i) => i + 1).map((n) => ({
  id: `modul-${n}`,
  name: `Modul ${n} [ISI]`,
  duration: 'Minggu [ISI]',
  sessions: '[ISI] pertemuan',
  topics: [`Topik ${n}.1 [ISI]`, `Topik ${n}.2 [ISI]`, `Topik ${n}.3 [ISI]`],
  toolIds: [`tool-${n}`, `tool-${n + 1}`],
  output: `[ISI] hasil modul ${n}`,
  isProject: n === 3 || n === 5,
}))

const OVERVIEW_PENDING = [
  { value: '[ISI]', suffix: '', label: 'minggu' },
  { value: '[ISI]', suffix: '', label: 'sesi' },
  { value: '[ISI]', suffix: '', label: 'jam belajar' },
] as const

/**
 * Draf kurikulum Data Analyst dari tim (modul 1 lengkap, modul 2 sampai 5 baru judul dan minggu).
 * Belum dikonfirmasi: perlu dicek tim sebelum rilis.
 */
const DATA_ANALYST_MODULES: readonly CurriculumModule[] = [
  { name: 'Dasar data dan spreadsheet', duration: 'Minggu 1-2', toolIds: ['tool-1', 'tool-2'] },
  { name: 'SQL untuk mengambil data', duration: 'Minggu 3-4', toolIds: ['tool-3', 'tool-4'] },
  { name: 'Visualisasi dan dashboard', duration: 'Minggu 5-6', toolIds: ['tool-5', 'tool-6', 'tool-7'] },
  { name: 'Analisis dan insight', duration: 'Minggu 7-8', toolIds: [] },
  { name: 'Internship dan persiapan karier', duration: 'Minggu 9-10', toolIds: ['tool-8'] },
].map((draft, i) => ({
  ...MODULES[i],
  ...draft,
  ...(i === 0
    ? {
        topics: [
          'Cara berpikir analis: pertanyaan dulu, baru data',
          'Merapikan dan membersihkan data yang berantakan',
          'Rumus dan pivot table dasar',
        ],
        output: 'ringkasan data untuk satu kasus nyata',
      }
    : {}),
}))

const DATA_ANALYST_OVERVIEW = [
  { value: '10', suffix: '+', label: 'minggu' },
  { value: '20', suffix: '+', label: 'sesi' },
  { value: '40', suffix: '+', label: 'jam belajar' },
] as const

const TOOLS: readonly Tool[] = TOOL_ICONS.map((icon, i) => ({
  id: `tool-${i + 1}`,
  name: `Nama tool ${i + 1}`,
  category: TOOL_CATEGORIES[i % TOOL_CATEGORIES.length],
  purpose: 'Dipakai untuk [ISI]',
  level: i % 3 === 2 ? 'Menengah' : 'Dasar',
  moduleIds: [`modul-${Math.min(i + 1, MODULE_COUNT)}`],
  abbr: `T${i + 1}`,
  icon,
}))

const DATA_ANALYST_CATEGORIES = ['Data', 'Visualisasi', 'Kolaborasi'] as const

/** Draf tools Data Analyst dari tim. Kategori dan modul pemakaian belum dikonfirmasi. */
type ToolDraft = Pick<Tool, 'name' | 'abbr' | 'category' | 'icon'> & { modul: number }

const DATA_ANALYST_TOOLS: readonly Tool[] = ([
  { name: 'Google Sheets', abbr: 'GS', category: 'Data', modul: 1, icon: 'layout' },
  { name: 'Excel', abbr: 'X', category: 'Data', modul: 1, icon: 'layout' },
  { name: 'MySQL', abbr: 'SQL', category: 'Data', modul: 2, icon: 'database' },
  { name: 'BigQuery', abbr: 'BQ', category: 'Data', modul: 2, icon: 'database' },
  { name: 'Looker Studio', abbr: 'LS', category: 'Visualisasi', modul: 3, icon: 'chart' },
  { name: 'Power BI', abbr: 'PB', category: 'Visualisasi', modul: 3, icon: 'chart' },
  { name: 'Tableau Public', abbr: 'Tb', category: 'Visualisasi', modul: 3, icon: 'chart' },
  { name: 'Notion', abbr: 'N', category: 'Kolaborasi', modul: 5, icon: 'users' },
] satisfies ToolDraft[]).map(({ modul, ...tool }, i) => ({
  ...tool,
  id: `tool-${i + 1}`,
  purpose: 'Dipakai untuk [ISI]',
  level: 'Dasar' as const,
  moduleIds: [`modul-${modul}`],
}))

const SKILLS: readonly Skill[] = [
  { skill: 'Skill [ISI] 1', kind: 'hard', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]', moduleId: 'modul-2' },
  { skill: 'Skill [ISI] 2', kind: 'hard', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]', moduleId: 'modul-3' },
  { skill: 'Skill [ISI] 3', kind: 'hard', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]', moduleId: 'modul-5' },
  { skill: 'Skill [ISI] 4', kind: 'soft', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]' },
  { skill: 'Skill [ISI] 5', kind: 'soft', proof: 'Kamu bisa [hal konkret ISI]', output: 'Artefak [ISI]' },
]

const SAMPLE_QUOTE = '“Dulu aku juga bingung mulai dari mana. Makanya di sini kita mulai dari satu pertanyaan kecil.”'

const MENTORS: readonly ProgramMentor[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  name: `[Nama Mentor ${n}]`,
  role: 'Peran [ISI]',
  company: '[ISI]',
  experience: ISI,
  field: ISI,
  roleInProgram: 'Peran di program [ISI]',
  // consent: true hanya untuk prototype. Di produksi diisi dari persetujuan tertulis tiap mentor.
  consent: true,
  featured: n <= 2,
  ...(n === 1 || n === 2 ? { photo: n === 1 ? ('mentor-1' as const) : ('mentor-2' as const) } : {}),
  quote: n === 1 ? SAMPLE_QUOTE : '[ISI: kutipan asli dari mentor]',
}))

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

const WHY_BENTO: WhyBento = {
  title: 'Teman setara,',
  accent: 'bukan institusi.',
  chat: {
    title: 'Kakak tingkat, bukan institusi',
    body: 'Bicara dari samping, bukan dari atas.',
    label: 'Contoh percakapan · ilustrasi',
    lines: [
      { from: 'visitor', text: 'Kak, aku fresh graduate. Boleh ikut?' },
      { from: 'team', text: 'Boleh. Kami mulai dari nol, pelan-pelan.' },
      { from: 'visitor', text: 'Yang penting apa, kak?' },
      { from: 'team', text: 'Yang penting kamu mau mulai. Sisanya kami temani satu langkah demi satu langkah.' },
    ],
  },
  dibimbing: { title: 'Supported by Dibimbing', body: 'Didukung jaringan mitra internship ekosistem Dibimbing. [ISI: bentuk dukungan]' },
  affordable: { title: 'Kenapa terjangkau?', reducedLabel: 'Dikurangi', reduced: '[ISI]', keptLabel: 'Nggak dikurangi', kept: '[ISI]' },
  promise: {
    title: 'Yang nggak kami janjikan',
    body: 'Kami tidak menjanjikan pekerjaan tetap. Kami menjanjikan skill dan panggung untuk kamu bisa membuktikan kemampuan melalui internship.',
  },
  reasonsTitle: 'Kenapa program ini?',
  reasons: [
    { title: '[ISI: alasan 1]', body: 'Kenapa skill ini relevan untuk pemula.' },
    { title: '[ISI: alasan 2]', body: 'Kenapa kurikulum cocok untuk yang mulai dari nol.' },
    { title: '[ISI: alasan 3]', body: 'Dibanding belajar sendiri: terarah, ada feedback mentor, ada internship.' },
  ],
}

const PLAN_PRICE = 'Rp [ISI]'

const PLANS: readonly PricingPlan[] = [
  {
    id: 'skill-sprint',
    name: 'Skill Sprint',
    price: PLAN_PRICE,
    audience: '[ISI: cocok untuk siapa]',
    includes: ['Video rekaman, bisa ditonton kapan saja', 'Kelas Zoom live bersama mentor', '[ISI: rincian internship dan lainnya]'],
    excludes: '[ISI: yang tidak termasuk]',
  },
  {
    id: 'career-launch-lite',
    name: 'Career Launch Lite',
    price: PLAN_PRICE,
    audience: '[ISI: cocok untuk siapa]',
    includes: ['Video rekaman, bisa ditonton kapan saja', 'Kelas Zoom live bersama mentor', '[ISI: rincian internship dan lainnya]'],
    excludes: '[ISI: yang tidak termasuk]',
    recommended: true,
  },
]

const PLAN_COMPARE: readonly PlanCompareRow[] = ['Format', 'Durasi', 'Internship', 'Sertifikat', 'Akses materi', 'Yang tidak termasuk'].map((label) => ({
  label,
  values: ['[ISI]', '[ISI]'],
}))

export const FAQ_CATEGORIES = ['Kepercayaan', 'Kecocokan', 'Paket dan bayar'] as const

/** Kategori dan urutan dari tim; hanya jawaban pertama yang sudah ada, sisanya menunggu jawaban resmi. */
const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'jaminan-kerja',
    category: 'Kepercayaan',
    question: 'Apakah pasti dapat kerja setelah lulus?',
    answer: 'Nggak. Kami tidak menjanjikan pekerjaan tetap. Kami menjanjikan skill dan panggung untuk kamu membuktikan kemampuan lewat internship.',
    link: { label: 'Lihat yang nggak kami janjikan', sectionId: 'kenapa-kami' },
  },
  { id: 'internship', category: 'Kepercayaan', question: 'Internship-nya seperti apa?', answer: FAQ_PENDING },
  { id: 'harga-terjangkau', category: 'Kepercayaan', question: 'Kenapa harganya terjangkau?', answer: FAQ_PENDING },
  { id: 'hubungan-dibimbing', category: 'Kepercayaan', question: 'Apa hubungan Scareer dan Dibimbing?', answer: FAQ_PENDING },
  { id: 'pengalaman', category: 'Kecocokan', question: 'Aku nggak punya background [bidang]. Boleh ikut?', answer: FAQ_PENDING },
  { id: 'kuliah-bekerja', category: 'Kecocokan', question: 'Aku masih kuliah atau bekerja. Bisa ikut?', answer: FAQ_PENDING },
  { id: 'laptop', category: 'Kecocokan', question: 'Perlu laptop seperti apa?', answer: FAQ_PENDING },
  { id: 'beda-paket', category: 'Paket dan bayar', question: 'Apa bedanya Skill Sprint dan Career Launch Lite?', answer: FAQ_PENDING },
  { id: 'cicilan', category: 'Paket dan bayar', question: 'Bagaimana cicilannya, ada bunga atau biaya admin?', answer: FAQ_PENDING },
  { id: 'refund', category: 'Paket dan bayar', question: 'Bisakah pembayaran dikembalikan?', answer: FAQ_PENDING },
  { id: 'sertifikat', category: 'Kepercayaan', question: 'Dapat sertifikat?', answer: FAQ_PENDING },
]

function buildDetail(base: Program): ProgramDetail {
  const isDataAnalyst = base.slug === 'data-analyst'
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
      overview: isDataAnalyst ? DATA_ANALYST_OVERVIEW : OVERVIEW_PENDING,
      syllabus: { fileName: `Silabus ${base.name}`, size: '[ukuran file]', updated: 'diperbarui [ISI]', href: '/files/silabus-contoh.pdf' },
      modules: isDataAnalyst ? DATA_ANALYST_MODULES : MODULES,
    },
    tools: isDataAnalyst ? DATA_ANALYST_TOOLS : TOOLS,
    toolCategories: isDataAnalyst ? DATA_ANALYST_CATEGORIES : TOOL_CATEGORIES,
    skills: SKILLS,
    takeHome: [
      { title: 'Portofolio', body: '[ISI] proyek yang bisa kamu tunjukkan.' },
      { title: 'Sertifikat [ISI]', body: 'Hanya jika ada, dengan syarat yang jelas.' },
      { title: 'Review CV [ISI]', body: 'Bentuk dan batasnya dari tim.' },
      { title: 'Akses materi [ISI]', body: 'Berapa lama dan apa saja dari tim.' },
    ],
    mentors: isDataAnalyst ? MENTORS.map((m, i) => (i === 0 ? { ...m, field: 'SQL dan spreadsheet' } : m)) : MENTORS,
    mentorAccess: { liveSessions: '[ISI] sesi', reviews: '[ISI]', oneOnOne: '[ISI]', ratio: '[ISI]', form: '[ISI]', frequency: '[ISI]' },
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
    whyBento: WHY_BENTO,
    plans: PLANS,
    planCompare: PLAN_COMPARE,
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
