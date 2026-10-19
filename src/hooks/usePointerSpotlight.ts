import { useEffect, type RefObject } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

const clampUnit = (n: number) => Math.max(-1, Math.min(1, n)).toFixed(3)

/**
 * Menulis posisi kursor ke kartu yang sedang disentuh: `--sx`/`--sy` (px, dari sudut kiri atas) dan
 * `--tx`/`--ty` (-1 sampai 1, dari pusat kartu). Dikosongkan saat kursor meninggalkan kartu.
 * Satu listener di kontainer untuk semua kartu `selector`; CSS yang menentukan efeknya.
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
      card.style.setProperty('--tx', clampUnit(((e.clientX - r.left) / r.width) * 2 - 1))
      card.style.setProperty('--ty', clampUnit(((e.clientY - r.top) / r.height) * 2 - 1))
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const card = e.target instanceof Element ? e.target.closest<HTMLElement>(selector) : null
      card?.style.removeProperty('--tx')
      card?.style.removeProperty('--ty')
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerout', onLeave, { passive: true })
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerout', onLeave)
    }
  }, [ref, selector, enabled])
}
