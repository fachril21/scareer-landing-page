import { useTweaks } from '../tweaks/TweakContext'
import { useReducedMotion } from './useReducedMotion'

/** Lapisan gerak Interaktif aktif: dipilih di panel tweak dan pengguna tidak meminta reduced-motion. */
export function useInteractiveMotion(): boolean {
  const { tweaks } = useTweaks()
  const reduced = useReducedMotion()
  return tweaks.motion === 'interactive' && !reduced
}
