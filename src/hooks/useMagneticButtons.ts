import { useEffect } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const TARGET = '.btn--lg:not(.btn--link)'
const PULL_PX = 4

/**
 * Tombol besar bergeser sedikit (maks. 4 px) ke arah kursor selama kursor berada di atasnya.
 * Satu listener di dokumen; geseran ditulis ke `--mx` dan `--my`, CSS yang menerapkannya.
 */
export function useMagneticButtons(enabled: boolean) {
  useEffect(() => {
    if (!enabled || !window.matchMedia(FINE_POINTER).matches) return

    let active: HTMLElement | null = null
    const release = () => {
      active?.style.removeProperty('--mx')
      active?.style.removeProperty('--my')
      active = null
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const target = (e.target as Element | null)?.closest<HTMLElement>(TARGET) ?? null
      if (active && active !== target) release()
      if (!target) return
      const r = target.getBoundingClientRect()
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 2
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 2
      target.style.setProperty('--mx', `${(dx * PULL_PX).toFixed(1)}px`)
      target.style.setProperty('--my', `${(dy * PULL_PX).toFixed(1)}px`)
      active = target
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', release)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', release)
      release()
    }
  }, [enabled])
}
