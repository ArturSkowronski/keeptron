const mb = require('./src/menuBar.js').mb;
const config = require('./src/configuration.js').config;

const Keymap = require('./src/keymap.js');
const Clipboard = require('./src/clipboard.js');
const Tray = require('./src/tray.js');
const { ipcMain } = require('electron');
const AutoLaunch = require('auto-launch');

const DebugMode = require('electron-debug');

const PLATFORM_OSX = 'darwin';

DebugMode({ showDevTools: false });

// Autostart.init(mb);
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
mb.on('after-create-window', () => {

ipcMain.on('handle-autolaunch', (event, arg) => {
  console.log(arg);
    const appPath = `${mb.app.getPath('exe').split('.app/Content')[0]}.app`;

    const keeptronAutostart = new AutoLaunch({
      name: mb.app.getName(),
      path: appPath,
    });

    keeptronAutostart.isEnabled()
            .then((isEnabled) => {
              if (isEnabled) {
                console.log('diasable');
                keeptronAutostart.disable();
              } else {
                console.log('enable');
                keeptronAutostart.enable();
              }
            })
            .catch((err) => {
                // winston.err(err);
            });
  });
});
