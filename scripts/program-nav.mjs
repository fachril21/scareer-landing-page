// Uji navigasi halaman detail program (Fase B): sidebar, rail, section switcher + bottom sheet.
// Jalankan setelah `npm run build` dan `npx vite preview --port 4173`: node scripts/program-nav.mjs
import { chromium } from 'playwright-core'
import AxeBuilder from '@axe-core/playwright'

const BASE = process.env.URL ?? 'http://localhost:4173'
const PATH = '/program/program-a'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const IDS = ['ringkasan', 'masalah-solusi', 'kenapa-kami', 'kurikulum', 'tools', 'skill-output', 'mentor', 'jadwal', 'karya', 'detail-program', 'harga', 'faq']
const CHILDREN = ['kenapa-brand', 'kenapa-program', 'untuk-siapa']

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const report = {}
const problems = []
const check = (cond, msg) => cond || problems.push(msg)

async function open(opts, url = PATH) {
  const ctx = await browser.newContext(opts)
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(BASE + url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  return { ctx, page, errors }
}

const jump = async (page, y) => {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
  await page.waitForTimeout(250)
}
const sectionTop = (page, id) => page.evaluate((i) => document.getElementById(i).getBoundingClientRect().top + scrollY, id)
const active = (page) => page.evaluate(() => document.querySelector('nav[aria-label="Daftar isi halaman"] [aria-current="location"]')?.getAttribute('data-toc-id') ?? null)
const switcherCount = (page) => page.locator('.switcher__count').innerText()
const settle = (page) => page.waitForTimeout(1400)

/* ---------- Sidebar (1440) ---------- */
{
  const { ctx, page, errors } = await open({ viewport: { width: 1440, height: 900 } })
  const r = {}
  r.navCount = await page.locator('nav[aria-label="Daftar isi halaman"]').count()
  r.switcher = await page.locator('.switcher').count()
  r.overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  r.geometri = await page.evaluate(() => {
    const side = document.querySelector('.toc-side').getBoundingClientRect()
    const main = document.querySelector('main section .container').getBoundingClientRect()
    return { sideLeft: Math.round(side.left), sideRight: Math.round(side.right), contentLeft: Math.round(main.left + 32), noOverlap: side.right <= main.left + 32 }
  })
  check(r.navCount === 1, 'sidebar: harus tepat satu nav daftar isi')
  check(r.switcher === 0, 'sidebar: switcher tidak boleh tampil')
  check(r.overflow === 0, 'sidebar: overflow horizontal')
  check(r.geometri.noOverlap, 'sidebar: tumpang tindih dengan kolom konten')

  r.stickyTop = (await jump(page, 1800), await page.evaluate(() => Math.round(document.querySelector('.toc-side').getBoundingClientRect().top)))
  check(Math.abs(r.stickyTop - 96) <= 2, `sidebar: sticky top ${r.stickyTop} (harus 96)`)

  // Mini CTA: hilang di Hero, muncul di tengah, hilang lagi di Harga
  const ctaOpacity = () => page.evaluate(() => getComputedStyle(document.querySelector('.mini-cta')).opacity)
  await jump(page, 0)
  const ctaTop = await ctaOpacity()
  await jump(page, (await sectionTop(page, 'kurikulum')) + 200)
  const ctaMid = await ctaOpacity()
  await jump(page, (await sectionTop(page, 'harga')) + 100)
  const ctaHarga = await ctaOpacity()
  r.miniCta = { hero: ctaTop, tengah: ctaMid, harga: ctaHarga }
  // Opacity bertransisi 150 ms: nilai mendekati 0 atau 1 dianggap sudah sampai.
  const near = (v, t) => Math.abs(Number(v) - t) < 0.02
  check(near(ctaTop, 0) && near(ctaMid, 1) && near(ctaHarga, 0), `mini CTA: ${JSON.stringify(r.miniCta)}`)

  // Scroll-spy natural: garis 40% dari atas viewport
  r.spy = []
  for (const id of IDS) {
    const top = await sectionTop(page, id)
    await jump(page, id === 'ringkasan' ? 0 : top - 700 * 0.4 + 120)
    const got = await active(page)
    r.spy.push([id, got])
    check(got === id || (id === 'kenapa-kami' && CHILDREN.includes(got)) || (id === 'detail-program' && got === 'untuk-siapa'), `spy: di ${id} aktif ${got}`)
  }
  await jump(page, 99999)
  r.dasarHalaman = await active(page)
  check(r.dasarHalaman === 'faq', `dasar halaman: aktif ${r.dasarHalaman}`)

  // Anak section terbuka saat induk aktif
  await jump(page, (await sectionTop(page, 'kenapa-kami')) - 100)
  r.anakTerbuka = await page.evaluate(() => [...document.querySelectorAll('.toc__children')].map((e) => e.getAttribute('data-open')))
  check(r.anakTerbuka[0] === 'true' && r.anakTerbuka[1] === 'false', `anak section: ${r.anakTerbuka}`)

  // Tema on-ink di atas Why Us dan Karya, terang di Kurikulum
  const ink = () => page.evaluate(() => document.querySelector('.toc-side').classList.contains('is-ink'))
  await jump(page, (await sectionTop(page, 'kenapa-kami')) + 100)
  const inkWhy = await ink()
  await jump(page, (await sectionTop(page, 'kurikulum')) + 100)
  const inkKurikulum = await ink()
  await jump(page, (await sectionTop(page, 'karya')) + 100)
  const inkKarya = await ink()
  r.tema = { whyUs: inkWhy, kurikulum: inkKurikulum, karya: inkKarya }
  check(inkWhy && !inkKurikulum && inkKarya, `tema on-ink: ${JSON.stringify(r.tema)}`)

  // Klik tiap item: gulir mulus, judul berada di offset 96, hash, fokus ke judul
  r.klik = []
  await jump(page, 0)
  for (const id of IDS.slice(1)) {
    const log = await page.evaluate(() => {
      window.__seen = []
      new MutationObserver(() => {
        const a = document.querySelector('.toc-side [aria-current="location"]')?.getAttribute('data-toc-id')
        if (a && window.__seen[window.__seen.length - 1] !== a) window.__seen.push(a)
      }).observe(document.querySelector('.toc-side'), { subtree: true, attributes: true, attributeFilter: ['aria-current'] })
    })
    await page.locator(`.toc-side a[data-toc-id="${id}"]`).click()
    await settle(page)
    const res = await page.evaluate((i) => {
      const el = document.getElementById(i)
      const h = el.querySelector('h1,h2,h3') ?? el
      return { headingTop: Math.round(h.getBoundingClientRect().top), hash: location.hash, focus: document.activeElement === h, seen: window.__seen }
    }, id)
    r.klik.push([id, res.headingTop, res.hash, res.focus, res.seen.join('>')])
    const atEnd = await page.evaluate(() => innerHeight + scrollY >= document.documentElement.scrollHeight - 2)
    check(res.hash === `#${id}`, `klik ${id}: hash ${res.hash}`)
    check(res.focus, `klik ${id}: fokus tidak pindah ke judul`)
    // Judul FAQ menempel di top 96 px bersama label di atasnya, jadi h2 berada sedikit di bawah 96.
    const target = id === 'faq' ? res.headingTop >= 93 && res.headingTop <= 140 : Math.abs(res.headingTop - 96) <= 3
    check(atEnd || target, `klik ${id}: judul di ${res.headingTop}px (harus 96)`)
    // Boleh berakhir di anak section induk yang sama (anak masuk garis penentu setelah gulungan selesai), tidak boleh melewati section lain.
    const asing = res.seen.filter((x) => x !== id && !CHILDREN.includes(x))
    check(asing.length === 0, `klik ${id}: item aktif berkedip melewati ${res.seen.join('>')}`)
  }

  // Klik anak
  await page.locator('.toc-side a[data-toc-id="kenapa-kami"]').click()
  await settle(page)
  await page.locator('.toc-side a[data-toc-id="kenapa-program"]').click()
  await settle(page)
  r.klikAnak = { aktif: await active(page), hash: await page.evaluate(() => location.hash) }
  check(r.klikAnak.aktif === 'kenapa-program' && r.klikAnak.hash === '#kenapa-program', `klik anak: ${JSON.stringify(r.klikAnak)}`)

  // Kembali memulihkan posisi
  const yBefore = await page.evaluate(() => Math.round(scrollY))
  await page.locator('.toc-side a[data-toc-id="tools"]').click()
  await settle(page)
  await page.goBack()
  await page.waitForTimeout(500)
  const yBack = await page.evaluate(() => Math.round(scrollY))
  r.kembali = { yBefore, yBack }
  check(Math.abs(yBack - yBefore) <= 4, `kembali: ${yBefore} -> ${yBack}`)

  r.axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations.map((v) => `${v.id}:${v.nodes[0]?.target}`)
  check(r.axe.length === 0, `sidebar axe: ${r.axe}`)
  r.errors = errors
  report.sidebar1440 = r
  await ctx.close()
}

/* ---------- Hash di URL saat dimuat ---------- */
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 } }, `${PATH}#kurikulum`)
  await page.waitForTimeout(500)
  const r = await page.evaluate(() => ({ h: Math.round(document.querySelector('#kurikulum h2').getBoundingClientRect().top), hash: location.hash }))
  r.aktif = await active(page)
  report.hashSaatMuat = r
  check(Math.abs(r.h - 96) <= 3 && r.hash === '#kurikulum' && r.aktif === 'kurikulum', `hash saat muat: ${JSON.stringify(r)}`)
  await ctx.close()
}

