import { SkipLink } from '../components/layout/Section'
import { Footer } from '../components/layout/Footer'
import { HomeStickyBar } from '../components/layout/StickyBar'
import { Navbar } from '../components/navbar/Navbar'
import { Hero } from '../components/hero/Hero'
import { WhatIsScareer } from '../components/what-is/WhatIsScareer'
import { ProblemLoop } from '../components/problem/ProblemLoop'
import { Program } from '../components/program/Program'
import { WhyPanel, WhyStatement } from '../components/why/Why'
import { WhyEditorial } from '../components/why/WhyEditorial'
import { useTweaks } from '../tweaks/TweakContext'
import { Learn } from '../components/learn/Learn'
import { LearnColumns } from '../components/learn/LearnColumns'
import { Works } from '../components/works/Works'
import { Mentors } from '../components/mentors/Mentors'
import { Faq } from '../components/faq/Faq'
import { ClosingCta } from '../components/cta/ClosingCta'
import { ClosingCtaSheet } from '../components/cta/ClosingCtaSheet'
import { TweakPanel } from '../tweaks/TweakPanel'
import { useFocusOnAnchor } from '../hooks/useFocusOnAnchor'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function HomePage() {
  useFocusOnAnchor()
  useScrollReveal()
  const { tweaks } = useTweaks()

  const story = tweaks.pageOrder === 'story'

  const why = tweaks.whyLayout === 'editorial' ? <WhyEditorial key="kenapa" /> : <WhyStatement key="kenapa" />
  const problem = tweaks.problem !== 'hidden' && (
    <ProblemLoop key="masalah" variant={tweaks.problem} next={story ? 'program' : 'learn'} />
  )
  const program = <Program key="program" />
  const priceNote = tweaks.whyPanel === 'shown' && <WhyPanel key="transparan" />

  // Urutan Cerita: Hero, Apa itu, Kenapa, Masalah, Program, Cara belajar. Sebelumnya: Program tepat di bawah "Apa itu".
  const middle = story ? [why, problem, program, priceNote] : [program, why, problem, priceNote]

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="konten">
        <Hero />
        {tweaks.whatIs !== 'hidden' && <WhatIsScareer variant={tweaks.whatIs} />}
        {middle}
        {tweaks.learnLayout === 'columns' ? <LearnColumns tone={story ? 'surface' : 'paper'} /> : <Learn />}
        {tweaks.worksSection === 'shown' && <Works />}
        {tweaks.mentorSection === 'shown' && <Mentors />}
        {tweaks.faqSection === 'shown' && <Faq />}
        {tweaks.endLayout === 'sheet' ? <ClosingCtaSheet /> : <ClosingCta />}
      </main>
      <Footer overlapsCta={tweaks.endLayout === 'sheet'} />
      <HomeStickyBar />
      <TweakPanel scope="home" />
    </>
  )
}
