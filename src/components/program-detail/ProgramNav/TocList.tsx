import { useLayoutEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import { PROGRAM_TOC, type TocItem } from '../../../content/program-sections'

interface TocListProps {
  activeId: string
  activeChild: string | null
  onSelect: (id: string) => void
  /** `side`: sidebar dan panel rail (jalur progres). `sheet`: bottom sheet (centang). */
  variant?: 'side' | 'sheet'
}

function isPlainClick(e: React.MouseEvent): boolean {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
}

interface TocLinkProps {
  id: string
  label: string
  current: boolean
  child?: boolean
  checked?: boolean
  onSelect: (id: string) => void
}

function TocLink({ id, label, current, child = false, checked = false, onSelect }: TocLinkProps) {
  return (
    <a
      href={`#${id}`}
      data-toc-id={id}
      className={`toc__link${child ? ' toc__link--child' : ''}${current ? ' is-active' : ''}`}
      aria-current={current ? 'location' : undefined}
      onClick={(e) => {
        if (!isPlainClick(e)) return
        e.preventDefault()
        onSelect(id)
      }}
    >
      <span>{label}</span>
      {checked && <Check size={18} strokeWidth={2} aria-hidden="true" />}
    </a>
  )
}

function TocEntry({ item, activeId, activeChild, variant, onSelect }: { item: TocItem } & Omit<TocListProps, never>) {
  const parentActive = activeId === item.id
  const childActive = parentActive && activeChild !== null && item.children?.some((c) => c.id === activeChild)
  const open = parentActive && Boolean(item.children)
  return (
    <li>
      <TocLink
        id={item.id}
        label={item.label}
        current={parentActive && !childActive}
        checked={variant === 'sheet' && parentActive && !childActive}
        onSelect={onSelect}
      />
      {item.children && (
        <div className="toc__children" data-open={open} inert={!open}>
          <ol>
            {item.children.map((c) => (
              <li key={c.id}>
                <TocLink
                  id={c.id}
                  label={c.label}
                  child
                  current={childActive === true && activeChild === c.id}
                  checked={variant === 'sheet' && activeChild === c.id}
                  onSelect={onSelect}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </li>
  )
}

/** Daftar isi 12 item dalam 4 grup. Satu komponen untuk sidebar, panel rail, dan bottom sheet. */
export function TocList({ activeId, activeChild, onSelect, variant = 'side' }: TocListProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  // Segmen tebal jalur progres: terisi dari atas sampai item aktif (transform saja, tanpa animasi tinggi).
  const measure = () => {
    const root = rootRef.current
    if (!root || variant !== 'side') return
    const current = root.querySelector<HTMLElement>('[aria-current="location"]')
    if (!current) return
    const rootBox = root.getBoundingClientRect()
    if (rootBox.height === 0) return
    const fill = (current.getBoundingClientRect().bottom - rootBox.top) / rootBox.height
    root.style.setProperty('--fill', String(Math.min(1, Math.max(0, fill))))
  }

  useLayoutEffect(measure)

  return (
    <div
      ref={rootRef}
      className={`toc toc--${variant}`}
      // Jalur berubah tinggi saat anak membuka atau menutup: ukur ulang setelah selesai.
      onTransitionEnd={(e) => e.target instanceof HTMLElement && e.target.matches('.toc__children') && measure()}
    >
      {variant === 'side' && (
        <span className="toc__track" aria-hidden="true">
          <span className="toc__fill" />
        </span>
      )}
      <ol className="toc__groups">
        {PROGRAM_TOC.map((group) => (
          <li key={group.label} className="toc__group">
            <p className="toc__group-label">{group.label}</p>
            <ol>
              {group.items.map((item) => (
                <TocEntry key={item.id} item={item} activeId={activeId} activeChild={activeChild} variant={variant} onSelect={onSelect} />
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  )
}
