const { app, BrowserWindow, Tray, Menu } = require("electron");

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
      nodeIntegration: true,
      contextIsolation: false,
      preload:  path.join(__dirname, "preload.js"),
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

