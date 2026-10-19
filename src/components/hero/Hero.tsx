import { Button } from '../ui/Button'
import { CheckRow, Photo } from '../ui/Primitives'
import { RotatingHeadline } from '../ui/RotatingHeadline'
import { JobCard } from './JobCard'
import { CONSULT_MESSAGES, FACTS, HERO, HERO_WORD_SETS, PROOF_CELLS } from '../../content/content'
import { useInViewOnce } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { usePointerTilt } from '../../hooks/usePointerTilt'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { waLink } from '../../lib/whatsapp'
import { useTweaks } from '../../tweaks/TweakContext'
import './hero.css'
import './hero-centered.css'

export function Hero() {
  // Kartu lowongan baru tampil saat sisi atas foto mencapai tengah layar, supaya gerakannya terlihat.
  const [stageRef, seen] = useInViewOnce<HTMLDivElement>(0, '0px 0px -50% 0px')
  // Strip bisa digeser di bawah desktop, jadi harus bisa difokus keyboard (WCAG 2.1.1)
  const scrollable = useMediaQuery('(max-width: 1023px)')
  const { tweaks } = useTweaks()
  const centered = tweaks.heroLayout === 'centered'
  const wordSet = HERO_WORD_SETS[tweaks.wordSet]
  const interactive = useInteractiveMotion()
  // Foto bergeser tipis mengikuti scroll (--p) dan kartu lowongan miring mengikuti kursor (--tx, --ty).
  useScrollProgress(stageRef, interactive, { start: 1, end: 0 })
  usePointerTilt(stageRef, interactive)

  return (
    <section id="beranda" className={`hero${centered ? ' hero--centered' : ''}`} aria-labelledby="hero-title">
      <div className="container container--content hero__copy">
        {centered ? (
          <RotatingHeadline id="hero-title" prefix={wordSet.prefix} words={wordSet.words} loop={tweaks.wordLoop} />
        ) : (
          <h1 id="hero-title">{HERO.title}</h1>
        )}
        <p className="hero__lead">{HERO.lead}</p>
        <div className="hero__actions">
          <Button href="#program">Lihat program</Button>
          <Button variant="whatsapp" href={waLink('Hero', CONSULT_MESSAGES.general)} target="_blank">
            Tanya via WhatsApp
          </Button>
        </div>
        <CheckRow items={FACTS} className="hero__facts" />
      </div>

      <div className="container container--wide">
        <div ref={stageRef} className="stage">
          <picture>
            <source media="(min-width: 640px)" srcSet="/images/hero-desktop-800.webp 800w, /images/hero-desktop-1200.webp 1200w" sizes="(min-width: 1320px) 1320px, 100vw" />
            <Photo name="hero-mobile" alt="Beberapa fresh graduate belajar bareng di satu meja bersama seorang mentor." width={1792} height={2400} sizes="100vw" className="stage__photo" eager />
          </picture>
          <div className="stage__tint" aria-hidden="true" />
          <JobCard drawn={seen} refreshable={tweaks.heroJobs === 'refresh'} />
        </div>
        <ul className="proof" data-reveal-item="" aria-label="Fakta singkat" tabIndex={scrollable ? 0 : undefined}>
          {PROOF_CELLS.map((cell) => (
            <li key={cell} className="proof__cell">
              {cell}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
