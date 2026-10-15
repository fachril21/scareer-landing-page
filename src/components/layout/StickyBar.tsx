import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { CONSULT_MESSAGES } from '../../content/content'
import { useVisibleSections } from '../../hooks/useInView'
import { waLink, type WaSource } from '../../lib/whatsapp'
import { useTweaks } from '../../tweaks/TweakContext'
import { hiddenSectionIds } from '../../tweaks/sections'
import './stickybar.css'

interface StickyBarProps {
  /** Bar tampil bila salah satu section ini terlihat... */
  showIn: readonly string[]
  /** ...dan tidak ada satu pun section ini yang terlihat. */
  hideIn: readonly string[]
  primary: { label: string; href: string; onClick?: (e: React.MouseEvent) => void }
  waSource: WaSource
  waMessage?: string
  onWhatsApp?: () => void
}

const HOME_SHOW = ['kenapa-scareer', 'masalah', 'transparan', 'cara-belajar', 'karya', 'mentor', 'faq']
const HOME_HIDE = ['beranda', 'apa-itu-scareer', 'program', 'cta']

/** Bar CTA mobile. Aturan tampil diberikan halaman: homepage dari Kenapa scareer sampai FAQ, halaman detail dari Kenapa kami sampai Program Detail. */
export function StickyBar({ showIn, hideIn, primary, waSource, waMessage = CONSULT_MESSAGES.general, onWhatsApp }: StickyBarProps) {
  const visible = useVisibleSections([...showIn, ...hideIn])
  const show = showIn.some((id) => visible.has(id)) && !hideIn.some((id) => visible.has(id))

  return (
    <div className={`sticky-bar${show ? ' is-shown' : ''}`} inert={!show}>
      <Button href={primary.href} onClick={primary.onClick} fullWidth>{primary.label}</Button>
      <a
        className="sticky-bar__wa"
        href={waLink(waSource, waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tanya via WhatsApp (membuka WhatsApp di tab baru)"
        onClick={onWhatsApp}
      >
        <WhatsAppIcon size={24} />
      </a>
    </div>
  )
}

export function HomeStickyBar() {
  const { tweaks } = useTweaks()
  const hidden = hiddenSectionIds(tweaks)
  const showIn = HOME_SHOW.filter((id) => !hidden.includes(id))
  return <StickyBar showIn={showIn} hideIn={HOME_HIDE} primary={{ label: 'Lihat program', href: '#program' }} waSource="Bar sticky" />
}
