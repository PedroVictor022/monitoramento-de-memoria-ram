const { app, BrowserWindow, Tray, Menu } = require("electron");

const pup = require('puppeteer');
const path = require("path");

let tray = null;

// Load this index.html
const createWindow = () => {
  const win = new BrowserWindow({
    width: 700,
    height: 600,
    // resizable: false,
    frame: true,
    webPreferences: {
      preload:  path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
  });
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  tray = new Tray('/assets/computer.png')
  const contextMenu = Menu.buildFromTemplate([
     { label: 'Item1', type: 'radio' },
  ])

  tray.setToolTip('This is my application');
  tray.setContextMenu(contextMenu);

});



app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

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