import { Fragment, useId, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { SCOPE_SECTIONS, type TweakScope, type Tweaks, type TweakGroup } from './options'
import { useTweaks } from './TweakContext'
import './tweaks.css'

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

/** Panel tweak satu halaman: hanya menampilkan dan mengelola pilihan milik halaman itu. */
export function TweakPanel({ scope }: { scope: TweakScope }) {
  const [open, setOpen] = useState(false)
  const api = useTweaks()
  const isAtDefault = api.isAtDefault(scope)
  const hasSavedDefault = api.hasSavedDefault(scope)
  const panelId = useId()

  return (
    <aside className="tweak" aria-label="Panel tweak">
      {open ? (
        <div id={panelId} className="tweak__panel">
          <div className="tweak__head">
            <strong>{scope === 'home' ? 'Tweak homepage' : 'Tweak detail bootcamp'}</strong>
            <button type="button" className="tweak__close" onClick={() => setOpen(false)} aria-label="Tutup panel tweak">
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <div className="tweak__body">
            {SCOPE_SECTIONS[scope].map((section) => (
              <Fragment key={section.title}>
                <p className="tweak__section">{section.title}</p>
                {section.groups.map((g) => (
                  <Group key={g.key} group={g} />
                ))}
              </Fragment>
            ))}
          </div>
          <div className="tweak__foot">
            <p className="tweak__status" role="status">
              {isAtDefault ? 'Sama dengan default' : 'Beda dari default'}
              {hasSavedDefault ? ' (pilihan kamu)' : ' (bawaan)'}
            </p>
            <div className="tweak__actions">
              <button type="button" className="tweak__action tweak__action--primary" onClick={() => api.saveAsDefault(scope)} disabled={isAtDefault}>
                Jadikan default
              </button>
              <button type="button" className="tweak__action" onClick={() => api.reset(scope)} disabled={isAtDefault}>
                Kembalikan
              </button>
            </div>
            {hasSavedDefault && (
              <button type="button" className="tweak__link" onClick={() => api.clearSavedDefault(scope)}>
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
