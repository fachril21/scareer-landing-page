import { useState } from 'react'
import { FilterChip, SectionLabel } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import type { ProgramDetail, Tool } from '../../../content/program-detail.types'
import { openModule } from '../../../lib/sectionLink'
import './tools-tiles.css'

const ALL = 'Semua'

/** Nomor urut modul (mulai dari 1) tempat tool dipakai, tanpa modul yang tidak ada. */
function moduleNumbers(program: ProgramDetail, tool: Tool): number[] {
  return tool.moduleIds
    .map((id) => program.curriculum.modules.findIndex((m) => m.id === id) + 1)
    .filter((n) => n > 0)
}

interface TileProps {
  tool: Tool
  program: ProgramDetail
  state: 'idle' | 'match' | 'off'
  /** Urutan sel, untuk jeda transisi berjenjang. */
  index: number
}

function ToolTile({ tool, program, state, index }: TileProps) {
  const first = tool.moduleIds[0]
  const numbers = moduleNumbers(program, tool)
  const label = numbers.length > 0 ? `Modul ${numbers.join(', ')}` : null
  const enabled = state !== 'off'

  // Seluruh sel bisa diklik saat aktif, tapi hanya tautan modul yang masuk urutan Tab.
  const onCellClick = (e: React.MouseEvent) => {
    if (!enabled || (e.target as HTMLElement).closest('a')) return
    e.currentTarget.querySelector<HTMLAnchorElement>('a.tile__module')?.click()
  }

  return (
    <li className={`tile is-${state}`} style={{ '--i': index } as React.CSSProperties} onClick={onCellClick}>
      <span className="tile__mark" aria-hidden="true">{tool.abbr}</span>
      <h3>{tool.name}</h3>
      {label && (
        // Elemen yang sama di semua keadaan, supaya garis bawah dan warna bisa bertransisi mulus.
        <a
          className="tile__module"
          href={enabled && first ? `#kurikulum-${first}` : undefined}
          aria-disabled={enabled ? undefined : true}
          tabIndex={enabled ? undefined : -1}
          onClick={(e) => {
            e.preventDefault()
            if (enabled && first) openModule(first)
          }}
        >
          {label}
          <span className="sr-only">{enabled ? ': lihat di kurikulum' : ' (tidak termasuk kategori yang dipilih)'}</span>
        </a>
      )}
    </li>
  )
}

/**
 * 5. Tools, layout ubin: monogram huruf (bukan logo merek), nama, dan modul tempat tool dipakai.
 * Filter kategori tidak membuang ubin: yang cocok disorot, yang lain dinonaktifkan di tempatnya, jadi grid tidak bergeser.
 */
export function ToolsTiles({ program }: { program: ProgramDetail }) {
  const [selected, setSelected] = useState(ALL)
  const matches = (t: Tool) => selected === ALL || t.category === selected
  const count = program.tools.filter(matches).length

  return (
    <Section id="tools" tone="paper" labelledBy="tools-title">
      <SectionLabel>Tools</SectionLabel>
      <h2 id="tools-title">Alat yang kamu pakai selama belajar</h2>

      <div className="filters tool-filters" role="group" aria-label="Filter kategori tools">
        {[ALL, ...program.toolCategories].map((c) => (
          <FilterChip key={c} selected={selected === c} onSelect={() => setSelected(c)}>
            {c}
          </FilterChip>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {selected === ALL ? `Menampilkan ${program.tools.length} alat` : `Menyorot ${count} dari ${program.tools.length} alat`}
      </p>

      <div className="tiles-box">
        <ul className="tiles-grid">
          {program.tools.map((t, i) => (
            <ToolTile key={t.id} tool={t} program={program} index={i} state={selected === ALL ? 'idle' : matches(t) ? 'match' : 'off'} />
          ))}
        </ul>
      </div>
    </Section>
  )
}
