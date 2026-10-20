import { FilterChip, SectionLabel } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import type { ProgramDetail, Skill, SkillKind } from '../../../content/program-detail.types'
import { useFadeFilter } from '../../../hooks/useFadeFilter'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useTweaks } from '../../../tweaks/TweakContext'
import { openModule } from '../../../lib/sectionLink'
import './skills.css'

type Filter = 'semua' | SkillKind

const FILTERS: readonly { value: Filter; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'hard', label: 'Hard skill' },
  { value: 'soft', label: 'Soft skill' },
]

const matches = (s: Skill, f: Filter) => f === 'semua' || s.kind === f
/** Hard skill dulu, soft skill kemudian. */
const KIND_ORDER: Record<SkillKind, number> = { hard: 0, soft: 1 }

function ModuleLink({ moduleId, program }: { moduleId: string; program: ProgramDetail }) {
  const number = program.curriculum.modules.findIndex((m) => m.id === moduleId) + 1
  if (number === 0) return null
  return (
    <a
      className="skill__module"
      href={`#kurikulum-${moduleId}`}
      onClick={(e) => {
        e.preventDefault()
        openModule(moduleId)
      }}
    >
      modul {number}
      <span className="sr-only">: lihat di kurikulum</span>
    </a>
  )
}

interface SkillsViewProps {
  skills: readonly Skill[]
  program: ProgramDetail
  isFading: (s: Skill) => boolean
  showOutput: boolean
}

function SkillsTable({ skills, program, isFading, showOutput }: SkillsViewProps) {
  return (
    <div className="skills-box">
      <table className={`skills-table${showOutput ? '' : ' skills-table--no-output'}`}>
        <caption className="sr-only">
          {showOutput ? 'Skill yang dikuasai, bukti kemampuan, dan output yang dibawa pulang' : 'Skill yang dikuasai dan bukti kemampuan'}
        </caption>
        <thead>
          <tr>
            <th scope="col">Skill yang dikuasai</th>
            <th scope="col">Buktinya: kamu bisa...</th>
            {showOutput && <th scope="col">Output yang dibawa pulang</th>}
          </tr>
        </thead>
        <tbody>
          {skills.map((s) => (
            <tr key={s.skill} className={isFading(s) ? 'is-fading' : undefined}>
              <th scope="row">{s.skill}</th>
              <td>{s.proof}</td>
              {showOutput && (
                <td>
                  {s.output}
                  {s.moduleId && <> · <ModuleLink moduleId={s.moduleId} program={program} /></>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Mobile: ditumpuk per skill (tabel tidak muat dan tidak boleh digeser untuk membaca satu baris). */
function SkillsStack({ skills, program, isFading, showOutput }: SkillsViewProps) {
  return (
    <ul className="skills-stack">
      {skills.map((s) => (
        <li key={s.skill} className={isFading(s) ? 'is-fading' : undefined}>
          <h3>{s.skill}</h3>
          <dl>
            <div>
              <dt>Buktinya: kamu bisa...</dt>
              <dd>{s.proof}</dd>
            </div>
            {showOutput && (
              <div>
                <dt>Output yang dibawa pulang</dt>
                <dd>
                  {s.output}
                  {s.moduleId && <> · <ModuleLink moduleId={s.moduleId} program={program} /></>}
                </dd>
              </div>
            )}
          </dl>
        </li>
      ))}
    </ul>
  )
}

/**
 * 6. Skills & Output. Tabel tiga kolom (kolom output disembunyikan lewat tweak, bawaan) dengan filter Hard/Soft skill (hasil lewat aria-live) dan empat kartu output.
 * Tanpa janji hasil kerja atau gaji. Kolom "sering diminta di lowongan" belum ada: butuh sampel lowongan nyata.
 */
export function SkillsOutput({ program }: { program: ProgramDetail }) {
  const { selected, applied, choose, fadingOut } = useFadeFilter<Filter>('semua')
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const showOutput = useTweaks().tweaks.skillsOutputColumn === 'shown'
  const ordered = [...program.skills].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind])
  const visible = ordered.filter((s) => matches(s, applied))
  const count = ordered.filter((s) => matches(s, selected)).length
  const isFading = (s: Skill) => fadingOut && !matches(s, selected)

  return (
    <Section id="skill-output" tone="surface" labelledBy="skill-output-title">
      <SectionLabel>Skill dan output</SectionLabel>
      <h2 id="skill-output-title" className="skills-title">Setelah selesai, kamu bisa apa dan bawa pulang apa</h2>

      <div className="filters skills-filters" role="group" aria-label="Filter jenis skill">
        {FILTERS.map((f) => (
          <FilterChip key={f.value} selected={selected === f.value} onSelect={() => choose(f.value)}>
            {f.label}
          </FilterChip>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        Menampilkan {count} skill
      </p>

      {isDesktop ? (
        <SkillsTable skills={visible} program={program} isFading={isFading} showOutput={showOutput} />
      ) : (
        <SkillsStack skills={visible} program={program} isFading={isFading} showOutput={showOutput} />
      )}

      <ul className="takehome" aria-label="Yang dibawa pulang">
        {program.takeHome.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
