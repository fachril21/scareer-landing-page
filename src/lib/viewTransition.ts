import { flushSync } from 'react-dom'

const NAME = 'program-photo'
/** Foto hero halaman detail dimuat dulu supaya bingkai akhir transisi tidak kosong. */
const DECODE_TIMEOUT_MS = 700

const canTransition = () =>
  'startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Pindah dari kartu program ke halaman detail dengan View Transition: foto kartu bergerak menjadi foto panggung hero.
 * Tanpa dukungan browser atau dengan reduced motion, pindah halaman biasa. Hanya arah maju (kartu ke detail).
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
    const hero = document.querySelector<HTMLImageElement>('.pd-stage .stage__photo')
    if (hero) await Promise.race([hero.decode().catch(() => undefined), new Promise((r) => setTimeout(r, DECODE_TIMEOUT_MS))])
  })
  transition.finished.finally(() => {
    photo.style.viewTransitionName = ''
  })
}
