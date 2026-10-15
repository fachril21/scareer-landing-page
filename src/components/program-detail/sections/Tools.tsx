import {
  BarChart3,
  Code2,
  Database,
  GitBranch,
  LayoutDashboard,
  PenTool,
  Terminal,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { FilterChip, SectionLabel } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import type { ProgramDetail, Tool } from '../../../content/program-detail.types'
import { useFadeFilter } from '../../../hooks/useFadeFilter'
import { openModule } from '../../../lib/sectionLink'
import './tools.css'

/** Ikon generik: tidak memakai logo merek supaya tidak terkesan kemitraan resmi (brief 7.5). */
const ICONS: Record<Tool['icon'], LucideIcon> = {
  code: Code2,
  layout: LayoutDashboard,
  database: Database,
  chart: BarChart3,
  pen: PenTool,
  git: GitBranch,
  terminal: Terminal,
  users: Users,
}

const ALL = 'Semua'

function moduleNumber(program: ProgramDetail, moduleId: string): number {
  return program.curriculum.modules.findIndex((m) => m.id === moduleId) + 1
}

function ToolCell({ tool, program, fading }: { tool: Tool; program: ProgramDetail; fading: boolean }) {
  const Icon = ICONS[tool.icon]
  const first = tool.moduleIds[0]
  const number = first ? moduleNumber(program, first) : 0

  // Seluruh sel bisa diklik, tapi hanya tautan modul yang masuk urutan Tab.
  const onCellClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return
    e.currentTarget.querySelector<HTMLAnchorElement>('a.tool__module')?.click()
  }

  return (
    <li className={`tool${fading ? ' is-fading' : ''}`} onClick={onCellClick}>
      <div className="tool__head">
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        <h3>{tool.name}</h3>
      </div>
      <p className="tool__purpose">{tool.purpose}</p>
      <div className="tool__foot">
        <span className="tool__level">{tool.level}</span>
        {first && (
          <a
            className="tool__module"
            href={`#kurikulum-${first}`}
            onClick={(e) => {
              e.preventDefault()
              openModule(first)
            }}
          >
            Modul {number}
            <span className="sr-only">: lihat di kurikulum</span>
          </a>
        )}
      </div>
    </li>
  )
}

/**
 * 5. Tools. Grid sel berborder dalam satu kontainer, filter kategori (sel yang tidak cocok memudar 200 ms lalu grid
 * disusun ulang). Sel menaut ke modul terkait di Curriculum dan memilihnya.
 */
export function Tools({ program }: { program: ProgramDetail }) {
  const { selected, applied, choose, fadingOut } = useFadeFilter<string>(ALL)
  const matches = (t: Tool, f: string) => f === ALL || t.category === f
  const visible = program.tools.filter((t) => matches(t, applied))
  const count = program.tools.filter((t) => matches(t, selected)).length

  return (
    <Section id="tools" tone="paper" labelledBy="tools-title">
      <SectionLabel>Tools</SectionLabel>
      <h2 id="tools-title">Alat yang kamu pakai selama belajar</h2>

      <div className="filters tool-filters" role="group" aria-label="Filter kategori tools">
        {[ALL, ...program.toolCategories].map((c) => (
          <FilterChip key={c} selected={selected === c} onSelect={() => choose(c)}>
            {c}
          </FilterChip>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        Menampilkan {count} alat
      </p>

      <div className="tools-box">
        <ul className="tools-grid">
          {visible.map((t) => (
            <ToolCell key={t.id} tool={t} program={program} fading={fadingOut && !matches(t, selected)} />
          ))}
        </ul>
      </div>
    </Section>
  )
}
