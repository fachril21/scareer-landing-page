/**
 * Semua copy dan data prototype. Fakta yang belum dikonfirmasi tetap `[ISI]` (jangan dikarang).
 * Teks bertanda "draf" hanya contoh agar struktur terlihat; final dari tim.
 */

export const CONSULT_MESSAGES = {
  general: 'Halo scareer, aku mau tanya program yang cocok buat aku',
  fresh: 'Aku fresh graduate, cocoknya program apa?',
  installment: 'Internship-nya seperti apa?',
  compare: 'Bedanya sama bootcamp lain apa?',
} as const

export const FACTS = ['Mulai dari ±Rp3 juta', 'Belajar lewat video + kelas live Zoom', 'Lanjut internship nyata'] as const

export const NAV_ITEMS = [
  { id: 'kenapa-scareer', label: 'Kenapa scareer' },
  { id: 'faq', label: 'FAQ' },
] as const

/* ---------- Program ---------- */

export type ProgramField = 'Cyber Security' | 'Data Analyst' | 'Digital Marketing' | 'Finance & Accounting' | DummyProgramField

/** Kategori untuk filter program di homepage. Chip hanya muncul untuk kategori yang punya program. */
export const PROGRAM_CATEGORIES = ['Teknologi', 'Bisnis', 'Kreatif'] as const
export type ProgramCategory = (typeof PROGRAM_CATEGORIES)[number]

type DummyProgramField =
  | 'Web Development'
  | 'Cloud Computing'
  | 'Software QA'
  | 'UI/UX Design'
  | 'Graphic Design'
  | 'Content Creator'
  | 'Human Resources'
  | 'Sales & Business Development'

export interface Program {
  slug: string
  /** Nama berkas foto di `public/images` (tanpa ukuran dan ekstensi). */
  image: string
  field: ProgramField
  category: ProgramCategory
  /** Program contoh untuk menguji tampilan banyak program (panel tweak). Belum punya halaman detail. */
  isDummy?: boolean
  name: string
  audience: string
  duration: string
  format: string
  level: string
  outcomes: readonly [string, string, string]
  startingPrice: string
}

const makeProgram = (
  slug: string,
  image: string,
  field: ProgramField,
  category: ProgramCategory,
  isDummy = false,
): Program => ({
  slug,
  image,
  field,
  category,
  ...(isDummy && { isDummy }),
  name: field,
  audience: 'Cocok untuk [ISI]',
  duration: '[ISI] minggu',
  format: '[ISI]',
  level: '[ISI]',
  outcomes: ['Hasil utama 1 [ISI]', 'Hasil utama 2 [ISI]', 'Hasil utama 3 [ISI]'],
  startingPrice: 'Rp [ISI]',
})

export const PROGRAMS: readonly Program[] = [
  makeProgram('cyber-security', 'program-a', 'Cyber Security', 'Teknologi'),
  makeProgram('data-analyst', 'program-b', 'Data Analyst', 'Teknologi'),
  makeProgram('digital-marketing', 'program-c', 'Digital Marketing', 'Bisnis'),
  makeProgram('finance-accounting', 'program-d', 'Finance & Accounting', 'Bisnis'),
]

/** Hanya dipakai lewat panel tweak ("Jumlah program"). Tidak masuk menu atau halaman detail. */
export const DUMMY_PROGRAMS: readonly Program[] = [
  makeProgram('web-development', 'program-a', 'Web Development', 'Teknologi', true),
  makeProgram('cloud-computing', 'program-b', 'Cloud Computing', 'Teknologi', true),
  makeProgram('software-qa', 'program-d', 'Software QA', 'Teknologi', true),
  makeProgram('ui-ux-design', 'program-c', 'UI/UX Design', 'Kreatif', true),
  makeProgram('graphic-design', 'program-d', 'Graphic Design', 'Kreatif', true),
  makeProgram('content-creator', 'program-a', 'Content Creator', 'Kreatif', true),
  makeProgram('human-resources', 'program-b', 'Human Resources', 'Bisnis', true),
  makeProgram('sales-bizdev', 'program-c', 'Sales & Business Development', 'Bisnis', true),
]


/* ---------- Hero ---------- */

