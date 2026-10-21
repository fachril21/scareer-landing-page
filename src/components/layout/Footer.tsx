import { Logo } from '../navbar/Logo'
import { FOOTER } from '../../content/content'
import { useHomeHref } from '../../app/router'
import { useTweaks } from '../../tweaks/TweakContext'
import { hiddenSectionIds } from '../../tweaks/sections'
import { FooterSheet } from './FooterSheet'
import './footer.css'

export function Footer({ overlapsCta = false }: { overlapsCta?: boolean }) {
  const { tweaks } = useTweaks()
  if (tweaks.endLayout === 'sheet') return <FooterSheet overlapsCta={overlapsCta} />
  return <FooterOriginal />
}

function FooterOriginal() {
  const home = useHomeHref()
  const hidden = hiddenSectionIds(useTweaks().tweaks)
  // Tautan ke section homepage yang disembunyikan (tweak) ikut dibuang.
  const isHidden = (link: object) => 'href' in link && typeof link.href === 'string' && link.href.startsWith('#') && hidden.includes(link.href.slice(1))
  return (
    <footer className="footer on-ink">
      <div className="container container--wide">
        <div className="footer__top">
          <Logo onInk size="lg" />
          <nav className="footer__cols" aria-label="Footer">
            {FOOTER.columns.map((col) => (
              <div key={col.title}>
                <h2 className="footer__title">{col.title}</h2>
                <ul>
                  {col.links.filter((link) => !isHidden(link)).map((link) => (
                    <li key={link.label}>
                      <a href={'href' in link ? (link.href.startsWith('#') ? home(link.href) : link.href) : home()}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          <p>© 2026 scareer</p>
          <p>Supported by Dibimbing</p>
        </div>
      </div>
    </footer>
  )
}
