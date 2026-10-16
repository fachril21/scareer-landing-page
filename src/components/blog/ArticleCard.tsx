import { Photo } from '../ui/Primitives'
import { formatDate, getCategory } from '../../content/blog'
import type { BlogArticle } from '../../content/blog.types'
import { splitByQuery } from '../../lib/blogSearch'
import './blog.css'

/** Teks dengan kata kunci pencarian disorot (tanpa HTML mentah). */
export function Highlight({ text, query }: { text: string; query?: string }) {
  if (!query) return <>{text}</>
  return (
    <>
      {splitByQuery(text, query).map((part, i) =>
        part.match ? <mark key={i} className="hl">{part.text}</mark> : <span key={i}>{part.text}</span>,
      )}
    </>
  )
}

export function AuthorMark({ name }: { name: string }) {
  return <span className="amark" aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
}

/**
 * Kartu artikel: sampul, penulis dan tanggal, judul, kutipan, kategori. Seluruh kartu bisa diklik lewat tautan judul;
 * tautan kategori tetap berdiri sendiri. Judul selalu teks hidup (tidak tertanam di gambar).
 */
export function ArticleCard({ article, query }: { article: BlogArticle; query?: string }) {
  const category = getCategory(article.categorySlug)
  const href = `/blog/${article.slug}`
  return (
    <article className="acard">
      <div className="acard__cover">
        <Photo name={article.cover} alt="" width={1200} height={750} sizes="(min-width: 1280px) 340px, (min-width: 640px) 45vw, 92vw" />
      </div>
      <p className="acard__meta">
        <AuthorMark name={article.author} />
        <span>{article.author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.publishedAt} className="num">{formatDate(article.publishedAt)}</time>
      </p>
      <h3 className="acard__title">
        <a href={href}><Highlight text={article.title} query={query} /></a>
      </h3>
      <p className="acard__excerpt"><Highlight text={article.excerpt} query={query} /></p>
      {category && <a className="acard__cat" href={`/blog/kategori/${category.slug}`}>{category.name}</a>}
    </article>
  )
}
