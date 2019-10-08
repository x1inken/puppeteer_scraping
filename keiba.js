const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100
  });
  const page = await browser.newPage();
  await page.goto('https://db.netkeiba.com/?pid=race_search_detail');
  await page.type('select[name="start_year"]', '2019');
  await page.type('select[name="start_mon"]', '1');
  await page.type('select[name="end_year"]', '2019');
  await page.type('select[name="end_mon"]', '12');
  await page.click('.search_detail_submit input[type="submit"]');

  await page.waitForSelector('#contents_liquid');

  const d = await page.$$eval('#contents_liquid table tr', list => {
      let trs = [];
      for(let i=0; i < list.length; i++){
          let data = {
              text : list[i].textContent,
              html: list[i].innerHTML
          };
          trs.push(data);
      }
      return trs;
  })

  console.log(d);

  await browser.close();
})();