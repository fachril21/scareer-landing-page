import { articleWords, getCategory, groupOfArticle, BLOG_ARTICLES } from '../content/blog'
import type { BlogArticle } from '../content/blog.types'

/** Huruf kecil dan tanpa tanda diakritik, supaya "Wawancara" dan "wawancara" dianggap sama. */
export const normalize = (text: string): string =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export const tokenize = (query: string): string[] => normalize(query).split(/[^a-z0-9]+/).filter((t) => t.length > 1)

const WEIGHT = { title: 3, category: 2, excerpt: 2, body: 1 } as const

function scoreArticle(article: BlogArticle, tokens: readonly string[]): number {
  const category = getCategory(article.categorySlug)
  const group = groupOfArticle(article)
  const fields = {
    title: normalize(article.title),
    category: normalize(`${category?.name ?? ''} ${group?.name ?? ''}`),
    excerpt: normalize(article.excerpt),
    body: normalize(articleWords(article)),
  }
  let total = 0
  for (const token of tokens) {
    // Semua kata kunci harus ditemukan di salah satu bagian artikel.
    let best = 0
    for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
      if (fields[key].includes(token)) best = Math.max(best, WEIGHT[key])
    }
    if (best === 0) return 0
    total += best
  }
  return total
}

/** Cari artikel: semua kata harus cocok, urut berdasarkan skor lalu tanggal terbaru. Tanpa kata kunci, hasilnya kosong. */
export function searchArticles(query: string): readonly BlogArticle[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []
  return BLOG_ARTICLES.map((article) => ({ article, score: scoreArticle(article, tokens) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || b.article.publishedAt.localeCompare(a.article.publishedAt))
    .map((r) => r.article)
}

/** Memecah teks menjadi potongan yang cocok dan tidak cocok dengan kata kunci, untuk disorot tanpa HTML mentah. */
export function splitByQuery(text: string, query: string): { text: string; match: boolean }[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return [{ text, match: false }]
  // Pemetaan indeks aman karena normalisasi NFD hanya menghapus tanda gabung (panjang teks asli tidak dipakai untuk indeks).
  const folded = normalize(text)
  const ranges: [number, number][] = []
  for (const token of tokens) {
    let from = 0
    while (from < folded.length) {
      const at = folded.indexOf(token, from)
      if (at < 0) break
      ranges.push([at, at + token.length])
      from = at + token.length
    }
  }
  if (ranges.length === 0 || folded.length !== text.length) return [{ text, match: false }]
  ranges.sort((a, b) => a[0] - b[0])
  const merged: [number, number][] = []
  for (const r of ranges) {
    const last = merged[merged.length - 1]
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1])
    else merged.push([...r])
  }
  const parts: { text: string; match: boolean }[] = []
  let cursor = 0
  for (const [start, end] of merged) {
    if (start > cursor) parts.push({ text: text.slice(cursor, start), match: false })
    parts.push({ text: text.slice(start, end), match: true })
    cursor = end
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false })
  return parts
}
