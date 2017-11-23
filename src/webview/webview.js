const fs = require('fs');
const shell = require('electron').shell;
const url = require('url');

const webview = document.getElementById('keep-webview');

const openLinkInNewWindow = (e) => {
  const protocol = url.parse(e.url).protocol;
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url);
  }
};

function loadCSS(stylesheet) {
  fs.readFile(`${__dirname}/css/${stylesheet}.css`, 'utf-8', (error, data) => {
    if (!error) {
      webview.insertCSS(data.replace(/\s{2,10}/g, ' ').trim());
    }
  });
}

// Event Handlers
webview.addEventListener('new-window', () => openLinkInNewWindow());
webview.addEventListener('dom-ready', () => {
  loadCSS('webview');
  loadCSS('font-awesome');
  webview.openDevTools();
});
