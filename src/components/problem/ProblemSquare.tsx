import { ArrowRight, RefreshCw } from 'lucide-react'
import { useInViewOnce } from '../../hooks/useInView'
import { PROBLEM } from '../../content/content'
import './problem-square.css'

/** Persegi di viewBox 320 x 340: sisi 240 mulai dari (40, 40), sudut dibulatkan 24, sisa bawah untuk panah keluar. */
const SQ = { x: 40, y: 40, side: 240, r: 24 }
const LEFT = SQ.x
const TOP = SQ.y
const RIGHT = SQ.x + SQ.side
const BOTTOM = SQ.y + SQ.side
const MID = SQ.x + SQ.side / 2
const EXIT_LENGTH = 44

/** Node di empat sudut, searah jarum jam dari kiri-atas. */
const NODES = [
  { x: LEFT, y: TOP },
  { x: RIGHT, y: TOP },
  { x: RIGHT, y: BOTTOM },
  { x: LEFT, y: BOTTOM },
] as const

/** Panah arah di tengah sisi (derajat = arah jalan). Kapan menyala (ms) mengikuti kurva ease busur 1100 ms di problem-square.css. */
const CHEVRONS = [
  { x: MID, y: TOP, deg: 0, tone: 'on', delay: 300 },
  { x: RIGHT, y: MID, deg: 90, tone: 'on', delay: 640 },
  { x: LEFT, y: MID, deg: 270, tone: 'off', delay: 0 },
] as const
const CHEVRON_PATH = 'M-5 -5 L3 0 L-5 5'

const { r } = SQ
/** Busur merah: kiri-atas, sisi atas, sisi kanan, sampai kanan-bawah (langkah 1 sampai 3). */
const ARC_PATH = `M${LEFT} ${TOP} H${RIGHT - r} A${r} ${r} 0 0 1 ${RIGHT} ${TOP + r} V${BOTTOM}`
/** Jalur putus-putus: kanan-bawah, sisi bawah, sisi kiri, kembali ke kiri-atas (siklus yang tidak berujung). */
const TRACK_PATH = `M${RIGHT} ${BOTTOM} H${LEFT + r} A${r} ${r} 0 0 1 ${LEFT} ${BOTTOM - r} V${TOP}`

/** Gaya "Siklus persegi": empat langkah di sudut persegi, scareer memutusnya di sisi bawah (antara langkah 3 dan 4). */
export function CycleSquare() {
  // Animasi jalan sekali (bukan terikat scroll) begitu section menyentuh pita tengah layar.
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0, '-45% 0px -45% 0px')

  return (
    <div ref={ref} className={`sq${seen ? ' is-seen' : ''}`}>
      <div className="sq__ring" aria-hidden="true">
        <svg className="sq__svg" viewBox="0 0 320 340" focusable="false">
          <path className="sq__track" pathLength={100} d={TRACK_PATH} />
          <path className="sq__arc" pathLength={1} d={ARC_PATH} />
          {CHEVRONS.map(({ x, y, deg, tone, delay }) => (
            <path
              key={`${x}-${y}`}
              className={`sq__chev sq__chev--${tone}`}
              style={{ '--cd': `${delay}ms` } as React.CSSProperties}
              d={CHEVRON_PATH}
              transform={`translate(${x} ${y}) rotate(${deg})`}
            />
          ))}
          <path className="sq__exit" d={`M${MID} ${BOTTOM} V${BOTTOM + EXIT_LENGTH}`} />
          <path className="sq__exit" d={CHEVRON_PATH} transform={`translate(${MID} ${BOTTOM + EXIT_LENGTH}) rotate(90)`} />
          <circle className="sq__orbit" cx="0" cy="0" r="5" />
          {NODES.map(({ x, y }, i) => {
            const off = i === NODES.length - 1
            return (
              <g key={i} className={`sq__node sq__node--${i + 1}${off ? ' sq__node--off' : ''}`}>
                <circle className="sq__node-bg" cx={x} cy={y} r="18" />
                {!off && <circle className="sq__node-fill" cx={x} cy={y} r="18" />}
                <text className="sq__node-num" x={x} y={y} textAnchor="middle" dominantBaseline="central">{i + 1}</text>
              </g>
            )
          })}
        </svg>
        <RefreshCw className="sq__core" size={36} strokeWidth={1.5} />
        <span className="sq__pill">
          {PROBLEM.breakLabel}
          <ArrowRight size={16} strokeWidth={2} />
        </span>
      </div>
      <ol className="sq__steps" role="list">
        {PROBLEM.steps.map((step, i) => (
          <li key={step.title} className={`sq__step sq__step--${i + 1}`}>
            <span className="sq__num num" aria-hidden="true">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            {i === PROBLEM.breakAfter && (
              <span className="sq__chip">
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
