import { SkipLink } from '../components/layout/Section'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { WhatIsScareer } from '../components/what-is/WhatIsScareer'
import { AboutHero } from '../components/about/AboutHero'
import { AboutVision } from '../components/about/AboutVision'
import { AboutContact } from '../components/about/AboutContact'
import { usePageMeta } from '../hooks/usePageMeta'

/**
 * Halaman Tentang kami: hero, visi dan misi, apa itu scareer, alamat dan kontak, footer.
 * Teks "apa itu" memakai konten homepage supaya satu fakta hanya punya satu sumber.
 */
export function AboutPage() {
  usePageMeta('Tentang kami | scareer', 'Kenali scareer: bootcamp terjangkau dengan internship, Supported by Dibimbing. Visi, misi, dan cara menghubungi kami.')

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="konten">
        <AboutHero />
        <AboutVision />
        <WhatIsScareer variant="definition" tone="surface" />
        <AboutContact />
      </main>
      <Footer />
    </>
  )
}
