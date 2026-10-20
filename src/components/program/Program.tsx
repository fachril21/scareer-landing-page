import { useRef } from 'react'
import { QuickChip, SectionLabel } from '../ui/Primitives'
import { Section } from '../layout/Section'
import { ProgramCell } from './ProgramCell'
import { ProgramCarousel } from './ProgramCarousel'
import { ProgramFinder } from './ProgramFinder'
import { CONSULT_MESSAGES, PROGRAMS } from '../../content/content'
import { waLink } from '../../lib/whatsapp'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { usePointerSpotlight } from '../../hooks/usePointerSpotlight'
import { useTweaks } from '../../tweaks/TweakContext'
import './program.css'
import './program-finder.css'

export function Program() {
  const { tweaks } = useTweaks()
  const gridRef = useRef<HTMLUListElement>(null)
  // Foto kartu mengikuti kursor (--tx, --ty) di mode grid; mode carousel memasang hook yang sama sendiri.
  usePointerSpotlight(gridRef, '.cell', useInteractiveMotion())

  return (
    <Section id="program" tone="paper" labelledBy="program-title">
      <SectionLabel>Program</SectionLabel>
      <h2 id="program-title">Pilih program yang cocok buat kamu</h2>

      {tweaks.programFinder === 'on' && <ProgramFinder />}

      {tweaks.programLayout === 'carousel' ? (
        <ProgramCarousel programs={PROGRAMS} />
      ) : (
        <ul ref={gridRef} className="program-grid" data-reveal-group="">
          {PROGRAMS.map((p) => (
            <ProgramCell key={p.slug} program={p} fading={false} />
          ))}
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
