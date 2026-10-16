/**
 * Data blog. SEMUA artikel di sini adalah contoh (dummy) untuk prototype: isinya saran umum tanpa klaim,
 * angka, atau janji hasil. Sebelum rilis, ganti dengan artikel asli dari tim. Sampul memakai gambar AI
 * prototype yang sudah ada di public/images.
 */
import type { BlogArticle, BlogBlock, BlogCategory, BlogGroup } from './blog.types'

const h2 = (text: string): BlogBlock => ({ type: 'h2', text })
const p = (text: string): BlogBlock => ({ type: 'p', text })
const ul = (...items: string[]): BlogBlock => ({ type: 'ul', items })
const quote = (text: string): BlogBlock => ({ type: 'quote', text })

const AUTHOR = 'Tim scareer'

export const BLOG_GROUPS: readonly BlogGroup[] = [
  { slug: 'karier', name: 'Karier & kerja pertama', description: 'Dari melamar sampai hari pertama kerja, ditulis untuk kamu yang baru mulai.', programHref: '/#program', programName: 'semua program scareer' },
  { slug: 'cyber-security', name: 'Cyber Security', description: 'Dasar keamanan digital dan gambaran karier di bidang keamanan siber.', programHref: '/program/cyber-security', programName: 'Cyber Security' },
  { slug: 'data', name: 'Data', description: 'Spreadsheet, SQL, visualisasi, dan pekerjaan analis data dari dasar.', programHref: '/program/data-analyst', programName: 'Data Analyst' },
  { slug: 'digital-marketing', name: 'Digital Marketing', description: 'Konten, media sosial, SEO, dan iklan untuk pemula.', programHref: '/program/digital-marketing', programName: 'Digital Marketing' },
  { slug: 'finance', name: 'Finance & Accounting', description: 'Akuntansi dasar dan cara membaca laporan keuangan.', programHref: '/program/finance-accounting', programName: 'Finance & Accounting' },
]

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  { slug: 'cv-lamaran', name: 'CV dan lamaran', groupSlug: 'karier' },
  { slug: 'wawancara', name: 'Wawancara kerja', groupSlug: 'karier' },
  { slug: 'internship', name: 'Internship', groupSlug: 'karier' },
  { slug: 'dasar-keamanan', name: 'Dasar keamanan', groupSlug: 'cyber-security' },
  { slug: 'karier-keamanan', name: 'Karier keamanan siber', groupSlug: 'cyber-security' },
  { slug: 'data-analyst', name: 'Data Analyst', groupSlug: 'data' },
  { slug: 'sql-spreadsheet', name: 'SQL dan spreadsheet', groupSlug: 'data' },
  { slug: 'visualisasi', name: 'Visualisasi data', groupSlug: 'data' },
  { slug: 'konten-sosial', name: 'Konten dan media sosial', groupSlug: 'digital-marketing' },
  { slug: 'seo-iklan', name: 'SEO dan iklan', groupSlug: 'digital-marketing' },
  { slug: 'akuntansi-dasar', name: 'Akuntansi dasar', groupSlug: 'finance' },
  { slug: 'laporan-keuangan', name: 'Laporan keuangan', groupSlug: 'finance' },
]

