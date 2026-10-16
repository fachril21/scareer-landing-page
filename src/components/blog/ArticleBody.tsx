import type { BlogBlock } from '../../content/blog.types'
import { slugifyHeading } from '../../content/blog'
import './blog.css'

/** Heading h2 yang masuk daftar isi. */
export function articleHeadings(body: readonly BlogBlock[]): { id: string; text: string }[] {
  return body.flatMap((b) => (b.type === 'h2' ? [{ id: slugifyHeading(b.text), text: b.text }] : []))
}

const TOC_MIN_HEADINGS = 3

/** Daftar isi hanya ada untuk artikel dengan tiga heading atau lebih; layout halaman mengikutinya. */
export const hasArticleToc = (body: readonly BlogBlock[]): boolean => articleHeadings(body).length >= TOC_MIN_HEADINGS

/** Daftar isi: hanya untuk artikel dengan tiga heading atau lebih. Tautan anchor memakai gulir halus yang sama dengan halaman lain. */
export function ArticleToc({ body }: { body: readonly BlogBlock[] }) {
  if (!hasArticleToc(body)) return null
  const headings = articleHeadings(body)
  return (
    <nav className="atoc" aria-label="Daftar isi artikel">
      <p className="atoc__title">Di artikel ini</p>
      <ol>
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Isi artikel dari blok terstruktur. Tanpa HTML mentah: teks selalu dirender sebagai teks. */
export function ArticleBody({ body }: { body: readonly BlogBlock[] }) {
  return (
    <div className="prose">
      {body.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={i} id={slugifyHeading(block.text)}>{block.text}</h2>
          case 'p':
            return <p key={i}>{block.text}</p>
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case 'quote':
            return <blockquote key={i}>{block.text}</blockquote>
        }
      })}
    </div>
  )
}
