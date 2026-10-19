import { SYLLABUS_STATUS_OPTIONS, type SyllabusStatus } from '../content/syllabus-form'

export interface SyllabusLead {
  name: string
  email: string
  /** Nomor dinormalkan ke format 62xxxxxxxxxx. */
  whatsapp: string
  status: SyllabusStatus
}

export type LeadField = 'name' | 'email' | 'whatsapp' | 'status'
export type LeadErrors = Partial<Record<LeadField, string>>

export interface LeadInput {
  name: string
  email: string
  whatsapp: string
  status: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_PHONE_DIGITS = 10
const MAX_PHONE_DIGITS = 15

/** 0812-3456-7890, +62 812 3456 7890, dan 62812… menjadi 6281234567890 (tanpa spasi). Null bila bukan nomor yang masuk akal. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-().]/g, '').replace(/^\+/, '')
  if (!/^\d+$/.test(digits)) return null
  const full = digits.startsWith('0') ? `62${digits.slice(1)}` : digits
  if (!full.startsWith('62')) return null
  return full.length >= MIN_PHONE_DIGITS && full.length <= MAX_PHONE_DIGITS ? full : null
}

/** Pesan kesalahan menyebut masalah dan cara memperbaikinya. */
export function validateLead(input: LeadInput): LeadErrors {
  const errors: LeadErrors = {}
  if (input.name.trim().length < 2) errors.name = 'Nama belum diisi. Tulis nama panggilanmu.'
  if (!EMAIL.test(input.email.trim())) errors.email = 'Email belum benar. Contoh: nama@email.com.'
  if (normalizePhone(input.whatsapp) === null) errors.whatsapp = 'Nomor WhatsApp belum benar. Contoh: 0812 3456 7890.'
  if (!(SYLLABUS_STATUS_OPTIONS as readonly string[]).includes(input.status)) errors.status = 'Pilih salah satu status.'
  return errors
}

export const LEAD_EVENT = 'scareer:lead'

/**
 * Mode prototype: data TIDAK disimpan atau dikirim ke mana pun. Hanya dipancarkan sebagai CustomEvent `scareer:lead`
 * (dan dicatat di konsol saat dev) supaya alurnya bisa didemokan. Saat tujuan data sudah ada, ganti isi fungsi ini
 * (mis. POST ke endpoint) tanpa mengubah pemanggilnya.
 */
export async function submitLead(lead: SyllabusLead): Promise<void> {
  window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: lead }))
  if (import.meta.env.DEV) console.info('[lead prototype] tidak disimpan:', { ...lead, email: '***', whatsapp: '***' })
}