const ARTICLES: readonly BlogArticle[] = [
  {
    slug: 'cara-menulis-cv-fresh-graduate',
    title: 'Cara menulis CV fresh graduate tanpa pengalaman kerja',
    excerpt: 'CV pertama tidak harus penuh pengalaman kerja. Kamu bisa mulai dari proyek, organisasi, dan keterampilan yang sudah kamu latih.',
    categorySlug: 'cv-lamaran', author: AUTHOR, publishedAt: '2026-10-15', cover: 'learn-work',
    body: [
      p('Banyak fresh graduate merasa CV-nya kosong karena belum pernah bekerja penuh waktu. Padahal CV adalah ringkasan bukti bahwa kamu bisa belajar dan menyelesaikan sesuatu, dan bukti itu tidak hanya datang dari kantor.'),
      h2('Mulai dari apa yang sudah kamu kerjakan'),
      p('Tulis tugas akhir, proyek kelompok, kegiatan organisasi, atau pekerjaan lepas sekecil apa pun. Untuk tiap item, jelaskan apa yang kamu lakukan dan apa hasilnya, dengan kalimat singkat.'),
      ul('Proyek kuliah yang relevan dengan posisi yang dilamar', 'Peran di organisasi atau kepanitiaan', 'Kursus atau latihan mandiri yang menghasilkan karya'),
      h2('Urutkan sesuai posisi yang dilamar'),
      p('Letakkan hal yang paling relevan di bagian atas. Recruiter sering membaca sekilas, jadi dua atau tiga butir pertama harus sudah menjawab pertanyaan: orang ini cocok untuk posisi ini?'),
      h2('Jaga tetap singkat dan rapi'),
      p('Satu halaman cukup untuk lamaran pertama. Gunakan format yang konsisten, hindari foto dan hiasan berlebihan, lalu minta satu orang membacanya sebelum kamu kirim.'),
    ],
  },
  {
    slug: 'syarat-pengalaman-lowongan-entry-level',
    title: 'Lowongan entry-level minta pengalaman: apa yang bisa kamu lakukan?',
    excerpt: 'Syarat pengalaman di lowongan pemula memang membingungkan. Ini cara membacanya dan menyiapkan diri tanpa menunggu kesempatan sempurna.',
    categorySlug: 'cv-lamaran', author: AUTHOR, publishedAt: '2026-10-13', cover: 'hero-desktop',
    body: [
      p('Lowongan yang menyebut fresh graduate welcome tetapi meminta pengalaman satu sampai dua tahun memang sering ditemui. Kamu tidak sendirian, dan itu bukan tanda kamu kurang mampu.'),
      h2('Baca syaratnya sebagai daftar keinginan'),
      p('Banyak syarat di lowongan adalah gambaran kandidat ideal, bukan batas mutlak. Kalau kamu memenuhi sebagian besar kemampuan inti, melamar tetap masuk akal.'),
      h2('Ganti pengalaman dengan bukti'),
      ul('Buat satu atau dua proyek kecil yang mirip pekerjaan sehari-hari posisi itu', 'Dokumentasikan prosesnya, bukan hanya hasil akhir', 'Cari kesempatan magang atau proyek sukarela untuk membangun jejak'),
      h2('Tulis lamaran yang jujur'),
      p('Sebutkan apa yang sudah kamu pelajari dan siapkan untuk belajar. Kejujuran tentang level kamu biasanya lebih dipercaya daripada klaim yang berlebihan.'),
    ],
  },
  {
    slug: 'menjawab-ceritakan-tentang-dirimu',
    title: 'Menjawab “ceritakan tentang dirimu” dengan tenang',
    excerpt: 'Pertanyaan pembuka wawancara ini sering bikin gugup. Susun jawabanmu dalam tiga bagian pendek supaya mudah diingat.',
    categorySlug: 'wawancara', author: AUTHOR, publishedAt: '2026-10-11', cover: 'mentor-1',
    body: [
      p('Pewawancara biasanya tidak mencari riwayat hidup lengkap. Mereka ingin tahu siapa kamu secara profesional dan kenapa kamu cocok untuk peran ini.'),
      h2('Rumus tiga bagian'),
      ul('Siapa kamu sekarang: latar belakang singkat', 'Apa yang sudah kamu kerjakan atau pelajari yang relevan', 'Kenapa kamu tertarik pada posisi ini'),
      h2('Latih dengan suara keras'),
      p('Ucapkan jawabanmu beberapa kali, lalu rekam. Targetkan sekitar satu sampai dua menit. Jangan dihafal kata per kata supaya terdengar alami.'),
      quote('Jawaban yang jelas dan jujur lebih baik daripada jawaban yang terdengar sempurna.'),
    ],
  },
  {
    slug: 'yang-dipelajari-dari-internship-pertama',
    title: 'Apa yang dipelajari dari internship pertama',
    excerpt: 'Internship bukan hanya soal tugas harian. Ada kebiasaan kerja dan cara berkomunikasi yang baru terasa saat kamu mengalaminya.',
    categorySlug: 'internship', author: AUTHOR, publishedAt: '2026-10-09', cover: 'learn-mentor-session',
    body: [
      p('Internship memberi kesempatan melihat bagaimana pekerjaan berjalan di dunia nyata. Hasilnya tidak selalu berupa jabatan, tetapi pengalaman yang bisa kamu ceritakan dan tunjukkan.'),
      h2('Cara kerja dalam tim'),
      p('Kamu belajar menerima masukan, bertanya dengan tepat, dan mengerjakan bagian kecil yang saling terhubung dengan pekerjaan orang lain.'),
      h2('Mengelola ekspektasi'),
      p('Tidak semua tugas menarik, dan itu wajar. Catat apa yang kamu pelajari dari tiap tugas, termasuk yang terasa membosankan.'),
      h2('Mengumpulkan bahan untuk CV'),
      ul('Catat proyek yang kamu kerjakan dan peranmu', 'Simpan contoh hasil kerja yang boleh dibagikan', 'Minta umpan balik tertulis dari pembimbing bila memungkinkan'),
    ],
  },
  {
    slug: 'kebiasaan-keamanan-digital-dasar',
    title: 'Kebiasaan keamanan digital dasar yang bisa dimulai hari ini',
    excerpt: 'Keamanan siber tidak selalu rumit. Beberapa kebiasaan kecil sudah mengurangi banyak risiko di akun harian kamu.',
    categorySlug: 'dasar-keamanan', author: AUTHOR, publishedAt: '2026-10-08', cover: 'program-a',
    body: [
      p('Sebagian besar insiden keamanan pribadi berawal dari hal sederhana: kata sandi yang sama di banyak akun, atau tautan yang diklik tanpa dicek.'),
      h2('Kata sandi dan verifikasi dua langkah'),
      ul('Gunakan kata sandi berbeda untuk tiap akun penting', 'Simpan di pengelola kata sandi', 'Aktifkan verifikasi dua langkah di email dan akun keuangan'),
      h2('Waspada pada tautan dan lampiran'),
      p('Periksa alamat pengirim dan tujuan tautan sebelum mengklik. Pesan yang meminta kamu bertindak cepat atau membagikan kode sering kali upaya penipuan.'),
      h2('Perbarui perangkat'),
      p('Pembaruan sistem biasanya menutup celah keamanan yang sudah diketahui. Aktifkan pembaruan otomatis bila tersedia.'),
    ],
  },
  {
    slug: 'mengenal-peran-keamanan-siber-untuk-pemula',
    title: 'Mengenal peran di dunia keamanan siber untuk pemula',
    excerpt: 'Keamanan siber punya banyak peran, dari memantau ancaman sampai menguji sistem. Kenali gambarannya sebelum memilih arah belajar.',
    categorySlug: 'karier-keamanan', author: AUTHOR, publishedAt: '2026-10-06', cover: 'program-b',
    body: [
      p('Bidang keamanan siber tidak hanya satu pekerjaan. Ada beberapa peran dengan fokus berbeda, dan memahami perbedaannya membantu kamu menentukan apa yang perlu dipelajari lebih dulu.'),
      h2('Memantau dan merespons'),
      p('Peran ini mengawasi aktivitas yang mencurigakan dan menangani insiden saat terjadi. Kemampuan membaca log dan berpikir runtut sangat dipakai.'),
      h2('Menguji dan mengamankan sistem'),
      p('Peran ini mencari celah sebelum dimanfaatkan pihak lain, lalu membantu memperbaikinya. Pemahaman jaringan dan aplikasi menjadi dasarnya.'),
      h2('Mulai dari dasar yang sama'),
      ul('Dasar jaringan komputer', 'Sistem operasi dan baris perintah', 'Kebiasaan mencatat dan melaporkan temuan dengan jelas'),
    ],
  },
  {
    slug: 'gambaran-hari-kerja-data-analyst-junior',
    title: 'Gambaran hari kerja seorang data analyst junior',
    excerpt: 'Seperti apa pekerjaan data analyst di tahap awal? Ini gambaran umum alurnya, dari pertanyaan bisnis sampai penyampaian temuan.',
    categorySlug: 'data-analyst', author: AUTHOR, publishedAt: '2026-10-05', cover: 'program-c',
    body: [
      p('Pekerjaan analis data berbeda-beda antar perusahaan, tetapi alurnya sering mirip. Berikut gambaran umum yang bisa membantu kamu membayangkannya.'),
      h2('Mulai dari pertanyaan'),
      p('Analisis dimulai dari pertanyaan yang jelas, misalnya kenapa penjualan turun di satu bulan. Pertanyaan yang tajam menghemat banyak waktu.'),
      h2('Mengambil dan merapikan data'),
      p('Sebagian besar waktu dipakai untuk mengambil data dari berbagai sumber dan membersihkannya. Spreadsheet dan SQL menjadi alat yang paling sering dipakai.'),
      h2('Menyampaikan temuan'),
      p('Hasil analisis hanya berguna kalau bisa dipahami. Ringkas temuanmu, tunjukkan satu atau dua grafik yang paling jelas, dan sebutkan langkah yang disarankan.'),
    ],
  },
  {
    slug: 'spreadsheet-atau-sql-dipelajari-dulu',
    title: 'Spreadsheet atau SQL: mana yang dipelajari dulu?',
    excerpt: 'Keduanya dipakai analis data. Urutan belajar yang masuk akal membantu kamu cepat punya hasil yang bisa ditunjukkan.',
    categorySlug: 'sql-spreadsheet', author: AUTHOR, publishedAt: '2026-10-04', cover: 'work-1',
    body: [
      p('Pertanyaan ini sering muncul di awal belajar data. Jawabannya bergantung pada tujuan, tetapi ada urutan yang umumnya nyaman untuk pemula.'),
      h2('Mulai dari spreadsheet'),
      p('Spreadsheet memungkinkan kamu melihat data langsung dan memahami konsep dasar seperti baris, kolom, dan rumus tanpa harus memasang apa pun.'),
      h2('Lanjut ke SQL'),
      p('Setelah nyaman, SQL membantu kamu mengambil data dalam jumlah besar dari basis data. Konsep yang sudah kamu kenal di spreadsheet, seperti filter dan pengelompokan, muncul lagi di sini.'),
      ul('Spreadsheet: cepat untuk eksplorasi dan data kecil', 'SQL: tepat untuk data besar dan pengambilan berulang'),
    ],
  },
  {
    slug: 'rumus-spreadsheet-dasar-untuk-analis',
    title: 'Rumus spreadsheet dasar yang sering dipakai analis',
    excerpt: 'Beberapa rumus sudah cukup untuk memulai analisis sederhana. Kenali fungsinya dan latih dengan data kecil.',
    categorySlug: 'sql-spreadsheet', author: AUTHOR, publishedAt: '2026-10-02', cover: 'work-2',
    body: [
      p('Kamu tidak perlu menghafal ratusan rumus. Kuasai beberapa yang paling sering dipakai, lalu pelajari yang lain saat dibutuhkan.'),
      h2('Rumus untuk merangkum'),
      ul('SUM dan AVERAGE untuk total dan rata-rata', 'COUNT dan COUNTIF untuk menghitung data', 'SUMIF untuk menjumlahkan berdasarkan syarat'),
      h2('Rumus untuk mencari dan menggabungkan'),
      p('Fungsi pencarian seperti VLOOKUP atau XLOOKUP membantu menggabungkan dua tabel. Latih dengan dua tabel kecil yang punya satu kolom kunci yang sama.'),
      h2('Tabel pivot'),
      p('Tabel pivot meringkas data besar menjadi tabel yang mudah dibaca. Ini salah satu alat paling berguna untuk mulai melihat pola.'),
    ],
  },
  {
    slug: 'memilih-grafik-yang-tepat',
    title: 'Memilih grafik yang tepat untuk ceritamu',
    excerpt: 'Grafik yang baik membuat pesan langsung terbaca. Pilih bentuknya dari pertanyaan yang ingin kamu jawab.',
    categorySlug: 'visualisasi', author: AUTHOR, publishedAt: '2026-09-30', cover: 'work-3',
    body: [
      p('Data yang sama bisa terasa jelas atau membingungkan tergantung grafiknya. Mulailah dari pertanyaan: apa yang ingin dilihat pembaca dalam lima detik pertama?'),
      h2('Cocokkan bentuk dengan tujuan'),
      ul('Perubahan dari waktu ke waktu: grafik garis', 'Perbandingan antar kelompok: grafik batang', 'Bagian dari keseluruhan: batang bertumpuk dengan sedikit kategori'),
      h2('Kurangi yang tidak perlu'),
      p('Hapus garis bantu berlebihan, warna yang tidak bermakna, dan label yang berulang. Satu pesan utama per grafik biasanya lebih mudah diingat.'),
    ],
  },
  {
    slug: 'merencanakan-konten-media-sosial-satu-minggu',
    title: 'Merencanakan konten media sosial dalam satu minggu',
    excerpt: 'Rencana mingguan yang sederhana membantu kamu konsisten tanpa kehabisan ide. Mulai dari tujuan, lalu pilih format.',
    categorySlug: 'konten-sosial', author: AUTHOR, publishedAt: '2026-09-28', cover: 'program-d',
    body: [
      p('Konsisten lebih penting daripada sempurna. Rencana kecil yang bisa kamu jalankan lebih berguna daripada rencana besar yang berhenti di minggu kedua.'),
      h2('Tentukan tujuan dan audiens'),
      p('Tulis satu kalimat: siapa yang ingin kamu jangkau dan apa yang ingin mereka lakukan setelah melihat kontenmu.'),
      h2('Susun ritme mingguan'),
      ul('Satu konten yang mengedukasi', 'Satu konten yang menceritakan proses', 'Satu konten yang mengajak berinteraksi'),
      h2('Evaluasi singkat'),
      p('Di akhir minggu, lihat konten mana yang paling banyak ditanggapi dan catat polanya untuk minggu berikutnya.'),
    ],
  },
  {
    slug: 'seo-untuk-pemula-mulai-dari-pertanyaan-pembaca',
    title: 'SEO untuk pemula: mulai dari pertanyaan pembaca',
    excerpt: 'SEO bukan trik rahasia. Dasarnya adalah menjawab pertanyaan orang dengan jelas dan membuatnya mudah ditemukan.',
    categorySlug: 'seo-iklan', author: AUTHOR, publishedAt: '2026-09-26', cover: 'program-e',
    body: [
      p('Mesin pencari berusaha menampilkan halaman yang paling membantu pencarinya. Tugasmu adalah membuat halaman yang benar-benar menjawab pertanyaan itu.'),
      h2('Pahami apa yang dicari orang'),
      p('Tulis pertanyaan yang mungkin diketik pembaca, lalu pastikan tulisanmu menjawabnya di bagian awal.'),
      h2('Struktur yang jelas'),
      ul('Judul yang menjelaskan isi halaman', 'Subjudul yang runtut', 'Paragraf pendek dan tautan ke tulisan terkait'),
      h2('Sabar dan ukur'),
      p('Hasil SEO butuh waktu. Catat halaman mana yang mulai dikunjungi dan perbaiki bagian yang belum menjawab pertanyaan pembaca.'),
    ],
  },
  {
    slug: 'debit-dan-kredit-tanpa-menghafal',
    title: 'Debit dan kredit: cara membacanya tanpa menghafal',
    excerpt: 'Debit dan kredit sering terasa membingungkan. Pahami logikanya lewat persamaan dasar akuntansi, bukan hafalan.',
    categorySlug: 'akuntansi-dasar', author: AUTHOR, publishedAt: '2026-09-24', cover: 'program-f',
    body: [
      p('Debit bukan berarti bertambah dan kredit bukan berarti berkurang. Keduanya hanya sisi kiri dan kanan dari sebuah catatan, dan artinya bergantung pada jenis akunnya.'),
      h2('Mulai dari persamaan dasar'),
      p('Aset sama dengan kewajiban ditambah modal. Setiap transaksi harus menjaga persamaan ini tetap seimbang, dan itu sebabnya selalu ada dua sisi.'),
      h2('Latih dengan transaksi sederhana'),
      ul('Beli perlengkapan dengan uang tunai', 'Terima pembayaran dari pelanggan', 'Bayar sewa bulanan'),
      p('Tuliskan akun yang terpengaruh dan sisi mana yang bertambah. Setelah beberapa contoh, polanya mulai terasa.'),
    ],
  },
  {
    slug: 'tiga-laporan-keuangan-utama',
    title: 'Tiga laporan keuangan utama dan fungsinya',
    excerpt: 'Laporan posisi keuangan, laba rugi, dan arus kas menjawab pertanyaan yang berbeda. Kenali fungsi masing-masing.',
    categorySlug: 'laporan-keuangan', author: AUTHOR, publishedAt: '2026-09-22', cover: 'work-4',
    body: [
      p('Laporan keuangan adalah cara perusahaan menceritakan kondisinya dalam angka. Tiga laporan utama saling melengkapi.'),
      h2('Laporan posisi keuangan'),
      p('Menunjukkan apa yang dimiliki, apa yang terutang, dan modal pada satu titik waktu.'),
      h2('Laporan laba rugi'),
      p('Menunjukkan pendapatan dan biaya selama satu periode, sehingga terlihat apakah perusahaan untung atau rugi.'),
      h2('Laporan arus kas'),
      p('Menunjukkan uang tunai yang masuk dan keluar. Perusahaan bisa tampak untung tetapi tetap kekurangan kas, dan laporan ini membantu melihatnya.'),
    ],
  },
  {
    slug: 'rekonsiliasi-bank-untuk-pemula',
    title: 'Rekonsiliasi bank untuk pemula',
    excerpt: 'Rekonsiliasi bank mencocokkan catatan perusahaan dengan rekening koran. Ini langkah dasarnya agar selisih mudah ditemukan.',
    categorySlug: 'akuntansi-dasar', author: AUTHOR, publishedAt: '2026-09-20', cover: 'work-5',
    body: [
      p('Catatan kas perusahaan dan rekening koran bank sering berbeda. Rekonsiliasi membantu kamu menemukan penyebab selisihnya.'),
      h2('Siapkan dua sumber'),
      p('Ambil catatan kas untuk satu periode dan rekening koran pada periode yang sama.'),
      h2('Cocokkan satu per satu'),
      ul('Tandai transaksi yang sudah sama di kedua sisi', 'Catat transaksi yang hanya ada di salah satu sisi', 'Cari sebabnya, misalnya cek yang belum dicairkan atau biaya bank'),
      h2('Buat penyesuaian'),
      p('Setelah penyebab ditemukan, catat penyesuaian yang diperlukan sampai saldo kedua sisi cocok.'),
    ],
  },
]

