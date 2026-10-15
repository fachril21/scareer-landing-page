import type { ReactNode } from 'react'

/**
 * Ikon garis bergaya coretan (Design.md 4.15): garis Ink 1.5 px, ujung bulat, sedikit tidak sempurna,
 * satu isian per ikon. Dekoratif, jadi aria-hidden.
 */
type DoodleName = 'senior' | 'support' | 'price'

const DOODLES: Record<DoodleName, ReactNode> = {
  /** Dua orang: kakak tingkat dan adik tingkat */
  senior: (
    <>
      <circle cx="9" cy="8.2" r="3.1" fill="var(--lavender)" />
      <path d="M3.6 20c.2-3.6 2.4-5.6 5.5-5.6s5.3 2 5.5 5.6" />
      <circle cx="17.2" cy="9.4" r="2.3" />
      <path d="M15.8 14.6c3-.5 5 1.3 5.2 4.3" />
    </>
  ),
  /** Lencana dengan pita: dukungan */
  support: (
    <>
      <circle cx="12" cy="9.5" r="5.6" fill="var(--lavender)" />
      <path d="M9.4 9.6l1.9 1.9 3.4-3.7" />
      <path d="M8.6 14.2L7 21l5-2.6 5 2.6-1.6-6.8" />
    </>
  ),
  /** Dompet: harga yang masuk akal */
  price: (
    <>
      <path d="M3.6 8.4c0-1.5 1.1-2.6 2.6-2.6h11.4c1.5 0 2.6 1.1 2.6 2.6v9.3c0 1.5-1.1 2.6-2.6 2.6H6.2c-1.5 0-2.6-1.1-2.6-2.6z" fill="var(--lavender)" />
      <path d="M5.4 5.8l9.2-2.6" />
      <path d="M20.2 11.6h-4.1c-1.1 0-1.9.8-1.9 1.9s.8 1.9 1.9 1.9h4.1" />
      <circle cx="16.3" cy="13.5" r=".4" />
    </>
  ),
}

export function Doodle({ name, size = 24 }: { name: DoodleName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--ink)"
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
