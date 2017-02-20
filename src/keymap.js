const winston = require('winston');
const globalShortcut = require('electron').globalShortcut;

const initializeKeymap = (keymap) => {
  keymap.forEach((x) => {
    if (!x.shortcut || !x.function) {
      winston.info(`Keeptron: Shortcut ${x.shortcut} not registered for function ${x.function}`);
      return;
    }
    const ret = globalShortcut.register(x.shortcut, x.function);

    if (ret && globalShortcut.isRegistered(x.shortcut)) {
      winston.info(`Keeptron: Shortcut ${x.shortcut} registered properly`);
    } else {
      winston.info(`Keeptron: Shortcut ${x.shortcut} not registered`);
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
