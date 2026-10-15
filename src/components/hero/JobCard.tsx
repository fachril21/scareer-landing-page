import { HERO } from '../../content/content'

const { job } = HERO

/** Kartu lowongan: satu-satunya momen bergerak di halaman. Coretan digambar sekali saat kartu terlihat. */
export function JobCard({ drawn }: { drawn: boolean }) {
  return (
    <figure className={`job${drawn ? ' is-drawn' : ''}`} aria-label={job.ariaLabel}>
      <div className="job__card">
        <p className="job__title">{job.title}</p>
        <p className="job__company">{job.company}</p>
        <p className="job__heading">{job.heading}</p>
        <ul className="job__list">
          {job.items.map((item, i) => (
            <li key={item} className={i === job.struckIndex ? 'job__item job__item--struck' : 'job__item'}>
              <span className="job__text">{item}</span>
              {i === job.struckIndex && (
                <svg className="job__strike" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path
                    d="M3 14 C40 6, 70 19, 108 11 S176 7, 217 12"
                    pathLength="1"
                    fill="none"
                    stroke="var(--purple)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="job__note">{HERO.note}</figcaption>
    </figure>
  )
}
