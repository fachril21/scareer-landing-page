import { Mail, MessageCircle } from 'lucide-react'
import { Logo } from '../navbar/Logo'
import { CONSULT_MESSAGES, FOOTER_SHEET } from '../../content/content'
import { useHomeHref } from '../../app/router'
import { waLink } from '../../lib/whatsapp'
import { useTweaks } from '../../tweaks/TweakContext'
import { hiddenSectionIds } from '../../tweaks/sections'
import './footer-sheet.css'

const { contact, columns, legal } = FOOTER_SHEET

/** Footer varian "Lembar": panel Ink bersudut atas membulat dengan kartu kontak putih. */
export function FooterSheet({ overlapsCta }: { overlapsCta: boolean }) {
  const home = useHomeHref()
  const hidden = hiddenSectionIds(useTweaks().tweaks)
  // Tautan ke section homepage yang disembunyikan (tweak) ikut dibuang.
  const isHidden = (link: object) =>
    'href' in link && typeof link.href === 'string' && link.href.startsWith('#') && hidden.includes(link.href.slice(1))

  return (
    <footer className={`fsheet on-ink${overlapsCta ? ' fsheet--overlap' : ''}`}>
      <div className="container container--wide">
        <div className="fsheet__head">
          <Logo onInk />
          <p className="fsheet__tagline">{FOOTER_SHEET.tagline}</p>
        </div>

        <div className="fsheet__body">
          <section className="fsheet__card" aria-labelledby="fsheet-contact">
            <h2 id="fsheet-contact">{contact.title}</h2>
            <dl>
              {contact.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}:</dt> <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="fsheet__icons">
              <a href={waLink('Footer', CONSULT_MESSAGES.general)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (membuka di tab baru)">
                <MessageCircle size={22} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`}>
                <Mail size={22} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </section>

          <nav className="fsheet__cols" aria-label="Footer">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="fsheet__title">{col.title}</h2>
                <ul>
                  {col.links
                    .filter((link) => !isHidden(link))
                    .map((link) => (
                      <li key={link.label}>
                        {'whatsapp' in link ? (
                          <a href={waLink('Footer', CONSULT_MESSAGES.general)} target="_blank" rel="noopener noreferrer">
                            {link.label}
                            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
                          </a>
                        ) : (
                          <a href={link.href.startsWith('#') ? home(link.href) : link.href}>{link.label}</a>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="fsheet__bottom">
          <p>© 2026 scareer · Supported by Dibimbing</p>
          <ul>
            {legal.map((label) => (
              <li key={label}>
                <a href={home()}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