export const HERO = {
  title: 'Fresh graduate, tapi diminta pengalaman 2 tahun?',
  lead: 'Loker minta pengalaman, tapi nggak ada yang mau kasih? Kita mulai bareng dari sini. Bootcamp digital + internship nyata, mulai dari ±Rp3 juta.',
  note: 'lah, ini fresh grad apa bukan?',
  job: {
    title: 'Junior [Posisi] [ISI]',
    company: 'PT Contoh Maju Bersama',
    heading: 'Kualifikasi',
    items: ['Fresh graduate welcome', 'Min. pengalaman 2 tahun', 'Menguasai [tools] A, B, C'],
    struckIndex: 1,
    ariaLabel: 'Contoh lowongan yang meminta pengalaman 2 tahun untuk fresh graduate',
  },
} as const

/** Headline hero layout terpusat: `prefix` tetap, `words` bergantian (sudah memuat tanda baca penutup). */
export const HERO_WORD_SETS = {
  tuntutan: {
    prefix: 'Fresh graduate, tapi diminta',
    words: ['pengalaman 2 tahun?', 'portofolio segudang?', 'skill serba bisa?', 'jam terbang tinggi?'],
  },
  jawaban: {
    prefix: 'Fresh graduate, tapi diminta pengalaman 2 tahun? Yuk mulai dari',
    words: ['proyek beneran.', 'bimbingan mentor.', 'magang nyata.'],
  },
  santai: {
    prefix: 'Fresh graduate, tapi diminta',
    words: ['pengalaman 2 tahun, Kak?', 'langsung jago dari lahir?', 'portofolio yang belum ada?'],
  },
} as const

/** Section "scareer itu apa" di bawah hero. Semua fakta berasal dari PRODUCT.md dan konten yang sudah ada. */
export const WHAT_IS = {
  title: 'scareer itu tempat latihan sebelum kerja pertama.',
  lead: 'Bootcamp digital untuk pemula, dengan internship sebagai langkah terakhir.',
  items: [
    {
      question: 'Mau belajar apa?',
      answer: 'Pilih satu dari empat jalur.',
      body: 'Cyber Security, Data Analyst, Digital Marketing, atau Finance & Accounting. Ambil yang paling dekat dengan targetmu.',
    },
    {
      question: 'Cocok buat siapa?',
      answer: 'Kamu yang baru lulus atau baru mulai cari kerja.',
      body: 'Masih bingung mulai dari mana? Itu normal, dan justru itu titik mulainya.',
    },
    {
      question: 'Apa yang tidak dijanjikan?',
      answer: 'Bukan jaminan langsung dapat kerja.',
      body: 'Yang kamu bawa pulang: skill dan pengalaman internship yang bisa kamu tunjukkan ke recruiter.',
    },
  ],
  /** Gaya "Kalimat isian": frasa bertanda `mark` disorot. */
  sentence: [
    { text: 'scareer adalah ' },
    { text: 'tempat latihan', mark: true },
    { text: ' sebelum kerja pertama, untuk ' },
    { text: 'fresh graduate', mark: true },
    { text: ' yang ' },
    { text: 'belum tahu mulai dari mana', mark: true },
    { text: '.' },
  ],
} as const

/** Section masalah di bawah Kenapa scareer. Tanpa statistik (PRODUCT.md: bukti harus nyata). */
export const PROBLEM = {
  title: 'Kerja pertama susah didapat, dan itu bukan salahmu.',
  lead: 'Banyak lowongan entry-level meminta pengalaman, padahal pengalaman pertama baru bisa didapat dari kerja pertama.',
  /** Gaya "Lingkaran": empat langkah, lalu kembali ke awal. */
  steps: [
    { title: 'Melamar kerja pertama', body: 'Kamu kirim lamaran ke lowongan entry-level.' },
    { title: 'Lowongan minta pengalaman', body: 'Syaratnya sering tertulis 1 sampai 2 tahun, bahkan untuk posisi pemula.' },
    { title: 'Kamu belum punya', body: 'Karena pengalaman pertama baru datang dari kerja pertama.' },
    { title: 'Ditolak, kembali ke awal', body: 'Lamaran berhenti di tahap seleksi dan kamu mulai dari nol lagi.' },
  ],
  breakAfter: 2,
  breakLabel: 'scareer masuk di sini',
  returnLabel: 'Lalu kembali ke langkah 1',
  /** Gaya "Dua sisi". */
  sides: [
    {
      title: 'Yang kamu rasakan',
      items: [
        'Aku sudah kirim banyak lamaran, tapi belum ada yang lanjut.',
        'Semua lowongan minta pengalaman. Aku belum punya, mulainya dari mana?',
        'Lama-lama aku mulai ragu sama diriku sendiri.',
      ],
    },
    {
      title: 'Yang sebenarnya terjadi',
      items: [
        'Banyak perusahaan lebih suka kandidat yang langsung siap kerja, karena melatih dari nol butuh waktu dan biaya.',
        'Syarat pengalaman jadi saringan pertama, bahkan untuk posisi pemula.',
        'Akibatnya, jalan masuk untuk dapat pengalaman pertama itu sendiri jadi sempit.',
      ],
    },
  ],
  pivot: 'Di titik ketiga itulah scareer masuk. Lewat internship nyata, kamu dapat pengalaman pertama, jadi lamaran berikutnya tidak lagi mulai dari nol.',
  /** Tujuan tombol di akhir section bergantung urutan halaman: Program (urutan Cerita) atau Cara belajar. */
  cta: { program: 'Pilih program yang cocok', learn: 'Lihat cara belajarnya' },
} as const

