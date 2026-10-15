// Uji Fase E: View Transition kartu program ke halaman detail, tautan homepage ke rute nyata, pemulihan gulir.
// Jalankan setelah `npm run build` dan `npx vite preview --port 4173`: node scripts/route-transition.mjs
import { chromium } from 'playwright-core'

const BASE = process.env.URL ?? 'http://localhost:4173'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const report = {}
const problems = []
const check = (cond, msg) => cond || problems.push(msg)

async function open(opts, url = '/') {
  const ctx = await browser.newContext(opts)
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  // Hitung pemanggilan startViewTransition dan catat animasi pseudo-elemen foto saat transisi berjalan.
  await page.addInitScript(() => {
    window.__vt = { calls: 0, photoAnims: 0, finished: false, names: [] }
    const original = document.startViewTransition?.bind(document)
    if (original) {
      document.startViewTransition = (cb) => {
        window.__vt.calls++
        const t = original(cb)
        t.ready.then(() => {
          const anims = document.getAnimations().filter((a) => String(a.effect?.pseudoElement ?? '').includes('program-photo'))
          window.__vt.photoAnims = anims.length
          window.__vt.names = [...new Set(anims.map((a) => a.effect.pseudoElement))]
        }).catch(() => {})
        t.finished.then(() => (window.__vt.finished = true), () => (window.__vt.finished = 'dibatalkan'))
        return t
      }
    }
  })
  await page.goto(BASE + url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  return { ctx, page, errors }
}
const state = (page) => page.evaluate(() => ({ path: location.pathname + location.hash, y: Math.round(scrollY), h1: document.querySelector('h1')?.textContent }))

/* ---------- Desktop: klik kartu menjalankan View Transition foto ---------- */
{
  const { ctx, page, errors } = await open({ viewport: { width: 1440, height: 900 } })
  const r = {}
  await page.evaluate(() => (window.__marker = 'dokumen-sama'))
  await page.locator('#program').scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  const before = await state(page)

  // Klik di badan kartu (bukan tombol): tetap menaut ke halaman detail
  await page.locator('.cell').nth(2).locator('h3').click()
  await page.waitForTimeout(150)
  r.saatTransisi = await page.evaluate(() => ({ calls: window.__vt.calls, anim: window.__vt.photoAnims, nama: window.__vt.names }))
  await page.waitForFunction(() => window.__vt.finished !== false, null, { timeout: 4000 })
  r.setelah = { ...(await state(page)), vt: await page.evaluate(() => window.__vt), tanpaMuatUlang: await page.evaluate(() => window.__marker === 'dokumen-sama') }
  check(r.saatTransisi.calls === 1, `view transition: startViewTransition dipanggil ${r.saatTransisi.calls}x`)
  check(r.saatTransisi.anim > 0 || r.setelah.vt.photoAnims > 0, `view transition: tidak ada animasi program-photo (${JSON.stringify(r.setelah.vt)})`)
  check(r.setelah.vt.finished === true, `view transition: selesai = ${r.setelah.vt.finished}`)
  check(r.setelah.path === '/program/program-c' && r.setelah.y === 0 && r.setelah.tanpaMuatUlang, `setelah klik: ${JSON.stringify(r.setelah)}`)
  r.namaBersih = await page.evaluate(() => [...document.querySelectorAll('*')].filter((e) => e.style.viewTransitionName === 'program-photo').length)
  check(r.namaBersih === 0, 'view transition: nama transisi tertinggal di elemen')
  r.heroFoto = await page.evaluate(() => { const i = document.querySelector('.pd-stage .stage__photo'); return { termuat: i.complete && i.naturalWidth > 0, src: i.currentSrc.split('/').pop() } })
  check(r.heroFoto.termuat && r.heroFoto.src.startsWith('program-c'), `hero foto: ${JSON.stringify(r.heroFoto)}`)

  // Kembali: posisi gulir homepage pulih
  await page.goBack()
  await page.waitForTimeout(500)
  const back = await state(page)
  r.kembali = { ...back, sebelum: before.y }
  check(back.path === '/' && Math.abs(back.y - before.y) <= 4, `kembali: ${JSON.stringify(r.kembali)}`)
  r.programTampil = await page.evaluate(() => document.querySelector('#program').getBoundingClientRect().top < innerHeight)
  check(r.programTampil, 'kembali: section Program tidak terlihat')

  // Enter pada tombol "Lihat detail" (keyboard) juga bertransisi
  await page.locator('.cell a.btn').first().focus()
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => location.pathname === '/program/program-a', null, { timeout: 4000 })
  r.keyboard = await page.evaluate(() => ({ vt: window.__vt.calls, path: location.pathname }))
  check(r.keyboard.vt === 2, `keyboard: view transition ${r.keyboard.vt}x`)

  // Modifier (Ctrl+klik): bukan navigasi SPA, tidak boleh memanggil transisi
  await page.goBack()
  await page.waitForTimeout(500)
  const callsSebelum = await page.evaluate(() => window.__vt.calls)
  const popup = ctx.waitForEvent('page', { timeout: 1500 }).catch(() => null)
  await page.locator('.cell a.btn').nth(1).click({ modifiers: ['Control'] })
  const baru = await popup
  if (baru) await baru.close()
  r.modifier = { calls: (await page.evaluate(() => window.__vt.calls)) - callsSebelum, path: await page.evaluate(() => location.pathname) }
  check(r.modifier.calls === 0 && r.modifier.path === '/', `ctrl+klik: ${JSON.stringify(r.modifier)}`)

  r.errors = errors
  check(errors.length === 0, `console: ${errors}`)
  report.desktop = r
  await ctx.close()
}

