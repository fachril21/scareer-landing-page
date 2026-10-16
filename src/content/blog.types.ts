/** Tiga level: Grup > Kategori > Artikel. Satu artikel punya satu kategori utama, satu kategori milik satu grup. */

export interface BlogGroup {
  slug: string
  name: string
  description: string
  /** Halaman program yang relevan untuk ajakan di akhir artikel (path). */
  programHref: string
  programName: string
}

export interface BlogCategory {
  slug: string
  name: string
  groupSlug: string
}

/** Isi artikel berupa blok terstruktur, dirender tanpa HTML mentah. */
export type BlogBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: readonly string[] }
  | { type: 'quote'; text: string }

export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  categorySlug: string
  author: string
  /** Format ISO, mis. 2026-10-15. */
  publishedAt: string
  /** Nama berkas di public/images tanpa ekstensi dan ukuran. */
  /** Dekoratif: judul artikel selalu ada sebagai teks di dekatnya. */
  cover: string
  body: readonly BlogBlock[]
}
