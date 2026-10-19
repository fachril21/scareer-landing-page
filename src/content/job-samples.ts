import { HERO } from './content'

/**
 * Contoh lowongan untuk kartu di foto Hero (tweak "Kartu lowongan di foto" = refresh).
 * Semuanya contoh buatan: nama perusahaan sengaja berawalan "PT Contoh", tanpa merek nyata.
 * Isi pertama sama dengan kartu bawaan, jadi tampilan awal tidak berubah.
 */
export interface JobSample {
  title: string
  company: string
  heading: string
  items: readonly string[]
  /** Indeks baris syarat yang dicoret. */
  struckIndex: number
  /** Catatan kakak tingkat di samping kartu. */
  note: string
  ariaLabel: string
}

const ariaFor = (title: string) => `Contoh lowongan ${title} yang meminta pengalaman 2 tahun untuk fresh graduate`

export const JOB_SAMPLES: readonly JobSample[] = [
  { ...HERO.job, note: HERO.note },
  {
    title: 'Junior Data Analyst',
    company: 'PT Contoh Data Nusantara',
    heading: 'Kualifikasi',
    items: ['Fresh graduate welcome', 'Min. pengalaman 2 tahun', 'Menguasai SQL, Excel, Tableau'],
    struckIndex: 1,
    note: 'welcome, tapi syaratnya 2 tahun?',
    ariaLabel: ariaFor('Junior Data Analyst'),
  },
  {
    title: 'Digital Marketing Officer',
    company: 'PT Contoh Kreatif Digital',
    heading: 'Kualifikasi',
    items: ['Terbuka untuk fresh graduate', 'Pengalaman 2 tahun di agensi', 'Menguasai Meta Ads, GA4, Canva'],
    struckIndex: 1,
    note: 'terbuka, tapi minta jam terbang?',
    ariaLabel: ariaFor('Digital Marketing Officer'),
  },
  {
    title: 'Junior Cyber Security Analyst',
    company: 'PT Contoh Siber Aman',
    heading: 'Kualifikasi',
    items: ['Fresh graduate dipersilakan', 'Min. 2 tahun di keamanan siber', 'Paham SIEM, firewall, CEH'],
    struckIndex: 1,
    note: 'belajar 2 tahun-nya di mana, Kak?',
    ariaLabel: ariaFor('Junior Cyber Security Analyst'),
  },
  {
    title: 'Staff Akuntansi',
    company: 'PT Contoh Sejahtera Abadi',
    heading: 'Kualifikasi',
    items: ['Fresh graduate boleh melamar', 'Pengalaman min. 2 tahun', 'Menguasai Accurate, Excel, pajak'],
    struckIndex: 1,
    note: 'boleh melamar, tapi...',
    ariaLabel: ariaFor('Staff Akuntansi'),
  },
  {
    title: 'Junior Social Media Specialist',
    company: 'PT Contoh Media Bersama',
    heading: 'Kualifikasi',
    items: ['Fresh graduate welcome', 'Portofolio dan 2 tahun pengalaman', 'Menguasai Canva, CapCut, Analytics'],
    struckIndex: 1,
    note: 'portofolio dari mana, Kak?',
    ariaLabel: ariaFor('Junior Social Media Specialist'),
  },
]
