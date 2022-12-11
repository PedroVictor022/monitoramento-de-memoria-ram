const { app, BrowserWindow } = require("electron");
const path = require('path');

let win;

function createWindow() {
  const win = new BrowserWindow({
    width: 280,
    height: 250,
    // transparent: true,
    resizable: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, '/computer.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInSubFrames: true,
      devTools: false
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

