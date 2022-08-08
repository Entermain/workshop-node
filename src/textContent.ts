const puppeteerTC = require("puppeteer");
const fsTC = require("fs");

let textContent = async () => {
  const browser = await puppeteerTC.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.mdpi.com/1999-4915/13/12/2360");
  let grabElementsTC = await page.evaluate(() => {
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

  await browser.close();
  console.log(grabElementsTC);
  let resultJson = JSON.stringify(grabElementsTC, null, 2);
  fsTC.writeFile("test.json", resultJson, "utf8", (err) => {
    !err ? console.log("Todo bien") : console.log(err);
  });
};

textContent();
