import { useRef, useState } from 'react'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/Primitives'
import { Section } from '../layout/Section'
import { StepPanel } from './LearnPanels'
import { LEARN } from '../../content/content'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import './learn.css'

const { steps } = LEARN

function Intro() {
  return (
    <div className="learn__intro">
      <SectionLabel>Cara belajar</SectionLabel>
      <h2 id="learn-title">{LEARN.title}</h2>
      <p className="learn__lead">{LEARN.lead}</p>
      <Button variant="link" href="#program">Lihat program</Button>
    </div>
  )
}

function StepTitle({ index, title, optional }: { index: number; title: string; optional: boolean }) {
  return (
    <>
      <span className="step__num num" aria-hidden="true">{index + 1}</span>
      <span className="step__title">{title}</span>
      {optional && <span className="step__badge">opsional</span>}
    </>
  )
}

/** Desktop: tab vertikal + panel di kanan. Panah atas/bawah, Home/End. Tanpa auto-advance. */
function VerticalTabs() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const move = (to: number) => {
    const next = (to + steps.length) % steps.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowUp: active - 1,
      Home: 0,
      End: steps.length - 1,
    }
    if (e.key in keys) {
      e.preventDefault()
      move(keys[e.key])
    }
  }

  return (
    <div className="learn__grid">
      <div>
        <Intro />
        <div className="steps" role="tablist" aria-orientation="vertical" aria-label="Langkah belajar" onKeyDown={onKeyDown}>
          {steps.map((s, i) => {
            const selected = i === active
            return (
              <div key={s.id} role="presentation" className={`step${selected ? ' is-active' : ''}`}>
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls="learn-panel"
                  aria-describedby={`step-desc-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  className="step__head"
                  onClick={() => setActive(i)}
                >
                  <StepTitle index={i} title={s.title} optional={s.optional} />
                </button>
                <p id={`step-desc-${s.id}`} className="step__body">{s.body}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div
        id="learn-panel"
        role="tabpanel"
        aria-labelledby={`tab-${steps[active].id}`}
        className="learn__panel"
        tabIndex={0}
      >
        <div key={steps[active].id} className="learn__panel-inner">
          <StepPanel stepId={steps[active].id} />
        </div>
      </div>
    </div>
  )
}

/** Mobile: akordeon, panel tampil di dalam baris yang terbuka. */
function StepAccordion() {
  const [open, setOpen] = useState(0)

  return (
    <div>
      <Intro />
      <div className="steps">
        {steps.map((s, i) => {
          const expanded = open === i
          return (
            <div key={s.id} className={`step${expanded ? ' is-active' : ''}`}>
              <h3 className="step__h">
                <button
                  type="button"
                  id={`step-h-${s.id}`}
                  className="step__head"
                  aria-expanded={expanded}
                  aria-controls={`step-body-${s.id}`}
                  onClick={() => setOpen(expanded ? -1 : i)}
                >
                  <StepTitle index={i} title={s.title} optional={s.optional} />
                </button>
              </h3>
              <div id={`step-body-${s.id}`} role="region" aria-labelledby={`step-h-${s.id}`} hidden={!expanded}>
                <p className="step__body">{s.body}</p>
                <div className="learn__panel learn__panel--inline">
                  <StepPanel stepId={s.id} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Learn() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <Section id="cara-belajar" tone="paper" labelledBy="learn-title">
      {isDesktop ? <VerticalTabs /> : <StepAccordion />}
    </Section>
  )
}
