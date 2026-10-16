const HEADING = 'h1, h2, h3'
const FIRST_SECTION = 'ringkasan'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const MIN_DURATION = 450
const MAX_DURATION = 1000
/** Gerakan manual pengguna yang membatalkan gulir otomatis. */
const CANCEL_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const

let cancelActive: (() => void) | null = null

const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/** Lama gulir naik mengikuti jarak, tapi tidak lebih dari 1 detik: dekat terasa sigap, jauh tetap tenang. */
const durationFor = (distance: number): number => Math.min(MAX_DURATION, MIN_DURATION + Math.sqrt(distance) * 11)

const maxScrollTop = (): number => document.documentElement.scrollHeight - window.innerHeight

/**
 * Gulir ke posisi `top` dengan easing sendiri (durasi browser untuk `behavior: smooth` tidak bisa diatur).
 * Berhenti seketika kalau pengguna menggulung, menyentuh, atau menekan tombol; hormati reduced motion.
 */
export function scrollToY(top: number, { instant = false }: { instant?: boolean } = {}): void {
  cancelActive?.()
  const target = Math.max(0, Math.min(top, maxScrollTop()))
  const from = window.scrollY
  const distance = Math.abs(target - from)
  if (instant || prefersReducedMotion() || distance < 2) {
    window.scrollTo({ top: target, behavior: 'instant' })
    return
  }

  const duration = durationFor(distance)
  const start = performance.now()
  let frame = 0
  const stop = () => {
    cancelAnimationFrame(frame)
    CANCEL_EVENTS.forEach((type) => window.removeEventListener(type, stop))
    if (cancelActive === stop) cancelActive = null
  }
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration)
    // `instant` per frame: `scroll-behavior: smooth` di <html> akan menghaluskan ulang tiap langkah.
    window.scrollTo({ top: from + (target - from) * easeInOutCubic(progress), behavior: 'instant' })
    if (progress < 1) frame = requestAnimationFrame(tick)
    else stop()
  }
  cancelActive = stop
  CANCEL_EVENTS.forEach((type) => window.addEventListener(type, stop, { passive: true, once: true }))
  frame = requestAnimationFrame(tick)
}

/** Gulir ke elemen. `start` menghormati `scroll-padding-top` di <html> (tinggi navbar), `center` menaruhnya di tengah layar. */
export function scrollToElement(el: HTMLElement, { align = 'start', instant = false }: { align?: 'start' | 'center'; instant?: boolean } = {}): void {
  const rect = el.getBoundingClientRect()
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  const top = align === 'center' ? rect.top + window.scrollY - (window.innerHeight - rect.height) / 2 : rect.top + window.scrollY - offset
  scrollToY(top, { instant })
}

/** Elemen yang dijadikan sasaran gulir: judul pertama di dalam section (padding section tidak ikut), atau elemennya sendiri. */
export function scrollTargetFor(el: HTMLElement): HTMLElement {
  return el.matches(HEADING) ? el : (el.querySelector<HTMLElement>(HEADING) ?? el)
}

/**
 * Gulung halus ke section (offset dari `scroll-padding-top`, easing lewat `scrollToY`), perbarui hash dengan pushState,
 * dan pindahkan fokus keyboard ke judulnya. Posisi gulir asal disimpan agar tombol Kembali memulihkannya.
 */
export function goToSection(id: string, { instant = false }: { instant?: boolean } = {}): void {
  const target = document.getElementById(id)
  if (!target) return
  const state = { ...(window.history.state as object | null), y: window.scrollY }
  window.history.replaceState(state, '')
  window.history.pushState({ y: 0 }, '', `${window.location.pathname}${window.location.search}#${id}`)
  const heading = scrollTargetFor(target)
  // Section pertama (Ringkasan) kembali ke puncak halaman, termasuk breadcrumb.
  if (id === FIRST_SECTION) scrollToY(0, { instant })
  else scrollToElement(heading, { instant })
  if (!heading.matches(HEADING)) return
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
  heading.focus({ preventScroll: true })
}
