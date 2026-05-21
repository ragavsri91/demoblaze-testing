const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.demoblaze.com');
  console.log('title', await page.title());
  console.log('login2 exists', await page.$('#login2') !== null);
  console.log('signup2 exists', await page.$('#signin2') !== null);
  console.log('contact text exists', await page.$('text=Contact') !== null);
  const buttons = await page.$$eval('button, a', els => els.filter(e => e.innerText.trim()).map(e => ({tag: e.tagName, text: e.innerText.trim(), id: e.id, onclick: e.getAttribute('onclick')})).slice(0,50));
  console.log('sample buttons', JSON.stringify(buttons, null, 2));
  await browser.close();
})();
