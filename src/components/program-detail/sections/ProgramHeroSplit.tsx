import { useRef } from 'react'
import { Button } from '../../ui/Button'
import { Photo } from '../../ui/Primitives'
import { upcomingBatches } from '../../../content/program-detail'
import { CONSULT_MESSAGES } from '../../../content/content'
import type { ProgramDetail } from '../../../content/program-detail.types'
import { requestSection } from '../../../lib/sectionLink'
import { track } from '../../../lib/track'
import { waLink } from '../../../lib/whatsapp'
import { useInteractiveMotion } from '../../../hooks/useInteractiveMotion'
import { useMagneticButtons } from '../../../hooks/useMagneticButtons'
import { usePointerTilt } from '../../../hooks/usePointerTilt'
import { useTweaks } from '../../../tweaks/TweakContext'
import './hero-split.css'

/**
 * 1. Hero, layout terbelah: teks dan tombol di kiri, panel merah di kanan berisi foto kelas dan kartu ringkasan.
 * Tanpa bayangan: kartu dibedakan lewat latar putih di atas merah.
 * Tweak "Gerak hero" = Hidup (bawaan): masuk berurutan setelah foto mendarat, nama program tersapu stabilo,
 * panel miring tipis mengikuti kursor, baris ringkasan bereaksi saat hover. Foto tidak pernah dianimasikan sendiri
 * karena ia ujung transisi foto dari kartu program.
 */
export function ProgramHeroSplit({ program }: { program: ProgramDetail }) {
  const nextBatch = upcomingBatches(program.batches)[0]
  const { tweaks } = useTweaks()
  const live = useInteractiveMotion() && tweaks.programHeroMotion === 'live'
  const panelRef = useRef<HTMLDivElement>(null)
  usePointerTilt(panelRef, live)
  useMagneticButtons(live)

  const summary: readonly { label: string; value: string }[] = [
    { label: 'Track', value: program.name },
    { label: 'Paket', value: program.plans.map((p) => p.name).join(' atau ') },
    { label: 'Format', value: program.format },
    { label: 'Durasi', value: program.duration },
    ...(nextBatch ? [{ label: 'Batch', value: `${nextBatch.name}, mulai ${nextBatch.startLabel}` }] : []),
  ]

  return (
    <section id="ringkasan" className={`phs${live ? ' phs--live' : ''}`} aria-labelledby="ringkasan-title">
      <div className="container container--content phs__grid">
        <div className="phs__copy">
          <ul className="phs__chips" aria-label="Sekilas program">
            {['Video + live Zoom', 'Plus internship', 'Mulai dari ±Rp3 juta'].map((chip, i) => (
              <li key={chip} className={i === 2 ? 'phs__chip--price' : undefined} style={{ '--i': i } as React.CSSProperties}>
                {chip}
              </li>
            ))}
          </ul>
          <h1 id="ringkasan-title" className="phs__title">
            Belajar <mark className="phs__mark">{program.name}</mark>, lalu praktik langsung lewat internship.
          </h1>
          <p className="phs__lead">
            Belajar {program.name} lewat video dan kelas live Zoom bersama mentor, lalu mempraktikkannya di dunia kerja nyata.
            Kami nggak janji kamu langsung kerja, tapi kamu punya pengalaman nyata untuk ditunjukkan.
          </p>
          <div className="phs__actions">
            <Button
              href={waLink('Detail: Hero', `${CONSULT_MESSAGES.general} (${program.name})`)}
              target="_blank"
              onClick={() => track('click_wa_hero', { program: program.slug })}
            >
              Tanya via WhatsApp
              <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
            </Button>
            <Button
              variant="outline"
              href="#kurikulum"
              onClick={(e) => {
                e.preventDefault()
                track('click_cta_hero', { sumber: 'kurikulum' })
                requestSection('kurikulum')
              }}
            >
              Lihat kurikulum
            </Button>
          </div>
        </div>

        <div ref={panelRef} className="phs__panel">
          <Photo
            name={program.hero.photo}
            alt="Peserta belajar bersama di satu meja dalam kelas program."
            width={2752}
            height={1536}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="phs__photo"
            eager
          />
          <section className="phs__card" aria-labelledby="summary-title">
            <h2 id="summary-title" className="sr-only">Ringkasan program</h2>
            <dl>
              {summary.map((row, i) => (
                <div key={row.label} style={{ '--i': i } as React.CSSProperties}>
                  <dt>{row.label}</dt>
                  <dd>
                    {live && row.label === 'Batch' && nextBatch?.status === 'dibuka' && <span className="phs__live" aria-hidden="true" />}
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </section>
  )
}
