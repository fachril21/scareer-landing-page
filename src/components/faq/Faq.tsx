import { Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/Primitives'
import { Section } from '../layout/Section'
import { CONSULT_MESSAGES, FAQ, type FaqItem } from '../../content/content'
import { waLink, type WaSource } from '../../lib/whatsapp'
import { useFaqState } from '../../hooks/useFaqState'
import './faq.css'

interface FaqProps {
  items?: readonly FaqItem[]
  heading?: string
  waSource?: WaSource
  /** Dipanggil saat butir dibuka (bukan saat ditutup). */
  onOpen?: (id: string) => void
  /** Latar section: halaman detail memakai `paper` supaya selang-seling dengan Harga. */
  tone?: 'surface' | 'paper'
  /** Dipanggil saat tombol WhatsApp di bawah daftar ditekan. */
  onAsk?: () => void
}

export function Faq({ items = FAQ, heading = 'Pertanyaan yang sering muncul', waSource = 'FAQ', onOpen, tone = 'surface', onAsk }: FaqProps) {
  const { open, toggle } = useFaqState({ items, onOpen })

  return (
    <Section id="faq" tone={tone} labelledBy="faq-title">
      <div className="faq">
        <div className="faq__head">
          <SectionLabel>FAQ</SectionLabel>
          <h2 id="faq-title">{heading}</h2>
        </div>

        <div>
          <ul className="faq__list" data-reveal-group="">
            {items.map((item) => {
              const expanded = open.has(item.id)
              return (
                <li key={item.id} id={`faq-${item.id}`} className={`faq__item${expanded ? ' is-open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      className="faq__q"
                      aria-expanded={expanded}
                      aria-controls={`faq-a-${item.id}`}
                      onClick={() => toggle(item.id)}
                    >
                      <span>{item.question}</span>
                      <Plus size={24} strokeWidth={1.75} aria-hidden="true" className="faq__icon" />
                    </button>
                  </h3>
                  <div id={`faq-a-${item.id}`} role="region" aria-labelledby={`faq-${item.id}`} className="faq__a">
                    <div className="faq__a-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="faq__more">
            <p>Pertanyaanmu belum ada di sini?</p>
            <Button variant="whatsapp" href={waLink(waSource, CONSULT_MESSAGES.general)} target="_blank" onClick={onAsk}>
              Tanya via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