export const PROOF_CELLS = [
  'Mulai dari ±Rp3 juta',
  'Video + kelas live Zoom',
  'Lanjut internship nyata',
  'Mentor dari [ISI]',
] as const

/* ---------- Kenapa Scareer ---------- */

export const WHY = {
  /** Draf. Kata bertanda stabilo: maksimal tiga. */
  statement: [
    { text: 'Loker minta ' },
    { text: 'pengalaman', mark: true },
    { text: ', tapi nggak ada yang mau kasih kesempatan pertama. Di scareer kamu belajar, lalu praktik langsung lewat ' },
    { text: 'internship', mark: true },
    { text: ', dengan biaya yang ' },
    { text: 'terjangkau', mark: true },
    { text: '.' },
  ],
  /** Varian layout editorial (tweak "Layout Kenapa scareer"): heading, lead, dan kutipan kartu. Draf copy. */
  editorial: {
    title: 'Pengalaman pertama,',
    titleAccent: 'tanpa gatekeeping.',
    lead: 'Kamu nggak perlu kenal orang dalam untuk mulai. Cukup belajar, praktik, lalu buktikan sendiri.',
    quote: [
      { text: 'Cari kerja pertama memang berat. Kami nggak akan pura-pura gampang, tapi kami temani kamu dari belajar sampai punya sesuatu untuk ' },
      { text: 'ditunjukkan', mark: true },
      { text: '.' },
    ],
  },
  pillars: [
    {
      icon: 'senior',
      title: 'Kakak tingkat, bukan institusi',
      body: 'Kami bicara dari samping, bukan dari atas. Jujur soal susahnya cari kerja, nggak sok tahu, dan selalu bilang ayo, aku bantu mulai.',
    },
    {
      icon: 'support',
      title: 'Supported by Dibimbing',
      body: 'scareer adalah brand mandiri yang didukung jaringan mitra internship ekosistem Dibimbing. Detail kerja sama [ISI] menyusul dari tim.',
    },
    {
      icon: 'price',
      title: 'Terjangkau, bukan asal-asalan',
      body: 'Mulai dari ±Rp3 juta. Yang dikurangi dan yang tidak, kami tulis terang di bawah.',
    },
  ],
  transparency: {
    label: 'Transparan soal harga',
    title: 'Terjangkau, bukan asal-asalan. Ini yang dikurangi dan yang tidak.',
    reduced: {
      title: 'Yang dikurangi',
      items: ['[ISI] Contoh: biaya gedung dan fasilitas', '[ISI] Contoh: biaya promosi', '[ISI] Contoh: paket tambahan'],
    },
    kept: {
      title: 'Yang tidak dikurangi',
      items: ['[ISI] Contoh: waktu bimbingan mentor', '[ISI] Contoh: materi dan latihan', '[ISI] Contoh: karya akhir'],
    },
    promise: {
      title: 'Yang nggak kami janjikan',
      body: 'Kami nggak janji kamu langsung kerja. Tapi kami pastikan kamu punya pengalaman nyata untuk ditunjukkan lewat internship.',
    },
    price: 'Mulai dari ±Rp3 juta',
  },
} as const

