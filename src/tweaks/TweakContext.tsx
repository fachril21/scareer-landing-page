import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { ALL_GROUPS, DEFAULT_TWEAKS, scopeKeys, type TweakScope, type Tweaks } from './options'

/** Naik versi saat bawaan berubah, supaya pilihan lama di localStorage tidak menutupi bawaan baru. */
const STORAGE_KEY = 'scareer-tweaks-v2'
/** Default pilihan user ("Jadikan default"): menggantikan bawaan awal sampai dihapus. */
const SAVED_DEFAULT_KEY = 'scareer-tweaks-default-v1'

interface TweakApi {
  tweaks: Tweaks
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void
  /** Kembali ke default yang berlaku untuk satu halaman: default pilihan user kalau ada, kalau tidak bawaan awal. */
  reset: (scope: TweakScope) => void
  /** Jadikan pilihan saat ini di satu halaman sebagai default. Halaman lain tidak tersentuh. */
  saveAsDefault: (scope: TweakScope) => void
  /** Buang default pilihan user untuk satu halaman dan kembali ke bawaan awal. */
  clearSavedDefault: (scope: TweakScope) => void
  /** Halaman ini punya default pilihan user yang beda dari bawaan awal. */
  hasSavedDefault: (scope: TweakScope) => boolean
  /** Pilihan saat ini di halaman ini sama dengan default yang berlaku. */
  isAtDefault: (scope: TweakScope) => boolean
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

/** Sama di semua key milik satu halaman. */
const isSame = (a: Tweaks, b: Tweaks, scope: TweakScope) => scopeKeys(scope).every((key) => a[key] === b[key])

/** Salin nilai key milik satu halaman dari `source` ke `base`. */
const withScope = (base: Tweaks, source: Tweaks, scope: TweakScope): Tweaks => {
  const next: Record<string, string> = { ...base }
  for (const key of scopeKeys(scope)) next[key] = source[key]
  return next as Tweaks
}

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

  const reset = useCallback<TweakApi['reset']>((scope) => setTweaks((prev) => withScope(prev, defaults, scope)), [defaults])

  const saveAsDefault = useCallback<TweakApi['saveAsDefault']>(
    (scope) => {
      const next = withScope(savedDefault ?? DEFAULT_TWEAKS, tweaks, scope)
      write(SAVED_DEFAULT_KEY, next)
      setSavedDefault(next)
    },
    [savedDefault, tweaks],
  )

  const clearSavedDefault = useCallback<TweakApi['clearSavedDefault']>(
    (scope) => {
      const next = withScope(savedDefault ?? DEFAULT_TWEAKS, DEFAULT_TWEAKS, scope)
      const isPlain = ALL_GROUPS.every((g) => next[g.key] === DEFAULT_TWEAKS[g.key])
      write(SAVED_DEFAULT_KEY, isPlain ? null : next)
      setSavedDefault(isPlain ? null : next)
      setTweaks((prev) => withScope(prev, DEFAULT_TWEAKS, scope))
    },
    [savedDefault],
  )

  const api = useMemo<TweakApi>(
    () => ({
      tweaks,
      setTweak,
      reset,
      saveAsDefault,
      clearSavedDefault,
      hasSavedDefault: (scope) => savedDefault !== null && !isSame(savedDefault, DEFAULT_TWEAKS, scope),
      isAtDefault: (scope) => isSame(tweaks, defaults, scope),
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
