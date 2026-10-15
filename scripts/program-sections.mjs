// Uji section 1 sampai 6 halaman detail program (Fase C).
// Jalankan setelah `npm run build` dan `npx vite preview --port 4173`: node scripts/program-sections.mjs
import { chromium } from 'playwright-core'
import AxeBuilder from '@axe-core/playwright'

const BASE = process.env.URL ?? 'http://localhost:4173'
const PATH = '/program/program-a'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

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
  await page.addInitScript(() => {
    window.__events = []
    window.addEventListener('scareer:track', (e) => window.__events.push(e.detail))
  })
  await page.goto(BASE + url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  return { ctx, page, errors }
}
const events = (page) => page.evaluate(() => window.__events)
// Tunggu sampai gulir berhenti (gulir mulus jarak jauh bisa lebih dari 1,5 detik).
const settle = async (page) => {
  let last = -1
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(150)
    const y = await page.evaluate(() => Math.round(scrollY))
    if (y === last) return
    last = y
  }
}
const headingTop = (page, sel) => page.evaluate((s) => Math.round(document.querySelector(s).getBoundingClientRect().top), sel)
const axe = async (page) =>
  (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations.map((v) => `${v.id}:${v.nodes[0]?.target}`)

/* ================= Desktop 1440 ================= */
{
  const { ctx, page, errors } = await open({ viewport: { width: 1440, height: 900 } })
  const r = {}

  // 1. Hero
  r.hero = await page.evaluate(() => ({
    h1: document.querySelector('h1').textContent,
    h1Count: document.querySelectorAll('h1').length,
    badges: [...document.querySelectorAll('.pd-badges li')].map((e) => e.textContent),
    summaryRows: [...document.querySelectorAll('.summary__rows > div')].filter((e) => e.offsetParent).length,
    price: document.querySelector('.summary__price strong').textContent,
    fakta: document.querySelectorAll('.proof__cell').length,
    fotoDimuat: document.querySelector('.stage__photo').complete && document.querySelector('.stage__photo').naturalWidth > 0,
    overflow: document.documentElement.scrollWidth - innerWidth,
  }))
  check(r.hero.h1.startsWith('Bootcamp ') && r.hero.h1Count === 1, `hero h1: ${r.hero.h1}`)
  check(r.hero.summaryRows === 4 && r.hero.fakta === 4 && r.hero.fotoDimuat, `hero: ${JSON.stringify(r.hero)}`)
  check(r.hero.overflow === 0, 'overflow horizontal di 1440')

  await page.locator('.hero__actions a.btn').first().click()
  await settle(page)
  r.lihatPaket = { judul: await headingTop(page, '#harga h2'), hash: await page.evaluate(() => location.hash), ev: (await events(page)).filter((e) => e.event === 'click_cta_hero').length }
  check(Math.abs(r.lihatPaket.judul - 96) <= 3 && r.lihatPaket.hash === '#harga' && r.lihatPaket.ev === 1, `hero lihat paket: ${JSON.stringify(r.lihatPaket)}`)
  const wa = await page.evaluate(() => document.querySelector('.hero__actions a.btn--whatsapp').href)
  check(wa.startsWith('https://wa.me/') && wa.includes('Detail%3A%20Hero'), `hero WA: ${wa}`)

  // 2. PAS
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  r.pas = await page.evaluate(() => ({
    h2: document.querySelector('#masalah-solusi h2').textContent,
    marks: document.querySelectorAll('#masalah-solusi mark').length,
    kolom: [...document.querySelectorAll('#masalah-solusi .pillar')].map((e) => e.querySelector('.pas__tag').textContent),
    statistik: !!document.querySelector('.pas__stat'),
  }))
  check(r.pas.marks >= 1 && r.pas.marks <= 3, `pas: stabilo ${r.pas.marks} (maks 3)`)
  check(r.pas.kolom.join() === 'Problem,Agitate,Solution', `pas kolom: ${r.pas.kolom}`)
  check(!r.pas.statistik, 'pas: statistik tidak boleh tampil tanpa sumber')

  // 3. Why Us
  r.why = await page.evaluate(() => ({
    group: [...document.querySelectorAll('.why-group > h3')].map((e) => e.textContent),
    ids: [...document.querySelectorAll('.why-group')].map((e) => e.id),
    sel: [...document.querySelectorAll('.why-grid')].map((g) => g.children.length),
    janji: !!document.evaluate("//h4[contains(., 'nggak kami janjikan')]", document, null, 9, null).singleNodeValue,
    h4DiBawahH3: [...document.querySelectorAll('.why-cell h4')].length,
  }))
  check(r.why.group.join() === 'Kenapa Scareer,Kenapa program ini' && r.why.ids.join() === 'kenapa-brand,kenapa-program', `why: ${JSON.stringify(r.why)}`)
  check(r.why.sel[0] === 3 && r.why.sel[1] >= 3 && r.why.janji, `why sel: ${JSON.stringify(r.why)}`)
  await page.locator('#kenapa-program a', { hasText: 'Lihat tools' }).click()
  await settle(page)
  r.lihatTools = { judul: await headingTop(page, '#tools h2'), hash: await page.evaluate(() => location.hash) }
  check(Math.abs(r.lihatTools.judul - 96) <= 3 && r.lihatTools.hash === '#tools', `lihat tools: ${JSON.stringify(r.lihatTools)}`)
  r.pelajari = await page.locator('a', { hasText: 'Pelajari Scareer' }).getAttribute('href')
  check(r.pelajari === '/#transparan', `pelajari scareer href ${r.pelajari}`)

  // 4. Curriculum
  const panelsHeight = () => page.evaluate(() => Math.round(document.querySelector('.mod-panels').getBoundingClientRect().height))
  const activeTab = () => page.evaluate(() => document.querySelector('[role="tab"][aria-selected="true"]')?.id)
  await page.locator('#kurikulum').scrollIntoViewIfNeeded()
  r.kur = { awal: await activeTab(), tinggi: await panelsHeight() }
  check(r.kur.awal === 'kurikulum-modul-1', `kurikulum awal: ${r.kur.awal}`)
  await page.locator('#kurikulum-modul-1').focus()
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(250)
  r.kur.setelahPanah = { tab: await activeTab(), hash: await page.evaluate(() => location.hash), fokus: await page.evaluate(() => document.activeElement.id), tinggi: await panelsHeight() }
  check(r.kur.setelahPanah.tab === 'kurikulum-modul-2' && r.kur.setelahPanah.hash === '#kurikulum-modul-2' && r.kur.setelahPanah.fokus === 'kurikulum-modul-2', `kurikulum panah: ${JSON.stringify(r.kur.setelahPanah)}`)
  check(r.kur.setelahPanah.tinggi === r.kur.tinggi, 'kurikulum: tinggi panel berubah saat ganti modul')
  await page.keyboard.press('End')
  await page.waitForTimeout(150)
  r.kur.end = await activeTab()
  await page.keyboard.press('Home')
  await page.waitForTimeout(150)
  r.kur.home = await activeTab()
  check(r.kur.end === 'kurikulum-modul-6' && r.kur.home === 'kurikulum-modul-1', `kurikulum Home/End: ${r.kur.home}/${r.kur.end}`)
  await page.waitForTimeout(3000)
  check((await activeTab()) === 'kurikulum-modul-1', 'kurikulum: berpindah sendiri (auto-advance)')
  r.kur.panelAktif = await page.evaluate(() => {
    const panels = [...document.querySelectorAll('.mod-panel')]
    return { aktif: panels.filter((p) => !p.inert).length, terlihat: panels.filter((p) => getComputedStyle(p).visibility === 'visible').length }
  })
  check(r.kur.panelAktif.aktif === 1 && r.kur.panelAktif.terlihat === 1, `kurikulum panel: ${JSON.stringify(r.kur.panelAktif)}`)

  // Silabus
  const silabusHref = await page.evaluate(() => document.querySelector('.syllabus a.btn').href)
  const res = await ctx.request.get(silabusHref)
  r.silabus = { href: silabusHref, download: await page.evaluate(() => document.querySelector('.syllabus a.btn').hasAttribute('download')), status: res.status(), type: res.headers()['content-type'] }
  check(r.silabus.download && r.silabus.status === 200 && /pdf/.test(r.silabus.type ?? ''), `silabus: ${JSON.stringify(r.silabus)}`)
  await page.evaluate(() => document.querySelector('.syllabus a.btn').addEventListener('click', (e) => e.preventDefault(), { once: true }))
  await page.locator('.syllabus a.btn').click()
  check((await events(page)).some((e) => e.event === 'download_syllabus'), 'silabus: event download_syllabus tidak terkirim')

  // 5. Tools
  await page.locator('#tools').scrollIntoViewIfNeeded()
  const toolNames = () => page.evaluate(() => [...document.querySelectorAll('.tool h3')].map((e) => e.textContent))
  r.tools = { semua: (await toolNames()).length }
  await page.locator('.tool-filters .filter-chip', { hasText: 'Kategori A' }).click()
  await page.waitForTimeout(500)
  r.tools.kategoriA = (await toolNames()).length
  r.tools.status = await page.locator('#tools [role="status"]').innerText()
  const katA = await page.evaluate(() => [...document.querySelectorAll('.tool')].length)
  check(r.tools.semua === 8 && r.tools.kategoriA < 8 && r.tools.kategoriA > 0 && r.tools.status === `Menampilkan ${r.tools.kategoriA} alat`, `tools filter: ${JSON.stringify(r.tools)}`)
  check(katA === r.tools.kategoriA, 'tools: grid tidak disusun ulang')
  await page.locator('.tool-filters .filter-chip', { hasText: 'Semua' }).click()
  await page.waitForTimeout(500)
  r.tools.ikon = await page.evaluate(() => ({ svg: document.querySelectorAll('.tool__head svg').length, img: document.querySelectorAll('.tool img').length }))
  check(r.tools.ikon.svg === 8 && r.tools.ikon.img === 0, `tools ikon: ${JSON.stringify(r.tools.ikon)}`)
  // Klik sel: memilih modul terkait dan menggulung ke Kurikulum
  await page.locator('.tool', { hasText: 'Nama tool 3' }).locator('h3').click()
  await settle(page)
  r.tools.klikSel = { tab: await activeTab(), hash: await page.evaluate(() => location.hash), judul: await headingTop(page, '#kurikulum h2') }
  check(r.tools.klikSel.tab === 'kurikulum-modul-3' && r.tools.klikSel.hash === '#kurikulum-modul-3' && Math.abs(r.tools.klikSel.judul - 96) <= 3, `tools klik sel: ${JSON.stringify(r.tools.klikSel)}`)

  // 6. Skills & Output
  await page.locator('#skill-output').scrollIntoViewIfNeeded()
  const rows = () => page.evaluate(() => [...document.querySelectorAll('.skills-table tbody tr')].map((tr) => tr.querySelector('th').textContent))
  r.skills = { semua: await rows() }
  await page.locator('.skills-filters .filter-chip', { hasText: 'Hard skill' }).click()
  await page.waitForTimeout(500)
  r.skills.hard = (await rows()).length
  await page.locator('.skills-filters .filter-chip', { hasText: 'Soft skill' }).click()
  await page.waitForTimeout(500)
  r.skills.soft = (await rows()).length
  r.skills.status = await page.locator('#skill-output [role="status"]').innerText()
  check(r.skills.semua.length === 5 && r.skills.hard === 3 && r.skills.soft === 2 && r.skills.status === 'Menampilkan 2 skill', `skills filter: ${JSON.stringify(r.skills)}`)
  r.skills.tabel = await page.evaluate(() => ({ caption: !!document.querySelector('.skills-table caption'), th: document.querySelectorAll('.skills-table thead th[scope="col"]').length, takehome: document.querySelectorAll('.takehome li').length }))
  check(r.skills.tabel.caption && r.skills.tabel.th === 3 && r.skills.tabel.takehome === 4, `skills tabel: ${JSON.stringify(r.skills.tabel)}`)
  await page.locator('.skills-filters .filter-chip', { hasText: 'Semua' }).click()
  await page.waitForTimeout(500)
  await page.locator('.skill__module').first().click()
  await settle(page)
  r.skills.klikModul = { tab: await activeTab(), judul: await headingTop(page, '#kurikulum h2') }
  check(r.skills.klikModul.tab === 'kurikulum-modul-2' && Math.abs(r.skills.klikModul.judul - 96) <= 3, `skills klik modul: ${JSON.stringify(r.skills.klikModul)}`)

  r.axe = await axe(page)
  check(r.axe.length === 0, `axe 1440: ${r.axe}`)
  r.errors = errors
  check(errors.length === 0, `console: ${errors}`)
  report.desktop1440 = r
  await ctx.close()
}

/* ================= Hash modul saat dimuat ================= */
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 } }, `${PATH}#kurikulum-modul-3`)
  await page.waitForTimeout(500)
  const r = await page.evaluate(() => ({ tab: document.querySelector('[role="tab"][aria-selected="true"]')?.id, hash: location.hash }))
  r.aktif = await page.evaluate(() => document.querySelector('nav[aria-label="Daftar isi halaman"] [aria-current="location"]')?.getAttribute('data-toc-id'))
  report.hashModul = r
  check(r.tab === 'kurikulum-modul-3' && r.hash === '#kurikulum-modul-3' && r.aktif === 'kurikulum', `hash modul: ${JSON.stringify(r)}`)
  await ctx.close()
}

