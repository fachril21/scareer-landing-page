import { Button } from '../../ui/Button'
import { CheckRow, Photo } from '../../ui/Primitives'
import { upcomingBatches } from '../../../content/program-detail'
import { CONSULT_MESSAGES, FACTS } from '../../../content/content'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { requestSection } from '../../../lib/sectionLink'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import '../../hero/hero.css'
import './hero.css'

/**
 * 1. Hero. Nama program memimpin H1 (SEO dan kejelasan), foto kelas dengan kartu ringkasan hairline
 * (menggantikan kartu lowongan homepage), lalu strip fakta. Statis: tanpa animasi masuk dan tanpa parallax.
 */
export function ProgramHero({ program }: { program: ProgramDetail }) {
  // Strip bisa digeser di bawah desktop, jadi harus bisa difokus keyboard (WCAG 2.1.1).
  const scrollable = useMediaQuery('(max-width: 1023px)')
  const nextBatch = upcomingBatches(program.batches)[0]

  // Di mobile hanya Durasi dan Batch berikutnya yang tampil di kartu (kartu menimpa foto); sisanya ada di Program Detail.
  const summary: readonly { label: string; value: string; extra?: boolean }[] = [
    { label: 'Durasi', value: program.duration },
    { label: 'Format', value: program.format, extra: true },
    ...(nextBatch ? [{ label: 'Batch berikutnya', value: nextBatch.startLabel }] : []),
    { label: 'Level', value: program.level, extra: true },
  ]

  const facts = [
    `${program.duration} belajar`,
    `${program.mentorAccess.liveSessions} live`,
    `${program.curriculum.stats.projects} portofolio`,
    `Kuota ${program.quota} per batch`,
  ]

  return (
    <section id="ringkasan" className="hero pd-hero" aria-labelledby="ringkasan-title">
      <div className="container container--content hero__copy">
        <ul className="pd-badges" aria-label="Sekilas program">
          <li>Supported by Dibimbing</li>
          <li>Format {program.format}</li>
          <li>{program.duration}</li>
        </ul>
        <h1 id="ringkasan-title">Bootcamp {program.name}</h1>
        <p className="hero__lead">{program.summary}</p>
        <div className="hero__actions">
          <Button
            href="#harga"
            onClick={(e) => {
              e.preventDefault()
              track('click_cta_hero', { sumber: 'hero' })
              requestSection('harga')
            }}
          >
            Lihat harga
          </Button>
          <Button
            variant="whatsapp"
            href={waLink('Detail: Hero', `${CONSULT_MESSAGES.general} (${program.name})`)}
            target="_blank"
            onClick={() => track('click_wa_hero', { program: program.slug })}
          >
            Tanya via WhatsApp
          </Button>
        </div>
        <CheckRow items={FACTS} className="hero__facts" />
      </div>

      <div className="container container--wide">
        <div className="stage pd-stage">
          <Photo
            name={program.hero.photo}
            alt="Peserta belajar bersama di satu meja dalam kelas program."
            width={2752}
            height={1536}
            sizes="(min-width: 1320px) 1320px, 100vw"
            className="stage__photo"
            eager
          />
          <section className="summary" aria-labelledby="summary-title">
            <h2 id="summary-title" className="summary__title">Ringkasan program</h2>
            <dl className="summary__rows">
              {summary.map((row) => (
                <div key={row.label} className={row.extra ? 'summary__extra' : undefined}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="summary__price">
              Mulai dari <strong className="num">{program.startingPrice}</strong>
            </p>
          </section>
        </div>
        <ul className="proof" aria-label="Fakta singkat" tabIndex={scrollable ? 0 : undefined}>
          {facts.map((fact) => (
            <li key={fact} className="proof__cell">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
