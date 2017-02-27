const winston = require('winston');
const AutoLaunch = require('auto-launch');

exports.handle = function (mb) {
  mb.on('after-create-window', () => {
    const appPath = `${mb.app.getPath('exe').split('.app/Content')[0]}.app`;

    const keeptronAutostart = new AutoLaunch({
      name: mb.app.getName(),
      path: appPath,
    });

    keeptronAutostart.isEnabled()
        .then((isEnabled) => {
          if (isEnabled) {
            keeptronAutostart.disable();
          }
          keeptronAutostart.enable();
        })
        .catch((err) => {
          winston.err(err);
        });
  });
};

