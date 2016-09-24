const electron = require('electron')
const menubar = require('menubar')
const {Menu} = require('electron')
require('electron-reload')(__dirname);
require('electron-debug')({showDevTools: false});

const MenuTemplate = require('./src/clipboard.js').template
const Keymap = require('./src/keymap.js')
const ipc = electron.ipcMain;

const menuBarConfiguration = {
    width: 400, 
    height: 600,
    icon: __dirname + '/assets/keep.png',
    preloadWindow: true
}

const mb = menubar(menuBarConfiguration)

mb.on('after-create-window', function ready () {
  mb.window.focus();
})

mb.app.on('ready', () => {
 
  Menu.setApplicationMenu(Menu.buildFromTemplate(MenuTemplate(mb.app)));
  Keymap.initializeKeymap(electron.globalShortcut, 
    [{shorcut: 'CommandOrControl+Alt+K', function: mb.showWindow}]
  )
})

mb.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    mb.app.quit()
  }
})

mb.app.on('will-quit', () => {
  electron.globalShortcut.unregisterAll()
})