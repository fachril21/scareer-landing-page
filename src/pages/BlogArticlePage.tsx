import { SkipLink, Section } from '../components/layout/Section'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Photo } from '../components/ui/Primitives'
import { ArticleBody, ArticleToc } from '../components/blog/ArticleBody'
import { AuthorMark } from '../components/blog/ArticleCard'
import { ProgramCta, RelatedArticles, ShareRow } from '../components/blog/ArticleExtras'
import { formatDate, getArticle, getCategory, groupOfArticle, readingMinutes } from '../content/blog'
import { usePageMeta } from '../hooks/usePageMeta'
import { NotFoundPage } from './NotFoundPage'
import '../components/blog/blog.css'

const SITE = 'scareer'

/** Halaman detail artikel: `/blog/:slug`. Mode baca: kolom teks 65 sampai 70 karakter, daftar isi, bagikan, terkait. */
export function BlogArticlePage({ slug }: { slug: string }) {
  const article = getArticle(slug)
  const category = article ? getCategory(article.categorySlug) : undefined
  const group = article ? groupOfArticle(article) : undefined

  const origin = typeof window === 'undefined' ? '' : window.location.origin
  usePageMeta(
    article ? `${article.title} | Blog ${SITE}` : 'Artikel tidak ditemukan',
    article?.excerpt ?? '',
    article
      ? {
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: article.title,
                description: article.excerpt,
                image: `${origin}/images/${article.cover}-1200.webp`,
                datePublished: article.publishedAt,
                dateModified: article.publishedAt,
                author: { '@type': 'Organization', name: article.author },
                publisher: { '@type': 'Organization', name: SITE },
                mainEntityOfPage: `${origin}/blog/${article.slug}`,
                articleSection: category?.name,
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${origin}/` },
                  { '@type': 'ListItem', position: 2, name: 'Blog', item: `${origin}/blog` },
                  { '@type': 'ListItem', position: 3, name: article.title },
                ],
              },
            ],
          },
        }
      : undefined,
  )

  if (!article) return <NotFoundPage />

  const crumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Blog', href: '/blog' },
    ...(group ? [{ label: group.name, href: `/blog/grup/${group.slug}` }] : []),
    ...(category ? [{ label: category.name, href: `/blog/kategori/${category.slug}` }] : []),
    { label: article.title },
  ]

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="konten">
        <Section tone="surface" labelledBy="article-title" className="blog-top" flush>
          <Breadcrumbs items={crumbs} />
          <header className="ahead">
            {category && <a className="acard__cat" href={`/blog/kategori/${category.slug}`}>{category.name}</a>}
            <h1 id="article-title">{article.title}</h1>
            <p className="ahead__lead">{article.excerpt}</p>
            <p className="acard__meta">
              <AuthorMark name={article.author} />
              <span>{article.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedAt} className="num">{formatDate(article.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span className="num">{readingMinutes(article)} menit baca</span>
            </p>
          </header>
          <div className="acover">
            <Photo name={article.cover} alt="" width={1200} height={675} sizes="(min-width: 1024px) 1024px, 92vw" eager />
          </div>

          <div className="alayout">
            <ArticleToc body={article.body} />
            <article className="aarticle">
              <ArticleBody body={article.body} />
              <ShareRow article={article} />
              {group && <ProgramCta group={group} />}
            </article>
          </div>
        </Section>
        <Section tone="paper" labelledBy="related-title">
          <RelatedArticles article={article} />
        </Section>
      </main>
      <Footer />
    </>
  )
}
