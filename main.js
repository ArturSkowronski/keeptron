const electron = require('electron')

require('electron-reload')(__dirname);
var ipc = electron.ipcMain;

// Module to control application life.
const app = electron.app
const globalShortcut = electron.globalShortcut
// Module to create native browser window.
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const menubar = require('menubar')

const mb = menubar(
  {
    width: 400, 
    height: 600,
    icon: __dirname + '/assets/keep.png',
    preloadWindow: true
    }
)
// console.log(menubar)
// mb.window.loadURL(`https://keep.google.com/`)
mb.on('ready', function ready () {
  // console.log(mb)

  // your app code here
})
mb.on('after-create-window', function ready () {
  mb.window.focus();
  // your app code here
})



mb.app.on('ready', () => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Alt+K', () => {
    mb.showWindow()
  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 200, height: 600, frame: false, icon: __dirname + '/assets/icon.ico'})

  // and load the index.html of the app.
  mainWindow.loadURL(`https://keep.google.com/`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null

  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

mb.app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
