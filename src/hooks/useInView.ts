import { useEffect, useRef, useState, type RefObject } from 'react'

/** Menandai sekali saja saat elemen terlihat sedikitnya `threshold` di viewport. */
export function useInViewOnce<T extends Element>(threshold = 0.6): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [seen, threshold])

  return [ref, seen]
}

/** Kumpulan id section yang sedang beririsan dengan viewport. */
export function useVisibleSections(ids: readonly string[], rootMargin = '0px'): ReadonlySet<string> {
  const [visible, setVisible] = useState<ReadonlySet<string>>(() => new Set())

  useEffect(() => {
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev)
          for (const entry of entries) {
            if (entry.isIntersecting) next.add(entry.target.id)
            else next.delete(entry.target.id)
          }
          return next
        })
      },
      { rootMargin },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|'), rootMargin])

  return visible
}
