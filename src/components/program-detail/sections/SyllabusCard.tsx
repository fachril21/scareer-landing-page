import { Button } from '../../ui/Button'
import { CONSULT_MESSAGES } from '../../../content/content'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'

/** Ilustrasi lembar silabus: garis 1,5 px bergaya coretan dengan satu isian lavender (Design.md 4.15). Dekoratif. */
function SheetIllustration() {
  return (
    <svg className="syl__art" viewBox="0 0 72 72" fill="none" aria-hidden="true" focusable="false">
      <g transform="rotate(-6 36 36)" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="8" width="44" height="56" rx="5" fill="var(--lavender)" />
        <path d="M23 24h26M23 33h26M23 42h16" />
      </g>
    </svg>
  )
}

/** Kartu silabus PDF. Tanpa form: unduh langsung, atau minta lewat WhatsApp. */
export function SyllabusCard({ program }: { program: ProgramDetail }) {
  const { syllabus } = program.curriculum
  return (
    <section className="syl" aria-labelledby="syl-title">
      <SheetIllustration />
      <div className="syl__info">
        <h3 id="syl-title">Silabus lengkap (PDF)</h3>
        <p>Gratis. [ISI: cukup isi nama dan email / tanpa form]</p>
        <div className="syl__actions">
          <Button href={syllabus.href} download onClick={() => track('download_syllabus', { program: program.slug })}>
            Unduh silabus
          </Button>
          <a
            className="syl__wa"
            href={waLink('Detail: Kurikulum', `${CONSULT_MESSAGES.general}: aku mau silabus ${program.name} lewat WhatsApp`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('click_wa_program_detail', { sumber: 'silabus' })}
          >
            Minta lewat WhatsApp
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
