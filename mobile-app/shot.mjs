import { chromium } from 'playwright';
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ executablePath: EXE });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
for (const [path, name] of [['/', 'home'], ['/dashboard', 'dashboard'], ['/day/12', 'day12']]) {
  await page.goto('http://localhost:4173' + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2600);
  // full-page screenshot of top of page
  await page.screenshot({ path: '/tmp/' + name + '-top.png' });
  // scroll down a bit for landing/dashboard to show below the fold
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/' + name + '-below.png' });
}
await browser.close();
console.log('done');
