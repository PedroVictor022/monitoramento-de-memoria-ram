const path =  require('path');
const { app, BrowserWindow } = require("electron");

const createNewWindow = () => {
  const window = new BrowserWindow({
    width: 750,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  window.loadFile("index.html");

  //! BUG DOWN
  // window.addEventListener("DOMContentLoaded", () => {
  //   const replaceText = (selector, text) => {
  //     const el = document.getElementById(selector);
  //     if (el) el.innerText = text;
  //   };
  //   for (const dependency of ["chrome", "node", "electron"]) {
  //     replaceText(`${dependency}-version`, process.versions[dependency]);
  //   }
  // });
};

app.whenReady().then(() => {
  createNewWindow();

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }

    if (BrowserWindow.getAllWindows().length === 0) createNewWindow();
  });
});

console.log(`Hello from Electron`);
