// Verifikasi satu putaran: overflow, target sentuh, aksesibilitas (axe), reduced motion, keyboard.
// Jalankan: npm run build && npx vite preview --port 4173, lalu node scripts/verify.mjs [outDir]
import { chromium } from 'playwright-core'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const URL = process.env.URL ?? 'http://localhost:4173/'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const outDir = process.argv[2] ?? 'verify-out'
const WIDTHS = [
  { w: 390, h: 844 },
  { w: 768, h: 1024 },
  { w: 1024, h: 768 },
  { w: 1440, h: 900 },
]
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const report = {}

for (const { w, h } of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 1024, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const consoleErrors = []
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
  page.on('pageerror', (e) => consoleErrors.push(String(e)))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  const r = { consoleErrors }
  r.overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  r.h1Count = await page.locator('h1').count()

  // Hero terlihat tanpa scroll: H1, subhead, dua tombol
  r.heroAboveFold = await page.evaluate(() => {
    const b = (s) => document.querySelector(s)?.getBoundingClientRect().bottom ?? null
    return { h1: b('h1'), lead: b('.hero__lead'), buttons: b('.hero__actions'), viewport: window.innerHeight }
  })

  // Target sentuh < 44 px (abaikan teks inline di paragraf)
  r.smallTargets = await page.evaluate(() => {
    const out = []
    for (const el of document.querySelectorAll('a[href], button, [role=tab]')) {
      if (el.closest('[hidden], [inert]') || el.closest('.sr-only')) continue
      const s = getComputedStyle(el)
      if (s.display === 'none' || s.visibility === 'hidden') continue
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      const extended = el.matches('.btn--md, .filter-chip, .quick-chip')
      if (!extended && (rect.height < 44 || rect.width < 44)) {
        out.push(`${el.tagName}.${String(el.className).split(' ')[0]} "${(el.textContent ?? '').trim().slice(0, 24)}" ${Math.round(rect.width)}x${Math.round(rect.height)}`)
      }
    }
    return [...new Set(out)].slice(0, 25)
  })

  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
  r.axe = axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes[0]?.target?.join(' ').slice(0, 80) }))

  await page.screenshot({ path: join(outDir, `hero-${w}.png`) })
  report[w] = r
  await ctx.close()
}

// Reduced motion: kartu lowongan langsung tampil statis
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  report.reducedMotion = await page.evaluate(() => ({
    cardOpacity: getComputedStyle(document.querySelector('.job__card')).opacity,
    noteOpacity: getComputedStyle(document.querySelector('.job__note')).opacity,
    strikeOffset: getComputedStyle(document.querySelector('.job__strike path')).strokeDashoffset,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }))
  await ctx.close()
}

// Keyboard: skip link pertama, fokus terlihat, jumlah tab stop
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.keyboard.press('Tab')
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim())
  const seq = []
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    seq.push(await page.evaluate(() => {
      const el = document.activeElement
      const s = getComputedStyle(el)
      return `${(el.textContent ?? '').trim().slice(0, 22)} [outline:${s.outlineStyle} ${s.outlineWidth}]`
    }))
  }
  report.keyboard = { first, seq }
  await ctx.close()
}

await browser.close()
console.log(JSON.stringify(report, null, 1))
