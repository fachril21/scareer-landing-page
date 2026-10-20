import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import type { ProgramDetail, WhyItem } from '../../../content/program-detail.types'
import { requestSection } from '../../../lib/sectionLink'
import { useTweaks } from '../../../tweaks/TweakContext'
import '../../why/why.css'
import './whyus.css'

function WhyCell({ item }: { item: WhyItem }) {
  const { link } = item
  return (
    <li className="why-cell">
      <h4>{item.title}</h4>
      <p>{item.body}</p>
      {link && (
        <Button
          variant="link"
          onInk
          href={`#${link.sectionId}`}
          onClick={(e) => {
            e.preventDefault()
            requestSection(link.sectionId)
          }}
        >
          {link.label}
        </Button>
      )}
    </li>
  )
}

function WhyGroup({ id, title, items, columns }: { id: string; title: string; items: readonly WhyItem[]; columns: 2 | 3 }) {
  return (
    <div id={id} className="why-group">
      <h3>{title}</h3>
      <ul className={`why-grid why-grid--${columns}`}>
        {items.map((item) => (
          <WhyCell key={item.title} item={item} />
        ))}
      </ul>
    </div>
  )
}

/**
 * 3. Why Us. Dua kelompok sel di atas Ink: Kenapa Brand (3 butir, sel "yang nggak kami janjikan" selalu utuh)
 * dan Kenapa Program Ini (3 sampai 4 butir). Klaim relevansi bidang tanpa sumber tidak ditampilkan.
 */
export function WhyUsOriginal({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  // Butir yang mengklaim sesuatu tentang pasar wajib bersumber: tanpa sumber, dibuang.
  const brand = program.whyBrand
  const forProgram = program.whyProgram.filter((item) => !item.requiresSource || item.source)

  return (
    <Section id="kenapa-kami" tone="ink" labelledBy="kenapa-kami-title">
      <SectionLabel onInk>Kenapa kami</SectionLabel>
      <h2 id="kenapa-kami-title" className="why-title">Kenapa scareer, dan kenapa program ini</h2>

      <WhyGroup id="kenapa-brand" title="Kenapa scareer" items={brand} columns={3} />
      {/* Tujuannya section transparansi di homepage: ikut tersembunyi saat section itu disembunyikan (tweak). */}
      {tweaks.whyPanel === 'shown' && (
        <Button variant="link" onInk href="/#transparan" className="why-more">
          Pelajari scareer
        </Button>
      )}
      {tweaks.programReasons === 'shown' && (
        <WhyGroup id="kenapa-program" title="Kenapa program ini" items={forProgram} columns={forProgram.length === 4 ? 2 : 3} />
      )}
    </Section>
  )
}
