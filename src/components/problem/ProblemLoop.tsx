import { useRef } from 'react'
import { ArrowRight, CornerDownLeft, RefreshCw } from 'lucide-react'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { useInViewOnce } from '../../hooks/useInView'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { Section } from '../layout/Section'
import { PROBLEM } from '../../content/content'
import { CycleSquare } from './ProblemSquare'
import './problem-loop.css'
import './problem-cycle.css'
import './problem-motion.css'

type Variant = 'square' | 'cycle' | 'loop' | 'sides'

function Loop() {
  const listRef = useRef<HTMLOListElement>(null)
  const [returnRef, returnSeen] = useInViewOnce<HTMLParagraphElement>(0.9)
  // --p (0 sampai 1) menggambar garis penghubung dan menyalakan node mengikuti scroll.
  useScrollProgress(listRef, useInteractiveMotion(), { start: 0.85, end: 0.4, smooth: true })

  return (
    <>
      <ol ref={listRef} className="loop">
        {PROBLEM.steps.map((step, i) => (
          <li key={step.title} className="loop__step" style={{ '--i': i, '--n': PROBLEM.steps.length } as React.CSSProperties}>
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
      <p ref={returnRef} className={`loop__return${returnSeen ? ' is-seen' : ''}`} aria-hidden="true">
        <CornerDownLeft size={18} strokeWidth={1.75} />
        {PROBLEM.returnLabel}
      </p>
    </>
  )
}

const RING = { cx: 170, cy: 170, r: 130 }
const round1 = (n: number) => Math.round(n * 10) / 10
/** Titik di cincin pada sudut `deg` (0 = jam 12, searah jarum jam). */
const ringPoint = (deg: number) => {
  const t = (deg * Math.PI) / 180
  return { x: round1(RING.cx + RING.r * Math.sin(t)), y: round1(RING.cy - RING.r * Math.cos(t)) }
}
const NODE_DEGS = [0, 90, 180, 270] as const
const CHEVRONS = [
  { deg: 45, tone: 'on' },
  { deg: 135, tone: 'on' },
  { deg: 315, tone: 'off' },
] as const
const CHEVRON_PATH = 'M-5 -5 L3 0 L-5 5'
/** Kapan panah merah di busur menyala (ms), menyesuaikan kurva ease busur 1100 ms di problem-cycle.css. */
const CHEVRON_DELAY_MS: Readonly<Record<number, number>> = { 45: 300, 135: 640 }
/** Titik putus siklus: di antara langkah 3 (jam 6) dan 4 (jam 9). */
const BREAK_DEG = 225
const EXIT_LENGTH = 80

/** Gaya "Siklus lingkaran": empat langkah di cincin, scareer memutusnya di antara langkah 3 dan 4. */
function Cycle() {
  // Animasi jalan sekali (bukan terikat scroll) begitu section menyentuh pita tengah layar.
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0, '-45% 0px -45% 0px')
  const exitFrom = ringPoint(BREAK_DEG)
  const dir = { x: Math.sin((BREAK_DEG * Math.PI) / 180), y: -Math.cos((BREAK_DEG * Math.PI) / 180) }
  const exitTo = { x: round1(exitFrom.x + dir.x * EXIT_LENGTH), y: round1(exitFrom.y + dir.y * EXIT_LENGTH) }
  const top = ringPoint(0)
  const bottom = ringPoint(180)

  return (
    <div ref={ref} className={`cyc${seen ? ' is-seen' : ''}`}>
      <div className="cyc__ring" aria-hidden="true">
        <svg className="cyc__svg" viewBox="0 0 340 340" focusable="false">
          {/* Separuh kedua (jam 6 ke jam 12) putus-putus: siklus yang tidak pernah berujung. */}
          <path className="cyc__track" pathLength={100} d={`M${bottom.x} ${bottom.y} A${RING.r} ${RING.r} 0 0 1 ${top.x} ${top.y}`} />
          <path className="cyc__arc" pathLength={1} d={`M${top.x} ${top.y} A${RING.r} ${RING.r} 0 0 1 ${bottom.x} ${bottom.y}`} />
          {CHEVRONS.map(({ deg, tone }) => {
            const { x, y } = ringPoint(deg)
            // Panah muncul tepat saat busur merah melewatinya.
            const delay = `${CHEVRON_DELAY_MS[deg] ?? 0}ms`
            return <path key={deg} className={`cyc__chev cyc__chev--${tone}`} style={{ '--cd': delay } as React.CSSProperties} d={CHEVRON_PATH} transform={`translate(${x} ${y}) rotate(${deg})`} />
          })}
          <path className="cyc__exit" d={`M${exitFrom.x} ${exitFrom.y} L${exitTo.x} ${exitTo.y}`} />
          <path className="cyc__exit" d={CHEVRON_PATH} transform={`translate(${exitTo.x} ${exitTo.y}) rotate(${BREAK_DEG - 90})`} />
          <g className="cyc__orbit">
            <circle cx={top.x} cy={top.y} r="5" />
          </g>
          {NODE_DEGS.map((deg, i) => {
            const { x, y } = ringPoint(deg)
            const off = i === NODE_DEGS.length - 1
            return (
              <g key={deg} className={`cyc__node cyc__node--${i + 1}${off ? ' cyc__node--off' : ''}`} style={{ '--i': i } as React.CSSProperties}>
                <circle className="cyc__node-bg" cx={x} cy={y} r="18" />
                {!off && <circle className="cyc__node-fill" cx={x} cy={y} r="18" />}
                <text className="cyc__node-num" x={x} y={y} textAnchor="middle" dominantBaseline="central">{i + 1}</text>
              </g>
            )
          })}
        </svg>
        <RefreshCw className="cyc__core" size={36} strokeWidth={1.5} />
        <span className="cyc__pill">
          {PROBLEM.breakLabel}
          <ArrowRight size={16} strokeWidth={2} />
        </span>
      </div>
      <ol className="cyc__steps" role="list">
        {PROBLEM.steps.map((step, i) => (
          <li key={step.title} className={`cyc__step cyc__step--${i + 1}`}>
            <span className="cyc__num num" aria-hidden="true">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            {i === PROBLEM.breakAfter && (
              <span className="cyc__chip">
                {PROBLEM.breakLabel}
                <ArrowRight size={16} strokeWidth={2} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
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
 */
export function ProblemLoop({ variant }: { variant: Variant }) {
  return (
    <Section id="masalah" tone="surface" labelledBy="problem-title" className="problem">
      <h2 id="problem-title" className="problem__title">{PROBLEM.title}</h2>
      <p className="problem__lead">{PROBLEM.lead}</p>
      {variant === 'sides' ? <Sides /> : variant === 'square' ? <CycleSquare /> : variant === 'cycle' ? <Cycle /> : <Loop />}
    </Section>
  )
}
