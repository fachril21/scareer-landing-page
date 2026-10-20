import { useLayoutEffect, type RefObject } from 'react'

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

interface Range {
  /** Posisi atas elemen (pecahan tinggi viewport) saat progres 0. */
  start?: number
  /** Posisi bawah elemen (pecahan tinggi viewport) saat progres 1. */
  end?: number
  /**
   * Alternatif `end`: progres 1 saat sisi ATAS elemen mencapai posisi ini (pecahan tinggi viewport).
   * Tidak bergantung pada tinggi elemen, jadi titik selesainya sama di desktop dan mobile.
   */
  endTop?: number
  /** Nilai `--p` menyusul posisi scroll dengan easing, bukan melompat tiap event scroll. */
  smooth?: boolean
}

/** Seberapa cepat nilai tampil mengejar target per frame (0 sampai 1). Makin kecil makin halus dan lambat. */
const FOLLOW_RATE = 0.1
const SETTLE_EPSILON = 0.0006

/**
 * Menulis progres scroll elemen (0 sampai 1) ke CSS variable `--p` di elemen itu.
 * Tanpa `enabled`, variable dilepas dan CSS memakai nilai bawaannya (konten tampil utuh).
 * Satu listener scroll pasif, dibatasi rAF, dan hanya bekerja saat elemen dekat viewport.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled: boolean,
  { start = 0.8, end = 0.6, endTop, smooth = false }: Range = {},
) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (!enabled || !('IntersectionObserver' in window)) {
      el.style.removeProperty('--p')
      return
    }

    let frame = 0
    let nearScreen = true
    let shown: number | null = null

    const write = (value: number) => {
      shown = value
      el.style.setProperty('--p', value.toFixed(4))
    }

    const update = () => {
      frame = 0
      const { top, height } = el.getBoundingClientRect()
      const vh = window.innerHeight
      const span = endTop === undefined ? height + vh * (start - end) : vh * (start - endTop)
      const target = clamp01((vh * start - top) / span)
      if (!smooth || shown === null) {
        write(target)
        return
      }
      const gap = target - shown
      if (Math.abs(gap) < SETTLE_EPSILON) {
        write(target)
        return
      }
      write(shown + gap * FOLLOW_RATE)
      // Terus mengejar sampai menyusul, walau scroll sudah berhenti.
      frame = window.requestAnimationFrame(update)
    }
    const schedule = () => {
      if (nearScreen && !frame) frame = window.requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        nearScreen = entry.isIntersecting
        schedule()
      },
      { rootMargin: '25% 0px' },
    )
    observer.observe(el)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    update()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
      el.style.removeProperty('--p')
    }
  }, [ref, enabled, start, end, endTop, smooth])
}
