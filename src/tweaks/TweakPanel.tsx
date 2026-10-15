import { useId, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { HERO_GROUPS, NAV_GROUPS, PROGRAM_GROUPS, WHY_GROUPS, LEARN_GROUPS, WORKS_GROUPS, SECTION_VISIBILITY_GROUPS, END_GROUPS, WHAT_IS_GROUPS, PROBLEM_GROUPS, ORDER_GROUPS, type Tweaks, type TweakGroup } from './options'
import { useTweaks } from './TweakContext'
import './tweaks.css'

/** Panel hanya tampil saat pengembangan atau dengan `?tweak` di URL. */
function isPanelEnabled(): boolean {
  return import.meta.env.DEV || new URLSearchParams(window.location.search).has('tweak')
}

function Group<K extends keyof Tweaks>({ group }: { group: TweakGroup<K> }) {
  const { tweaks, setTweak } = useTweaks()
  const name = useId()
  return (
    <fieldset className="tweak__group">
      <legend>{group.title}</legend>
      <div className="tweak__options">
        {group.options.map((option) => (
          <label key={option.value} className="tweak__option">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={tweaks[group.key] === option.value}
              onChange={() => setTweak(group.key, option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function TweakPanel() {
  const [open, setOpen] = useState(false)
  const { reset, saveAsDefault, clearSavedDefault, hasSavedDefault, isAtDefault } = useTweaks()
  const panelId = useId()

  if (!isPanelEnabled()) return null

  return (
    <aside className="tweak" aria-label="Panel tweak">
      {open ? (
        <div id={panelId} className="tweak__panel">
          <div className="tweak__head">
            <strong>Tweak</strong>
            <button type="button" className="tweak__close" onClick={() => setOpen(false)} aria-label="Tutup panel tweak">
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <div className="tweak__body">
            <p className="tweak__section">Struktur halaman</p>
            {ORDER_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Apa itu scareer (homepage)</p>
            {WHAT_IS_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Masalah (homepage)</p>
            {PROBLEM_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Hero</p>
            {HERO_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Navbar (homepage)</p>
            {NAV_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Program (homepage)</p>
            {PROGRAM_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Kenapa scareer (homepage)</p>
            {WHY_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Cara belajar (homepage)</p>
            {LEARN_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Karya (homepage)</p>
            {WORKS_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">Mentor dan FAQ (homepage)</p>
            {SECTION_VISIBILITY_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
            <p className="tweak__section">CTA dan footer</p>
            {END_GROUPS.map((g) => (
              <Group key={g.key} group={g as TweakGroup<keyof Tweaks>} />
            ))}
          </div>
          <div className="tweak__foot">
            <p className="tweak__status" role="status">
              {isAtDefault ? 'Sama dengan default' : 'Beda dari default'}
              {hasSavedDefault ? ' (pilihan kamu)' : ' (bawaan)'}
            </p>
            <div className="tweak__actions">
              <button type="button" className="tweak__action tweak__action--primary" onClick={saveAsDefault} disabled={isAtDefault}>
                Jadikan default
              </button>
              <button type="button" className="tweak__action" onClick={reset} disabled={isAtDefault}>
                Kembalikan
              </button>
            </div>
            {hasSavedDefault && (
              <button type="button" className="tweak__link" onClick={clearSavedDefault}>
                Pakai bawaan awal
              </button>
            )}
          </div>
        </div>
      ) : (
        <button type="button" className="tweak__toggle" onClick={() => setOpen(true)} aria-expanded="false" aria-controls={panelId}>
          <SlidersHorizontal size={18} strokeWidth={1.75} aria-hidden="true" />
          Tweak
        </button>
      )}
    </aside>
  )
}
