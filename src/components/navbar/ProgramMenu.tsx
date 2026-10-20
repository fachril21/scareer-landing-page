import { ArrowRight, BarChart3, ShieldCheck, type LucideIcon } from 'lucide-react'
import { PROGRAMS } from '../../content/content'
import { useTweaks } from '../../tweaks/TweakContext'

/** Ikon tiap program di kartu dropdown; program baru tanpa entri memakai panah saja. */
const PROGRAM_ICONS: Readonly<Record<string, LucideIcon>> = {
  'cyber-security': ShieldCheck,
  'data-analyst': BarChart3,
}

export function ProgramMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const cards = useTweaks().tweaks.programMenu === 'cards'

  if (cards) {
    // Tanpa atribut hidden: panel disembunyikan lewat visibility supaya penutupannya bisa dianimasikan.
    return (
      <div id="menu-program" className="program-menu program-menu--cards" data-open={open}>
        <ul className="program-menu__cards">
          {PROGRAMS.map((p, i) => {
            const Icon = PROGRAM_ICONS[p.slug]
            return (
              <li key={p.slug} style={{ '--i': i } as React.CSSProperties}>
                <a className="pm-card" href={`/program/${p.slug}`} onClick={onNavigate}>
                  <span className="pm-card__top">
                    <span className="pm-card__icon" aria-hidden="true">
                      {Icon && <Icon size={20} strokeWidth={1.75} />}
                    </span>
                    <span className="pm-card__go" aria-hidden="true">
                      <ArrowRight size={16} strokeWidth={2} />
                    </span>
                  </span>
                  <span className="pm-card__name">{p.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

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
