import { Check, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Photo } from '../ui/Primitives'
import type { Program } from '../../content/content'

interface ProgramCellProps {
  program: Program
  fading: boolean
  className?: string
}

export function ProgramCell({ program, fading, className = '' }: ProgramCellProps) {
  const titleId = `program-${program.slug}`

  // Seluruh sel bisa diklik, tapi hanya tombol "Lihat detail" yang masuk urutan Tab.
  const onCellClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return
    e.currentTarget.querySelector<HTMLAnchorElement>('a.btn')?.click()
  }

  return (
    <li className={`cell${fading ? ' is-fading' : ''}${className && ` ${className}`}`} onClick={onCellClick}>
      <article aria-labelledby={titleId} className="cell__body">
        <Photo name={program.image} alt="" width={2752} height={1536} sizes="(min-width: 1024px) 300px, 90vw" className="cell__photo" />
        <h3 id={titleId}>{program.name}</h3>
        <p className="cell__audience">{program.audience}</p>
        <ul className="cell__tags" aria-label="Ringkasan program">
          <li>Durasi {program.duration}</li>
          <li>Format {program.format}</li>
          <li>Level {program.level}</li>
        </ul>
        <ul className="cell__outcomes" aria-label="Hasil utama">
          {program.outcomes.map((o) => (
            <li key={o}>
              <Check size={16} strokeWidth={2} aria-hidden="true" />
              {o}
            </li>
          ))}
        </ul>
        <div className="cell__foot">
          <p className="cell__price num">
            Mulai dari <strong>{program.startingPrice}</strong>
          </p>
          <Button
            variant="outline"
            size="md"
            href={program.isDummy ? '#program' : `/program/${program.slug}`}
            aria-label={`Lihat detail ${program.name}`}
          >
            Lihat detail
          </Button>
        </div>
      </article>
    </li>
  )
}

export function AllProgramsCell({ span }: { span: { tablet: number; desktop: number } }) {
  return (
    <li
      className="cell cell--all"
      style={{ '--span-t': span.tablet, '--span-d': span.desktop } as React.CSSProperties}
    >
      <a className="cell__all-link" href="/program">
        <span>Lihat semua program</span>
        <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </li>
  )
}
