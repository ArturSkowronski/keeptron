const mb = require('./src/menuBar.js').mb;
const config = require('./src/configuration.js').config;

const Keymap = require('./src/keymap.js');
const Autostart = require('./src/autostart');
const Clipboard = require('./src/clipboard.js');
const Tray = require('./src/tray.js');

const DebugMode = require('electron-debug');

const PLATFORM_OSX = 'darwin';

DebugMode({ showDevTools: false });

Autostart.init(mb);
Keymap.init(mb);
Clipboard.init(mb);
Tray.init(mb, config);

mb.on('after-create-window', () => {
  mb.window.focus();
});

mb.app.on('window-all-closed', () => {
  if (config.process !== PLATFORM_OSX) {
    mb.app.quit();
  }
});
