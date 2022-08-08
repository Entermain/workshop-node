const puppeteerI = require("puppeteer");

(async () => {
  const browser = await puppeteerI.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://static.wikia.nocookie.net/memes-pedia/images/7/74/This_Is_Fine.png/revision/latest?cb=20170101154622&path-prefix=es"
  );
  await page.waitForTimeout(10000);
  await page.screenshot({ path: "fine.png" });

  await browser.close();
})();
