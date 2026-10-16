import { SkipLink, Section } from '../components/layout/Section'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Button } from '../components/ui/Button'
import { ArticleGrid } from '../components/blog/ArticleGrid'
import { BlogSearchBox } from '../components/blog/BlogSearchBox'
import { useLocation } from '../app/router'
import { BLOG_CATEGORIES, BLOG_GROUPS } from '../content/blog'
import { usePageMeta } from '../hooks/usePageMeta'
import { searchArticles } from '../lib/blogSearch'
import '../components/blog/blog.css'

/** Jalan lanjut saat tidak ada hasil (atau belum ada kata kunci): grup dan kategori yang bisa dijelajahi. */
function Suggestions({ headline }: { headline: string }) {
  return (
    <div className="bempty">
      <p className="bempty__headline">{headline}</p>
      <p className="bempty__hint">Coba kata kunci yang lebih umum, atau jelajahi topik berikut.</p>
      <ul className="bempty__chips" aria-label="Grup artikel">
        {BLOG_GROUPS.map((g) => (
          <li key={g.slug}><a className="chip-link" href={`/blog/grup/${g.slug}`}>{g.name}</a></li>
        ))}
      </ul>
      <ul className="bempty__chips bempty__chips--soft" aria-label="Kategori artikel">
        {BLOG_CATEGORIES.slice(0, 8).map((c) => (
          <li key={c.slug}><a className="chip-link" href={`/blog/kategori/${c.slug}`}>{c.name}</a></li>
        ))}
      </ul>
      <Button variant="outline" href="/blog">Lihat semua artikel</Button>
    </div>
  )
}

/** Hasil pencarian blog: `/blog/cari?q=`. Kata kunci tetap di kotak, kata yang cocok disorot, halaman tidak diindeks. */
export function BlogSearchPage() {
  const { search } = useLocation()
  const query = (new URLSearchParams(search).get('q') ?? '').trim()
  const results = searchArticles(query)

  usePageMeta(query ? `Hasil pencarian “${query}” | Blog scareer` : 'Cari artikel | Blog scareer', 'Hasil pencarian artikel di blog scareer.', { noindex: true })

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="konten">
        <Section tone="surface" width="wide" labelledBy="search-title" className="blog-top" flush>
          <Breadcrumbs items={[{ label: 'Beranda', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Pencarian' }]} />
          <h1 id="search-title" className="blog-title">{query ? 'Hasil pencarian' : 'Cari artikel'}</h1>
          {/* key: kotak ikut terisi ulang saat kata kunci berubah (mis. lewat tombol Kembali) */}
          <BlogSearchBox key={query} initialQuery={query} id="blog-search-page" />

          <div className="blog-list blog-list--search">
            {query === '' ? (
              <Suggestions headline="Ketik kata kunci untuk mencari artikel." />
            ) : (
              <>
                <p className="bsummary" role="status" aria-live="polite">
                  {results.length > 0 ? (
                    <><strong className="num">{results.length}</strong> artikel untuk “{query}”</>
                  ) : (
                    <>Tidak ada artikel untuk “{query}”</>
                  )}
                </p>
                <ArticleGrid key={query} articles={results} query={query} empty={<Suggestions headline="Belum ada artikel yang cocok." />} />
              </>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
