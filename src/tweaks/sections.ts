import type { Tweaks } from './options'

/** Id section homepage yang disembunyikan lewat tweak. Dipakai scroll-spy dan bar sticky supaya tidak memantau section yang tidak ada. */
export function hiddenSectionIds(tweaks: Tweaks): readonly string[] {
  const hidden: string[] = []
  if (tweaks.whyPanel !== 'shown') hidden.push('transparan')
  if (tweaks.worksSection !== 'shown') hidden.push('karya')
  if (tweaks.mentorSection !== 'shown') hidden.push('mentor')
  if (tweaks.faqSection !== 'shown') hidden.push('faq')
  if (tweaks.problem === 'hidden') hidden.push('masalah')
  return hidden
}
