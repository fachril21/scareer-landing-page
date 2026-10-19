import { useRef } from 'react'
import { Briefcase, MonitorPlay, Users, Wallet } from 'lucide-react'
import { Button } from '../ui/Button'
import { Photo } from '../ui/Primitives'
import { JobCard } from './JobCard'
import { Burst, DoodleArrow, Sparkle, Squiggle } from './HeroStickers'
import { CONSULT_MESSAGES, HERO, HERO_WORD_SETS, PROOF_CELLS } from '../../content/content'
import { useInViewOnce } from '../../hooks/useInView'
import { useInteractiveMotion } from '../../hooks/useInteractiveMotion'
import { usePointerTilt } from '../../hooks/usePointerTilt'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { waLink } from '../../lib/whatsapp'
import './hero-vibrant.css'

export type VibrantVariant = 'stage' | 'poster'

const FACT_ICONS = [Wallet, MonitorPlay, Briefcase, Users] as const
const HASHTAG = '#PengalamanPertama'

/** Judul: kalimat tuntutan, dengan frasa pengalaman 2 tahun ditandai. Teks sama dengan hero lain. */
const TITLE_PREFIX = HERO_WORD_SETS.tuntutan.prefix
const TITLE_MARK = HERO_WORD_SETS.tuntutan.words[0]

/**
 * Hero "vibrant" untuk pasar mahasiswa. Dua varian dari konten yang sama:
 * `stage` = panggung ungu penuh dengan foto melengkung dan bar fakta gelap,
 * `poster` = poster di atas kertas dengan foto miring dan stiker fakta.
 */
interface HeroVibrantProps {
  variant: VibrantVariant
  /** Kartu lowongan menimpa tepi foto (hanya varian panggung). */
  showJob?: boolean
  /** Kartu lowongan bisa di-refresh dengan simulasi pencarian. */
  refreshable?: boolean
}

export function HeroVibrant({ variant, showJob = false, refreshable = false }: HeroVibrantProps) {
  const rootRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const interactive = useInteractiveMotion()
  // Coretan pada kartu digambar saat visual sudah terlihat.
  const [visualRef, visualSeen] = useInViewOnce<HTMLDivElement>(0.3)
  // Stiker bergeser mengikuti kursor (--tx, --ty) dan foto bergeser tipis mengikuti scroll (--p).
  usePointerTilt(rootRef, interactive)
  useScrollProgress(photoRef, interactive, { start: 1, end: 0, smooth: true })

  const onInk = variant === 'stage'

  return (
    <section ref={rootRef} id="beranda" className={`hero-v hero-v--${variant}${showJob ? ' hero-v--has-job' : ''}`} aria-labelledby="hero-title">
      <div className="hero-v__inner container container--wide">
        <div className="hero-v__copy">
          <h1 id="hero-title" className="hero-v__title">
            {TITLE_PREFIX} <mark className="hero-v__mark">{TITLE_MARK}</mark>
          </h1>
          <p className="hero-v__lead">{HERO.lead}</p>
          <div className="hero-v__actions">
            {onInk ? (
              <Button href="#program" className="hero-v__cta">
                Lihat program
              </Button>
            ) : (
              <Button href="#program">Lihat program</Button>
            )}
            <Button variant="whatsapp" onInk={onInk} href={waLink('Hero', CONSULT_MESSAGES.general)} target="_blank">
              Tanya via WhatsApp
            </Button>
          </div>
        </div>

        <div ref={visualRef} className="hero-v__visual">
          <div ref={photoRef} className="hero-v__photo">
            <picture>
              <source media="(min-width: 640px)" srcSet="/images/hero-desktop-800.webp 800w, /images/hero-desktop-1200.webp 1200w" sizes="(min-width: 1024px) 50vw, 100vw" />
              <Photo
                name="hero-mobile"
                alt="Beberapa fresh graduate belajar bareng di satu meja bersama seorang mentor."
                width={1792}
                height={2400}
                sizes="100vw"
                className="hero-v__img"
                eager
              />
            </picture>
          </div>

          <Sparkle className="sticker--a" />
          <Burst className="sticker--b" fill={onInk ? 'var(--purple-light)' : 'var(--purple)'} />
          <Squiggle className="sticker--c" stroke={onInk ? 'var(--highlight)' : 'var(--purple)'} />
          <Sparkle className="sticker--d" fill={onInk ? 'var(--purple-light)' : 'var(--highlight)'} />

          {showJob && <JobCard drawn={visualSeen} refreshable={refreshable} />}

          <p className="hero-v__note" aria-hidden="true">
            <span>{HASHTAG}</span>
            <DoodleArrow className="hero-v__arrow" />
          </p>
        </div>
      </div>

      <div className="container container--wide hero-v__facts-wrap">
      <ul className="hero-v__facts" aria-label="Fakta singkat">
        {PROOF_CELLS.map((cell, i) => {
          const Icon = FACT_ICONS[i]
          return (
            <li key={cell} className="hero-v__fact" style={{ '--i': i } as React.CSSProperties}>
              <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              <span>{cell}</span>
            </li>
          )
        })}
      </ul>
      </div>
    </section>
  )
}
