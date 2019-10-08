const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.mizuhobank.co.jp/retail/takarakuji/numbers/numbers4/index.html',{
      waitUntil: 'networkidle0'
  });
  
  const tables = await page.$$("table.typeTK");
  const d = await Promise.all(tables.map(async table => {
      const t = (await (await table.getProperty("textContent")).jsonValue()).trim();
      const ts = t.split("\n");
      return {
          kai: ts[1],
          date: ts[7],
          hit: ts[11],
          st: ts[15],
          st_price: ts[16],
          box: ts[20],
          box_price: ts[21],
          set_st: ts[25],
          set_st_price: ts[26],
          set_box: ts[30],
          set_box_price: ts[31],
          allprice: ts[35]
      }
  }))

  console.log(d);

  await browser.close();
})();