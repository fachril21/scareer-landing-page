import { Section } from '../layout/Section'
import { CONSULT_MESSAGES, LEARN } from '../../content/content'
import { waLink } from '../../lib/whatsapp'
import './learn-columns.css'

const { columns } = LEARN

/** Varian "4 kolom": empat langkah statis berdampingan, tanpa tab dan panel. */
export function LearnColumns({ tone = 'paper' }: { tone?: 'paper' | 'surface' }) {
  return (
    <Section id="cara-belajar" tone={tone} labelledBy="learn-title">
      <h2 id="learn-title">{columns.title}</h2>
      <ol className="lcol" data-reveal-group="">
        {columns.steps.map((step, i) => (
          <li key={step.title} className="lcol__item">
            <span className="lcol__num num" aria-hidden="true">{i + 1}</span>
            <h3 className="lcol__title">
              {step.title}
              {step.optional && <span className="lcol__badge">opsional</span>}
            </h3>
            <p>{step.body}</p>
            {'link' in step && (
              <a
                className="lcol__link"
                href={waLink('Cara belajar', CONSULT_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {step.link}
                <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