/* ---------- Rail (1300, pointer) ---------- */
{
  const { ctx, page, errors } = await open({ viewport: { width: 1300, height: 800 } })
  const r = {}
  r.navCount = await page.locator('nav[aria-label="Daftar isi halaman"]').count()
  r.rail = await page.locator('.rail').count()
  r.lebar = await page.evaluate(() => Math.round(document.querySelector('.rail').getBoundingClientRect().width))
  r.dash = await page.locator('.rail__dash').count()
  r.overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  check(r.rail === 1 && r.navCount === 1 && r.lebar === 56 && r.dash === 12 && r.overflow === 0, `rail: ${JSON.stringify(r)}`)

  await jump(page, (await sectionTop(page, 'tools')) - 200)
  r.chip = await page.locator('.rail__chip').innerText()
  check(r.chip === 'Tools', `rail chip: ${r.chip}`)

  const mainLeftBefore = await page.evaluate(() => document.querySelector('#tools .container').getBoundingClientRect().left)
  await page.locator('.rail').hover()
  await page.waitForTimeout(350)
  r.panel = await page.evaluate(() => ({ visible: !document.getElementById('rail-panel').hidden, width: Math.round(document.getElementById('rail-panel').getBoundingClientRect().width) }))
  const mainLeftAfter = await page.evaluate(() => document.querySelector('#tools .container').getBoundingClientRect().left)
  check(r.panel.visible && r.panel.width === 220, `rail panel: ${JSON.stringify(r.panel)}`)
  check(mainLeftBefore === mainLeftAfter, 'rail: panel menggeser konten')

  await page.locator('#rail-panel a[data-toc-id="harga"]').click()
  await settle(page)
  r.setelahKlik = { aktif: await active(page), hash: await page.evaluate(() => location.hash), panelTertutup: await page.evaluate(() => document.getElementById('rail-panel').hidden) }
  check(r.setelahKlik.hash === '#harga', `rail klik: ${JSON.stringify(r.setelahKlik)}`)

  await page.mouse.move(700, 400)
  await page.waitForTimeout(400)
  await page.locator('.rail__toggle').focus()
  await page.waitForTimeout(150)
  const openOnFocus = await page.evaluate(() => !document.getElementById('rail-panel').hidden)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(150)
  const closedOnEsc = await page.evaluate(() => document.getElementById('rail-panel').hidden && document.activeElement.classList.contains('rail__toggle'))
  r.keyboard = { bukaSaatFokus: openOnFocus, tutupDenganEsc: closedOnEsc }
  check(openOnFocus && closedOnEsc, `rail keyboard: ${JSON.stringify(r.keyboard)}`)
  r.axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations.map((v) => `${v.id}:${v.nodes[0]?.target}`)
  check(r.axe.length === 0, `rail axe: ${r.axe}`)
  r.errors = errors
  report.rail1300 = r
  await ctx.close()
}

