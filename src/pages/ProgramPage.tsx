import { Fragment, useEffect, useLayoutEffect } from 'react'
import { SkipLink } from '../components/layout/Section'
import { Footer } from '../components/layout/Footer'
import { StickyBar } from '../components/layout/StickyBar'
import { Navbar } from '../components/navbar/Navbar'
import { Breadcrumb } from '../components/program-detail/shared/Breadcrumb'
import { ProgramMeta } from '../components/program-detail/ProgramMeta'
import { ProgramAside } from '../components/program-detail/ProgramNav/ProgramAside'
import { ProgramSwitcher } from '../components/program-detail/ProgramNav/ProgramSwitcher'
import { ProgramHero } from '../components/program-detail/sections/ProgramHero'
import { ProblemAgitateSolution } from '../components/program-detail/sections/ProblemAgitateSolution'
import { WhyUs } from '../components/program-detail/sections/WhyUs'
import { Curriculum } from '../components/program-detail/sections/Curriculum'
import { Tools } from '../components/program-detail/sections/Tools'
import { SkillsOutput } from '../components/program-detail/sections/SkillsOutput'
import { MentorSection } from '../components/program-detail/sections/MentorSection'
import { JourneySchedule } from '../components/program-detail/sections/JourneySchedule'
import { PortfolioOutput } from '../components/program-detail/sections/PortfolioOutput'
import { ProgramSpec } from '../components/program-detail/sections/ProgramSpec'
import { Pricing } from '../components/program-detail/sections/Pricing'
import { ProgramFaq } from '../components/program-detail/sections/ProgramFaq'
import { PROGRAM_SECTIONS } from '../content/program-sections'
import { getProgram } from '../content/program-detail'
import type { ProgramDetail } from '../content/program-detail.types'
import { useFocusOnAnchor } from '../hooks/useFocusOnAnchor'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useNavPattern } from '../hooks/useNavPattern'
import { useProgramToc } from '../hooks/useProgramToc'
import { requestSection } from '../lib/sectionLink'
import { track } from '../lib/track'
import { NotFoundPage } from './NotFoundPage'
import './program-page.css'

export function ProgramPage({ slug }: { slug: string }) {
  const program = getProgram(slug)
  return program ? <ProgramView program={program} /> : <NotFoundPage />
}

/** Section halaman detail menurut id (urutannya dari PROGRAM_SECTIONS). */
const BUILT: Readonly<Record<string, (program: ProgramDetail) => React.ReactNode>> = {
  ringkasan: (p) => <ProgramHero program={p} />,
  'masalah-solusi': (p) => <ProblemAgitateSolution program={p} />,
  'kenapa-kami': (p) => <WhyUs program={p} />,
  kurikulum: (p) => <Curriculum program={p} />,
  tools: (p) => <Tools program={p} />,
  'skill-output': (p) => <SkillsOutput program={p} />,
  mentor: (p) => <MentorSection program={p} />,
  jadwal: (p) => <JourneySchedule program={p} />,
  karya: (p) => <PortfolioOutput program={p} />,
  'detail-program': (p) => <ProgramSpec program={p} />,
  harga: (p) => <Pricing program={p} />,
  faq: (p) => <ProgramFaq program={p} />,
}

/** Bar CTA mobile: dari Kenapa kami sampai Program Detail, hilang saat Hero atau Harga terlihat. */
const STICKY_SHOW = ['kenapa-kami', 'kurikulum', 'tools', 'skill-output', 'mentor', 'jadwal', 'karya', 'detail-program']
const STICKY_HIDE = ['ringkasan', 'harga']

/**
 * Halaman detail program: 12 section sesuai urutan brief, navigasi halaman (sidebar, rail, atau switcher),
 * dan bar CTA mobile.
 */
function ProgramView({ program }: { program: ProgramDetail }) {
  const pattern = useNavPattern()
  const toc = useProgramToc()
  useFocusOnAnchor()
  useScrollReveal(program.slug)

  // Offset gulir halaman ini (96/124 px) berlaku sebelum rute menggulung ke hash di URL.
  useLayoutEffect(() => {
    document.documentElement.classList.add('is-program-page')
    return () => document.documentElement.classList.remove('is-program-page')
  }, [])

  useEffect(() => {
    track('view_program', { program: program.slug })
  }, [program.slug])

  return (
    <>
      <ProgramMeta program={program} />
      <SkipLink />
      <Navbar />
      <div className="pd-crumb">
        <div className="container container--content">
          <Breadcrumb current={program.name} />
        </div>
      </div>
      {pattern === 'switcher' && <ProgramSwitcher toc={toc} />}
      <div className="pd-shell">
        {pattern !== 'switcher' && <ProgramAside pattern={pattern} toc={toc} price={program.startingPrice} />}
        <main id="konten">
          {PROGRAM_SECTIONS.map((s) => (
            <Fragment key={s.id}>{BUILT[s.id](program)}</Fragment>
          ))}
        </main>
      </div>
      <Footer />
      <StickyBar
        showIn={STICKY_SHOW}
        hideIn={STICKY_HIDE}
        primary={{
          label: 'Lihat harga',
          href: '#harga',
          onClick: (e) => {
            e.preventDefault()
            track('click_cta_hero', { sumber: 'sticky' })
            requestSection('harga')
          },
        }}
        waSource="Detail: Bar sticky"
        waMessage={`Halo scareer, aku mau tanya ${program.name}`}
        onWhatsApp={() => track('click_wa_sticky')}
      />
      {/* Penanda dasar dokumen untuk scroll-spy: mentok di bawah mengaktifkan FAQ. */}
      <div id="spy-end" className="pd-spy-end" aria-hidden="true" />
    </>
  )
}
