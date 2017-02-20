const PLATFORM_OSX = 'darwin';
const Tray = require('electron').Tray;

function handleOSX(config) {
  const appIcon = new Tray(config.keepTemplate);
  appIcon.setPressedImage(config.keepHighlight);
}

function appIconHandler(config) {
  if (config.platform === PLATFORM_OSX) {
    handleOSX(config);
  }
}

exports.init = (mb, config) => {
  mb.app.on('ready', () => {
    appIconHandler(config);
  });
};
