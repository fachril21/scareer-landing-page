import { Rail } from './Rail'
import { Sidebar } from './Sidebar'
import { useVisibleSections } from '../../../hooks/useInView'
import type { NavPattern } from '../../../hooks/useNavPattern'
import type { ProgramToc } from '../../../hooks/useProgramToc'
import './toc.css'

interface ProgramAsideProps {
  pattern: Exclude<NavPattern, 'switcher'>
  toc: ProgramToc
  price: string
}

/** Sidebar atau rail di gutter kiri, di luar kolom konten 1024 px, menempel di top 96 px. */
export function ProgramAside({ pattern, toc, price }: ProgramAsideProps) {
  const visible = useVisibleSections(['ringkasan', 'harga'])
  const ctaHidden = visible.has('ringkasan') || visible.has('harga')

  return (
    <aside className={`pd-aside pd-aside--${pattern}`}>
      <div className="pd-aside__sticky">
        {pattern === 'sidebar' ? <Sidebar toc={toc} price={price} ctaHidden={ctaHidden} /> : <Rail toc={toc} />}
      </div>
    </aside>
  )
}
