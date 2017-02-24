const shell = require('electron').shell;
const url = require('url');

const webview = document.getElementById('keep-webview');

const openLinkInNewWindow = (e) => {
  const protocol = url.parse(e.url).protocol;
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url);
  }
};

const hideElements = () => {
  webview.insertCSS('.gb_7b{display:none!important}');
};

// Event Handlers
webview.addEventListener('new-window', openLinkInNewWindow);
webview.addEventListener('dom-ready', hideElements);
