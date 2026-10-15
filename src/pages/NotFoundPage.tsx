import { SkipLink, Section } from '../components/layout/Section'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="konten">
        <Section tone="paper" labelledBy="nf-title" flush>
          <h1 id="nf-title">Halaman tidak ditemukan</h1>
          <p style={{ margin: '16px 0 32px', maxWidth: '48ch' }}>
            Program atau halaman yang kamu cari belum ada. Coba lihat daftar program di beranda.
          </p>
          <Button href="/#program">Lihat program</Button>
        </Section>
      </main>
      <Footer />
    </>
  )
}
