const { app, BrowserWindow, Tray, Menu, ipcMain, globalShortcut } = require("electron");

let win;

function createWindow() {
  const win = new BrowserWindow({
    width: 280,
    height: 300,
    // transparent: true,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInSubFrames: true,
      devTools: true
    },
    
  });

  win.loadFile('index.html');
}

app.whenReady()
  .then(createWindow)

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

