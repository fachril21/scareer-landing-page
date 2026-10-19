import { useEffect, useId, useRef, useState } from 'react'
import { CircleAlert, X } from 'lucide-react'
import { Button } from '../../ui/Button'
import { SYLLABUS_FORM, SYLLABUS_STATUS_OPTIONS } from '../../../content/syllabus-form'
import type { SyllabusStatus } from '../../../content/syllabus-form'
import { normalizePhone, submitLead, validateLead, type LeadErrors, type LeadField, type LeadInput } from '../../../lib/leads'
import { track } from '../../../lib/track'
import './syllabus-form.css'

const EMPTY: LeadInput = { name: '', email: '', whatsapp: '', status: '' }
const FIELD_ORDER: readonly LeadField[] = ['name', 'email', 'whatsapp', 'status']

interface SyllabusDialogProps {
  open: boolean
  onClose: () => void
  programName: string
  programSlug: string
  fileHref: string
}

function startDownload(href: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = ''
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="sform__error">
      <CircleAlert size={16} strokeWidth={1.75} aria-hidden="true" />
      {message}
    </p>
  )
}

/**
 * Dialog form unduh silabus: `<dialog>` native (fokus terkunci, Esc menutup). Mode prototype: data tidak disimpan,
 * hanya divalidasi lalu silabus diunduh. Form selalu muncul setiap kali tombol ditekan.
 */
export function SyllabusDialog({ open, onClose, programName, programSlug, fileHref }: SyllabusDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const uid = useId()
  const [values, setValues] = useState<LeadInput>(EMPTY)
  const [errors, setErrors] = useState<LeadErrors>({})
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [announce, setAnnounce] = useState('')
  const trap = useRef('')

  const id = (field: string) => `${uid}-${field}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setValues(EMPTY)
      setErrors({})
      setTouched({})
      setSubmitting(false)
      setDone(false)
      setAnnounce('')
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
      track('open_syllabus_form', { program: programSlug })
      // showModal() memfokus elemen pertama (tombol tutup); isian pertama lebih berguna.
      document.getElementById(`${uid}-name`)?.focus()
    }
    if (!open && dialog.open) dialog.close()
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open, programSlug, uid])

  const update = (field: LeadField, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    // Setelah kolom pernah disentuh, kesalahan diperbarui saat mengetik.
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateLead(next)[field] }))
  }

  const blur = (field: LeadField) => {
    if (values[field] === '' && !touched[field]) return
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateLead(values)[field] }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    const found = validateLead(values)
    setErrors(found)
    setTouched({ name: true, email: true, whatsapp: true, status: true })
    const first = FIELD_ORDER.find((f) => found[f])
    if (first) {
      const count = Object.keys(found).length
      setAnnounce(`${count} isian perlu diperbaiki.`)
      const target = first === 'status' ? dialogRef.current?.querySelector<HTMLElement>('input[name="status"]') : document.getElementById(id(first))
      target?.focus()
      return
    }
    // Honeypot terisi: anggap bot, tampilkan sukses tanpa mengunduh.
    if (trap.current) {
      setDone(true)
      return
    }
    setSubmitting(true)
    try {
      await submitLead({
        name: values.name.trim(),
        email: values.email.trim(),
        whatsapp: normalizePhone(values.whatsapp) ?? values.whatsapp,
        status: values.status as SyllabusStatus,
      })
      track('submit_syllabus_form', { program: programSlug, status: values.status })
      track('download_syllabus', { program: programSlug })
      setDone(true)
      startDownload(fileHref)
    } catch {
      setAnnounce('Datamu belum terkirim. Coba lagi sebentar lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  const describedBy = (field: LeadField) => (errors[field] ? id(`${field}-error`) : undefined)

  return (
    <dialog
      ref={dialogRef}
      className="sform"
      aria-labelledby={id('title')}
      onClose={onClose}
      onClick={(e) => {
        // Klik di area gelap (elemen dialog itu sendiri) menutup.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="sform__panel">
        <header className="sform__head">
          <div>
            <h2 id={id('title')}>Unduh silabus {programName}</h2>
            <p>{done ? SYLLABUS_FORM.success : SYLLABUS_FORM.intro}</p>
          </div>
          <button type="button" className="sform__close" aria-label="Tutup" onClick={onClose}>
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </header>

        {done ? (
          <div className="sform__done">
            <a className="sform__fallback" href={fileHref} download>
              Unduh silabus lagi
            </a>
            <Button variant="outline" onClick={onClose}>Tutup</Button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="sform__form">
            <p className="sr-only" role="status" aria-live="polite">{announce}</p>

            <div className="sform__field">
              <label htmlFor={id('name')}>Nama</label>
              <input
                id={id('name')}
                type="text"
                autoComplete="name"
                value={values.name}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy('name')}
                onChange={(e) => update('name', e.target.value)}
                onBlur={() => blur('name')}
              />
              <FieldError id={id('name-error')} message={errors.name} />
            </div>

            <div className="sform__field">
              <label htmlFor={id('email')}>Email</label>
              <input
                id={id('email')}
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy('email')}
                onChange={(e) => update('email', e.target.value)}
                onBlur={() => blur('email')}
              />
              <FieldError id={id('email-error')} message={errors.email} />
            </div>

            <div className="sform__field">
              <label htmlFor={id('whatsapp')}>Nomor WhatsApp</label>
              <input
                id={id('whatsapp')}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="0812 3456 7890"
                value={values.whatsapp}
                aria-invalid={errors.whatsapp ? true : undefined}
                aria-describedby={describedBy('whatsapp')}
                onChange={(e) => update('whatsapp', e.target.value)}
                onBlur={() => blur('whatsapp')}
              />
              <FieldError id={id('whatsapp-error')} message={errors.whatsapp} />
            </div>

            <fieldset className="sform__field sform__status" aria-describedby={describedBy('status')}>
              <legend>Apa status kamu saat ini?</legend>
              {SYLLABUS_STATUS_OPTIONS.map((option) => (
                <label key={option} className={`sform__opt${values.status === option ? ' is-checked' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value={option}
                    checked={values.status === option}
                    aria-invalid={errors.status ? true : undefined}
                    onChange={() => update('status', option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
              <FieldError id={id('status-error')} message={errors.status} />
            </fieldset>

            {/* Honeypot: tersembunyi dari pengguna dan pembaca layar, diisi oleh bot. */}
            <div className="sform__trap" aria-hidden="true">
              <label>
                Situs web
                <input type="text" tabIndex={-1} autoComplete="off" onChange={(e) => (trap.current = e.target.value)} />
              </label>
            </div>

            <p className="sform__notice">{SYLLABUS_FORM.notice}</p>

            <div className="sform__actions">
              <Button type="submit" disabled={submitting}>{submitting ? 'Mengirim…' : 'Unduh silabus'}</Button>
              <Button variant="outline" onClick={onClose}>Batal</Button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  )
}
