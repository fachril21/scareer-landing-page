const HEADING = 'h1, h2, h3'
const FIRST_SECTION = 'ringkasan'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Elemen yang dijadikan sasaran gulir: judul pertama di dalam section (padding section tidak ikut), atau elemennya sendiri. */
export function scrollTargetFor(el: HTMLElement): HTMLElement {
  return el.matches(HEADING) ? el : (el.querySelector<HTMLElement>(HEADING) ?? el)
}

/**
 * Gulung halus ke section (offset dari `scroll-padding-top`), perbarui hash dengan pushState,
 * dan pindahkan fokus keyboard ke judulnya. Posisi gulir asal disimpan agar tombol Kembali memulihkannya.
 */
export function goToSection(id: string, { instant = false }: { instant?: boolean } = {}): void {
  const target = document.getElementById(id)
  if (!target) return
  const state = { ...(window.history.state as object | null), y: window.scrollY }
  window.history.replaceState(state, '')
  window.history.pushState({ y: 0 }, '', `${window.location.pathname}${window.location.search}#${id}`)
  const behavior = instant || prefersReducedMotion() ? 'instant' : 'smooth'
  const heading = scrollTargetFor(target)
  // Section pertama (Ringkasan) kembali ke puncak halaman, termasuk breadcrumb.
  if (id === FIRST_SECTION) window.scrollTo({ top: 0, behavior })
  else heading.scrollIntoView({ block: 'start', behavior })
  if (!heading.matches(HEADING)) return
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
  heading.focus({ preventScroll: true })
}
