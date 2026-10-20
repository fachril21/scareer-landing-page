import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Photo } from '../ui/Primitives'
import { useInViewOnce } from '../../hooks/useInView'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { usePointerTilt } from '../../hooks/usePointerTilt'
import type { WorkItem } from './Works'

interface WorkCardsProps {
  items: readonly WorkItem[]
  onOpen?: (item: WorkItem) => void
}

function CardBody({ item }: { item: WorkItem }) {
  return (
    <>
      <Photo name={item.image} alt="" width={2048} height={2048} sizes="(min-width: 768px) 508px, 100vw" className="work__photo" />
      <span className="work__scrim" aria-hidden="true" />
      {item.href && (
        <span className="work__icon" aria-hidden="true">
          <ArrowRight size={18} strokeWidth={2} />
        </span>
      )}
      <span className="work__text">
        <span className="work__name">{item.title}</span>
        <span className="work__more">
          <span className="work__desc">{item.description}</span>
          {item.tools && <span className="work__tools">{item.tools.join(' · ')}</span>}
          <span className="work__honest">{item.label}</span>
        </span>
      </span>
    </>
  )
}

/**
 * Kartu karya yang langsung terbuka: nama, deskripsi, tools, dan label selalu terlihat (tanpa reveal hover).
 * Tanpa `href` kartu statis (tidak ada ikon atau kursor tautan); dengan `href` kartu menjadi tautan berikon panah.
 * Micro-interaction: masuk bertahap, foto bergeser tipis mengikuti kursor, hover mengangkat kartu dan menyalakan cincin kuning.
 */
export function WorkCards({ items, onOpen }: WorkCardsProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const interactive = useInteractiveMotion()
  const [seenRef, seen] = useInViewOnce<HTMLDivElement>(0.2)
  usePointerTilt(listRef, interactive)

  return (
    <div ref={seenRef}>
      <ul ref={listRef} className={`wcards${seen ? ' is-seen' : ''}`} aria-label="Karya">
        {items.map((w, i) => (
          <li key={w.key} className="wcard" style={{ '--i': i } as React.CSSProperties}>
            {w.href ? (
              <a href={w.href} className="work work--card" onClick={() => onOpen?.(w)}>
                <CardBody item={w} />
              </a>
            ) : (
              <div className="work work--card work--plain">
                <CardBody item={w} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
