import { Button } from '../../ui/Button'
import { requestSection } from '../../../lib/sectionLink'
import { track } from '../../../lib/track'
import { CONSULT_MESSAGES } from '../../../content/content'
import { waLink } from '../../../lib/whatsapp'

interface MiniCtaProps {
  price: string
  /** Disembunyikan saat Hero atau Harga terlihat (kartu tidak menggantikan CTA di section). */
  hidden: boolean
}

export function MiniCta({ price, hidden }: MiniCtaProps) {
  return (
    <div className={`mini-cta${hidden ? ' is-hidden' : ''}`} inert={hidden}>
      <p className="mini-cta__label">Mulai dari</p>
      <p className="mini-cta__price num">{price}</p>
      <Button
        size="md"
        fullWidth
        href="#harga"
        onClick={(e) => {
          e.preventDefault()
          track('click_cta_hero', { sumber: 'kartu_daftar_isi' })
          requestSection('harga')
        }}
      >
        Lihat harga
      </Button>
      <a
        className="mini-cta__wa"
        href={waLink('Detail: Daftar isi', CONSULT_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('click_wa_hero', { sumber: 'daftar_isi' })}
      >
        Tanya via WhatsApp
      </a>
    </div>
  )
}
