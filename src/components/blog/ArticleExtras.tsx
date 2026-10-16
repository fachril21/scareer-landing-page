import { useEffect, useRef, useState } from 'react'
import { Link2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import type { BlogArticle, BlogGroup } from '../../content/blog.types'
import { relatedArticles } from '../../content/blog'
import { ArticleCard } from './ArticleCard'
import './blog.css'

const COPIED_MS = 2000

/** Bagikan lewat WhatsApp atau salin tautan. Status salin diumumkan ke pembaca layar. */
export function ShareRow({ article }: { article: BlogArticle }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const url = `${window.location.origin}/blog/${article.slug}`
  const waHref = `https://wa.me/?text=${encodeURIComponent(`${article.title} ${url}`)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), COPIED_MS)
    } catch {
      // Clipboard diblokir: tautan tetap ada di bilah alamat.
    }
  }

  return (
    <div className="ashare">
      <p>Bagikan artikel ini</p>
      <div className="ashare__actions">
        <a className="ashare__btn" href={waHref} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={18} />
          WhatsApp
          <span className="sr-only"> (membuka tab baru)</span>
        </a>
        <button type="button" className="ashare__btn" onClick={copy}>
          <Link2 size={18} strokeWidth={1.75} aria-hidden="true" />
          Salin tautan
        </button>
        <span className="ashare__status" role="status" aria-live="polite">{copied ? 'Tautan disalin' : ''}</span>
      </div>
    </div>
  )
}

/** Ajakan ke program yang relevan dengan grup artikel. Tanpa janji hasil. */
export function ProgramCta({ group }: { group: BlogGroup }) {
  return (
    <aside className="acta" aria-label="Lanjut belajar">
      <h2>Mau belajar lebih dalam?</h2>
      <p>Lihat {group.programName} di scareer: belajar lewat video dan kelas live bersama mentor, lalu lanjut internship.</p>
      <Button href={group.programHref}>Lihat {group.programName}</Button>
    </aside>
  )
}

export function RelatedArticles({ article }: { article: BlogArticle }) {
  const related = relatedArticles(article)
  if (related.length === 0) return null
  return (
    <section className="arelated" aria-labelledby="related-title">
      <h2 id="related-title">Artikel terkait</h2>
      <ul className="agrid agrid--related">
        {related.map((a) => (
          <li key={a.slug}>
            <ArticleCard article={a} />
          </li>
        ))}
      </ul>
    </section>
  )
}
