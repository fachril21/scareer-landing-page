import { useState } from 'react'
import { Button } from '../ui/Button'
import type { BlogArticle } from '../../content/blog.types'
import { ArticleCard } from './ArticleCard'
import './blog.css'

const STEP = 9

/** Grid kartu artikel dengan "Tampilkan lebih banyak" (tanpa paginasi). Jumlah yang tampil diumumkan ke pembaca layar. */
export function ArticleGrid({ articles, query, empty }: { articles: readonly BlogArticle[]; query?: string; empty?: React.ReactNode }) {
  const [limit, setLimit] = useState(STEP)
  if (articles.length === 0) return <>{empty}</>
  const shown = articles.slice(0, limit)

  return (
    <>
      <ul className="agrid">
        {shown.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} query={query} />
          </li>
        ))}
      </ul>
      <p className="sr-only" role="status" aria-live="polite">Menampilkan {shown.length} dari {articles.length} artikel</p>
      {articles.length > shown.length && (
        <div className="agrid__more">
          <p className="num">{shown.length} dari {articles.length} artikel</p>
          <Button variant="outline" onClick={() => setLimit((n) => n + STEP)}>Tampilkan lebih banyak</Button>
        </div>
      )}
    </>
  )
}
