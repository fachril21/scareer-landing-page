import type { ReactNode } from 'react'
import { ArrowRight, Tag } from 'lucide-react'
import { CheckDot } from './Icons'
import './primitives.css'

/** Label section: nama menu/anchor, bukan hiasan (Design.md 4.3). Tidak dipakai di Hero dan CTA penutup. */
export function SectionLabel({ children, onInk = false }: { children: ReactNode; onInk?: boolean }) {
  return (
    <p className={`section-label${onInk ? ' section-label--on-ink' : ''}`}>
      <Tag size={16} strokeWidth={1.75} aria-hidden="true" className="section-label__icon" />
      {children}
    </p>
  )
}

/** Baris centang berisi fakta nyata di bawah tombol Hero dan CTA penutup. */
export function CheckRow({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`check-row ${className}`.trim()}>
      {items.map((item) => (
        <li key={item}>
          <CheckDot />
          {item}
        </li>
      ))}
    </ul>
  )
}

interface FilterChipProps {
  selected: boolean
  onSelect: () => void
  children: ReactNode
}

/** Chip filter Program: terpilih = latar Ink. State tidak hanya warna (aria-pressed). */
export function FilterChip({ selected, onSelect, children }: FilterChipProps) {
  return (
    <button type="button" className="filter-chip" aria-pressed={selected} onClick={onSelect}>
      {children}
    </button>
  )
}

interface QuickChipProps {
  href: string
  children: ReactNode
  onClick?: () => void
}

/** Chip tanya cepat: tautan WhatsApp sungguhan, bukan chatbot (Design.md 4.12). */
export function QuickChip({ href, children, onClick }: QuickChipProps) {
  return (
    <a className="quick-chip" href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      <span>{children}</span>
      <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" className="quick-chip__arrow" />
      <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
    </a>
  )
}

/** Placeholder foto: blok Langit lembut bergaris diagonal. Tidak boleh lolos ke produksi (Design.md 8.3). */
export function Placeholder({
  label = 'Foto [ISI]',
  ratio = '16 / 10',
  className = '',
}: {
  label?: string
  ratio?: string
  className?: string
}) {
  return (
    <div className={`placeholder ${className}`.trim()} style={{ aspectRatio: ratio }} role="img" aria-label={label}>
      <span className="placeholder__label">{label}</span>
    </div>
  )
}

const PHOTO_WIDTHS = [480, 800, 1200] as const

/** Foto responsif: srcset 480/800/1200 dari public/images. `name` = nama file tanpa ekstensi. */
export function Photo({
  name,
  alt,
  width,
  height,
  sizes,
  className = '',
  eager = false,
  position,
}: {
  name: string
  alt: string
  width: number
  height: number
  sizes: string
  className?: string
  eager?: boolean
  position?: string
}) {
  const srcSet = PHOTO_WIDTHS.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ')
  return (
    <img
      className={`photo ${className}`.trim()}
      src={`/images/${name}-800.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      style={position ? { objectPosition: position } : undefined}
    />
  )
}
