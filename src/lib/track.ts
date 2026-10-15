/**
 * Event pelacakan halaman detail (brief bab 11). Prototype belum terhubung ke layanan analitik:
 * event dicatat di konsol saat dev dan dikirim sebagai CustomEvent `scareer:track` supaya bisa diuji.
 */
export type TrackEvent =
  | 'view_program'
  | 'click_cta_hero'
  | 'toc_click'
  | 'curriculum_module_open'
  | 'download_syllabus'
  | 'select_plan'
  | 'faq_open'
  | 'portfolio_open'
  | 'scroll_depth_pricing'
  | `click_wa_${'hero' | 'pas' | 'program_detail' | 'pricing' | 'faq' | 'sticky' | 'jadwal' | 'persona'}`

export type TrackParams = Readonly<Record<string, string | number | boolean>>

export function track(event: TrackEvent, params: TrackParams = {}): void {
  window.dispatchEvent(new CustomEvent('scareer:track', { detail: { event, ...params } }))
  if (import.meta.env.DEV) console.debug('[track]', event, params)
}
