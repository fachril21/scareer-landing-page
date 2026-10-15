import { useHomeHref } from '../../app/router'

/** Logo resmi scareer (brand guideline hal 12). Versi berwarna di atas terang, mono putih di atas Tinta atau Ungu. */
export function Logo({ onInk = false }: { onInk?: boolean }) {
  const home = useHomeHref()
  const src = onInk ? '/images/brand/logo-horizontal-white.png' : '/images/brand/logo-horizontal.png'
  return (
    <a className={`logo${onInk ? ' logo--on-ink' : ''}`} href={home()} aria-label="scareer, ke atas halaman">
      <img src={src} width={2830} height={708} alt="" className="logo__img" />
    </a>
  )
}