/* ---------- Reduced motion: pindah halaman tanpa transisi ---------- */
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await page.locator('.cell a.btn').first().click()
  await page.waitForFunction(() => location.pathname === '/program/program-a', null, { timeout: 3000 })
  const r = await page.evaluate(() => ({ calls: window.__vt.calls, y: Math.round(scrollY) }))
  report.reducedMotion = r
  check(r.calls === 0, `reduced motion: view transition dipanggil ${r.calls}x`)
  await ctx.close()
}

/* ---------- Mobile: kartu dan transisi ---------- */
{
  const { ctx, page, errors } = await open({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  await page.locator('.cell').first().scrollIntoViewIfNeeded()
  await page.locator('.cell').first().locator('h3').tap()
  await page.waitForFunction(() => location.pathname === '/program/program-a', null, { timeout: 4000 })
  await page.waitForTimeout(400)
  const r = await page.evaluate(() => ({ vt: window.__vt.calls, y: Math.round(scrollY), switcher: !!document.querySelector('.switcher'), h1: document.querySelector('h1').textContent }))
  report.mobile = r
  check(r.vt === 1 && r.y === 0 && r.switcher, `mobile: ${JSON.stringify(r)}`)
  check(errors.length === 0, `console mobile: ${errors}`)
  await ctx.close()
}

/* ---------- Tautan homepage ke rute nyata dan footer ---------- */
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 } })
  const r = await page.evaluate(() => ({
    kartu: [...document.querySelectorAll('.cell a.btn')].map((a) => a.getAttribute('href')),
    karya: [...document.querySelectorAll('#karya .work')].map((a) => a.getAttribute('href')),
    footer: [...document.querySelectorAll('.footer a')].map((a) => `${a.textContent}=${a.getAttribute('href')}`),
  }))
  report.tautanHome = r
  check(r.kartu.length === 6 && r.kartu.every((h, i) => h === `/program/program-${'abcdef'[i]}`), `tautan kartu: ${r.kartu}`)
  check(r.karya.length === 5 && r.karya.every((h) => /^\/program\/program-[a-e]$/.test(h)), `tautan karya: ${r.karya}`)
  check(r.footer.includes('Program A=/program/program-a') && r.footer.includes('FAQ=#faq'), `footer home: ${r.footer}`)

  // Karya homepage: klik membuka halaman detail program tanpa View Transition foto kartu
  await page.locator('#karya').scrollIntoViewIfNeeded()
  await page.locator('#karya .work').nth(1).click()
  await page.waitForFunction(() => location.pathname === '/program/program-b', null, { timeout: 3000 })
  report.karyaKlik = { path: await page.evaluate(() => location.pathname), vt: await page.evaluate(() => window.__vt.calls) }
  check(report.karyaKlik.vt === 0, 'karya homepage tidak boleh memakai transisi foto kartu')

  // Footer dari halaman detail: ke beranda dan ke halaman program lain
  const f = await page.evaluate(() => [...document.querySelectorAll('.footer a')].map((a) => `${a.textContent}=${a.getAttribute('href')}`))
  report.footerDetail = f
  check(f.includes('FAQ=/#faq') && f.includes('Kenapa Scareer=/#kenapa-scareer') && f.includes('Program C=/program/program-c'), `footer detail: ${f}`)
  await page.locator('.footer a', { hasText: 'Cara belajar' }).click()
  await page.waitForFunction(() => location.pathname === '/' && location.hash === '#cara-belajar', null, { timeout: 3000 })
  await page.waitForTimeout(500)
  const arrival = await page.evaluate(() => Math.round(document.getElementById('cara-belajar').getBoundingClientRect().top))
  report.footerKeBeranda = { top: arrival }
  check(Math.abs(arrival - 72) <= 4, `footer -> /#cara-belajar: section di ${arrival}px (harus 72)`)

  // Dari detail: Lihat semua program (/program) menuju section Program homepage
  await page.goto(BASE + '/program/program-d', { waitUntil: 'networkidle' })
  await page.locator('.nav a', { hasText: 'FAQ' }).first().click().catch(() => {})
  await ctx.close()
}

await browser.close()
console.log(JSON.stringify(report, null, 1))
console.log(problems.length ? `\nMASALAH (${problems.length}):\n- ${problems.join('\n- ')}` : '\nSEMUA CEK LOLOS')
process.exitCode = problems.length ? 1 : 0
