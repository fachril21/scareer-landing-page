import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Section } from '../../layout/Section'
import type { CurriculumModule, ProgramDetail } from '../../../content/program-detail.types'
import { SELECT_MODULE_EVENT } from '../../../lib/sectionLink'
import { track } from '../../../lib/track'
import { SyllabusCard } from './SyllabusCard'
import './curriculum-timeline.css'

const MODULE_HASH = /^#kurikulum-(modul-\d+)$/

const tabId = (m: CurriculumModule) => `kurikulum-${m.id}`

/** Tulis hash modul tanpa menambah riwayat, supaya pilihan modul bisa dibagikan. */
function writeModuleHash(m: CurriculumModule) {
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${tabId(m)}`)
}

/**
 * 4. Kurikulum, layout timeline: judul, ringkasan angka, dan silabus di kiri; lima modul sebagai akordeon
 * bergaris waktu di kanan. Satu modul terbuka. Pilihan disimpan di hash (`#kurikulum-modul-n`) dan bisa dipilih
 * dari section Tools dan Skills.
 */
export function CurriculumTimeline({ program }: { program: ProgramDetail }) {
  const { modules, overview } = program.curriculum
  const [active, setActive] = useState(() => {
    const id = MODULE_HASH.exec(window.location.hash)?.[1]
    return Math.max(modules.findIndex((m) => m.id === id), 0)
  })
  const headRefs = useRef<(HTMLButtonElement | null)[]>([])

  const choose = (index: number) => {
    setActive(index)
    writeModuleHash(modules[index])
    track('curriculum_module_open', { module: modules[index].id })
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
    const current = headRefs.current.findIndex((el) => el === document.activeElement)
    if (current < 0) return
    const keys: Record<string, number> = { ArrowDown: current + 1, ArrowUp: current - 1, Home: 0, End: modules.length - 1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    headRefs.current[(keys[e.key] + modules.length) % modules.length]?.focus()
  }

  return (
    <Section id="kurikulum" tone="paper" labelledBy="kurikulum-title">
      <div className="ct">
        <div className="ct__intro">
          <h2 id="kurikulum-title" className="ct__title">Apa saja yang kamu pelajari, minggu demi minggu.</h2>
          <ul className="ct__stats" aria-label="Ringkasan kurikulum">
            {overview.map((item) => (
              <li key={item.label} className="ct__stat">
                <strong className="num">
                  {item.value}
                  {item.suffix && <span>{item.suffix}</span>}
                </strong>
                {item.label}
              </li>
            ))}
          </ul>
          <SyllabusCard program={program} />
        </div>

        <ol className="tl" onKeyDown={onKeyDown}>
          {modules.map((m, i) => {
            const open = i === active
            return (
              <li key={m.id} className={`tl__item${open ? ' is-open' : ''}`}>
                <h3 className="tl__h">
                  <button
                    ref={(el) => {
                      headRefs.current[i] = el
                    }}
                    type="button"
                    id={tabId(m)}
                    className="tl__head"
                    aria-expanded={open}
                    aria-controls={`panel-${m.id}`}
                    onClick={() => (open ? setActive(-1) : choose(i))}
                  >
                    <span className="tl__num num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tl__name">{m.name}</span>
                    <span className="tl__weeks num">{m.duration}</span>
                    <ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" className="tl__chevron" />
                  </button>
                </h3>
                <div id={`panel-${m.id}`} role="region" aria-labelledby={tabId(m)} className="tl__body">
                  <div className="tl__inner">
                    <ul className="tl__topics">
                      {m.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                    <p className="tl__output">
                      <strong>Hasil:</strong> {m.output}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
