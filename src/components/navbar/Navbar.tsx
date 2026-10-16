import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { ProgramMenu } from './ProgramMenu'
import { NAV_ITEMS, CONSULT_MESSAGES } from '../../content/content'
import { useVisibleSections } from '../../hooks/useInView'
import { useNavProgress } from '../../hooks/useNavProgress'
import { waLink } from '../../lib/whatsapp'
import { useHomeHref, useLocation } from '../../app/router'
import { useTweaks } from '../../tweaks/TweakContext'
import { hiddenSectionIds } from '../../tweaks/sections'
import './navbar.css'

const SPY_IDS = ['program', 'kenapa-scareer', 'masalah', 'transparan', 'cara-belajar', 'karya', 'mentor', 'faq'] as const
const OPEN_DELAY_MS = 120
const CLOSE_DELAY_MS = 200

/** Id section -> item menu yang ditandai aktif. */
function activeNavId(visible: ReadonlySet<string>): string | null {
  if (visible.has('faq')) return 'faq'
  if (visible.has('kenapa-scareer') || visible.has('masalah') || visible.has('transparan')) return 'kenapa-scareer'
  if (visible.has('program')) return 'program'
  return null
}

export function Navbar() {
  const { tweaks } = useTweaks()
  const [scrolled, setScrolled] = useState(false)
  const [programOpen, setProgramOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const home = useHomeHref()
  const onHome = useLocation().pathname === '/'
  // Scroll-spy hanya untuk homepage: id section halaman detail berbeda arti.
  // Beberapa section bisa disembunyikan lewat tweak: daftar dipantau mengikuti, supaya observer ikut terpasang saat ditampilkan.
  const hidden = hiddenSectionIds(tweaks)
  const spyIds = SPY_IDS.filter((id) => !hidden.includes(id))
  const visible = useVisibleSections(onHome ? spyIds : [], '-40% 0px -40% 0px')
  const active = activeNavId(visible)
  // Varian transparan lalu pill berlaku di homepage dan halaman detail (pengaturannya bersama).
  const floating = tweaks.navStyle === 'floating'
  useNavProgress(headerRef, floating)
  const navClass = [
    'nav',
    scrolled && 'nav--scrolled',
    floating && 'nav--floating',
    floating && mobileOpen && 'nav--menu-open',
  ]
    .filter(Boolean)
    .join(' ')

  // Border muncul setelah scroll > 8px: pakai sentinel, bukan event scroll.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const schedule = useCallback((open: boolean, delay: number) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setProgramOpen(open), delay)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const closeProgram = useCallback((returnFocus: boolean) => {
    window.clearTimeout(timer.current)
    setProgramOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }, [])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="nav-sentinel" aria-hidden="true" />
      <header ref={headerRef} className={navClass}>
        <div className="container container--wide nav__inner">
          <Logo />

          <nav className="nav__menu" aria-label="Utama">
            <ul>
              <li
                className="nav__item nav__item--program"
                onPointerEnter={(e) => e.pointerType === 'mouse' && schedule(true, OPEN_DELAY_MS)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && schedule(false, CLOSE_DELAY_MS)}
                onKeyDown={(e) => e.key === 'Escape' && programOpen && closeProgram(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) closeProgram(false)
                }}
              >
                <button
                  ref={triggerRef}
                  type="button"
                  className={`nav__link${active === 'program' ? ' is-active' : ''}`}
                  aria-expanded={programOpen}
                  aria-controls="menu-program"
                  onClick={() => (programOpen ? closeProgram(false) : setProgramOpen(true))}
                >
                  Program
                  <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" className="nav__chevron" />
                </button>
                <ProgramMenu open={programOpen} onNavigate={() => closeProgram(false)} />
              </li>
              {NAV_ITEMS.filter((item) => !hidden.includes(item.id)).map((item) => (
                <li key={item.id} className="nav__item">
                  <a
                    className={`nav__link${active === item.id ? ' is-active' : ''}`}
                    href={home(`#${item.id}`)}
                    aria-current={active === item.id ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <Button
              size="md"
              variant="outline"
              href={waLink('Navbar', CONSULT_MESSAGES.general)}
              target="_blank"
            >
              Tanya via WhatsApp
            </Button>
            <Button size="md" href={home('#program')}>
              Lihat program
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="nav__burger"
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          >
            {mobileOpen ? <X size={24} strokeWidth={1.75} /> : <Menu size={24} strokeWidth={1.75} />}
          </button>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </>
  )
}
