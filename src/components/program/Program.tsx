import { useRef } from 'react'
import { QuickChip, SectionLabel } from '../ui/Primitives'
import { Section } from '../layout/Section'
import { AllProgramsCell, ProgramCell } from './ProgramCell'
import { ProgramCarousel } from './ProgramCarousel'
import { ProgramFinder } from './ProgramFinder'
import { CONSULT_MESSAGES } from '../../content/content'
import { selectPrograms } from '../../lib/programs'
import { waLink } from '../../lib/whatsapp'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { usePointerSpotlight } from '../../hooks/usePointerSpotlight'
import { useTweaks } from '../../tweaks/TweakContext'
import './program.css'
import './program-finder.css'

const COLS_TABLET = 2
const COLS_DESKTOP = 2

/** Sel "Lihat semua" mengisi sisa kolom di baris terakhir supaya garis grid tetap utuh. */
const remainder = (count: number, cols: number) => (count % cols === 0 ? 0 : cols - (count % cols))

export function Program() {
  const { tweaks } = useTweaks()
  const gridRef = useRef<HTMLUListElement>(null)
  // Foto kartu mengikuti kursor (--tx, --ty) di mode grid; mode carousel memasang hook yang sama sendiri.
  usePointerSpotlight(gridRef, '.cell', useInteractiveMotion())
  const programs = selectPrograms(tweaks.programCount)
  const tabletSpan = remainder(programs.length, COLS_TABLET)
  const desktopSpan = remainder(programs.length, COLS_DESKTOP)
  const needsAllCell = tabletSpan > 0 || desktopSpan > 0

  return (
    <Section id="program" tone="paper" labelledBy="program-title">
      <SectionLabel>Program</SectionLabel>
      <h2 id="program-title">Pilih program yang cocok buat kamu</h2>

      {tweaks.programFinder === 'on' && <ProgramFinder />}

      {tweaks.programLayout === 'carousel' ? (
        <ProgramCarousel programs={programs} />
      ) : (
        <ul ref={gridRef} className="program-grid" data-reveal-group="">
          {programs.map((p) => (
            <ProgramCell key={p.slug} program={p} fading={false} />
          ))}
          {needsAllCell && <AllProgramsCell span={{ tablet: tabletSpan, desktop: desktopSpan }} />}
        </ul>
      )}

      <div className="program-after">
        <div className="program-after__ask">
          <p className="program-after__label">Belum yakin? Tanya cepat via WhatsApp</p>
          <div className="program-after__chips">
            <QuickChip href={waLink('Program', CONSULT_MESSAGES.fresh)}>{CONSULT_MESSAGES.fresh}</QuickChip>
            <QuickChip href={waLink('Program', CONSULT_MESSAGES.installment)}>{CONSULT_MESSAGES.installment}</QuickChip>
            <QuickChip href={waLink('Program', CONSULT_MESSAGES.compare)}>{CONSULT_MESSAGES.compare}</QuickChip>
          </div>
        </div>
      </div>
    </Section>
  )
}
