import { Photo, QuickChip } from '../ui/Primitives'
import { CONSULT_MESSAGES, LEARN, PROGRAMS } from '../../content/content'
import { waLink } from '../../lib/whatsapp'

const program = PROGRAMS[0]
const CHIP_MESSAGES = [CONSULT_MESSAGES.fresh, CONSULT_MESSAGES.installment] as const

function ProgramSnippet() {
  return (
    <div className="snippet">
      <Photo name="program-a" alt="Dua peserta mengerjakan soal bersama di satu laptop." width={2752} height={1536} sizes="(min-width: 1024px) 380px, 90vw" className="snippet__photo" />
      <h3>{program.name}</h3>
      <p>{program.audience}</p>
      <p className="num">Mulai dari {program.startingPrice}</p>
    </div>
  )
}

function Chat() {
  const { chat } = LEARN
  return (
    <div className="chat">
      <p className="chat__label">{chat.label}</p>
      <p className="bubble bubble--in">
        <span className="sr-only">Contoh pesan masuk dari calon peserta: </span>
        {chat.incoming}
      </p>
      <p className="bubble bubble--out">
        <span className="sr-only">Contoh balasan dari tim: </span>
        {chat.reply}
      </p>
      <div className="chat__chips">
        <p className="chat__hint">Tanya cepat via WhatsApp</p>
        {chat.chips.map((label, i) => (
          <QuickChip key={label} href={waLink('Cara belajar', CHIP_MESSAGES[i])}>
            {label}
          </QuickChip>
        ))}
      </div>
    </div>
  )
}

function MentorSession() {
  return (
    <div className="snippet">
      <Photo name="learn-mentor-session" alt="Sesi belajar bersama mentor dengan dua peserta di depan laptop." width={2400} height={1792} sizes="(min-width: 1024px) 380px, 90vw" className="snippet__photo" />
      <p>Sesi belajar bareng mentor [ISI]</p>
    </div>
  )
}

function WorkCard() {
  return (
    <div className="snippet">
      <Photo name="learn-work" alt="Contoh karya akhir peserta di layar laptop [ISI]." width={2400} height={1792} sizes="(min-width: 1024px) 380px, 90vw" className="snippet__photo" />
      <h3>Karya 1</h3>
      <p>Dikerjakan peserta batch [ISI]</p>
    </div>
  )
}

/** Isi panel visual per langkah (Design.md 4.11). */
export function StepPanel({ stepId }: { stepId: string }) {
  switch (stepId) {
    case 'pilih':
      return <ProgramSnippet />
    case 'ngobrol':
      return <Chat />
    case 'belajar':
      return <MentorSession />
    default:
      return <WorkCard />
  }
}
