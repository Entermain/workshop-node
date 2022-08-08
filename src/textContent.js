var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteerTC = require("puppeteer");
const fsTC = require("fs");
let textContent = () => __awaiter(this, void 0, void 0, function* () {
    const browser = yield puppeteerTC.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto("https://www.mdpi.com/1999-4915/13/12/2360");
    let grabElementsTC = yield page.evaluate(() => {
        let textContents = {};
        let title = document
            .querySelector(".title.hypothesis_container")
            .textContent.trim()
            .replace(/\s+/g, " ");
        let authors = document
            .querySelector(".art-authors.hypothesis_container")
            .textContent.trim()
            .replace(/\s+/g, " ");
        let affiliation = document
            .querySelector(".art-affiliations")
            .textContent.trim()
            .replace(/\s+/g, " ");
        textContents["title"] = title;
        textContents["authors"] = authors;
        textContents["affiliations"] = affiliation;
        return textContents;
    });
    yield browser.close();
    console.log(grabElementsTC);
    let resultJson = JSON.stringify(grabElementsTC, null, 2);
    fsTC.writeFile("test.json", resultJson, "utf8", (err) => {
        !err ? console.log("Todo bien") : console.log(err);
    });
});
textContent();
