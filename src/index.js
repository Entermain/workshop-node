var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteerI = require("puppeteer");
(() => __awaiter(this, void 0, void 0, function* () {
    const browser = yield puppeteerI.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto("https://static.wikia.nocookie.net/memes-pedia/images/7/74/This_Is_Fine.png/revision/latest?cb=20170101154622&path-prefix=es");
    yield page.waitForTimeout(10000);
    yield page.screenshot({ path: "fine.png" });
    yield browser.close();
}))();
