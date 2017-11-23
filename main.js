const mb = require('./src/menuBar.js').mb;
const config = require('./src/configuration.js').config;

const Keymap = require('./src/keymap.js');
const Clipboard = require('./src/clipboard.js');
const Tray = require('./src/tray.js');
const { ipcMain } = require('electron');
const AutoLaunch = require('auto-launch');

const DebugMode = require('electron-debug');

const PLATFORM_OSX = 'darwin';
const IPC_AUTOLAUNCH_EVENT = 'handle-autolaunch';

DebugMode({ showDevTools: false });

Keymap.init(mb);
Clipboard.init(mb);
Tray.init(mb, config);

// IPC Handlers
mb.on('after-create-window', () => {
	ipcMain.on(IPC_AUTOLAUNCH_EVENT, (event, arg) => AutoLaunch.handle(mb, event, arg));
});


mb.on('after-create-window', () => {
	mb.window.focus();
});

mb.app.on('window-all-closed', () => {
	if (config.process !== PLATFORM_OSX) {
		mb.app.quit();
	}
});