/** Terbaru di atas. */
export const BLOG_ARTICLES: readonly BlogArticle[] = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

/** Segmen URL yang tidak boleh dipakai sebagai slug artikel (bentrok dengan rute blog). */
export const RESERVED_BLOG_SLUGS = ['grup', 'kategori', 'cari'] as const

export const getGroup = (slug: string) => BLOG_GROUPS.find((g) => g.slug === slug)
export const getCategory = (slug: string) => BLOG_CATEGORIES.find((c) => c.slug === slug)
export const getArticle = (slug: string) => BLOG_ARTICLES.find((a) => a.slug === slug)

export const categoriesOfGroup = (groupSlug: string) => BLOG_CATEGORIES.filter((c) => c.groupSlug === groupSlug)
export const articlesOfCategory = (categorySlug: string) => BLOG_ARTICLES.filter((a) => a.categorySlug === categorySlug)
export const articlesOfGroup = (groupSlug: string) => {
  const slugs = new Set(categoriesOfGroup(groupSlug).map((c) => c.slug))
  return BLOG_ARTICLES.filter((a) => slugs.has(a.categorySlug))
}

export function groupOfArticle(article: BlogArticle): BlogGroup | undefined {
  const category = getCategory(article.categorySlug)
  return category ? getGroup(category.groupSlug) : undefined
}

/** Artikel terkait: kategori yang sama dulu, lalu grup yang sama, lalu terbaru. */
export function relatedArticles(article: BlogArticle, count = 3): readonly BlogArticle[] {
  const group = groupOfArticle(article)
  const pool = [
    ...articlesOfCategory(article.categorySlug),
    ...(group ? articlesOfGroup(group.slug) : []),
    ...BLOG_ARTICLES,
  ].filter((a) => a.slug !== article.slug)
  return [...new Map(pool.map((a) => [a.slug, a])).values()].slice(0, count)
}

const WORDS_PER_MINUTE = 200

export function articleWords(article: BlogArticle): string {
  return [article.title, article.excerpt, ...article.body.map((b) => (b.type === 'ul' ? b.items.join(' ') : b.text))].join(' ')
}

export function readingMinutes(article: BlogArticle): number {
  const words = articleWords(article).split(/\s+/).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

/** 15/10/2026, seperti di referensi. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export const slugifyHeading = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