/* ================= Mobile 390 ================= */
{
  const { ctx, page, errors } = await open({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  const r = {}
  r.overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  check(r.overflow === 0, `overflow 390: ${r.overflow}`)

  // Hero: H1, subhead, dua tombol terlihat tanpa scroll (di bawah navbar + switcher)
  r.heroLipatan = await page.evaluate(() => {
    const b = (s) => Math.round(document.querySelector(s).getBoundingClientRect().bottom)
    return { h1: b('.hero__copy h1'), lead: b('.hero__lead'), tombol: b('.hero__actions'), viewport: innerHeight }
  })
  check(r.heroLipatan.tombol <= r.heroLipatan.viewport, `hero mobile: tombol di ${r.heroLipatan.tombol}px`)
  r.summary = await page.evaluate(() => [...document.querySelectorAll('.summary__rows > div')].filter((e) => e.offsetParent).map((e) => e.querySelector('dt').textContent))
  check(r.summary.join() === 'Durasi,Batch berikutnya', `hero mobile ringkasan: ${r.summary}`)
  r.strip = await page.evaluate(() => ({ tabindex: document.querySelector('.proof').getAttribute('tabindex'), geser: document.querySelector('.proof').scrollWidth > document.querySelector('.proof').clientWidth }))
  check(r.strip.tabindex === '0' && r.strip.geser, `strip mobile: ${JSON.stringify(r.strip)}`)

  // PAS ditumpuk
  r.pas = await page.evaluate(() => [...document.querySelectorAll('#masalah-solusi .pillar')].map((e) => Math.round(e.getBoundingClientRect().left)))
  check(new Set(r.pas).size === 1, `pas mobile tidak bertumpuk: ${r.pas}`)

  // Curriculum akordeon
  await page.locator('#kurikulum').scrollIntoViewIfNeeded()
  r.akordeon = await page.evaluate(() => ({ tab: document.querySelectorAll('[role="tab"]').length, tombol: [...document.querySelectorAll('.mods--accordion .mod__head')].map((b) => b.getAttribute('aria-expanded')) }))
  check(r.akordeon.tab === 0 && r.akordeon.tombol[0] === 'true' && r.akordeon.tombol.slice(1).every((x) => x === 'false'), `akordeon awal: ${JSON.stringify(r.akordeon)}`)
  await page.locator('#kurikulum-modul-3').click()
  await page.waitForTimeout(300)
  r.akordeon.setelahKlik = await page.evaluate(() => [...document.querySelectorAll('.mods--accordion .mod__head')].map((b) => b.getAttribute('aria-expanded')))
  check(r.akordeon.setelahKlik.join() === 'false,false,true,false,false,false', `akordeon klik: ${r.akordeon.setelahKlik}`)

  // Tools 2 kolom, Skills ditumpuk
  await page.locator('#tools').scrollIntoViewIfNeeded()
  r.toolsKolom = await page.evaluate(() => getComputedStyle(document.querySelector('.tools-grid')).gridTemplateColumns.split(' ').length)
  check(r.toolsKolom === 2, `tools mobile kolom: ${r.toolsKolom}`)
  await page.locator('#skill-output').scrollIntoViewIfNeeded()
  r.skills = await page.evaluate(() => ({ tabel: !!document.querySelector('.skills-table'), tumpuk: document.querySelectorAll('.skills-stack > li').length, takehome: getComputedStyle(document.querySelector('.takehome')).gridTemplateColumns.split(' ').length }))
  check(!r.skills.tabel && r.skills.tumpuk === 5 && r.skills.takehome === 1, `skills mobile: ${JSON.stringify(r.skills)}`)

  // Target sentuh di section 1 sampai 6
  r.targetKecil = await page.evaluate(() => {
    const out = []
    for (const el of document.querySelectorAll('#ringkasan a, #ringkasan button, #masalah-solusi a, #kenapa-kami a, #kurikulum a, #kurikulum button, #tools a, #tools button, #skill-output a, #skill-output button')) {
      if (el.closest('[inert],[hidden]')) continue
      const b = el.getBoundingClientRect()
      if (b.width === 0 || b.height === 0) continue
      const ext = el.matches('.btn--md, .filter-chip, .quick-chip')
      if (!ext && b.height < 44) out.push(`${el.className || el.tagName} "${(el.textContent ?? '').trim().slice(0, 20)}" ${Math.round(b.width)}x${Math.round(b.height)}`)
    }
    return [...new Set(out)]
  })

  r.axe = await axe(page)
  check(r.axe.length === 0, `axe 390: ${r.axe}`)
  r.errors = errors
  check(errors.length === 0, `console 390: ${errors}`)
  report.mobile390 = r
  await ctx.close()
}

/* ================= Tablet 768 ================= */
{
  const { ctx, page } = await open({ viewport: { width: 768, height: 1024 }, hasTouch: true, isMobile: true })
  const r = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth - innerWidth, tabel: !!document.querySelector('.skills-table'), akordeon: !!document.querySelector('.mods--accordion') }))
  r.axe = await axe(page)
  report.tablet768 = r
  check(r.overflow === 0 && r.tabel && r.akordeon && r.axe.length === 0, `tablet: ${JSON.stringify(r)}`)
  await ctx.close()
}

await browser.close()
console.log(JSON.stringify(report, null, 1))
console.log(problems.length ? `\nMASALAH (${problems.length}):\n- ${problems.join('\n- ')}` : '\nSEMUA CEK LOLOS')
process.exitCode = problems.length ? 1 : 0
