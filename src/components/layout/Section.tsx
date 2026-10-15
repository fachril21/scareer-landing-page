import type { ReactNode } from 'react'
import './layout.css'

type Tone = 'surface' | 'paper' | 'ink'

interface SectionProps {
  id?: string
  /** Latar band: selang-seling surface/paper, ink untuk section gelap (Design.md bab 5). */
  tone?: Tone
  /** content = 1024px, wide = 1320px */
  width?: 'content' | 'wide'
  /** id heading yang menamai section untuk pembaca layar */
  labelledBy?: string
  /** Tanpa garis atas, mis. section pertama setelah navbar */
  flush?: boolean
  className?: string
  children: ReactNode
}

export function Section({
  id,
  tone = 'surface',
  width = 'content',
  labelledBy,
  flush = false,
  className = '',
  children,
}: SectionProps) {
  const classes = ['section', `section--${tone}`, flush && 'section--flush', tone === 'ink' && 'on-ink', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={classes} aria-labelledby={labelledBy} data-theme={tone === 'ink' ? 'ink' : undefined}>
      <div className={`container container--${width}`}>{children}</div>
    </section>
  )
}

export function SkipLink() {
  return (
    <a className="skip-link" href="#konten">
      Lewati ke konten
    </a>
  )
}
