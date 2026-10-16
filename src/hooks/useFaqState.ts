import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FaqItem } from '../content/content'
import { scrollToElement } from '../lib/scrollTo'
import { OPEN_FAQ_EVENT } from '../lib/sectionLink'

/** Deep-link `#faq-nama` membuka butir dan menggulung ke sana. */
function idFromHash(hash: string, ids: ReadonlySet<string>): string | null {
  const id = hash.replace(/^#faq-/, '')
  return hash.startsWith('#faq-') && ids.has(id) ? id : null
}

interface UseFaqStateOptions {
  items: readonly FaqItem[]
  /** Dipanggil saat butir dibuka lewat klik atau event (bukan saat ditutup). */
  onOpen?: (id: string) => void
  /** Dipanggil saat butir dibuka dari luar daftar (hash atau `openFaq`), mis. untuk membatalkan filter. */
  onReveal?: (id: string) => void
}

/**
 * Keadaan buka-tutup FAQ: boleh beberapa terbuka, terbuka dari hash `#faq-nama` di URL,
 * dan dari bagian lain halaman lewat `openFaq` (mis. "Perangkat minimum" di Program Detail).
 */
export function useFaqState({ items, onOpen, onReveal }: UseFaqStateOptions) {
  const ids = useMemo(() => new Set(items.map((f) => f.id)), [items])
  const [open, setOpen] = useState<ReadonlySet<string>>(() => {
    const id = idFromHash(window.location.hash, ids)
    return new Set(id ? [id] : [])
  })

  const toggle = useCallback(
    (id: string) => {
      if (!open.has(id)) onOpen?.(id)
      setOpen((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    },
    [open, onOpen],
  )

  useEffect(() => {
    const onOpenFaq = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail.id
      if (!ids.has(id)) return
      onOpen?.(id)
      onReveal?.(id)
      setOpen((prev) => new Set(prev).add(id))
    }
    window.addEventListener(OPEN_FAQ_EVENT, onOpenFaq)
    return () => window.removeEventListener(OPEN_FAQ_EVENT, onOpenFaq)
  }, [ids, onOpen, onReveal])

  useEffect(() => {
    const onHash = () => {
      const id = idFromHash(window.location.hash, ids)
      if (!id) return
      onReveal?.(id)
      setOpen((prev) => new Set(prev).add(id))
      const el = document.getElementById(`faq-${id}`)
      if (el) scrollToElement(el, { align: 'center' })
    }
    window.addEventListener('hashchange', onHash)
    if (idFromHash(window.location.hash, ids)) onHash()
    return () => window.removeEventListener('hashchange', onHash)
  }, [ids, onReveal])

  return { open, toggle }
}
