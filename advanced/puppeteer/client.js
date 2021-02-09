const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://jsonplaceholder.typicode.com/todos");
  // await page.screenshot({ path: "json.png" });
  // const content = await page.content();
  // console.log(content);
  const body = await page.evaluate(() => {
    return document.querySelector("pre").innerText;
  });
  console.log(body);
  await browser.close();
})();
