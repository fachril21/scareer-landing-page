import { MentorShowcase, type FeaturedMentor } from '../../mentors/Mentors'
import type { ProgramDetail, ProgramMentor } from '../../../content/program-detail.types'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import './mentor.css'

const initials = (name: string) =>
  name
    .replace(/\[.*?\]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'M'

/** Kartu unggulan memakai potret miring bergantian; peran di program tampil di pil, peran dan perusahaan di bawah nama. */
const toFeatured = (m: ProgramMentor): FeaturedMentor => ({
  name: m.name,
  role: m.roleInProgram,
  company: `${m.role}, ${m.company}`,
  experience: m.experience,
  field: m.field,
  photo: m.photo,
})

/**
 * 7. Mentor. Dua kartu unggulan, baris kartu kecil untuk mentor lain, dan bentuk akses ke mentor.
 * Hanya mentor yang sudah memberi izin tampil yang dirender. Chip akses yang datanya tidak ada dihapus.
 */
export function MentorSectionOriginal({ program }: { program: ProgramDetail }) {
  // Baris kartu kecil bisa digeser di bawah desktop, jadi harus bisa difokus keyboard (WCAG 2.1.1).
  const scrollable = useMediaQuery('(max-width: 1023px)')
  const shown = program.mentors.filter((m) => m.consent)
  const featured = shown.filter((m) => m.featured).slice(0, 2)
  const others = shown.filter((m) => !m.featured)
  const { liveSessions, reviews, oneOnOne, ratio } = program.mentorAccess
  const access = [
    { label: 'Kelas live', value: liveSessions },
    { label: 'Review proyek', value: reviews },
    { label: '1-on-1', value: oneOnOne },
    { label: 'Rasio mentor:peserta', value: ratio },
  ].filter((a) => a.value.trim() !== '')

  return (
    <MentorShowcase id="mentor" heading="Dibimbing langsung oleh praktisi di bidangnya" mentors={featured.map(toFeatured)}>
      {others.length > 0 && (
        <ul className="mentor-mini" aria-label="Mentor lain" tabIndex={scrollable ? 0 : undefined}>
          {others.map((m, i) => (
            <li key={`${m.name}-${i}`}>
              <span className="mentor-mini__avatar" aria-hidden="true">{initials(m.name)}</span>
              <div>
                <h3>{m.name}</h3>
                <p>{m.role}, {m.company}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {access.length > 0 && (
        <div className="mentor-access">
          <p id="mentor-access-label">Akses ke mentor:</p>
          <ul aria-labelledby="mentor-access-label">
            {access.map((a) => (
              <li key={a.label}>
                {a.label} <span>{a.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </MentorShowcase>
  )
}