/* ---------- Cara belajar ---------- */

export const LEARN = {
  title: 'Empat langkah, dari belajar sampai internship',
  lead: 'Belajar dulu, lalu praktik langsung lewat internship. Kamu boleh ngobrol dulu sebelum memutuskan, tanpa komitmen.',
  steps: [
    { id: 'pilih', title: 'Pilih program', body: 'Lihat daftar program, bandingkan durasi, format, dan hasilnya. Halaman detail menjelaskan sisanya.', optional: false },
    { id: 'ngobrol', title: 'Ngobrol dulu', body: 'Bingung cocok atau tidak? Tanya lewat WhatsApp. Kamu nggak harus daftar setelahnya.', optional: true },
    { id: 'belajar', title: 'Belajar bareng mentor', body: 'Video yang bisa ditonton kapan saja, ditambah sesi Zoom interaktif bareng mentor berpengalaman. Jadwal dan format tertulis jelas di halaman program.', optional: false },
    { id: 'karya', title: 'Praktik lewat internship', body: 'Skill-nya langsung kamu praktikkan di dunia kerja nyata. Kami nggak menjanjikan pekerjaan, tapi kamu punya pengalaman nyata untuk ditunjukkan.', optional: false },
  ],
  /** Varian "4 kolom" (tweak "Layout Cara belajar"): copy mengikuti desain referensi. */
  columns: {
    title: 'Cara belajar',
    steps: [
      { title: 'Pilih program', body: 'Pilih jalur yang paling cocok: Data Analyst atau Digital Marketing, Skill Sprint atau Career Launch Lite.', optional: false },
      { title: 'Ngobrol dulu', body: 'Belum yakin program mana yang cocok? Tanya dulu, kami jawab apa adanya.', optional: true, link: 'Tanya via WhatsApp' },
      { title: 'Belajar bareng mentor', body: 'Video recording yang bisa ditonton kapan saja, plus sesi Zoom interaktif bersama mentor berpengalaman.', optional: false },
      { title: 'Praktik lewat internship', body: 'Skill yang kamu pelajari langsung dipraktikkan di dunia kerja nyata, jadi kamu punya pengalaman untuk ditunjukkan.', optional: false },
    ],
  },
  chat: {
    label: 'Contoh obrolan',
    incoming: 'Halo, aku fresh graduate dan bingung mulai dari mana. Cocoknya program apa ya?',
    reply: 'Halo! Boleh cerita dulu latar belakang dan targetmu? [ISI] Teks balasan dari tim.',
    chips: ['Cocok buat aku?', 'Internship-nya seperti apa?'],
  },
} as const

/* ---------- Karya ---------- */

export interface Work {
  slug: string
  title: string
  description: string
  program: string
}

export const WORKS: readonly Work[] = [1, 2, 3, 4, 5].map((n) => {
  const program = PROGRAMS[(n - 1) % PROGRAMS.length]
  return {
    slug: program.slug,
    title: `Karya ${n}`,
    description: 'Deskripsi satu kalimat tentang karya ini [ISI].',
    program: program.name,
  }
})

export const WORK_HONEST_LABEL = 'Dikerjakan peserta Batch [ISI]'

/* ---------- Mentor ---------- */

export interface Mentor {
  name: string
  role: string
  company: string
  experience: string
  field: string
  quote?: string
}

export const MENTORS: readonly Mentor[] = [
  { name: 'Nama mentor [ISI]', role: 'Peran [ISI]', company: 'Perusahaan [ISI]', experience: '[ISI]', field: '[ISI]' },
  { name: 'Nama mentor [ISI]', role: 'Peran [ISI]', company: 'Perusahaan [ISI]', experience: '[ISI]', field: '[ISI]' },
]

/* ---------- FAQ ---------- */

export interface FaqItem {
  id: string
  question: string
  answer: string
  /** Kategori untuk filter pil (layout kartu halaman detail). */
  category?: string
  /** Tautan di bawah jawaban yang menggulung ke section lain di halaman yang sama. */
  link?: { label: string; sectionId: string }
}

const FAQ_PENDING = '[ISI] Jawaban resmi dari tim, maksimal 60 kata.'

