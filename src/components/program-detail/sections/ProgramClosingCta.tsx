import { ChevronsRight } from 'lucide-react'
import { Button } from '../../ui/Button'
import { CTA_SHEET } from '../../../content/content'
import { requestSection } from '../../../lib/sectionLink'
import { track } from '../../../lib/track'
import '../../cta/cta-sheet.css'

/**
 * CTA penutup halaman detail: panel ungu "Lembar" yang sama dengan homepage (footer menimpa tepi bawahnya).
 * Satu aksi: pilih paket, menggulung ke Harga. Judulnya satu sumber dengan homepage.
 */
export function ProgramClosingCta() {
  return (
    <section id="cta" className="cta-sheet cta-sheet--on-paper" aria-labelledby="cta-title">
      <div className="cta-sheet__panel on-ink">
        <div className="container container--content cta-sheet__inner">
          <h2 id="cta-title" className="cta-sheet__title">
            {CTA_SHEET.title.map((part, i) =>
              'mark' in part ? (
                <mark key={i} className="cta-sheet__mark">{part.text}</mark>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h2>
          <p className="cta-sheet__lead">Pilih paket, lalu ngobrol langsung lewat WhatsApp. Pengalaman pertamamu dimulai dari sini.</p>
          <div className="cta-sheet__actions">
            <Button
              variant="light"
              href="#harga"
              onClick={(e) => {
                e.preventDefault()
                track('click_cta_closing', { sumber: 'pilih-paket' })
                requestSection('harga')
              }}
            >
              <span className="cta-sheet__btn">
                <ChevronsRight size={18} strokeWidth={1.75} aria-hidden="true" />
                Pilih paket
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
