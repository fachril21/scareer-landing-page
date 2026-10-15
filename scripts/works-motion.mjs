// Mengukur gerak akordeon karya: lebar kolom 2 dan opasitas deskripsi tiap ~60 ms setelah hover.
import { chromium } from 'playwright-core'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.locator('#karya').scrollIntoViewIfNeeded()
await page.waitForTimeout(600)
const box = await page.locator('.accordion__col').nth(1).boundingBox()
await page.mouse.move(box.x + box.width / 2, box.y + 150)
const samples = []
for (let i = 0; i < 12; i++) {
  samples.push(await page.evaluate(() => {
    const col = document.querySelectorAll('.accordion__col')[1]
    const desc = col.querySelector('.work__desc')
    return [Math.round(col.getBoundingClientRect().width), Number(getComputedStyle(desc).opacity).toFixed(2)]
  }))
  await page.waitForTimeout(60)
}
console.log(JSON.stringify(samples))
await page.screenshot({ path: process.argv[2], clip: { x: 0, y: box.y - 20, width: 1440, height: 470 } })
await browser.close()
