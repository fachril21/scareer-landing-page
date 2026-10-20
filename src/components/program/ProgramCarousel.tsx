import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FilterChip } from '../ui/Primitives'
import { ProgramCell } from './ProgramCell'
import { PROGRAM_CATEGORIES, type Program, type ProgramCategory } from '../../content/content'
import { useFadeFilter } from '../../hooks/useFadeFilter'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { usePointerSpotlight } from '../../hooks/usePointerSpotlight'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const ALL = 'Semua'
type Filter = typeof ALL | ProgramCategory

/** Seberapa jauh panah menggeser, relatif terhadap lebar track. */
const PAGE_RATIO = 0.8
const EDGE_TOLERANCE_PX = 4

function useScrollEdges(trackRef: React.RefObject<HTMLUListElement | null>, dependency: unknown) {
  const [edges, setEdges] = useState({ canPrev: false, canNext: false })

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const canPrev = el.scrollLeft > EDGE_TOLERANCE_PX
    // Padding kanan hanya ruang kosong (bleed ke tepi layar), bukan konten yang tersisa.
    const trailingSpace = parseFloat(getComputedStyle(el).paddingRight) || 0
    const canNext = el.scrollLeft + el.clientWidth < el.scrollWidth - trailingSpace - EDGE_TOLERANCE_PX
    setEdges((prev) => (prev.canPrev === canPrev && prev.canNext === canNext ? prev : { canPrev, canNext }))
  }, [trackRef])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [trackRef, measure, dependency])

  return edges
}

/** Menulis seberapa jauh track tergeser (0 sampai 1) ke `--sp` di kontainer, untuk indikator progres. */
function useTrackProgress(
  rootRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLUListElement | null>,
  enabled: boolean,
  dependency: unknown,
) {
  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track || !enabled) return
    const write = () => {
      const ratio = (track.scrollLeft + track.clientWidth) / track.scrollWidth
      root.style.setProperty('--sp', Math.min(1, ratio).toFixed(3))
    }
    write()
    track.addEventListener('scroll', write, { passive: true })
    window.addEventListener('resize', write, { passive: true })
    return () => {
      track.removeEventListener('scroll', write)
      window.removeEventListener('resize', write)
      root.style.removeProperty('--sp')
    }
  }, [rootRef, trackRef, enabled, dependency])
}

export function ProgramCarousel({ programs }: { programs: readonly Program[] }) {
  const reduced = useReducedMotion()
  const interactive = useInteractiveMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const { selected, applied, choose, fadingOut } = useFadeFilter<Filter>(ALL)

  // Chip hanya untuk kategori yang punya program; satu kategori saja berarti filter tidak berguna.
  const categories = PROGRAM_CATEGORIES.filter((c) => programs.some((p) => p.category === c))
  const showFilter = categories.length > 1
  const isValid = (f: Filter) => f === ALL || categories.includes(f)
  const effectiveSelected = isValid(selected) ? selected : ALL
  const effectiveApplied = isValid(applied) ? applied : ALL

  const visible = effectiveApplied === ALL ? programs : programs.filter((p) => p.category === effectiveApplied)
  const { canPrev, canNext } = useScrollEdges(trackRef, visible)
  useTrackProgress(rootRef, trackRef, interactive, visible)
  usePointerSpotlight(rootRef, '.pcar__item', interactive)

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 })
  }, [effectiveApplied])

  const scrollPage = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * PAGE_RATIO, behavior: reduced ? 'auto' : 'smooth' })
  }

  const hasOverflow = canPrev || canNext

  return (
    <div ref={rootRef} className="pcar">
      <div className="pcar__bar">
        {showFilter && (
          <div className="filters" role="group" aria-label="Filter kategori program">
            {([ALL, ...categories] as Filter[]).map((f) => (
              <FilterChip key={f} selected={effectiveSelected === f} onSelect={() => choose(f)}>
                {f}
              </FilterChip>
            ))}
          </div>
        )}
        {hasOverflow && (
          <div className="pcar__arrows">
            <button type="button" className="pcar__arrow" onClick={() => scrollPage(-1)} disabled={!canPrev} aria-label="Program sebelumnya">
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button type="button" className="pcar__arrow" onClick={() => scrollPage(1)} disabled={!canNext} aria-label="Program berikutnya">
              <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <p className="sr-only" role="status">
        Menampilkan {visible.length} program
      </p>

      <ul ref={trackRef} className="pcar__track" tabIndex={0} aria-label="Daftar program, geser ke samping">
        {visible.map((p) => (
          <ProgramCell
            key={p.slug}
            program={p}
            className="pcar__item"
            fading={fadingOut && effectiveSelected !== ALL && p.category !== effectiveSelected}
          />
        ))}
      </ul>

      {interactive && hasOverflow && (
        <div className="pcar__progress" aria-hidden="true">
          <span />
        </div>
      )}
    </div>
  )
}
