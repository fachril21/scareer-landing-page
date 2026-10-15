import { WorkShowcase, type WorkItem } from '../../works/Works'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { track } from '../../../lib/track'

/**
 * 9. Portfolio Output. Akordeon foto 5 kolom (komponen Karya) dengan label jujur per karya.
 * Selama belum ada karya peserta, label memakai "Contoh dari tim mentor" dan judul menjelaskan bahwa ini proyek yang akan dikerjakan.
 */
export function PortfolioOutput({ program }: { program: ProgramDetail }) {
  const items: readonly WorkItem[] = program.portfolio.map((p) => ({
    key: p.title,
    title: p.title,
    description: `${p.role}. ${p.summary}`,
    image: p.image,
    tools: p.tools,
    label: p.label,
    href: p.href,
  }))

  return (
    <WorkShowcase
      id="karya"
      heading="Karya yang dibuat di program ini"
      items={items}
      width="content"
      onOpen={(item) => track('portfolio_open', { karya: item.title })}
    />
  )
}
