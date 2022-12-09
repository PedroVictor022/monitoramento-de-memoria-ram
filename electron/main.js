const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const pup = require('puppeteer');

const path = require("path");

let tray;

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

 
  // Icons in navbar w11
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: "Item1", type: "radio", checked: true },
  // ]);

  // tray.setContextMenu(contextMenu);
  // tray.setToolTip("This is my app");
  // tray.setTitle("This is my title");

});

// Custom app from taskbar
// app.setUserTasks([
//   {
//     program: process.execPath,
//     arguments: "--new-window",
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: "New Window teste 1",
//     description: "TEST create a new window",
//   },
// ]);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Target: 'https://www.fctables.com/teams/real-madrid-192583/'
let url = 'https://www.fctables.com/teams/real-madrid-192583/';
const saveData = [];
const log = (text) => console.log(text);

(
  async() => {
    // init browser
    const browser = await pup.launch({
      headless: true,
    });
    const page = await browser.newPage();

    log("Browser starts");
    await page.goto(url);

    await Promise.all([
      page.waitForSelector()
    ])

    const title = await page.$(".box-width > h1")
    console.log(title);

    setInterval(() => {
      browser.close();
    }, 3000)

  }
)();