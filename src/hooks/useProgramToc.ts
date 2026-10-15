import { useCallback, useEffect, useRef, useState } from 'react'
import { PROGRAM_SECTIONS, TOC_PARENT } from '../content/program-sections'
import { goToSection, scrollTargetFor } from '../lib/scrollTo'
import { GOTO_EVENT } from '../lib/sectionLink'
import { track } from '../lib/track'

const SECTION_IDS = PROGRAM_SECTIONS.map((s) => s.id)
const CHILD_IDS = Object.keys(TOC_PARENT)
const LAST_ID = SECTION_IDS[SECTION_IDS.length - 1]
const FIRST_ID = SECTION_IDS[0]
/** Garis penentu: section aktif adalah yang melewati garis 40% dari atas viewport. */
const SPY_MARGIN = '-96px 0px -60% 0px'
const LOCK_MAX_MS = 1200

export type TocSource = 'sidebar' | 'rail' | 'sheet' | 'link'

export interface ProgramToc {
  activeId: string
  /** Anak section yang sedang aktif, atau null. */
  activeChild: string | null
  /** Di atas section gelap (Why Us, Karya): daftar isi memakai warna on-ink. */
  onInk: boolean
  select: (id: string, source: TocSource) => void
}

/**
 * Scroll-spy satu IntersectionObserver (bukan event scroll), kunci selama gulungan hasil klik,
 * hash URL (replaceState saat menggulir biasa), dan pemulihan posisi saat tombol Kembali.
 */
export function useProgramToc(): ProgramToc {
  const [activeId, setActiveId] = useState(FIRST_ID)
  const [activeChild, setActiveChild] = useState<string | null>(null)
  const [onInk, setOnInk] = useState(false)

  const visible = useRef(new Set<string>())
  const atEnd = useRef(false)
  const locked = useRef(false)
  const ready = useRef(false)
  const lockTimer = useRef<number | undefined>(undefined)
  const releaseRef = useRef<(() => void) | null>(null)

  const recompute = useCallback(() => {
    if (locked.current) return
    ready.current = true
    if (atEnd.current) {
      setActiveId(LAST_ID)
      setActiveChild(null)
      return
    }
    const sections = SECTION_IDS.filter((id) => visible.current.has(id))
    const section = sections[sections.length - 1]
    if (!section) return
    setActiveId(section)
    const children = CHILD_IDS.filter((id) => visible.current.has(id) && TOC_PARENT[id] === section)
    setActiveChild(children[children.length - 1] ?? null)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.current.add(e.target.id)
          else visible.current.delete(e.target.id)
        }
        recompute()
      },
      { rootMargin: SPY_MARGIN },
    )
    for (const id of [...SECTION_IDS, ...CHILD_IDS]) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    // Mentok di dasar halaman: section terakhir (FAQ) aktif walau tidak pernah menyentuh garis.
    const end = document.getElementById('spy-end')
    const endObserver = new IntersectionObserver(([entry]) => {
      atEnd.current = entry.isIntersecting
      recompute()
    })
    if (end) endObserver.observe(end)

    return () => {
      observer.disconnect()
      endObserver.disconnect()
    }
  }, [recompute])

  // Tema on-ink: bagian tengah daftar isi sedang berada di atas section gelap.
  useEffect(() => {
    const inkSections = [...document.querySelectorAll<HTMLElement>('main [data-theme="ink"]')]
    const over = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) over.add(e.target)
          else over.delete(e.target)
        }
        setOnInk(over.size > 0)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    inkSections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Hash mengikuti section aktif tanpa menambah riwayat. Hash anak section (hasil klik atau tautan) dibiarkan
  // selama induknya masih aktif. Dilewati selama gulungan klik dan sebelum pengamat pertama berjalan
  // (supaya hash dari URL tidak terhapus sebelum sempat dihormati).
  useEffect(() => {
    if (!ready.current || locked.current) return
    const current = decodeURIComponent(window.location.hash.slice(1))
    if (current === activeId || TOC_PARENT[current] === activeId || current.startsWith(`${activeId}-`)) return
    const atTop = activeId === FIRST_ID && window.scrollY < 8
    const next = atTop ? '' : `#${activeId}`
    if (window.location.hash === next) return
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}${next}`)
  }, [activeId])

  // Tombol Kembali/Maju di antara hash pada halaman yang sama.
  useEffect(() => {
    const onPop = () => {
      const y = (window.history.state as { y?: number } | null)?.y
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      if (typeof y === 'number' && y > 0) window.scrollTo({ top: y, behavior: 'instant' })
      else if (target) scrollTargetFor(target).scrollIntoView({ block: 'start', behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => () => window.clearTimeout(lockTimer.current), [])

  const select = useCallback(
    (id: string, source: TocSource) => {
      const parent = TOC_PARENT[id] ?? id
      // Tautan di dalam konten (bukan daftar isi) ikut menggulung dengan kunci scroll-spy, tapi bukan klik daftar isi.
      if (source !== 'link') track('toc_click', { section: id, sumber: source })

      locked.current = true
      // Sasaran yang bukan section atau anak section (mis. butir FAQ) tidak mengubah item aktif; scroll-spy menyusul.
      if (SECTION_IDS.includes(id) || CHILD_IDS.includes(id)) {
        setActiveId(parent)
        setActiveChild(TOC_PARENT[id] ? id : null)
      }
      // Satu kunci aktif: gulungan baru menggantikan pendengar gulungan sebelumnya.
      if (releaseRef.current) window.removeEventListener('scrollend', releaseRef.current)
      const release = () => {
        window.clearTimeout(lockTimer.current)
        window.removeEventListener('scrollend', release)
        locked.current = false
        recompute()
      }
      releaseRef.current = release
      window.clearTimeout(lockTimer.current)
      lockTimer.current = window.setTimeout(release, LOCK_MAX_MS)
      window.addEventListener('scrollend', release, { once: true })
      goToSection(id)
    },
    [recompute],
  )

  // Tautan konten memakai `requestSection` (lib/sectionLink) supaya lewat kunci scroll-spy yang sama.
  useEffect(() => {
    const onGoto = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: string }>).detail
      select(id, 'link')
    }
    window.addEventListener(GOTO_EVENT, onGoto)
    return () => window.removeEventListener(GOTO_EVENT, onGoto)
  }, [select])

  return { activeId, activeChild, onInk, select }
}
