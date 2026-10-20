import { flushSync } from 'react-dom'

const NAME = 'program-photo'
/** Foto yang dimuat dulu supaya bingkai akhir transisi tidak kosong. */
const DECODE_TIMEOUT_MS = 700
/** Foto hero halaman detail: layout Original (`.stage__photo`) atau Terbelah (`.phs__photo`). */
const HERO_PHOTO = '.pd-stage .stage__photo, .phs__photo'

const canTransition = () =>
  'startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const decoded = (img: HTMLImageElement) =>
  Promise.race([img.decode().catch(() => undefined), new Promise((r) => setTimeout(r, DECODE_TIMEOUT_MS))])

/**
 * Pindah dari kartu program ke halaman detail dengan View Transition: foto kartu bergerak menjadi foto hero.
 * Tanpa dukungan browser atau dengan reduced motion, pindah halaman biasa.
 */
export function navigateFromProgramCard(card: HTMLElement, go: () => void): void {
  const photo = card.querySelector<HTMLElement>('.cell__photo')
  if (!photo || !canTransition()) {
    go()
    return
  }

  photo.style.viewTransitionName = NAME
  const transition = document.startViewTransition(async () => {
    // Render halaman baru sekarang juga, bukan di microtask berikutnya, supaya tertangkap sebagai keadaan akhir.
    flushSync(go)
    const hero = document.querySelector<HTMLImageElement>(HERO_PHOTO)
    if (hero) await decoded(hero)
  })
  transition.finished.finally(() => {
    photo.style.viewTransitionName = ''
  })
}

/** Foto kartu program `slug` di homepage, atau null bila kartunya tidak terlihat (tanpa kartu, tidak ada yang digerakkan). */
function visibleCardPhoto(slug: string): HTMLImageElement | null {
  const card = document.querySelector<HTMLElement>(`.cell a[href="/program/${slug}"]`)?.closest<HTMLElement>('.cell')
  const photo = card?.querySelector<HTMLImageElement>('.cell__photo')
  if (!card || !photo) return null
  const { top, bottom } = card.getBoundingClientRect()
  if (bottom <= 0 || top >= window.innerHeight) return null
  // Carousel dirender ulang dari awal: gulirkan lintasnya ke kartu itu, halaman tidak ikut bergeser (kartu sudah terlihat).
  card.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' })
  return photo
}

/**
 * Arah balik: dari halaman detail `/program/:slug` ke homepage, foto hero bergerak kembali menjadi foto kartunya.
 * Kartu yang tidak terlihat setelah posisi gulir dipulihkan membuat transisi jadi crossfade biasa.
 */
export function navigateBackToProgramCard(slug: string, go: () => void): void {
  if (!canTransition()) {
    go()
    return
  }

  let photo: HTMLImageElement | null = null
  const transition = document.startViewTransition(async () => {
    flushSync(go)
    photo = visibleCardPhoto(slug)
    if (photo) {
      photo.style.viewTransitionName = NAME
      await decoded(photo)
    }
  })
  transition.finished.finally(() => {
    if (photo) photo.style.viewTransitionName = ''
  })
}
