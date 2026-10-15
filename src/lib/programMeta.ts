import type { ProgramDetail } from '../content/program-detail.types'

const SITE = 'scareer'

export interface ProgramMetaData {
  title: string
  description: string
  canonicalPath: string
  jsonLd: readonly Record<string, unknown>[]
}

/** "Rp 4.000.000" -> 4000000. `null` selama harga masih [ISI]: penawaran tidak ditulis ke data terstruktur. */
export function parsePrice(label: string): number | null {
  const digits = label.replace(/[^\d]/g, '')
  return /\d/.test(label) && digits ? Number(digits) : null
}

export function buildProgramMeta(program: ProgramDetail, origin: string): ProgramMetaData {
  const path = `/program/${program.slug}`
  const url = origin + path
  const price = parsePrice(program.startingPrice)

  const course: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.name,
    description: program.summary,
    url,
    provider: { '@type': 'Organization', name: SITE },
  }

  const instances = program.batches
    .filter((b) => b.startsOn !== null)
    .map((b) => ({ '@type': 'CourseInstance', name: b.name, courseMode: b.format, startDate: b.startsOn }))
  if (instances.length > 0) course.hasCourseInstance = instances
  if (price !== null) course.offers = { '@type': 'Offer', price, priceCurrency: 'IDR', url: `${url}#harga` }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: program.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Program', item: `${origin}/#program` },
      { '@type': 'ListItem', position: 3, name: program.name },
    ],
  }

  return {
    title: `Bootcamp ${program.name} | ${SITE}`,
    description: `${program.audience}. Format ${program.format}, mulai dari ${program.startingPrice}.`,
    canonicalPath: path,
    jsonLd: [course, faqPage, breadcrumb],
  }
}
