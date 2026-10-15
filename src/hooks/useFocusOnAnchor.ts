import { useEffect } from 'react'

/** Setelah lompat ke anchor, fokus keyboard pindah ke judul section tujuan (Design.md bab 6). */
export function useFocusOnAnchor() {
  useEffect(() => {
    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id || id.startsWith('faq-')) return
      const target = document.getElementById(id)
      const heading = target?.matches('h1, h2, h3') ? target : target?.querySelector<HTMLElement>('h1, h2, h3')
      if (!heading) return
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
}
