import type { ReactNode } from 'react'
import './doodles.css'

/**
 * Ikon garis bergaya coretan (Design.md 4.15): garis Ink 1.5 px, ujung bulat, sedikit tidak sempurna,
 * satu isian per ikon. Dekoratif, jadi aria-hidden.
 * Warna garis dan isian bisa diganti lewat `--dd-stroke` dan `--dd-fill`. Bagian yang bergerak diberi kelas `dd-*`.
 */
type DoodleName = 'senior' | 'support' | 'price' | 'book' | 'laptop' | 'briefcase'

const FILL = 'var(--dd-fill, var(--paper))'

const DOODLES: Record<DoodleName, ReactNode> = {
  /** Dua orang: kakak tingkat dan adik tingkat. Adik tingkat melambai. */
  senior: (
    <>
      <circle cx="9" cy="8.2" r="3.1" fill={FILL} />
      <path d="M3.6 20c.2-3.6 2.4-5.6 5.5-5.6s5.3 2 5.5 5.6" />
      <g className="dd-wave">
        <circle cx="17.2" cy="9.4" r="2.3" />
        <path d="M15.8 14.6c3-.5 5 1.3 5.2 4.3" />
      </g>
    </>
  ),
  /** Lencana dengan pita: dukungan. Centang tergambar ulang. */
  support: (
    <>
      <circle cx="12" cy="9.5" r="5.6" fill={FILL} />
      <path className="dd-check" pathLength={1} d="M9.4 9.6l1.9 1.9 3.4-3.7" />
      <path d="M8.6 14.2L7 21l5-2.6 5 2.6-1.6-6.8" />
    </>
  ),
  /** Dompet: harga yang masuk akal. Tutupnya terbuka sedikit. */
  price: (
    <>
      <path d="M3.6 8.4c0-1.5 1.1-2.6 2.6-2.6h11.4c1.5 0 2.6 1.1 2.6 2.6v9.3c0 1.5-1.1 2.6-2.6 2.6H6.2c-1.5 0-2.6-1.1-2.6-2.6z" fill={FILL} />
      <path className="dd-flap" d="M5.4 5.8l9.2-2.6" />
      <path d="M20.2 11.6h-4.1c-1.1 0-1.9.8-1.9 1.9s.8 1.9 1.9 1.9h4.1" />
      <circle className="dd-dot" cx="16.3" cy="13.5" r=".4" />
    </>
  ),
  /** Buku terbuka: belajar skill. Halaman kanan membuka. */
  book: (
    <>
      <path d="M3.5 5.6c2.8-.6 5.6-.2 8.5 1.6v12.2c-2.9-1.7-5.7-2.1-8.5-1.5z" fill={FILL} />
      <path className="dd-page" d="M20.5 5.6c-2.8-.6-5.6-.2-8.5 1.6v12.2c2.9-1.7 5.7-2.1 8.5-1.5z" />
    </>
  ),
  /** Laptop dengan centang: praktik langsung. Centang tergambar ulang. */
  laptop: (
    <>
      <path d="M5.6 5.2h12.8c.7 0 1.3.6 1.3 1.3v8.8H4.3V6.5c0-.7.6-1.3 1.3-1.3z" fill={FILL} />
      <path className="dd-check" pathLength={1} d="M9.6 10.2l1.8 1.8 3.1-3.4" />
      <path d="M2.8 18.2h18.4c0 .9-.7 1.6-1.6 1.6H4.4c-.9 0-1.6-.7-1.6-1.6z" />
    </>
  ),
  /** Tas kerja: internship. Gagangnya terangkat. */
  briefcase: (
    <>
      <path d="M4 8.6c0-.9.7-1.6 1.6-1.6h12.8c.9 0 1.6.7 1.6 1.6v9.4c0 .9-.7 1.6-1.6 1.6H5.6c-.9 0-1.6-.7-1.6-1.6z" fill={FILL} />
      <path className="dd-bag" d="M9 7V5.9c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3V7" />
      <path d="M4 12.4h16" />
      <path d="M10.8 12.4v1.5h2.4v-1.5" />
    </>
  ),
}

export function Doodle({ name, size = 24, className }: { name: DoodleName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--dd-stroke, var(--ink))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {DOODLES[name]}
    </svg>
  )
}

export type { DoodleName }
