import { useEffect } from 'react'
import type { ProgramDetail } from '../../content/program-detail.types'
import { buildProgramMeta } from '../../lib/programMeta'

const JSON_LD_ATTR = 'data-program-jsonld'

function setMeta(selector: string, create: () => HTMLMetaElement, content: string): () => void {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  const created = !el
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  const previous = el.content
  el.content = content
  return () => {
    if (created) el?.remove()
    else if (el) el.content = previous
  }
}

const nameMeta = (name: string) => () => Object.assign(document.createElement('meta'), { name })
const propertyMeta = (property: string) => () => {
  const el = document.createElement('meta')
  el.setAttribute('property', property)
  return el
}

/** Mengatur title, meta description, Open Graph, dan JSON-LD dari data program, lalu mengembalikannya saat keluar halaman. */
export function ProgramMeta({ program }: { program: ProgramDetail }) {
  useEffect(() => {
    const meta = buildProgramMeta(program, window.location.origin)
    const previousTitle = document.title
    document.title = meta.title

    const undo = [
      setMeta('meta[name="description"]', nameMeta('description'), meta.description),
      setMeta('meta[property="og:title"]', propertyMeta('og:title'), meta.title),
      setMeta('meta[property="og:description"]', propertyMeta('og:description'), meta.description),
      setMeta('meta[property="og:image"]', propertyMeta('og:image'), `${window.location.origin}/images/${program.hero.photo}-1200.webp`),
    ]

    const scripts = meta.jsonLd.map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute(JSON_LD_ATTR, '')
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })

    return () => {
      document.title = previousTitle
      undo.forEach((fn) => fn())
      scripts.forEach((s) => s.remove())
    }
  }, [program])

  return null
}
