import { ChevronRight } from 'lucide-react'
import '../program-detail/shared/breadcrumb.css'

export interface Crumb {
  label: string
  /** Item terakhir tidak punya tautan. */
  href?: string
}

/** Breadcrumb umum: item terakhir adalah halaman saat ini. */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`}>
            {i > 0 && <ChevronRight size={14} strokeWidth={1.75} aria-hidden="true" />}
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
