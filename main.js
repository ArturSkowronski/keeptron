const electron = require('electron');
const MenuBar = require('menubar');
const { Menu, Tray } = require('electron');
const AutoLaunch = require('auto-launch');
const MenuTemplate = require('./src/clipboard.js').template;
const Keymap = require('./src/keymap.js');
const winston = require('winston');
const platform = require('os').platform();

require('electron-debug')({ showDevTools: false });

let trayImage;
const imageFolder = `${__dirname}/assets`;
const PLATFORM_OSX = 'darwin';


if (platform === PLATFORM_OSX) {
  trayImage = `${imageFolder}/keepTemplate.png`;
}

const menuBarConfiguration = {
  width: 400,
  height: 600,
  icon: `${__dirname}/assets/keepTemplate.png`,
  preloadWindow: false,
};

const mb = MenuBar(menuBarConfiguration);

mb.on('after-create-window', () => {
  mb.window.focus();
  const appPath = `${mb.app.getPath('exe').split('.app/Content')[0]}.app`;

  const keeptronAutostart = new AutoLaunch({
    name: mb.app.getName(),
    path: appPath,
  });

  keeptronAutostart.enable().then((isEnabled) => {
    winston.info(isEnabled);
  });

  keeptronAutostart.isEnabled()
    .then((isEnabled) => {
      winston.info(isEnabled);
      if (isEnabled) {
        return;
      }
      keeptronAutostart.enable();
    })
    .catch((err) => {
      winston.err(err);
    });
});

mb.app.on('ready', () => {
  const appIcon = new Tray(trayImage);

  if (platform === PLATFORM_OSX) {
    appIcon.setPressedImage(`${imageFolder}/keepHighlight.png`);
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(MenuTemplate(mb.app)));
  Keymap.initializeKeymap(electron.globalShortcut, [{ shortcut: 'CommandOrControl+Alt+K', function: mb.showWindow }]);
});

mb.on('after-show', () => {
  electron.globalShortcut.register('Esc', mb.hideWindow);
});

mb.on('after-hide', () => {
  electron.globalShortcut.unregister('Esc');
});

mb.app.on('window-all-closed', () => {
  if (process.platform !== PLATFORM_OSX) {
    mb.app.quit();
  }
});

mb.app.on('will-quit', () => {
  electron.globalShortcut.unregisterAll();
});