export const FAQ: readonly FaqItem[] = [
  { id: 'apa-itu-scareer', question: 'Apa itu scareer?', answer: 'scareer adalah bootcamp terjangkau yang memberi fresh graduate dan jobseeker kesempatan pertama membangun pengalaman kerja nyata lewat internship.' },
  { id: 'hubungan-dibimbing', question: 'Apa hubungan scareer dengan Dibimbing?', answer: 'scareer adalah brand mandiri yang didukung ekosistem Dibimbing (Supported by Dibimbing). Dibimbing memberi kredibilitas lewat jaringan mitra internship, bukan sebagai pemilik brand. [ISI] Detail kerja sama dari tim.' },
  { id: 'jaminan-kerja', question: 'Apakah ada jaminan kerja?', answer: 'Nggak. Kami nggak menjanjikan pekerjaan tetap. Yang kami janjikan: skill yang dipakai industri dan panggung untuk membuktikan kemampuanmu lewat internship.' },
  { id: 'cocok-untuk-siapa', question: 'scareer cocok untuk siapa?', answer: 'Untuk fresh graduate dan jobseeker yang hampir menyerah cari kerja karena belum punya pengalaman, dengan budget terbatas tapi mau naik level.' },
  { id: 'cara-daftar-bayar', question: 'Bagaimana cara daftar dan membayar?', answer: FAQ_PENDING },
]

/* ---------- CTA dan footer ---------- */

export const CTA = { title: 'Ambil kesempatan pertamamu sekarang. Bingung? Ngobrol dulu.' }

/** CTA penutup varian "Lembar" (tweak "Layout CTA dan footer"). Frasa bertanda `mark` disorot stabilo. */
export const CTA_SHEET = {
  title: [
    { text: 'Ambil ' },
    { text: 'kesempatan pertamamu', mark: true },
    { text: ' sekarang.' },
  ],
  lead: 'Pengalaman pertama dimulai dari sini. Ngobrol dulu, atau langsung pilih program.',
} as const

/** Footer varian "Lembar". Telepon dan website menunggu tim; email memakai alamat yang sudah ada. */
export const FOOTER_SHEET = {
  tagline: 'Pengalaman pertama dimulai dari sini.',
  contact: {
    title: 'Hubungi kami',
    rows: [
      { label: 'Telepon', value: '[ISI: menunggu tim]' },
      { label: 'Email', value: 'salsabila@dibimbing.id' },
      { label: 'Website', value: '[ISI]' },
    ],
    email: 'salsabila@dibimbing.id',
  },
  columns: [
    {
      title: 'Program',
      links: [
        { label: 'Cyber Security', href: '/program/cyber-security' },
        { label: 'Data Analyst', href: '/program/data-analyst' },
        { label: 'Digital Marketing', href: '/program/digital-marketing' },
        { label: 'Finance & Accounting', href: '/program/finance-accounting' },
      ],
    },
    {
      title: 'Perusahaan',
      links: [
        { label: 'Kenapa scareer', href: '#kenapa-scareer' },
        { label: 'Cara belajar', href: '#cara-belajar' },
      ],
    },
    {
      title: 'Bantuan',
      links: [{ label: 'FAQ', href: '#faq' }, { label: 'Tanya via WhatsApp', whatsapp: true }],
    },
  ],
  legal: ['Kebijakan privasi', 'Syarat dan ketentuan'],
} as const

export const FOOTER = {
  columns: [
    {
      title: 'Program',
      links: [
        { label: 'Cyber Security', href: '/program/cyber-security' },
        { label: 'Data Analyst', href: '/program/data-analyst' },
        { label: 'Digital Marketing', href: '/program/digital-marketing' },
        { label: 'Finance & Accounting', href: '/program/finance-accounting' },
      ],
    },
    {
      title: 'Perusahaan',
      links: [
        { label: 'Kenapa scareer', href: '#kenapa-scareer' },
        { label: 'Cara belajar', href: '#cara-belajar' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    // Tujuan kontak dan legal belum ada (nomor, email, dan halaman kebijakan menunggu tim): tetap ke beranda.
    { title: 'Kontak', links: [{ label: 'WhatsApp [ISI]' }, { label: 'salsabila@dibimbing.id', href: 'mailto:salsabila@dibimbing.id' }] },
    { title: 'Legal', links: [{ label: 'Kebijakan privasi' }, { label: 'Syarat dan ketentuan' }] },
  ],
} as const
