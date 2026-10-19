import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, RefreshCw, Search } from 'lucide-react'
import { PROGRAMS } from '../../content/content'
import { useInViewOnce } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { analyze, FINDER_EXAMPLES, KIND_LABEL } from '../../lib/programFinder'

const MAX_RESULTS = 4
const CRITERIA_TOTAL = 3
const BASE_DELAY_MS = 26
const JITTER_MS = 22
const PAUSE_AFTER_WORD_MS = 70
const PAUSE_AFTER_COMMA_MS = 170
const REORDER_MS = 420

/** Jeda antar huruf: acak tipis seperti orang mengetik, lebih lama di spasi dan koma. */
function delayAfter(char: string): number {
  const pause = char === ',' ? PAUSE_AFTER_COMMA_MS : char === ' ' ? PAUSE_AFTER_WORD_MS : 0
  return BASE_DELAY_MS + Math.random() * JITTER_MS + pause
}

/**
 * Mengetik `target` huruf demi huruf. `onWord` dipanggil saat satu kata selesai (spasi, koma, atau akhir),
 * supaya hasil hanya berubah per kata, bukan per huruf. Mengembalikan fungsi pembatal.
 */
function typeInto(target: string, write: (value: string) => void, onWord: (value: string) => void, onDone: () => void): () => void {
  let length = 0
  let id = 0
  const step = () => {
    length += 1
    const value = target.slice(0, length)
    write(value)
    const char = target[length - 1]
    const done = length >= target.length
    if (done || char === ' ' || char === ',') onWord(value)
    if (done) {
      onDone()
      return
    }
    id = window.setTimeout(step, delayAfter(char))
  }
  id = window.setTimeout(step, BASE_DELAY_MS)
  return () => window.clearTimeout(id)
}

/**
 * Kotak "Cari program yang cocok": profil singkat dipecah jadi chip, lalu program diurutkan.
 * Contoh pertama mengetik sendiri sekali saat terlihat; setelah itu hanya refresh atau ketikan pengunjung yang mengubahnya.
 * Semua dihitung di browser, tanpa kirim data.
 */
export function ProgramFinder() {
  const reduced = useReducedMotion()
  const [rootRef, seen] = useInViewOnce<HTMLDivElement>(0.4)
  const resultsRef = useRef<HTMLOListElement>(null)
  const [text, setText] = useState(FINDER_EXAMPLES[0])
  // Teks yang dianalisis: ikut `text` saat pengunjung mengetik, tapi per kata saat animasi mengetik.
  const [analyzed, setAnalyzed] = useState(FINDER_EXAMPLES[0])
  const [typing, setTyping] = useState(false)
  const [exampleIndex, setExampleIndex] = useState(0)
  const [turns, setTurns] = useState(0)
  const cancelTyping = useRef<() => void>(() => {})
  const hasAutoTyped = useRef(false)
  const previousTops = useRef(new Map<string, number>())

  const startTyping = (target: string) => {
    cancelTyping.current()
    if (reduced) {
      setText(target)
      setAnalyzed(target)
      return
    }
    setText('')
    setAnalyzed('')
    setTyping(true)
    cancelTyping.current = typeInto(target, setText, setAnalyzed, () => setTyping(false))
  }

  // Ketikan otomatis pertama, sekali saja, saat kotak terlihat.
  useEffect(() => {
    if (!seen || hasAutoTyped.current) return
    hasAutoTyped.current = true
    startTyping(FINDER_EXAMPLES[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen])

  useEffect(() => () => cancelTyping.current(), [])

  const refresh = () => {
    const next = (exampleIndex + 1 + Math.floor(Math.random() * (FINDER_EXAMPLES.length - 1))) % FINDER_EXAMPLES.length
    setExampleIndex(next)
    setTurns((t) => t + 1)
    startTyping(FINDER_EXAMPLES[next])
  }

  const onInput = (value: string) => {
    cancelTyping.current()
    setTyping(false)
    setText(value)
    setAnalyzed(value)
  }

  const { signals, matches } = analyze(analyzed)
  const results = matches.slice(0, MAX_RESULTS).flatMap((m) => {
    const program = PROGRAMS.find((p) => p.field === m.field)
    return program ? [{ match: m, program }] : []
  })
  const orderKey = results.map((r) => r.program.slug).join('|')

  // FLIP: baris yang berpindah urutan meluncur ke posisi barunya, bukan melompat.
  useLayoutEffect(() => {
    const list = resultsRef.current
    if (!list) return
    const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-slug]'))
    const tops = new Map<string, number>()
    rows.forEach((row) => {
      const top = row.getBoundingClientRect().top
      const slug = row.dataset.slug ?? ''
      tops.set(slug, top)
      const before = previousTops.current.get(slug)
      if (reduced || before === undefined || Math.abs(before - top) < 1) return
      row.animate([{ translate: `0 ${before - top}px` }, { translate: '0 0' }], {
        duration: REORDER_MS,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      })
    })
    previousTops.current = tops
  }, [orderKey, reduced])

  return (
    <div ref={rootRef} className={`finder${typing ? ' is-typing' : ''}`}>
      <label className="finder__label" htmlFor="finder-input">
        Ceritakan singkat: jurusan, minat, dan mau kerja di mana
      </label>
      <div className="finder__box">
        <Search size={20} strokeWidth={1.75} aria-hidden="true" />
        <input
          id="finder-input"
          className="finder__input"
          type="text"
          value={text}
          maxLength={160}
          autoComplete="off"
          onChange={(e) => onInput(e.target.value)}
          placeholder="Contoh: lulusan akuntansi, suka angka, mau kerja di bank"
        />
        <button
          type="button"
          className="finder__refresh"
          style={{ '--turns': turns } as React.CSSProperties}
          onClick={refresh}
          aria-label="Coba contoh profil lain"
        >
          <RefreshCw size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <ul className="finder__signals" aria-label="Yang kami tangkap dari ceritamu">
        {signals.map((s) => (
          <li key={`${s.kind}-${s.label}`} className={`finder__signal finder__signal--${s.kind}`}>
            <span>{KIND_LABEL[s.kind]}</span> {s.label}
          </li>
        ))}
      </ul>

      <ol ref={resultsRef} className="finder__results" aria-label="Program yang cocok" aria-live={typing ? 'off' : 'polite'}>
        {results.length === 0 ? (
          <li className="finder__empty">
            Belum ada yang cocok. Coba sebut jurusanmu, hal yang kamu suka, atau tempat kerja yang kamu incar.
          </li>
        ) : (
          results.map(({ match, program }) => (
            <li key={program.slug} data-slug={program.slug} className="finder__result">
              <a className="finder__link" href={`/program/${program.slug}`} aria-label={`Lihat detail ${program.name}`}>
                <span className="finder__name">{program.name}</span>
                <span className="finder__reasons">{match.reasons.map((r) => r.label).join(' · ')}</span>
                <span className="finder__score num">
                  <span className="finder__pips" aria-hidden="true">
                    {Array.from({ length: CRITERIA_TOTAL }, (_, i) => (
                      <i key={i} className={i < match.matched ? 'is-on' : ''} />
                    ))}
                  </span>
                  {match.matched}/{CRITERIA_TOTAL} cocok
                </span>
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
          ))
        )}
      </ol>
      <p className="finder__note">Hasil ini perkiraan dari kata kunci, bukan penilaian. Contoh profil hanya ilustrasi.</p>
    </div>
  )
}
