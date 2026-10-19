import { useLayoutEffect } from 'react'

const MAX_STEPS = 4
/** Lewat durasi transisi + stagger, penanda dilepas supaya elemen bebas dari aturan reveal. */
const RELEASE_AFTER_MS = 1100
const ROOT_CLASS = 'js-reveal'

/** Anak langsung kontainer tiap section (kecuali Hero dan Ringkasan), ditambah elemen dengan `data-reveal-item`. */
const TARGETS = 'main > section:not(#beranda):not(#ringkasan) > .container > *:not(.sr-only), [data-reveal-item]'
const GROUP_ATTR = 'data-reveal-group'

interface Target {
  el: HTMLElement
  index: number
}

/** Jenis reveal. Judul section masuk dengan wipe naik; elemen lain bisa memilih lewat `data-reveal-kind`. */
function revealKind(el: HTMLElement, interactive: boolean): string {
  if (!interactive) return ''
  if (el.matches('h1, h2')) return 'title'
  return el.dataset.revealKind ?? ''
}

function collectTargets(): Target[] {
  const found = new Map<HTMLElement, number>()
  document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
    if (el.hasAttribute(GROUP_ATTR)) {
      Array.from(el.children).forEach((child, i) => found.set(child as HTMLElement, i))
      return
    }
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
    found.set(el, Math.max(0, siblings.indexOf(el)))
  })
  return Array.from(found, ([el, index]) => ({ el, index: Math.min(index, MAX_STEPS) }))
}

function clear(el: HTMLElement) {
  delete el.dataset.reveal
  delete el.dataset.revealed
  el.style.removeProperty('--reveal-i')
}

/**
 * Fade-up saat elemen masuk viewport. Satu IntersectionObserver, sekali jalan per elemen.
 * Atribut dipasang lewat DOM (bukan className) supaya render ulang React tidak menimpanya.
 * Tanpa JS, tanpa IntersectionObserver, atau dengan reduced-motion, konten tampil seperti biasa.
 */
export function useScrollReveal(resetKey?: string, interactive = false) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    const targets = collectTargets()
    const timers: number[] = []

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Elemen yang sudah terlewat di atas viewport (mis. loncat via anchor) langsung ditampilkan.
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) continue
          const el = entry.target as HTMLElement
          observer.unobserve(el)
          el.dataset.revealed = ''
          timers.push(window.setTimeout(() => clear(el), RELEASE_AFTER_MS))
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    document.documentElement.classList.add(ROOT_CLASS)
    targets.forEach(({ el, index }) => {
      el.dataset.reveal = revealKind(el, interactive)
      el.style.setProperty('--reveal-i', String(index))
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
      timers.forEach((t) => window.clearTimeout(t))
      targets.forEach(({ el }) => clear(el))
      document.documentElement.classList.remove(ROOT_CLASS)
    }
  }, [resetKey, interactive])
}
