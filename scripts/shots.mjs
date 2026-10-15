// Tangkapan elemen untuk tinjauan visual: node scripts/shots.mjs <outDir>
import { chromium } from 'playwright-core'
import { join } from 'node:path'

const out = process.argv[2] ?? 'verify-out'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME, headless: true })

async function shoot(width, height, selector, name) {
  const ctx = await browser.newContext({ viewport: { width, height }, hasTouch: width < 1024 })
  const page = await ctx.newPage()
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const el = page.locator(selector).first()
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500) // coretan hero selesai digambar
  await el.screenshot({ path: join(out, name) })
  await ctx.close()
}

await shoot(1440, 900, '.stage', 'stage-1440.png')
await shoot(1440, 900, '#mentor', 'mentor-1440.png')
await shoot(390, 844, '.stage', 'stage-390.png')
await shoot(390, 844, '#mentor', 'mentor-390.png')
await shoot(390, 844, '#cara-belajar', 'learn-390.png')
await shoot(1440, 900, '#program', 'program-1440.png')
await shoot(1440, 900, '#karya', 'karya-1440.png')
await shoot(1440, 900, '#cara-belajar', 'learn-1440.png')
await browser.close()
