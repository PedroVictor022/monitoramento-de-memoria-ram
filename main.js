const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("path");

let tray;

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

  // const icon = nativeImage.createFromPath("assets/power-bi.svg");
  tray = new Tray(icon);
  // Icons in navbar w11
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio", checked: true },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip("This is my app");
  tray.setTitle("This is my title");

  app.do;
});

// Custom app from taskbar
app.setUserTasks([
  {
    program: process.execPath,
    arguments: "--new-window",
    iconPath: process.execPath,
    iconIndex: 0,
    title: "New Window teste 1",
    description: "TEST create a new window",
  },
]);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
