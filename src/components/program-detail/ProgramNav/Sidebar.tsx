import { useEffect, useRef } from 'react'
import { TocList } from './TocList'
import { MiniCta } from './MiniCta'
import type { ProgramToc } from '../../../hooks/useProgramToc'

interface SidebarProps {
  toc: ProgramToc
  price: string
  ctaHidden: boolean
  /** Dibungkus kontainer berlatar: warna tidak lagi mengikuti section di belakangnya. */
  boxed?: boolean
}

/** Sidebar penuh (1440 px ke atas): daftar isi, jalur progres, dan kartu CTA mini. */
export function Sidebar({ toc, price, ctaHidden, boxed = false }: SidebarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Pada layar pendek daftar menggulung di dalam sidebar; item aktif dijaga terlihat.
  // Memakai scrollTo pada wadah (bukan scrollIntoView) agar halaman tidak ikut bergeser.
  useEffect(() => {
    const box = scrollRef.current
    const link = box?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!box || !link) return
    const top = link.offsetTop - box.offsetTop
    const outside = top < box.scrollTop || top + link.offsetHeight > box.scrollTop + box.clientHeight
    if (outside) box.scrollTo({ top: top - box.clientHeight / 2, behavior: 'smooth' })
  }, [toc.activeId, toc.activeChild])

  return (
    <nav className={`toc-side${boxed ? ' toc-side--boxed' : toc.onInk ? ' is-ink' : ''}`} aria-label="Daftar isi halaman">
      <a
        className="skip-link"
        href="#konten"
        onClick={(e) => {
          e.preventDefault()
          const main = document.getElementById('konten')
          main?.setAttribute('tabindex', '-1')
          main?.focus()
        }}
      >
        Lewati daftar isi
      </a>
      <div ref={scrollRef} className="toc-side__scroll">
        <TocList activeId={toc.activeId} activeChild={toc.activeChild} onSelect={(id) => toc.select(id, 'sidebar')} />
      </div>
      <MiniCta price={price} hidden={ctaHidden} />
    </nav>
  )
}
