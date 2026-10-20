import { PROGRAMS } from '../../content/content'

export function ProgramMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div id="menu-program" className="program-menu" data-open={open} hidden={!open}>
      <ul className="program-menu__list">
        {PROGRAMS.map((p) => (
          <li key={p.slug}>
            <a href={`/program/${p.slug}`} onClick={onNavigate}>
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
