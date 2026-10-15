import { PROGRAMS } from '../../content/content'

const MAX_ITEMS = 8

export function ProgramMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div id="menu-program" className="program-menu" data-open={open} hidden={!open}>
      <ul className="program-menu__list">
        {PROGRAMS.slice(0, MAX_ITEMS).map((p) => (
          <li key={p.slug}>
            <a href={`/program/${p.slug}`} onClick={onNavigate}>
              {p.name}
            </a>
          </li>
        ))}
      </ul>
      <a className="program-menu__all" href="/program" onClick={onNavigate}>
        Lihat semua program
      </a>
    </div>
  )
}
