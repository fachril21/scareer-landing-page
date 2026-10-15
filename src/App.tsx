import { Redirect, Router, useLocation } from './app/router'
import { HomePage } from './pages/HomePage'
import { ProgramPage } from './pages/ProgramPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TweakProvider } from './tweaks/TweakContext'

const PROGRAM_ROUTE = /^\/program\/([^/]+)$/

function Routes() {
  const { pathname } = useLocation()
  if (pathname === '/') return <HomePage />
  // Daftar program belum jadi halaman sendiri: arahkan ke section Program di homepage.
  if (pathname === '/program') return <Redirect to="/#program" />
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
