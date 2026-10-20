import { useRef, useState } from 'react'
import { ArrowRight, Plus } from 'lucide-react'
import { Photo, SectionLabel } from '../ui/Primitives'
import { Section } from '../layout/Section'
import { WORKS, WORK_HONEST_LABEL } from '../../content/content'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { WorkCards } from './WorkCards'
import './works.css'

const GROW_REST = 1
const GROW_ACTIVE = 3.2

export interface WorkItem {
  key: string
  title: string
  description: string
  /** Nama berkas di public/images tanpa ekstensi, mis. `work-1`. */
  image: string
  /** Label jujur di bawah deskripsi. */
  label: string
  /** Tools yang dipakai, ditampilkan sebagai satu baris di bawah deskripsi. */
  tools?: readonly string[]
  /** Tanpa `href` (belum ada detail atau izin), klik hanya mencatat event dan tidak berpindah. */
  href?: string
}

interface WorkShowcaseProps {
  /** Id section (anchor). */
  id: string
  heading: string
  items: readonly WorkItem[]
  sectionLabel?: string
  /** Lebar kolom: `wide` (1320 px) di homepage; halaman detail memakai `content` (1024 px) agar tidak menimpa daftar isi di gutter. */
  width?: 'content' | 'wide'
  /** Dipanggil saat sebuah karya dibuka (klik atau Enter), mis. untuk pelacakan. */
  onOpen?: (item: WorkItem) => void
  /** `accordion` (bawaan, homepage) atau `cards`: kartu yang langsung terbuka tanpa reveal hover. */
  layout?: 'accordion' | 'cards'
}

interface ItemsProps {
  items: readonly WorkItem[]
  /** Tujuan tautan bila karya belum punya `href`. */
  fallbackHref: string
  onOpen?: (item: WorkItem) => void
}

function linkFor(w: WorkItem, { fallbackHref, onOpen }: Pick<ItemsProps, 'fallbackHref' | 'onOpen'>) {
  return {
    href: w.href ?? fallbackHref,
    onClick: (e: React.MouseEvent) => {
      if (!w.href) e.preventDefault()
      onOpen?.(w)
    },
  }
}

const HOMEPAGE_WORKS: readonly WorkItem[] = WORKS.map((w, i) => ({
  key: w.title,
  title: w.title,
  description: w.description,
  image: `work-${i + 1}`,
  href: `/program/${w.slug}`,
  label: WORK_HONEST_LABEL,
}))

/** Karya di homepage. */
export function Works() {
  return <WorkShowcase id="karya" heading="Karya peserta dari tiap program" items={HOMEPAGE_WORKS} />
}

/**
 * Desktop dengan pointer: akordeon foto 5 kolom (hover atau fokus melebarkan kolom).
 * Layar sentuh dan mobile: carousel scroll-snap. Nama dan label selalu ada di DOM.
 */
export function WorkShowcase({ id, heading, items, sectionLabel = 'Karya', width = 'wide', onOpen, layout = 'accordion' }: WorkShowcaseProps) {
  const accordion = useMediaQuery('(min-width: 1024px) and (hover: hover)')

  return (
    <Section id={id} tone="ink" width={width} labelledBy={`${id}-title`}>
      <SectionLabel onInk>{sectionLabel}</SectionLabel>
      <h2 id={`${id}-title`} className="works__title">{heading}</h2>
      {layout === 'cards' ? (
        <WorkCards items={items} onOpen={onOpen} />
      ) : accordion ? (
        <PhotoAccordion items={items} fallbackHref={`#${id}`} onOpen={onOpen} />
      ) : (
        <Carousel items={items} fallbackHref={`#${id}`} onOpen={onOpen} />
      )}
    </Section>
  )
}

function PhotoAccordion({ items, fallbackHref, onOpen }: ItemsProps) {
  const [active, setActive] = useState<number | null>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    linkRefs.current[(i + step + items.length) % items.length]?.focus()
  }

  return (
    <ul className="accordion" onPointerLeave={() => setActive(null)}>
      {items.map((w, i) => {
        const open = active === i
        return (
          <li key={w.key} className="accordion__col" style={{ flexGrow: open ? GROW_ACTIVE : GROW_REST }}>
            <a
              ref={(el) => {
                linkRefs.current[i] = el
              }}
              {...linkFor(w, { fallbackHref, onOpen })}
              className={`work${open ? ' is-open' : ''}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((cur) => (cur === i ? null : cur))}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <Photo name={w.image} alt="" width={2048} height={2048} sizes="(min-width: 1024px) 570px, 80vw" className="work__photo" />
              <span className="work__tint" aria-hidden="true" />
              <span className="work__scrim" aria-hidden="true" />
              <span className="work__icon" aria-hidden="true">
                <Plus size={18} strokeWidth={2} className="work__plus" />
                <ArrowRight size={18} strokeWidth={2} className="work__arrow" />
              </span>
              <span className="work__text">
                <span className="work__name">{w.title}</span>
                <span className="work__more">
                  <span className="work__desc">{w.description}</span>
                  {w.tools && <span className="work__tools">{w.tools.join(' · ')}</span>}
                  <span className="work__honest">{w.label}</span>
                </span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

function Carousel({ items, fallbackHref, onOpen }: ItemsProps) {
  return (
    <ul className="carousel" aria-label="Karya peserta">
      {items.map((w) => (
        <li key={w.key} className="carousel__item">
          <a {...linkFor(w, { fallbackHref, onOpen })} className="work work--static">
            <Photo name={w.image} alt="" width={2048} height={2048} sizes="80vw" className="work__photo" />
            <span className="work__tint" aria-hidden="true" />
            <span className="work__scrim" aria-hidden="true" />
            <span className="work__text">
              <span className="work__name">{w.title}</span>
              <span className="work__more">
                <span>{w.description}</span>
                {w.tools && <span className="work__tools">{w.tools.join(' · ')}</span>}
                <span className="work__honest">{w.label}</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
