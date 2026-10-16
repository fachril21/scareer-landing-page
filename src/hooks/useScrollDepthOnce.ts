import { useEffect, type RefObject } from 'react'

/** Memanggil `onSeen` sekali saja, saat elemen mulai masuk viewport (atau setelah `threshold` bagiannya terlihat). */
export function useScrollDepthOnce(ref: RefObject<Element | null>, onSeen: () => void, threshold = 0) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      onSeen()
      observer.disconnect()
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
    // onSeen sengaja tidak jadi dependensi: observer dipasang sekali per elemen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, threshold])
}
