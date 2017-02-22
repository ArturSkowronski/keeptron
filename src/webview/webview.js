const shell = require('electron').shell;
const url = require('url');

const openLinkInNewWindow = (e) => {
  const protocol = url.parse(e.url).protocol;
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url);
  }
};

const webview = document.getElementById('keep-webview');
webview.addEventListener('new-window', openLinkInNewWindow);
