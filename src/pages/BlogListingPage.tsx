import { SkipLink, Section } from '../components/layout/Section'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { Breadcrumbs, type Crumb } from '../components/ui/Breadcrumbs'
import { ArticleGrid } from '../components/blog/ArticleGrid'
import { BlogCategoryNav, BlogTabs } from '../components/blog/BlogNav'
import { BlogSearchBox } from '../components/blog/BlogSearchBox'
import {
  BLOG_ARTICLES,
  articlesOfCategory,
  articlesOfGroup,
  getCategory,
  getGroup,
} from '../content/blog'
import { usePageMeta } from '../hooks/usePageMeta'
import { NotFoundPage } from './NotFoundPage'
import '../components/blog/blog.css'

interface BlogListingPageProps {
  groupSlug?: string
  categorySlug?: string
}

/**
 * Daftar artikel blog dalam tiga bentuk dengan satu layout: beranda blog (terbaru), per grup, dan per kategori.
 * Tab grup di atas, sidebar kategori di dalam grup, lalu grid kartu.
 */
export function BlogListingPage({ groupSlug, categorySlug }: BlogListingPageProps) {
  const category = categorySlug ? getCategory(categorySlug) : undefined
  const group = getGroup(category ? category.groupSlug : (groupSlug ?? ''))
  const invalid = (categorySlug && !category) || (groupSlug && !group)

  const title = category?.name ?? group?.name ?? 'Blog scareer'
  const description = category
    ? `Artikel ${category.name} di blog scareer.`
    : (group?.description ?? 'Artikel untuk fresh graduate: karier, data, keamanan siber, marketing, dan keuangan.')
  usePageMeta(group ? `${title} | Blog scareer` : 'Blog scareer', description)

  if (invalid) return <NotFoundPage />

  const articles = category ? articlesOfCategory(category.slug) : group ? articlesOfGroup(group.slug) : BLOG_ARTICLES
  const crumbs: Crumb[] = [{ label: 'Beranda', href: '/' }, { label: 'Blog', href: group ? '/blog' : undefined }]
  if (group) crumbs.push({ label: group.name, href: category ? `/blog/grup/${group.slug}` : undefined })
  if (category) crumbs.push({ label: category.name })

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="konten">
        <Section tone="surface" width="wide" labelledBy="blog-title" className="blog-top" flush>
          {group && <Breadcrumbs items={crumbs} />}
          <h1 id="blog-title" className="blog-title">{title}</h1>
          {group && !category && <p className="blog-lead">{group.description}</p>}
          <BlogSearchBox />
          <BlogTabs activeGroup={group?.slug} />

          <div className={`blog-body${group ? ' blog-body--side' : ''}`}>
            {group && <BlogCategoryNav group={group} activeCategory={category?.slug} />}
            <div className="blog-list">
              <ArticleGrid key={`${group?.slug ?? 'all'}-${category?.slug ?? 'all'}`} articles={articles} />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
