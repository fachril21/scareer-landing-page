import { useEffect } from 'react'

function ensureMeta(name: string): { el: HTMLMetaElement; created: boolean } {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (existing) return { el: existing, created: false }
  const el = Object.assign(document.createElement('meta'), { name })
  document.head.appendChild(el)
  return { el, created: true }
}

interface PageMetaOptions {
  /** Halaman yang tidak boleh diindeks, mis. hasil pencarian. */
  noindex?: boolean
  /** Data terstruktur (JSON-LD) halaman ini. */
  jsonLd?: object
}

/** Mengatur title, meta description, robots, dan JSON-LD halaman, lalu mengembalikannya saat keluar halaman. */
export function usePageMeta(title: string, description: string, { noindex = false, jsonLd }: PageMetaOptions = {}) {
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const desc = ensureMeta('description')
    const previousDescription = desc.el.content
    desc.el.content = description

    const robots = noindex ? ensureMeta('robots') : null
    const previousRobots = robots?.el.content ?? ''
    if (robots) robots.el.content = 'noindex'

    let script: HTMLScriptElement | null = null
    if (jsonLdText) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = jsonLdText
      document.head.appendChild(script)
    }

    return () => {
      document.title = previousTitle
      if (desc.created) desc.el.remove()
      else desc.el.content = previousDescription
      if (robots) {
        if (robots.created) robots.el.remove()
        else robots.el.content = previousRobots
      }
      script?.remove()
    }
  }, [title, description, noindex, jsonLdText])
}
