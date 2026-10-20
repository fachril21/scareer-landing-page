import { Button } from '../ui/Button'
import { Photo } from '../ui/Primitives'
import { ABOUT_HERO } from '../../content/about'
import { CONSULT_MESSAGES } from '../../content/content'
import { useHomeHref } from '../../app/router'
import { waLink } from '../../lib/whatsapp'
import './about.css'

/** 1. Hero Tentang kami: rata kiri, foto di panel merah. Statis, tanpa animasi masuk. */
export function AboutHero() {
  const home = useHomeHref()
  return (
    <section className="about-hero" aria-labelledby="about-title">
      <div className="container container--content about-hero__grid">
        <div className="about-hero__copy">
          <h1 id="about-title">{ABOUT_HERO.title}</h1>
          <p className="about-hero__lead">{ABOUT_HERO.lead}</p>
          <div className="about-hero__actions">
            <Button href={home('#program')}>Lihat program</Button>
            <Button variant="whatsapp" href={waLink('Tentang', CONSULT_MESSAGES.general)} target="_blank">
              Tanya via WhatsApp
              <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
            </Button>
          </div>
        </div>
        <div className="about-hero__panel">
          <Photo
            name="learn-mentor-session"
            alt="Sesi belajar bersama mentor dengan dua peserta di depan laptop."
            width={2400}
            height={1792}
            sizes="(min-width: 1024px) 480px, 90vw"
            className="about-hero__photo"
            eager
          />
          <span className="about-hero__tag">ilustrasi</span>
        </div>
      </div>
    </section>
  )
}
