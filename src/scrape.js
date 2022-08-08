var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require("puppeteer");
const fs = require("fs");
let results = [];
let scrapingFunction = () => __awaiter(this, void 0, void 0, function* () {
    let urls = ["https://www.tematika.com/libros?limit=40&p=1"];
    for (let url of urls) {
        const browser = yield puppeteer.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto(url);
        let scraping = yield page.evaluate(() => {
            var _a;
            let contents = [];
            let items = Array.from(document.querySelectorAll(".products-grid li.item"));
            for (let item of items) {
                let itemResults = {};
                let titleElement = item.querySelector(".product-information .product-name");
                let title = titleElement === null || titleElement === void 0 ? void 0 : titleElement.innerText;
                let authorElement = item.querySelector(".product-information .author");
                let author = authorElement === null || authorElement === void 0 ? void 0 : authorElement.innerText;
                let priceElement = item.querySelector(".price-box .price");
                let price = priceElement === null || priceElement === void 0 ? void 0 : priceElement.innerText;
                let image = (_a = item
                    .querySelector(".product-image img")) === null || _a === void 0 ? void 0 : _a.getAttribute("src");
                itemResults["title "] = title;
                itemResults["author(s) "] = author;
                itemResults["price "] = price;
                itemResults["image "] = image;
                contents.push(itemResults);
            }
            return contents;
        });
        let getUrl = yield page.evaluate(() => {
            let UrlElement = document.querySelector(".next.i-next");
            let nextUrl = UrlElement.getAttribute("href");
            return nextUrl;
        });
        yield browser.close();
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
});
scrapingFunction();
