const pup = require('puppeteer');

(async() => {
  const statsData = [];
  const browser = await pup.launch({
    headless: true,
    defaultViewport: false,
  })

  const page = await browser.newPage();
  console.log('Browser start');

  await page.goto("https://www.fctables.com/teams/atletico-mg-180615/");

  const teamInfo = await page.$$("#team-info");

  for(const info of teamInfo) {
    try {
      const allInfos = await page.evaluate((el) => el.innerText, info);
      statsData.push(allInfos);
    } catch(err) {
      return `Error - ${err}`;
    }
  }

  console.log(statsData);

})();