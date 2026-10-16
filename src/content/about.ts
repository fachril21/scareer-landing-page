/**
 * Konten halaman Tentang kami. Fakta yang belum ada tetap `[ISI]`.
 * Visi dan misi adalah draf yang diturunkan dari PRODUCT.md: perlu dikonfirmasi tim sebelum rilis.
 */
export const ABOUT_HERO = {
  title: 'Teman setara untuk kerja pertamamu.',
  lead: 'scareer adalah bootcamp terjangkau dengan internship, Supported by Dibimbing. Kami bicara dari samping, bukan dari atas.',
} as const

export const ABOUT_VISION = {
  title: 'Visi dan misi',
  vision: {
    label: 'Visi',
    statement: [
      { text: 'Setiap fresh graduate berhak punya ' },
      { text: 'kesempatan pertama', mark: true },
      { text: ' untuk membuktikan diri.' },
    ],
  },
  mission: {
    label: 'Misi',
    items: [
      'Mengajarkan skill yang dipakai industri lewat video dan kelas live bersama mentor.',
      'Menyediakan internship sebagai panggung untuk membuktikan kemampuan, tanpa menjanjikan pekerjaan.',
      'Menjaga biaya tetap terjangkau dan menulis dengan jujur apa yang termasuk dan tidak.',
    ],
  },
  draft: '[ISI] Draf visi dan misi, perlu dikonfirmasi tim.',
} as const

export const ABOUT_CONTACT = {
  title: 'Alamat dan kontak',
  rows: [
    { label: 'Alamat', value: '[ISI: alamat kantor]' },
    { label: 'Jam layanan', value: '[ISI]' },
    { label: 'Telepon', value: '[ISI: menunggu tim]' },
    { label: 'Website', value: '[ISI]' },
  ],
  email: 'salsabila@dibimbing.id',
  mapLabel: 'Peta [ISI]',
} as const
