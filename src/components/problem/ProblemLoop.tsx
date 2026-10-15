import { ArrowRight, CornerDownLeft } from 'lucide-react'
import { Button } from '../ui/Button'
import { Section } from '../layout/Section'
import { PROBLEM } from '../../content/content'
import './problem-loop.css'

type Variant = 'loop' | 'sides'

function Loop() {
  return (
    <>
      <ol className="loop">
        {PROBLEM.steps.map((step, i) => (
          <li key={step.title} className="loop__step">
            <span className="loop__node" aria-hidden="true" />
            <span className="loop__num num" aria-hidden="true">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            {i === PROBLEM.breakAfter && (
              <span className="loop__break" aria-hidden="true">
                {PROBLEM.breakLabel}
                <ArrowRight size={16} strokeWidth={2} />
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="loop__return" aria-hidden="true">
        <CornerDownLeft size={18} strokeWidth={1.75} />
        {PROBLEM.returnLabel}
      </p>
    </>
  )
}

function Sides() {
  return (
    <div className="sides">
      {PROBLEM.sides.map((side) => (
        <div key={side.title} className="sides__col">
          <h3>{side.title}</h3>
          <ul>
            {side.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/**
 * Section masalah: kenapa kerja pertama terasa sesulit itu. Tanpa statistik (PRODUCT.md: bukti harus nyata).
 * Jembatan ke "Cara belajar": masalah, titik tempat scareer masuk, lalu tautan ke langkahnya.
 */
export function ProblemLoop({ variant, next }: { variant: Variant; next: 'program' | 'learn' }) {
  return (
    <Section id="masalah" tone="surface" labelledBy="problem-title" className="problem">
      <h2 id="problem-title" className="problem__title">{PROBLEM.title}</h2>
      <p className="problem__lead">{PROBLEM.lead}</p>
      {variant === 'sides' ? <Sides /> : <Loop />}
      <div className="problem__pivot">
        <p>{PROBLEM.pivot}</p>
        <Button variant="link" href={next === 'program' ? '#program' : '#cara-belajar'}>
          {PROBLEM.cta[next]}
        </Button>
      </div>
    </Section>
  )
}
