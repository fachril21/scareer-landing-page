import { useHomeHref } from '../../app/router'

/** Logo resmi scareer (brand guideline hal 12). Versi berwarna di atas terang, mono putih di atas Tinta atau Merah. `adaptive`: dua versi bertumpuk, berganti mengikuti --nav-p (navbar transparan di atas hero merah). `size="lg"`: penutup di footer, lebih besar dari logo navbar. */
export function Logo({ onInk = false, adaptive = false, size = 'md' }: { onInk?: boolean; adaptive?: boolean; size?: 'md' | 'lg' }) {
  const home = useHomeHref()
  const src = onInk ? '/images/brand/logo-horizontal-white.png' : '/images/brand/logo-horizontal.png'
  return (
    <a className={`logo${onInk ? ' logo--on-ink' : ''}${size === 'lg' ? ' logo--lg' : ''}`} href={home()} aria-label="scareer, ke atas halaman">
      <img src={src} width={3000} height={898} alt="" className="logo__img" />
      {adaptive && <img src="/images/brand/logo-horizontal-white.png" width={3000} height={898} alt="" className="logo__img logo__img--white" />}
    </a>
  )
}
