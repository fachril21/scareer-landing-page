import { useEffect, type RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

/** Jarak scroll (px) sampai navbar berubah penuh jadi pill. */
const RANGE_PX = 96
/** Bagian selisih yang dikejar tiap frame: makin kecil makin lembut. */
const EASE = 0.18
const SETTLE_EPSILON = 0.002

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Mengisi `--nav-p` (0..1) pada elemen sesuai posisi scroll, dengan redaman supaya scroll roda mouse
 * yang melompat-lompat tetap terasa halus. Tidak memicu render React. Reduced-motion: mengikuti scroll tanpa redaman.
 */
export function useNavProgress(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const target = () => clamp01(window.scrollY / RANGE_PX)
    let current = target()
    let frame = 0
    const apply = () => el.style.setProperty('--nav-p', current.toFixed(3))

    const tick = () => {
      const goal = target()
      const gap = goal - current
      if (reduced || Math.abs(gap) < SETTLE_EPSILON) {
        current = goal
        apply()
        frame = 0
        return
      }
      current += gap * EASE
      apply()
      frame = requestAnimationFrame(tick)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      el.style.removeProperty('--nav-p')
    }
  }, [ref, enabled, reduced])
}
