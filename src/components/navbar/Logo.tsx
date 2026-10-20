import { useHomeHref } from '../../app/router'

/** Logo resmi scareer (brand guideline hal 12). Versi berwarna di atas terang, mono putih di atas Tinta atau Merah. `adaptive`: dua versi bertumpuk, berganti mengikuti --nav-p (navbar transparan di atas hero merah). */
export function Logo({ onInk = false, adaptive = false }: { onInk?: boolean; adaptive?: boolean }) {
  const home = useHomeHref()
  const src = onInk ? '/images/brand/logo-horizontal-white.png' : '/images/brand/logo-horizontal.png'
  return (
    <a className={`logo${onInk ? ' logo--on-ink' : ''}`} href={home()} aria-label="scareer, ke atas halaman">
      <img src={src} width={3000} height={898} alt="" className="logo__img" />
      {adaptive && <img src="/images/brand/logo-horizontal-white.png" width={3000} height={898} alt="" className="logo__img logo__img--white" />}
    </a>
  )
}
