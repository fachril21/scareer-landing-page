/**
 * Tautan di dalam konten yang menggulung ke section lain (mis. "Lihat tools", "Lihat paket", sel Tools -> modul).
 * Lewat satu event supaya gulungannya memakai kunci scroll-spy yang sama dengan daftar isi.
 */
export const GOTO_EVENT = 'scareer:goto'
export const SELECT_MODULE_EVENT = 'scareer:select-module'

export function requestSection(id: string): void {
  window.dispatchEvent(new CustomEvent(GOTO_EVENT, { detail: { id } }))
}

/** Gulung ke Curriculum dan pilih modul tertentu (id modul, mis. `modul-2`). */
export function openModule(moduleId: string): void {
  requestSection('kurikulum')
  window.dispatchEvent(new CustomEvent(SELECT_MODULE_EVENT, { detail: { id: moduleId } }))
}

export const OPEN_FAQ_EVENT = 'scareer:open-faq'

/** Buka butir FAQ (id tanpa awalan `faq-`) lalu gulung ke butir itu. */
export function openFaq(faqId: string): void {
  window.dispatchEvent(new CustomEvent(OPEN_FAQ_EVENT, { detail: { id: faqId } }))
  requestSection(`faq-${faqId}`)
}
