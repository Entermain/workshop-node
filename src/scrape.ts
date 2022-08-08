const puppeteer = require("puppeteer");
const fs = require("fs");

let results: {}[] = [];

let scrapingFunction = async () => {
  let urls: string[] = ["https://www.tematika.com/libros?limit=40&p=1"];
  for (let url of urls) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    let scraping = await page.evaluate(() => {
      let contents = [];
      let items = Array.from(
        document.querySelectorAll(".products-grid li.item")
      );
      for (let item of items) {
        let itemResults = {};
        let titleElement: HTMLElement = item.querySelector(
          ".product-information .product-name"
        );
        let title: string = titleElement?.innerText;
        let authorElement: HTMLElement = item.querySelector(
          ".product-information .author"
        );
        let author: string = authorElement?.innerText;
        let priceElement: HTMLElement = item.querySelector(".price-box .price");
        let price: string = priceElement?.innerText;

        let image: string = item
          .querySelector(".product-image img")
          ?.getAttribute("src");
        itemResults["title "] = title;
        itemResults["author(s) "] = author;
        itemResults["price "] = price;
        itemResults["image "] = image;

        contents.push(itemResults);
      }

      return contents;
    });

    let getUrl = await page.evaluate(() => {
      let UrlElement = document.querySelector(".next.i-next");
      let nextUrl = UrlElement.getAttribute("href");
      return nextUrl;
    });

    await browser.close();
    console.log(scraping);

    for (let content in scraping) {
      results.push(scraping[content]);
    }

    if (urls.length < 25) {
      urls.push(getUrl);
    }
  }
  let resultJson = JSON.stringify(results, null, 2);
  fs.writeFile("ejercicio1.json", resultJson, "utf8", (err) => {
    !err ? console.log("Todo bien") : console.log(err);
  });
};
scrapingFunction();
