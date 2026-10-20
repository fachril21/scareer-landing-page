import { BadgeCheck, CircleCheck, CircleMinus, ShieldCheck, Wallet, type LucideIcon } from 'lucide-react'
import { Section } from '../../layout/Section'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { useTweaks } from '../../../tweaks/TweakContext'
import { WhyChatCard } from './WhyChatCard'
import './whyus-bento.css'

function Icon({ icon: Glyph }: { icon: LucideIcon }) {
  return (
    <span className="wb-icon" aria-hidden="true">
      <Glyph size={20} strokeWidth={1.75} />
    </span>
  )
}

/**
 * 3. Kenapa kami, layout bento di band Ink: kartu obrolan "kakak tingkat", Dibimbing, kenapa terjangkau,
 * kartu merah "yang nggak kami janjikan" (selalu utuh), lalu tiga alasan program. Sel berborder tipis, tanpa bayangan.
 */
export function WhyUsBento({ program }: { program: ProgramDetail }) {
  const { whyBento: w } = program
  const { tweaks } = useTweaks()

  return (
    <Section id="kenapa-kami" tone="ink" labelledBy="kenapa-kami-title">
      <h2 id="kenapa-kami-title" className="wb-title">
        {w.title} <span>{w.accent}</span>
      </h2>

      <div id="kenapa-brand" className="wb-grid">
        <WhyChatCard title={w.chat.title} body={w.chat.body} label={w.chat.label} lines={w.chat.lines} />

        <article className="wb-card" aria-labelledby="wb-dibimbing">
          <Icon icon={BadgeCheck} />
          <h3 id="wb-dibimbing" className="wb-card__title">{w.dibimbing.title}</h3>
          <p className="wb-card__body">{w.dibimbing.body}</p>
        </article>

        <article className="wb-card" aria-labelledby="wb-affordable">
          <Icon icon={Wallet} />
          <dl className="wb-trade">
            <div>
              <dt><CircleMinus size={16} strokeWidth={1.75} aria-hidden="true" />{w.affordable.reducedLabel}</dt>
              <dd>{w.affordable.reduced}</dd>
            </div>
            <div>
              <dt><CircleCheck size={16} strokeWidth={1.75} aria-hidden="true" />{w.affordable.keptLabel}</dt>
              <dd>{w.affordable.kept}</dd>
            </div>
          </dl>
          <h3 id="wb-affordable" className="wb-card__title">{w.affordable.title}</h3>
        </article>

        <article className="wb-card wb-card--promise" aria-labelledby="wb-promise">
          <span className="wb-icon" aria-hidden="true"><ShieldCheck size={20} strokeWidth={1.75} /></span>
          <h3 id="wb-promise" className="wb-card__title"><mark>{w.promise.title}</mark></h3>
          <p className="wb-card__body">{w.promise.body}</p>
        </article>
      </div>

      {tweaks.programReasons === 'shown' && (
        <div id="kenapa-program" className="wb-reasons">
          <h3 className="wb-reasons__title">{w.reasonsTitle}</h3>
          <ul className="wb-reasons__list">
            {w.reasons.map((reason, i) => (
              <li key={reason.title} className="wb-card wb-card--reason">
                <span className="wb-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="wb-card__title">{reason.title}</h4>
                <p className="wb-card__body">{reason.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}
