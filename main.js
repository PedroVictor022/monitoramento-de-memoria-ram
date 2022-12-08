const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

// Load this index.html
const createWindow = () => {
  const win = new BrowserWindow({
    width: 700,
    height: 600,
    webPreferences: path.join(__dirname, "preload.js"),
  });
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Item1',
      type: 'radio',
      checked: true
    }
  ])

  // ! Bug in line below
  // const tray = new Tray(path.resolve(__dirname, "assets", "power-bi.svg"));
  // tray.setToolTip('This is my application');
  // tray.setContextMenu(contextMenu);

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
