const winston = require('winston');
const globalShortcut = require('electron').globalShortcut;

const initializeKeymap = (keymap) => {
  keymap.forEach((item) => {
    if (!item.shortcut || !item.function) {
      winston.log(`Keeptron: Shortcut ${item.shortcut} not registered for function ${item.function}`);
      return;
    }
    const ret = globalShortcut.register(item.shortcut, item.function);

    if (ret && globalShortcut.isRegistered(item.shortcut)) {
      winston.log(`Keeptron: Shortcut ${item.shortcut} registered properly`);
    } else {
      winston.log(`Keeptron: Shortcut ${item.shortcut} not registered`);
    }
  });
};

exports.init = function (mb) {
  mb.app.on('ready', () => {
    initializeKeymap([{
      shortcut: 'CommandOrControl+Alt+K',
      function: mb.showWindow,
    }]);
  });

  mb.on('after-show', () => {
    globalShortcut.register('Esc', mb.hideWindow);
  });

  mb.on('after-hide', () => {
    globalShortcut.unregister('Esc');
  });

  mb.app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });
};
