// Cek rute halaman detail (Fase A): navigasi tanpa muat ulang, scroll, meta, redirect, 404.
// Jalankan setelah `npm run build` dan `npx vite preview --port 4173`.
import { chromium } from 'playwright-core'

const BASE = process.env.URL ?? 'http://localhost:4173'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
const results = {}
const state = () => page.evaluate(() => ({ path: location.pathname + location.hash, y: Math.round(scrollY), h1: document.querySelector('h1')?.textContent }))

await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.evaluate(() => (window.__marker = 'sama-dokumen'))
await page.locator('#program').scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
const before = await state()
await page.locator('.cell a.btn').first().click()
await page.waitForTimeout(400)
results.klikLihatDetail = { ...(await state()), tanpaMuatUlang: await page.evaluate(() => window.__marker === 'sama-dokumen') }
results.meta = await page.evaluate(() => ({
  title: document.title,
  description: document.querySelector('meta[name=description]')?.content,
  jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)['@type']),
  sectionIds: [...document.querySelectorAll('main > section')].map((s) => s.id),
  h1Count: document.querySelectorAll('h1').length,
}))

await page.goBack()
await page.waitForTimeout(400)
const back = await state()
results.kembali = { ...back, posisiSebelum: before.y, posisiPulih: Math.abs(back.y - before.y) < 4 }
results.metaDibersihkan = await page.evaluate(() => document.querySelectorAll('script[type="application/ld+json"]').length === 0)

await page.goto(BASE + '/program/program-b#harga', { waitUntil: 'networkidle' })
await page.waitForTimeout(300)
results.hashLangsung = await page.evaluate(() => ({ y: Math.round(scrollY), hargaTop: Math.round(document.getElementById('harga').getBoundingClientRect().top) }))

await page.locator('.nav__link', { hasText: 'Kenapa Scareer' }).click()
await page.waitForTimeout(500)
results.navbarDariDetail = await state()
results.logoHrefDiDetail = await (async () => {
  await page.goto(BASE + '/program/program-a', { waitUntil: 'networkidle' })
  return page.locator('header a.logo').getAttribute('href')
})()

await page.goto(BASE + '/program', { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
results.redirectProgram = await state()

await page.goto(BASE + '/program/tidak-ada', { waitUntil: 'networkidle' })
results.notFound = await state()
await page.goto(BASE + '/asal-asalan', { waitUntil: 'networkidle' })
results.notFound2 = await state()

results.consoleErrors = errors
console.log(JSON.stringify(results, null, 1))
await browser.close()
