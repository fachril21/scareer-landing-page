// Anggaran performa halaman detail program (Fase F): bobot sumber daya dan CLS.
// Jalankan setelah `npm run build` dan `npx vite preview --port 4173`: node scripts/program-budget.mjs
import { chromium } from 'playwright-core'
import { gzipSync } from 'node:zlib'

const BASE = process.env.URL ?? 'http://localhost:4173'
const PATH = '/program/program-a'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
// Anggaran landing page (rules web/performance): JS < 150 kB gzip, CSS < 30 kB gzip, halaman < 1 MB sebelum foto, CLS < 0,1.
const BUDGET = { jsGzipKb: 150, cssGzipKb: 30, nonImageKb: 1024, cls: 0.1 }

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const report = {}
const problems = []
const check = (cond, msg) => cond || problems.push(msg)
const kb = (n) => Math.round((n / 1024) * 10) / 10

for (const [w, h, touch, tag] of [[1440, 900, false, 'desktop1440'], [390, 844, true, 'mobile390']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch })
  const page = await ctx.newPage()
  const sizes = { js: 0, jsGzip: 0, css: 0, cssGzip: 0, font: 0, html: 0, image: 0, other: 0 }
  const images = []
  page.on('response', async (res) => {
    try {
      const type = res.request().resourceType()
      const body = await res.body()
      if (type === 'script') { sizes.js += body.length; sizes.jsGzip += gzipSync(body).length }
      else if (type === 'stylesheet') { sizes.css += body.length; sizes.cssGzip += gzipSync(body).length }
      else if (type === 'font') sizes.font += body.length
      else if (type === 'document') sizes.html += body.length
      else if (type === 'image') { sizes.image += body.length; images.push(res.url().split('/').pop()) }
      else sizes.other += body.length
    } catch { /* respons yang dibatalkan */ }
  })
  await page.addInitScript(() => {
    window.__cls = 0
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value
    }).observe({ type: 'layout-shift', buffered: true })
  })
  await page.goto(BASE + PATH, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  // Gulir pelan ke seluruh halaman (memicu foto lazy), ganti mode bayar, buka FAQ dan modul: semuanya tidak boleh menggeser layout.
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += Math.round(h * 0.6)) {
    await page.evaluate((top) => scrollTo({ top, behavior: 'instant' }), y)
    await page.waitForTimeout(120)
  }
  await page.locator('#harga').scrollIntoViewIfNeeded()
  await page.locator('[role="radio"]', { hasText: 'Cicilan' }).first().click()
  await page.waitForTimeout(300)
  await page.locator('#faq .faq__q').first().click()
  await page.waitForTimeout(400)
  await page.locator('#kurikulum').scrollIntoViewIfNeeded()
  await page.locator(touch ? '#kurikulum-modul-3' : '#kurikulum-modul-3').click()
  await page.waitForTimeout(400)
  await page.waitForLoadState('networkidle')

  const cls = await page.evaluate(() => Math.round(window.__cls * 1000) / 1000)
  const nonImage = sizes.js + sizes.css + sizes.font + sizes.html + sizes.other
  report[tag] = {
    jsKb: kb(sizes.js), jsGzipKb: kb(sizes.jsGzip), cssKb: kb(sizes.css), cssGzipKb: kb(sizes.cssGzip),
    fontKb: kb(sizes.font), htmlKb: kb(sizes.html), nonImageKb: kb(nonImage), imageKb: kb(sizes.image), imageCount: images.length, cls,
  }
  check(kb(sizes.jsGzip) < BUDGET.jsGzipKb, `${tag}: JS gzip ${kb(sizes.jsGzip)} kB (anggaran ${BUDGET.jsGzipKb})`)
  check(kb(sizes.cssGzip) < BUDGET.cssGzipKb, `${tag}: CSS gzip ${kb(sizes.cssGzip)} kB (anggaran ${BUDGET.cssGzipKb})`)
  check(kb(nonImage) < BUDGET.nonImageKb, `${tag}: bobot non-gambar ${kb(nonImage)} kB (anggaran ${BUDGET.nonImageKb})`)
  check(cls < BUDGET.cls, `${tag}: CLS ${cls} (anggaran ${BUDGET.cls})`)
  await ctx.close()
}

await browser.close()
console.log(JSON.stringify({ anggaran: BUDGET, hasil: report }, null, 1))
console.log(problems.length ? `\nMASALAH (${problems.length}):\n- ${problems.join('\n- ')}` : '\nSEMUA ANGGARAN TERPENUHI')
process.exitCode = problems.length ? 1 : 0
