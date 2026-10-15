import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

const FADE_MS = 200

/**
 * Filter chip dengan pola Program: item yang tidak cocok memudar 200 ms, baru daftar disusun ulang.
 * `selected` dipakai untuk chip, `applied` untuk daftar yang dirender.
 */
export function useFadeFilter<K extends string>(initial: K) {
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<K>(initial)
  const [applied, setApplied] = useState<K>(initial)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const choose = useCallback(
    (next: K) => {
      setSelected(next)
      window.clearTimeout(timer.current)
      if (reduced) setApplied(next)
      else timer.current = window.setTimeout(() => setApplied(next), FADE_MS)
    },
    [reduced],
  )

  return { selected, applied, choose, fadingOut: selected !== applied }
}
