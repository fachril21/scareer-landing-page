import { useEffect, useRef, useState } from 'react'
import { Check, FileText } from 'lucide-react'
import { SectionLabel } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import type { CurriculumModule, ProgramDetail } from '../../../content/program-detail.types'
import { CONSULT_MESSAGES } from '../../../content/content'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { SELECT_MODULE_EVENT, requestSection } from '../../../lib/sectionLink'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import { SyllabusDownload } from './SyllabusDownload'
import './curriculum.css'

const MODULE_HASH = /^#kurikulum-(modul-\d+)$/

const tabId = (m: CurriculumModule) => `kurikulum-${m.id}`

/** Tulis hash modul tanpa menambah riwayat, supaya pilihan modul bisa dibagikan. */
function writeModuleHash(m: CurriculumModule) {
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${tabId(m)}`)
}

function ModuleDetail({ module: m, tools }: { module: CurriculumModule; tools: ProgramDetail['tools'] }) {
  const used = m.toolIds.map((id) => tools.find((t) => t.id === id)).filter((t) => t !== undefined)
  return (
    <div className="mod-detail">
      <p className="mod-detail__meta">{m.duration} · {m.sessions}</p>
      <h4>Topik</h4>
      <ul className="mod-detail__topics">
        {m.topics.map((topic) => (
          <li key={topic}>
            <Check size={16} strokeWidth={1.75} aria-hidden="true" />
            {topic}
          </li>
        ))}
      </ul>
      <h4>Tools</h4>
      <ul className="mod-detail__tools">
        {used.map((t) => (
          <li key={t.id}>
            <a
              href="#tools"
              onClick={(e) => {
                e.preventDefault()
                requestSection('tools')
              }}
            >
              {t.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="mod-detail__output">
        <strong>Output modul:</strong> {m.output}
        {m.isProject && <span className="mod-detail__badge">Proyek portofolio</span>}
      </p>
    </div>
  )
}

/**
 * 4. Curriculum. Desktop: tab vertikal (panah, Home/End) dengan panel rincian di kanan; mobile: akordeon.
 * Panel ditumpuk dalam satu sel grid sehingga tingginya mengikuti modul terpanjang dan halaman tidak melompat.
 * Pilihan modul disimpan di hash (`#kurikulum-modul-n`) dan bisa dipilih dari section Tools dan Skills.
 */
export function CurriculumOriginal({ program }: { program: ProgramDetail }) {
  const { modules, stats, syllabus } = program.curriculum
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [active, setActive] = useState(() => {
    const id = MODULE_HASH.exec(window.location.hash)?.[1]
    return Math.max(modules.findIndex((m) => m.id === id), 0)
  })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const choose = (index: number, { announce = true } = {}) => {
    setActive(index)
    writeModuleHash(modules[index])
    if (announce) track('curriculum_module_open', { module: modules[index].id })
  }

  // Dipilih dari luar (sel Tools atau Skills): hanya mengganti modul, gulirnya diurus pemanggil.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const index = modules.findIndex((m) => m.id === (e as CustomEvent<{ id: string }>).detail.id)
      if (index >= 0) choose(index)
    }
    window.addEventListener(SELECT_MODULE_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_MODULE_EVENT, onSelect)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: modules.length - 1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (keys[e.key] + modules.length) % modules.length
    choose(next)
    tabRefs.current[next]?.focus()
  }

  const statChips = [stats.modules, stats.weeks, stats.projects, stats.hoursPerWeek]

  return (
    <Section id="kurikulum" tone="surface" labelledBy="kurikulum-title">
      <SectionLabel>Kurikulum</SectionLabel>
      <h2 id="kurikulum-title" className="curr-title">Yang kamu pelajari, modul demi modul</h2>
      <ul className="curr-stats" aria-label="Ringkasan kurikulum">
        {statChips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>

      {isDesktop ? (
        <div className="curr-grid">
          <div role="tablist" aria-orientation="vertical" aria-label="Modul kurikulum" className="mods" onKeyDown={onKeyDown}>
            {modules.map((m, i) => (
              <div key={m.id} role="presentation" className={`mod${i === active ? ' is-active' : ''}`}>
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={tabId(m)}
                  aria-selected={i === active}
                  aria-controls={`panel-${m.id}`}
                  tabIndex={i === active ? 0 : -1}
                  className="mod__head"
                  onClick={() => choose(i)}
                >
                  <span className="mod__name">
                    <span className="mod__num num" aria-hidden="true">{i + 1}.</span>
                    {m.name}
                  </span>
                  <span className="mod__dur">{m.duration}</span>
                </button>
              </div>
            ))}
          </div>
          <div className="mod-panels">
            {modules.map((m, i) => (
              <div
                key={m.id}
                id={`panel-${m.id}`}
                role="tabpanel"
                aria-labelledby={tabId(m)}
                className={`mod-panel${i === active ? ' is-active' : ''}`}
                tabIndex={i === active ? 0 : undefined}
                inert={i !== active}
              >
                <h3>{m.name}</h3>
                <ModuleDetail module={m} tools={program.tools} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mods mods--accordion">
          {modules.map((m, i) => {
            const open = i === active
            return (
              <div key={m.id} className={`mod${open ? ' is-active' : ''}`}>
                <h3 className="mod__h">
                  <button
                    type="button"
                    id={tabId(m)}
                    className="mod__head"
                    aria-expanded={open}
                    aria-controls={`panel-${m.id}`}
                    onClick={() => (open ? setActive(-1) : choose(i))}
                  >
                    <span className="mod__name">
                      <span className="mod__num num" aria-hidden="true">{i + 1}.</span>
                      {m.name}
                    </span>
                    <span className="mod__dur">{m.duration}</span>
                  </button>
                </h3>
                <div id={`panel-${m.id}`} role="region" aria-labelledby={tabId(m)} hidden={!open} className="mod__body">
                  <ModuleDetail module={m} tools={program.tools} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="syllabus">
        <span className="syllabus__file" aria-hidden="true">
          <FileText size={28} strokeWidth={1.5} />
        </span>
        <div className="syllabus__info">
          <h3>{syllabus.fileName}</h3>
          <p>PDF · {syllabus.size} · {syllabus.updated}</p>
        </div>
        <div className="syllabus__actions">
          <a
            className="syllabus__wa"
            href={waLink('Detail: Kurikulum', `${CONSULT_MESSAGES.general}: aku mau silabus ${program.name} lewat WhatsApp`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('click_wa_program_detail', { sumber: 'silabus' })}
          >
            Mau silabus lewat WhatsApp?
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
          <SyllabusDownload program={program} />
        </div>
      </div>
    </Section>
  )
}
