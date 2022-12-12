const pup = require('puppeteer');

const elTeamName = document.querySelector('.team-name');

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
      return `HTML Error - ${err}`;
    }

    try {
    const teamName = await page.evaluate((el) => el.querySelector("h2 > span").textContent, info)
    elTeamName.textContent = teamName;
    console.log(teamName);
  } catch(err) {
    return `Not found team name - ${err}`
  }
  }

  

  console.log(statsData)

})();