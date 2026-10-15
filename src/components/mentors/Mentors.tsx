import { Quote } from 'lucide-react'
import { Button } from '../ui/Button'
import { Photo, SectionLabel } from '../ui/Primitives'
import { Section } from '../layout/Section'
import { MENTORS, type Mentor } from '../../content/content'
import './mentors.css'

export interface FeaturedMentor extends Mentor {
  /** Berkas potret di public/images tanpa ekstensi. Bawaan: mentor-1 untuk varian A, mentor-2 untuk B. */
  photo?: string
}

interface MentorCardProps {
  mentor: FeaturedMentor
  variant: 'a' | 'b'
  flip: boolean
  cta?: { label: string; href: string }
}

function MentorCard({ mentor, variant, flip, cta }: MentorCardProps) {
  return (
    <li className={`mentor mentor--${variant}${flip ? ' mentor--flip' : ''}`}>
      <div className="mentor__media">
        <span className="mentor__shape" aria-hidden="true" />
        <Photo name={mentor.photo ?? `mentor-${variant === 'a' ? 1 : 2}`} alt="Potret mentor [ISI] di ruang kerja." width={1792} height={2400} sizes="(min-width: 1024px) 300px, 80vw" className="mentor__photo" position={flip ? '75% 30%' : '25% 30%'} />
      </div>
      <div className="mentor__body">
        <p className="mentor__role">{mentor.role}</p>
        <h3>{mentor.name}</h3>
        {mentor.quote && (
          <blockquote className="mentor__quote">
            <Quote size={28} strokeWidth={1.75} aria-hidden="true" />
            <p>{mentor.quote}</p>
          </blockquote>
        )}
        <p className="mentor__company">{mentor.company}</p>
        {cta && <Button variant="link" href={cta.href}>{cta.label}</Button>}
      </div>
      <dl className="mentor__facts">
        <div>
          <dt>Pengalaman</dt>
          <dd>{mentor.experience}</dd>
        </div>
        <div>
          <dt>Bidang</dt>
          <dd>{mentor.field}</dd>
        </div>
      </dl>
    </li>
  )
}

interface MentorShowcaseProps {
  id: string
  heading: string
  mentors: readonly FeaturedMentor[]
  cta?: { label: string; href: string }
  /** Elemen tambahan di bawah kartu unggulan (mis. kartu mentor lain dan bentuk akses). */
  children?: React.ReactNode
}

/** Kartu mentor unggulan bergantian kiri/kanan. Tidak dirender jika tidak ada data mentor. */
export function MentorShowcase({ id, heading, mentors, cta, children }: MentorShowcaseProps) {
  if (mentors.length === 0) return null

  return (
    <Section id={id} tone="paper" labelledBy={`${id}-title`}>
      <SectionLabel>Mentor</SectionLabel>
      <h2 id={`${id}-title`} className="mentors__title">{heading}</h2>
      <ul className="mentors" data-reveal-group="">
        {mentors.map((m, i) => (
          <MentorCard key={`${m.name}-${i}`} mentor={m} variant={i % 2 === 0 ? 'a' : 'b'} flip={i % 2 === 1} cta={cta} />
        ))}
      </ul>
      {children}
    </Section>
  )
}

/** Mentor di homepage: hanya dirender jika ada data mentor nyata (Design.md bab 12, no. 4). */
export function Mentors() {
  return (
    <MentorShowcase
      id="mentor"
      heading="Dibimbing langsung oleh mentor berpengalaman"
      mentors={MENTORS}
      cta={{ label: 'Lihat program', href: '#program' }}
    />
  )
}
