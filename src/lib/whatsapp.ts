/** Nomor WhatsApp belum ada: tetap placeholder sampai tim mengisinya (Design.md bab 12, no. 3). */
export const WA_NUMBER = '0000000000'

export type WaSource =
  | 'Navbar'
  | 'Hero'
  | 'Apa itu scareer'
  | 'Program'
  | 'Cara belajar'
  | 'FAQ'
  | 'CTA penutup'
  | 'Footer'
  | 'Tentang'
  | 'Bar sticky'
  | 'Detail: Hero'
  | 'Detail: Masalah'
  | 'Detail: Detail program'
  | 'Detail: Harga'
  | 'Detail: FAQ'
  | 'Detail: Jadwal'
  | 'Detail: Kurikulum'
  | 'Detail: Bar sticky'
  | 'Detail: Daftar isi'

export function waLink(source: WaSource, message: string): string {
  const text = `${message} (dari ${source})`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
