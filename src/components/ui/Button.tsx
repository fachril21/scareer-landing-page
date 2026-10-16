import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from './Icons'
import './button.css'

type Variant = 'primary' | 'outline' | 'whatsapp' | 'light' | 'link'
type Size = 'md' | 'lg'

type Common = {
  variant?: Variant
  /** md = 40px (navbar), lg = 48px (konten, 52px di mobile) */
  size?: Size
  /** Tombol berada di atas latar Ink: varian WhatsApp dan outline berbalik warna. */
  onInk?: boolean
  fullWidth?: boolean
  children: ReactNode
}

type AsLink = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'>
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export function Button(props: AsLink | AsButton) {
  const { variant = 'primary', size = 'lg', onInk = false, fullWidth = false, children, className, ...rest } = props
  const classes = [
    'btn',
    `btn--${variant}`,
    variant !== 'link' && `btn--${size}`,
    onInk && 'btn--on-ink',
    fullWidth && 'btn--full',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {variant === 'whatsapp' && <WhatsAppIcon size={20} />}
      {variant === 'link' && <ArrowRight className="btn__arrow" size={16} strokeWidth={1.75} aria-hidden="true" />}
      <span>{children}</span>
    </>
  )

  if (rest.href !== undefined) {
    const { href, target, rel, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    const safeRel = target === '_blank' ? 'noopener noreferrer' : rel
    return (
      <a className={classes} href={href} target={target} rel={safeRel} {...anchor}>
        {content}
      </a>
    )
  }

  const { type = 'button', ...button } = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} type={type} {...button}>
      {content}
    </button>
  )
}
