import { Redirect, Router, useLocation } from './app/router'
import { HomePage } from './pages/HomePage'
import { ProgramPage } from './pages/ProgramPage'
import { AboutPage } from './pages/AboutPage'
import { BlogArticlePage } from './pages/BlogArticlePage'
import { BlogListingPage } from './pages/BlogListingPage'
import { BlogSearchPage } from './pages/BlogSearchPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TweakProvider } from './tweaks/TweakContext'

const PROGRAM_ROUTE = /^\/program\/([^/]+)$/
const BLOG_GROUP_ROUTE = /^\/blog\/grup\/([^/]+)$/
const BLOG_CATEGORY_ROUTE = /^\/blog\/kategori\/([^/]+)$/
const BLOG_ARTICLE_ROUTE = /^\/blog\/([^/]+)$/

function Routes() {
  const { pathname } = useLocation()
  if (pathname === '/') return <HomePage />
  // Daftar program belum jadi halaman sendiri: arahkan ke section Program di homepage.
  if (pathname === '/program') return <Redirect to="/#program" />
  if (pathname === '/tentang') return <AboutPage />
  if (pathname === '/blog') return <BlogListingPage />
  if (pathname === '/blog/cari') return <BlogSearchPage />
  const group = BLOG_GROUP_ROUTE.exec(pathname)
  if (group) return <BlogListingPage groupSlug={decodeURIComponent(group[1])} />
  const category = BLOG_CATEGORY_ROUTE.exec(pathname)
  if (category) return <BlogListingPage categorySlug={decodeURIComponent(category[1])} />
  const article = BLOG_ARTICLE_ROUTE.exec(pathname)
  if (article) return <BlogArticlePage slug={decodeURIComponent(article[1])} />
  const match = PROGRAM_ROUTE.exec(pathname)
  if (match) return <ProgramPage slug={decodeURIComponent(match[1])} />
  return <NotFoundPage />
}

export function App() {
  return (
    <TweakProvider>
      <Router>
        <Routes />
      </Router>
    </TweakProvider>
  )
}
