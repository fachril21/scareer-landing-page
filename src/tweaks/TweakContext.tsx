import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { ALL_GROUPS, DEFAULT_TWEAKS, type Tweaks } from './options'

/** Naik versi saat bawaan berubah, supaya pilihan lama di localStorage tidak menutupi bawaan baru. */
const STORAGE_KEY = 'scareer-tweaks-v2'
/** Default pilihan user ("Jadikan default"): menggantikan bawaan awal sampai dihapus. */
const SAVED_DEFAULT_KEY = 'scareer-tweaks-default-v1'

interface TweakApi {
  tweaks: Tweaks
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void
  /** Kembali ke default yang berlaku: default pilihan user kalau ada, kalau tidak bawaan awal. */
  reset: () => void
  /** Jadikan pilihan saat ini sebagai default. */
  saveAsDefault: () => void
  /** Buang default pilihan user dan kembali ke bawaan awal. */
  clearSavedDefault: () => void
  hasSavedDefault: boolean
  /** Pilihan saat ini sama dengan default yang berlaku. */
  isAtDefault: boolean
}

const TweakContext = createContext<TweakApi | null>(null)

function read(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(key: string, value: Tweaks | null) {
  try {
    if (value) window.localStorage.setItem(key, JSON.stringify(value))
    else window.localStorage.removeItem(key)
  } catch {
    // Penyimpanan diblokir: pilihan tetap berlaku selama sesi.
  }
}

/** Isi localStorage tidak dipercaya: hanya nilai yang ada di daftar pilihan yang lolos, sisanya dari `fallback`. */
function sanitize(parsed: unknown, fallback: Tweaks): Tweaks {
  if (typeof parsed !== 'object' || parsed === null) return fallback
  const next: Record<string, string> = { ...fallback }
  for (const group of ALL_GROUPS) {
    const candidate = (parsed as Record<string, unknown>)[group.key]
    if (group.options.some((o) => o.value === candidate)) next[group.key] = candidate as string
  }
  return next as Tweaks
}

const loadSavedDefault = (): Tweaks | null => {
  const parsed = read(SAVED_DEFAULT_KEY)
  return parsed === null ? null : sanitize(parsed, DEFAULT_TWEAKS)
}

const isSame = (a: Tweaks, b: Tweaks) => ALL_GROUPS.every((g) => a[g.key] === b[g.key])

/** Atribut di <html> dipakai CSS untuk gaya yang tidak perlu logika React. */
function applyAttributes(tweaks: Tweaks) {
  const root = document.documentElement.dataset
  root.navStyle = tweaks.navStyle
  root.navBlur = tweaks.navBlur
  root.navWidth = tweaks.navWidth
  root.wordStyle = tweaks.wordStyle
  root.whyTilt = tweaks.whyTilt
}

export function TweakProvider({ children }: { children: ReactNode }) {
  const [savedDefault, setSavedDefault] = useState<Tweaks | null>(loadSavedDefault)
  const defaults = savedDefault ?? DEFAULT_TWEAKS
  const [tweaks, setTweaks] = useState<Tweaks>(() => sanitize(read(STORAGE_KEY), savedDefault ?? DEFAULT_TWEAKS))

  // Atribut dipasang sebelum paint supaya tidak ada kilasan tampilan lama.
  useLayoutEffect(() => {
    applyAttributes(tweaks)
  }, [tweaks])

  useEffect(() => {
    write(STORAGE_KEY, tweaks)
  }, [tweaks])

  const setTweak = useCallback<TweakApi['setTweak']>((key, value) => {
    setTweaks((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => setTweaks(defaults), [defaults])

  const saveAsDefault = useCallback(() => {
    write(SAVED_DEFAULT_KEY, tweaks)
    setSavedDefault(tweaks)
  }, [tweaks])

  const clearSavedDefault = useCallback(() => {
    write(SAVED_DEFAULT_KEY, null)
    setSavedDefault(null)
    setTweaks(DEFAULT_TWEAKS)
  }, [])

  const api = useMemo<TweakApi>(
    () => ({
      tweaks,
      setTweak,
      reset,
      saveAsDefault,
      clearSavedDefault,
      hasSavedDefault: savedDefault !== null,
      isAtDefault: isSame(tweaks, defaults),
    }),
    [tweaks, setTweak, reset, saveAsDefault, clearSavedDefault, savedDefault, defaults],
  )
  return <TweakContext value={api}>{children}</TweakContext>
}

export function useTweaks(): TweakApi {
  const api = useContext(TweakContext)
  if (!api) throw new Error('useTweaks harus dipakai di dalam TweakProvider')
  return api
}
