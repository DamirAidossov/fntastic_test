
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    frame: false,
    
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
ipcMain.on("minimize", function(event, arg) {
  let w = BrowserWindow.getFocusedWindow()
  w.minimize()
});
ipcMain.on("maximize", function(event, arg) {
  let w = BrowserWindow.getFocusedWindow()
  if(w.isMaximized()){
    w.unmaximize()
  } else {
    w.maximize();
  }
});
ipcMain.on("close", function(event, arg) {
  let w = BrowserWindow.getFocusedWindow()
  w.close();
});