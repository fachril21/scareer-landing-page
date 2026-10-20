import { SectionLabel, QuickChip } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { openFaq } from '../../../lib/sectionLink'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import { useTweaks } from '../../../tweaks/TweakContext'
import './spec.css'

/**
 * 10. Program Detail dan "Program ini untuk siapa". Tabel spesifikasi dua kolom (disembunyikan lewat tweak, bawaan) (butir tanpa data dihapus, bukan diisi "-"),
 * lalu tiga persona yang jujur termasuk saat jawabannya "belum cocok", dan chip tanya cepat berisi persona.
 */
export function ProgramSpec({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  const showSpecs = tweaks.programSpecs === 'shown'
  const specs = program.specs.filter((row) => row.value.trim() !== '')

  return (
    <Section id="detail-program" tone="paper" labelledBy="detail-program-title">
      <SectionLabel>Untuk siapa</SectionLabel>
      <h2 id="detail-program-title">{showSpecs ? 'Detail program, dan apakah ini cocok untukmu' : 'Apakah program ini cocok untukmu?'}</h2>

      {showSpecs && (
        <dl className="specs" aria-label="Spesifikasi program">
          {specs.map((row) => (
            <div key={row.key} className="specs__row">
              <dt>{row.label}</dt>
              <dd>
                <span>{row.value}</span>
                {row.faqId && (
                  <a
                    href={`#faq-${row.faqId}`}
                    className="specs__more"
                    onClick={(e) => {
                      e.preventDefault()
                      openFaq(row.faqId as string)
                    }}
                  >
                    Lihat jawaban
                    <span className="sr-only"> tentang {row.label.toLowerCase()} di FAQ</span>
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div id="untuk-siapa" className="whofor">
        <h3 className={tweaks.personasHeading === 'shown' ? undefined : 'sr-only'}>Program ini untuk siapa</h3>
        <ul className="personas">
          {program.personas.map((persona) => (
            <li key={persona.name} className="persona">
              <h4>{persona.name}</h4>
              <p className="persona__label">Cocok kalau kamu...</p>
              <ul>
                {persona.fits.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="persona__label">Mungkin belum cocok kalau...</p>
              <ul>
                {persona.notFits.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="whofor__ask">
          <p>Masih ragu? Tanya cepat:</p>
          <div className="whofor__chips">
            {program.personas.map((persona) => (
              <QuickChip
                key={persona.name}
                href={waLink('Detail: Detail program', `${persona.quickQuestion} (${program.name})`)}
                onClick={() => track('click_wa_program_detail', { persona: persona.name })}
              >
                {persona.quickQuestion}
              </QuickChip>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
