import { useCallback, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '../../ui/Button'
import { FilterChip } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import { CONSULT_MESSAGES } from '../../../content/content'
import { FAQ_CATEGORIES } from '../../../content/program-detail'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { useFaqState } from '../../../hooks/useFaqState'
import { requestSection } from '../../../lib/sectionLink'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import './faq-cards.css'

/**
 * 12. FAQ, layout kartu: kepala menempel di kiri (judul, pengantar, WhatsApp, pil kategori), daftar kartu di kanan.
 * Pil kategori tidak membuang kartu: yang di luar kategori dipudarkan dan dinonaktifkan di tempatnya.
 * Boleh beberapa terbuka; deep-link `#faq-nama` dan `openFaq` tetap membuka butirnya (dan membatalkan filter bila perlu).
 */
export function ProgramFaqCards({ program }: { program: ProgramDetail }) {
  const items = program.faq
  const [category, setCategory] = useState<string | null>(null)
  const clearFilter = useCallback(() => setCategory(null), [])
  const { open, toggle } = useFaqState({
    items,
    onOpen: (id) => track('faq_open', { faq: id }),
    onReveal: clearFilter,
  })

  const matches = (c?: string) => category === null || c === category
  const count = items.filter((item) => matches(item.category)).length

  return (
    <Section id="faq" tone="paper" labelledBy="faq-title">
      <div className="fc">
        <div className="fc__grid">
        <div className="fc__head">
          <h2 id="faq-title">FAQ</h2>
          <p className="fc__lead">Termasuk yang bikin ragu. Belum ketemu jawabannya? Tanya langsung ke kami.</p>
          <Button
            variant="whatsapp"
            href={waLink('Detail: FAQ', CONSULT_MESSAGES.general)}
            target="_blank"
            onClick={() => track('click_wa_faq')}
          >
            Tanya via WhatsApp
          </Button>
          <div className="fc__filters" role="group" aria-label="Filter kategori pertanyaan">
            {FAQ_CATEGORIES.map((c) => (
              <FilterChip key={c} selected={category === c} onSelect={() => setCategory((prev) => (prev === c ? null : c))}>
                {c}
              </FilterChip>
            ))}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {category === null ? `Menampilkan ${items.length} pertanyaan` : `Menyorot ${count} dari ${items.length} pertanyaan`}
          </p>
        </div>

        <ul className="fc__list">
          {items.map((item, i) => {
            const expanded = open.has(item.id)
            const enabled = matches(item.category)
            return (
              <li
                key={item.id}
                id={`faq-${item.id}`}
                className={`fc__item${expanded ? ' is-open' : ''}${enabled ? '' : ' is-off'}`}
                style={{ '--i': i } as React.CSSProperties}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${item.id}`}
                    className="fc__q"
                    aria-expanded={expanded}
                    aria-controls={`faq-a-${item.id}`}
                    disabled={!enabled}
                    onClick={() => toggle(item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="fc__chev" aria-hidden="true">
                      <ChevronDown size={18} strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${item.id}`} role="region" aria-labelledby={`faq-q-${item.id}`} className="fc__a">
                  <div className="fc__a-inner">
                    <p>{item.answer}</p>
                    {item.link && (
                      <Button
                        variant="link"
                        href={`#${item.link.sectionId}`}
                        onClick={(e) => {
                          e.preventDefault()
                          requestSection(item.link!.sectionId)
                        }}
                      >
                        {item.link.label}
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        </div>
      </div>
    </Section>
  )
}