/* ---------- Layar sentuh lebar 1300: tanpa hover memakai switcher, bukan rail ---------- */
{
  const { ctx, page } = await open({ viewport: { width: 1300, height: 800 }, hasTouch: true, isMobile: true })
  const r = { rail: await page.locator('.rail').count(), switcher: await page.locator('.switcher').count() }
  report.sentuh1300 = r
  check(r.rail === 0 && r.switcher === 1, `1300 sentuh: ${JSON.stringify(r)}`)
  await ctx.close()
}

/* ---------- Switcher + bottom sheet (390) ---------- */
{
  const { ctx, page, errors } = await open({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  const r = {}
  r.pola = { switcher: await page.locator('.switcher').count(), sidebar: await page.locator('.toc-side').count(), rail: await page.locator('.rail').count() }
  r.overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  check(r.pola.switcher === 1 && r.pola.sidebar === 0 && r.pola.rail === 0 && r.overflow === 0, `switcher: ${JSON.stringify(r)}`)

  const sw = await page.evaluate(() => {
    const b = document.querySelector('.switcher').getBoundingClientRect()
    return { tinggi: Math.round(b.height), top: Math.round(b.top) }
  })
  r.switcherBox = sw
  check(sw.tinggi === 52, `switcher tinggi ${sw.tinggi}`)

  // Menempel di bawah navbar saat menggulir, dan "n dari 12" mengikuti section
  await jump(page, (await sectionTop(page, 'kurikulum')) - 300 + 160)
  r.menempel = await page.evaluate(() => Math.round(document.querySelector('.switcher').getBoundingClientRect().top))
  check(r.menempel === 64, `switcher menempel di ${r.menempel} (harus 64)`)
  r.hitungan = await switcherCount(page)
  check(r.hitungan.startsWith('4 dari 12'), `hitungan: ${r.hitungan}`)

  // Buka sheet
  await page.locator('.switcher__btn').click()
  await page.waitForTimeout(400)
  r.sheet = await page.evaluate(() => {
    const dlg = document.querySelector('.sheet [role="dialog"]')
    const links = [...dlg.querySelectorAll('a.toc__link')].filter((a) => !a.closest('[inert]'))
    return {
      modal: dlg.getAttribute('aria-modal'),
      bodyOverflow: document.body.style.overflow,
      fokusDiDalam: dlg.contains(document.activeElement),
      tinggiMaks: Math.round(dlg.getBoundingClientRect().height),
      viewport: innerHeight,
      aktifBercentang: !!dlg.querySelector('[aria-current="location"] svg'),
      linkKecil: links.filter((a) => a.getBoundingClientRect().height < 47).map((a) => a.textContent),
      jumlahLink: links.length,
    }
  })
  check(r.sheet.modal === 'true' && r.sheet.bodyOverflow === 'hidden' && r.sheet.fokusDiDalam, `sheet: ${JSON.stringify(r.sheet)}`)
  check(r.sheet.tinggiMaks <= r.sheet.viewport * 0.7 + 1, `sheet terlalu tinggi ${r.sheet.tinggiMaks}`)
  check(r.sheet.aktifBercentang, 'sheet: item aktif tanpa centang')
  check(r.sheet.linkKecil.length === 0, `sheet: target < 48px ${r.sheet.linkKecil}`)

  // Esc menutup dan fokus kembali ke bilah
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  r.esc = await page.evaluate(() => ({ tertutup: !document.querySelector('.sheet [role="dialog"]'), fokus: document.activeElement?.classList.contains('switcher__btn'), overflow: document.body.style.overflow }))
  check(r.esc.tertutup && r.esc.fokus && r.esc.overflow === '', `sheet esc: ${JSON.stringify(r.esc)}`)

  // Ketuk scrim menutup
  await page.locator('.switcher__btn').click()
  await page.waitForTimeout(400)
  await page.mouse.click(195, 60)
  await page.waitForTimeout(400)
  r.scrim = await page.evaluate(() => !document.querySelector('.sheet [role="dialog"]'))
  check(r.scrim, 'sheet: scrim tidak menutup')

  // Pilih item: sheet menutup lalu halaman menggulung, judul di offset 132 (navbar 64 + switcher 52 + 16)
  await page.locator('.switcher__btn').click()
  await page.waitForTimeout(400)
  await page.locator('.sheet [role="dialog"] a[data-toc-id="harga"]').click()
  await page.waitForTimeout(1800)
  r.pilih = await page.evaluate(() => ({
    tertutup: !document.querySelector('.sheet [role="dialog"]'),
    judul: Math.round(document.querySelector('#harga h2').getBoundingClientRect().top),
    hash: location.hash,
    fokus: document.activeElement?.closest('#harga') !== null,
  }))
  check(r.pilih.tertutup && Math.abs(r.pilih.judul - 132) <= 3 && r.pilih.hash === '#harga' && r.pilih.fokus, `sheet pilih: ${JSON.stringify(r.pilih)}`)
  r.hitunganHarga = await switcherCount(page)
  check(r.hitunganHarga.startsWith('11 dari 12') || r.hitunganHarga.startsWith('12 dari 12'), `hitungan harga ${r.hitunganHarga}`)

  // Dasar halaman: 12 dari 12
  await jump(page, 99999)
  r.dasar = await switcherCount(page)
  check(r.dasar.startsWith('12 dari 12'), `dasar halaman: ${r.dasar}`)

  r.axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations.map((v) => `${v.id}:${v.nodes[0]?.target}`)
  check(r.axe.length === 0, `switcher axe: ${r.axe}`)
  r.errors = errors
  report.switcher390 = r
  await ctx.close()
}

/* ---------- Reduced motion: gulir instan, indikator tanpa animasi ---------- */
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await page.locator('.toc-side a[data-toc-id="faq"]').click()
  await page.waitForTimeout(150)
  const r = await page.evaluate(() => ({ y: Math.round(scrollY), headingTop: Math.round(document.querySelector('#faq h2').getBoundingClientRect().top) }))
  report.reducedMotion = r
  check(r.y > 1000, `reduced motion: gulir belum instan (y ${r.y})`)
  await ctx.close()
}

await browser.close()
console.log(JSON.stringify(report, null, 1))
console.log(problems.length ? `\nMASALAH (${problems.length}):\n- ${problems.join('\n- ')}` : '\nSEMUA CEK LOLOS')
process.exitCode = problems.length ? 1 : 0
