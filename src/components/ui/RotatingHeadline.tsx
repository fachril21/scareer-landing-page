import { Fragment, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './rotating-headline.css'

const INTERVAL_MS = 2000
const LOOPS_BEFORE_STOP = 3

interface Props {
  prefix: string
  words: readonly string[]
  /** `three` berhenti di kata pertama setelah tiga putaran. */
  loop: 'infinite' | 'three'
  id?: string
}

/**
 * Headline dengan satu frasa yang berganti naik ke atas tiap 2 detik.
 * Pembaca layar mendapat kalimat statis (kata pertama); versi visual disembunyikan darinya.
 * Berhenti saat tab tersembunyi, headline di luar layar, kursor di atas headline, atau reduced-motion.
 */
export function RotatingHeadline({ prefix, words, loop, id }: Props) {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLHeadingElement>(null)
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isOnScreen, setIsOnScreen] = useState(true)
  const [isTabVisible, setIsTabVisible] = useState(() => !document.hidden)
  const ticks = useRef(0)
  const activeRef = useRef(0)

  // Ganti set kata: mulai lagi dari awal.
  useEffect(() => {
    activeRef.current = 0
    setActive(0)
    setPrevious(null)
    ticks.current = 0
  }, [words, loop])

  useEffect(() => {
    const el = rootRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onChange = () => setIsTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  const isRunning = !reduced && !isHovered && isOnScreen && isTabVisible && words.length > 1

  useEffect(() => {
    if (!isRunning) return
    const timer = window.setInterval(() => {
      if (loop === 'three' && ticks.current >= words.length * LOOPS_BEFORE_STOP) {
        window.clearInterval(timer)
        return
      }
      ticks.current += 1
      const current = activeRef.current
      activeRef.current = (current + 1) % words.length
      setPrevious(current)
      setActive(activeRef.current)
    }, INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [isRunning, loop, words.length])

  return (
    <h1
      id={id}
      ref={rootRef}
      className="rhead"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <span className="sr-only">{`${prefix} ${words[0]}`}</span>
      <span className="rhead__visual" aria-hidden="true">
        <span className="rhead__prefix">
          {prefix.split(' ').map((word, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="rhead__pw" style={{ '--i': i } as React.CSSProperties}>{word}</span>
            </Fragment>
          ))}
        </span>
        <span className="rhead__slot">
          {words.map((word, i) => (
            <span
              key={word}
              className={`rhead__word${i === active ? ' is-active' : ''}${i === previous ? ' is-previous' : ''}`}
            >
              {word}
            </span>
          ))}
        </span>
      </span>
    </h1>
  )
}
