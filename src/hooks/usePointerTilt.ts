import { useEffect, type RefObject } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/**
 * Menulis posisi kursor relatif ke pusat elemen ke `--tx` dan `--ty` (rentang -1 sampai 1).
 * CSS yang memutuskan efeknya (miring, sorot). Hanya untuk mouse; sentuh dan pena diabaikan.
 * Satu listener di kontainer, ditulis langsung ke style, tanpa state React.
 */
export function usePointerTilt<T extends HTMLElement>(ref: RefObject<T | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || !window.matchMedia(FINE_POINTER).matches) return

    let frame = 0
    let x = 0
    let y = 0

    const apply = () => {
      frame = 0
      el.style.setProperty('--tx', x.toFixed(3))
      el.style.setProperty('--ty', y.toFixed(3))
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1))
      y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1))
      if (!frame) frame = window.requestAnimationFrame(apply)
    }
    const onLeave = () => {
      x = 0
      y = 0
      if (!frame) frame = window.requestAnimationFrame(apply)
    }

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame) window.cancelAnimationFrame(frame)
      el.style.removeProperty('--tx')
      el.style.removeProperty('--ty')
    }
  }, [ref, enabled])
}
