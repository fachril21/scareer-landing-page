import { ChevronRight } from 'lucide-react'
import './breadcrumb.css'

/** Beranda > Program > [Nama]. "Program" menaut ke daftar program, item terakhir bukan tautan. */
export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="/">Beranda</a>
        </li>
        <li>
          <ChevronRight size={14} strokeWidth={1.75} aria-hidden="true" />
          <a href="/program">Program</a>
        </li>
        <li>
          <ChevronRight size={14} strokeWidth={1.75} aria-hidden="true" />
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  )
}
