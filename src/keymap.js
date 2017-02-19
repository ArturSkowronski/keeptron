'use strict';

const winston = require('winston');

exports.initializeKeymap = (globalShortcut, keymap) => {

    keymap.forEach((x) => {
        if (!x.shortcut || !x.function) {
            winston.info(`Keeptron: Shortcut ${x.shortcut} not registered for function ${x.function}`);
            return;
        }
        const ret = globalShortcut.register(x.shorcut, x.function);

        if (ret && globalShortcut.isRegistered(x.shortcut)) {
            winston.info(`Keeptron: Shortcut ${x.shortcut} registered properly`);
        } else {
            winston.info(`Keeptron: Shortcut ${x.shortcut} not registered`);
        }

    });
};
