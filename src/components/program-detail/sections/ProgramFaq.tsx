import { Faq } from '../../faq/Faq'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { track } from '../../../lib/track'

/**
 * 12. FAQ. Komponen FAQ homepage dengan butir spesifik program: judul menempel di kiri (desktop), boleh beberapa terbuka,
 * deep-link `#faq-nama` membuka butirnya, dan tombol WhatsApp di bawah daftar.
 */
export function ProgramFaq({ program }: { program: ProgramDetail }) {
  return (
    <Faq
      items={program.faq}
      heading="Pertanyaan tentang program ini"
      waSource="Detail: FAQ"
      tone="paper"
      onOpen={(id) => track('faq_open', { faq: id })}
      onAsk={() => track('click_wa_faq')}
    />
  )
}
