import { useEffect, type RefObject } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/**
 * Menulis posisi kursor (px, relatif ke sudut kiri atas) ke `--sx` dan `--sy` di kartu yang sedang disentuh.
 * Satu listener di kontainer untuk semua kartu `selector`; CSS yang menggambar sorotannya.
 */
export function usePointerSpotlight<T extends HTMLElement>(ref: RefObject<T | null>, selector: string, enabled: boolean) {
  useEffect(() => {
    const root = ref.current
    if (!root || !enabled || !window.matchMedia(FINE_POINTER).matches) return

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const card = (e.target as Element | null)?.closest<HTMLElement>(selector)
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--sx', `${Math.round(e.clientX - r.left)}px`)
      card.style.setProperty('--sy', `${Math.round(e.clientY - r.top)}px`)
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    return () => root.removeEventListener('pointermove', onMove)
  }, [ref, selector, enabled])
}
