const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.demoblaze.com', {waitUntil:'domcontentloaded', timeout: 60000});
  await page.click('#cartur');
  await page.waitForSelector('button:has-text("Place Order")', {timeout: 15000});
  console.log('placeOrder visible', await page.locator('button:has-text("Place Order")').isVisible());
  await page.click('button:has-text("Place Order")');
  await page.waitForTimeout(5000);
  const name = page.locator('#name');
  console.log('name exists', await name.count());
  console.log('name visible', await name.isVisible());
  console.log('name outerHTML', await name.evaluate(el => el.outerHTML));
  const modal = page.locator('#orderModal');
  console.log('modal count', await modal.count());
  console.log('modal visible', await modal.isVisible());
  try {
    console.log('modal outerHTML', (await modal.evaluate(el => el.outerHTML)).slice(0,500));
  } catch (e) {
    console.log('modal outerHTML err', e.message);
  }
  await browser.close();
})();
