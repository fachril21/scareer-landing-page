/**
 * Stiker dekoratif untuk hero vibrant. Semuanya SVG sederhana, `aria-hidden`, satu isian warna per bentuk.
 * Posisi, kedalaman parallax (`--d`), dan jeda masuk (`--i`) diatur CSS lewat kelas `.sticker--*`.
 */

export function Sparkle({ className = '', fill = 'var(--highlight)' }: { className?: string; fill?: string }) {
  return (
    <svg className={`sticker ${className}`} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 2 C26 14 34 22 46 24 C34 26 26 34 24 46 C22 34 14 26 2 24 C14 22 22 14 24 2 Z" fill={fill} />
    </svg>
  )
}

export function Burst({ className = '', fill = 'var(--highlight)' }: { className?: string; fill?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg className={`sticker ${className}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {petals.map((angle) => (
        <rect key={angle} x="28" y="4" width="8" height="26" rx="4" fill={fill} transform={`rotate(${angle} 32 32)`} />
      ))}
    </svg>
  )
}

export function Squiggle({ className = '', stroke = 'var(--highlight)' }: { className?: string; stroke?: string }) {
  return (
    <svg className={`sticker ${className}`} viewBox="0 0 120 28" aria-hidden="true" focusable="false">
      <path
        d="M4 16 C16 2, 28 2, 40 14 S64 26, 76 14 S100 2, 116 14"
        fill="none"
        stroke={stroke}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Panah lengkung coretan tangan yang menunjuk ke catatan. */
export function DoodleArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`sticker ${className}`} viewBox="0 0 72 56" aria-hidden="true" focusable="false">
      <path d="M6 8 C30 4, 58 14, 56 44" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 36 L56 46 L64 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
