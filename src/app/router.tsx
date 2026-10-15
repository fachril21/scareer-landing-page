import { useEffect, useLayoutEffect, useSyncExternalStore, type ReactNode } from 'react'
import { scrollTargetFor } from '../lib/scrollTo'
import { navigateFromProgramCard } from '../lib/viewTransition'

/**
 * Router kecil untuk dua rute (`/` dan `/program/:slug`). Tidak ada dependensi baru.
 * Tautan `<a href="/...">` biasa dicegat satu kali di dokumen, jadi komponen lama tidak perlu `Link`.
 */

const NAV_EVENT = 'scareer:navigate'

interface Location {
  pathname: string
  hash: string
}

let snapshot: Location = readLocation()

function readLocation(): Location {
  return { pathname: window.location.pathname.replace(/\/+$/, '') || '/', hash: window.location.hash }
}

function refresh() {
  const next = readLocation()
  if (next.pathname !== snapshot.pathname || next.hash !== snapshot.hash) snapshot = next
  window.dispatchEvent(new Event(NAV_EVENT))
}

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener('hashchange', onChange)
  window.addEventListener(NAV_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener(NAV_EVENT, onChange)
  }
}

function getSnapshot(): Location {
  const next = readLocation()
  if (next.pathname !== snapshot.pathname || next.hash !== snapshot.hash) snapshot = next
  return snapshot
}

export function useLocation(): Location {
  return useSyncExternalStore(subscribe, getSnapshot)
}

interface NavigateOptions {
  replace?: boolean
}

/** Pindah rute tanpa memuat ulang. Posisi gulir halaman asal disimpan untuk tombol Kembali. */
export function navigate(to: string, { replace = false }: NavigateOptions = {}) {
  const url = new URL(to, window.location.href)
  if (!replace) window.history.replaceState({ ...window.history.state, y: window.scrollY }, '')
  const method = replace ? 'replaceState' : 'pushState'
  window.history[method]({ y: 0 }, '', url.pathname + url.search + url.hash)
  refresh()
}

/** Prefiks tautan anchor homepage: `#program` di homepage, `/#program` di halaman lain. */
export function useHomeHref(): (hash?: string) => string {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  return (hash = '') => (onHome ? hash || '#beranda' : `/${hash}`)
}

function scrollToHash(hash: string): boolean {
  if (!hash) return false
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) return false
  // Halaman detail: judul section dijadikan sasaran (padding section tidak ikut), sama seperti klik daftar isi.
  const onProgramPage = document.documentElement.classList.contains('is-program-page')
  ;(onProgramPage ? scrollTargetFor(target) : target).scrollIntoView({ block: 'start', behavior: 'instant' })
  return true
}

function isInternalNavigation(a: HTMLAnchorElement, e: MouseEvent): boolean {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false
  if (a.target && a.target !== '_self') return false
  if (a.hasAttribute('download')) return false
  if (a.origin !== window.location.origin) return false
  const samePath = a.pathname.replace(/\/+$/, '') === window.location.pathname.replace(/\/+$/, '')
  // Hanya hash di halaman yang sama: biarkan browser menggulung sendiri.
  return !(samePath && a.search === window.location.search && a.hash !== '')
}

interface RouterProps {
  children: ReactNode
}

/**
 * Pasang sekali di akar. Mencegat klik tautan internal, mengatur gulir saat rute berganti
 * (ke hash tujuan, posisi tersimpan saat Kembali, atau ke atas), dan menyimpan fokus yang wajar.
 */
export function Router({ children }: RouterProps) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest('a[href]')
      if (!(a instanceof HTMLAnchorElement) || !isInternalNavigation(a, e)) return
      e.preventDefault()
      const go = () => navigate(a.pathname + a.search + a.hash)
      const card = a.closest<HTMLElement>('.cell')
      if (card) navigateFromProgramCard(card, go)
      else go()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Gulir setelah halaman baru dirender (sebelum dilukis, supaya tidak berkedip dari atas).
  useLayoutEffect(() => {
    const saved = (window.history.state as { y?: number } | null)?.y
    if (hash && scrollToHash(hash)) return
    window.scrollTo({ top: saved ?? 0, behavior: 'instant' })
    // Hanya saat rute berganti, bukan saat hash di halaman yang sama berubah.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <>{children}</>
}

export function Redirect({ to }: { to: string }) {
  useLayoutEffect(() => {
    navigate(to, { replace: true })
  }, [to])
  return null
}
