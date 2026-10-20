import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/Primitives'
import { Section } from '../../layout/Section'
import { upcomingBatches } from '../../../content/program-detail'
import type { Batch, BatchStatus, ProgramDetail } from '../../../content/program-detail.types'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { track } from '../../../lib/track'
import { useTweaks } from '../../../tweaks/TweakContext'
import { waLink } from '../../../lib/whatsapp'
import './journey.css'

/** "Hampir penuh" dan "Penuh" hanya ada bila datanya nyata (tanpa kelangkaan palsu). */
const STATUS_LABEL: Record<BatchStatus, string> = {
  dibuka: 'Pendaftaran dibuka',
  segera: 'Segera dibuka',
  'hampir-penuh': 'Hampir penuh',
  penuh: 'Penuh',
}

function AskSchedule({ batch, program }: { batch: Batch; program: ProgramDetail }) {
  return (
    <Button
      variant="outline"
      size="md"
      href={waLink('Detail: Jadwal', `Aku mau tanya jadwal ${batch.name} untuk ${program.name}`)}
      target="_blank"
      onClick={() => track('click_wa_jadwal', { batch: batch.id })}
    >
      Tanya jadwal
    </Button>
  )
}

const where = (b: Batch) => (b.location ? `${b.format}, ${b.location}` : b.format)

function BatchTable({ batches, program }: { batches: readonly Batch[]; program: ProgramDetail }) {
  return (
    <div className="batch-box">
      <table className="batch-table">
        <caption className="sr-only">Batch yang sedang atau akan dibuka</caption>
        <thead>
          <tr>
            <th scope="col">Batch</th>
            <th scope="col">Mulai</th>
            <th scope="col">Hari dan jam</th>
            <th scope="col">Format</th>
            <th scope="col">Kuota</th>
            <th scope="col">Status</th>
            <td />
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => (
            <tr key={b.id}>
              <th scope="row">{b.name}</th>
              <td>{b.startLabel}</td>
              <td>{b.schedule}</td>
              <td>{where(b)}</td>
              <td>{b.quota}</td>
              <td><span className={`batch-status batch-status--${b.status}`}>{STATUS_LABEL[b.status]}</span></td>
              <td className="batch-table__action"><AskSchedule batch={b} program={program} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Mobile: satu kartu per batch. */
function BatchCards({ batches, program }: { batches: readonly Batch[]; program: ProgramDetail }) {
  return (
    <ul className="batch-cards">
      {batches.map((b) => (
        <li key={b.id}>
          <div className="batch-cards__head">
            <h4>{b.name}</h4>
            <span className={`batch-status batch-status--${b.status}`}>{STATUS_LABEL[b.status]}</span>
          </div>
          <dl>
            <div><dt>Mulai</dt><dd>{b.startLabel}</dd></div>
            <div><dt>Hari dan jam</dt><dd>{b.schedule}</dd></div>
            <div><dt>Format</dt><dd>{where(b)}</dd></div>
            <div><dt>Kuota</dt><dd>{b.quota}</dd></div>
          </dl>
          <AskSchedule batch={b} program={program} />
        </li>
      ))}
    </ul>
  )
}

/**
 * 8. Journey & Schedule. Alur belajar (fase berurutan dengan durasi) dan jadwal batch dari data.
 * Batch yang sudah lewat otomatis hilang. Tanpa batch aktif, tampil ajakan bertanya lewat WhatsApp.
 */
export function JourneySchedule({ program }: { program: ProgramDetail }) {
  const { tweaks } = useTweaks()
  const isTable = useMediaQuery('(min-width: 768px)')
  const batches = upcomingBatches(program.batches)
  const showBatches = tweaks.journeyBatches === 'shown'

  return (
    <Section id="jadwal" tone="surface" labelledBy="jadwal-title">
      <SectionLabel>Jadwal</SectionLabel>
      <h2 id="jadwal-title" className="journey-title">{showBatches ? 'Perjalanan belajarmu dan jadwal batch' : 'Perjalanan belajarmu'}</h2>

      <ol className="phases" aria-label="Alur belajar">
        {program.journey.map((phase, i) => {
          // Fase terakhir = tujuan akhir: kotak pembeda (merah, pil kuning). Pembedanya juga disampaikan lewat teks.
          const isGoal = tweaks.journeyGoal === 'highlight' && i === program.journey.length - 1
          return (
          <li key={phase.name} className={`phase${isGoal ? ' phase--goal' : ''}`}>
            <span className="phase__tag">Fase {i + 1} · {phase.duration}</span>
            <h3>
              {isGoal && <span className="sr-only">Tujuan akhir: </span>}
              {phase.name}
            </h3>
            <p>{phase.summary}</p>
          </li>
          )
        })}
      </ol>

      {showBatches && (
        <>
          <h3 className="batch-title">Batch yang sedang dibuka</h3>
          {batches.length === 0 ? (
            <div className="batch-empty">
              <p>Batch berikutnya belum dijadwalkan. Tanya dulu lewat WhatsApp.</p>
              <Button
                variant="outline"
                href={waLink('Detail: Jadwal', `Aku mau tanya jadwal batch berikutnya untuk ${program.name}`)}
                target="_blank"
                onClick={() => track('click_wa_jadwal', { batch: 'belum-ada' })}
              >
                Tanya via WhatsApp
              </Button>
            </div>
          ) : isTable ? (
            <BatchTable batches={batches} program={program} />
          ) : (
            <BatchCards batches={batches} program={program} />
          )}
        </>
      )}
    </Section>
  )
}
