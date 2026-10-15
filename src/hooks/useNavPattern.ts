import { useMediaQuery } from './useMediaQuery'

export type NavPattern = 'sidebar' | 'rail' | 'switcher'

/**
 * Satu pola daftar isi aktif pada satu waktu (brief bab 6):
 * sidebar penuh di 1440 px ke atas, rail 56 px di 1280 sampai 1439 px khusus perangkat dengan pointer,
 * selain itu section switcher + bottom sheet (HP, tablet, dan layar sentuh).
 */
export function useNavPattern(): NavPattern {
  const wide = useMediaQuery('(min-width: 1440px)')
  const railWidth = useMediaQuery('(min-width: 1280px)')
  const canHover = useMediaQuery('(hover: hover)')
  if (wide) return 'sidebar'
  if (railWidth && canHover) return 'rail'
  return 'switcher'
}
