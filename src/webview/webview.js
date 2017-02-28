const fs = require('fs');
const shell = require('electron').shell;
const url = require('url');

const openLinkInNewWindow = (e) => {
  const protocol = url.parse(e.url).protocol;
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url);
  }
};

const webview = document.getElementById('keep-webview');
// Event Handlers
webview.addEventListener('new-window', () => openLinkInNewWindow());
webview.addEventListener('dom-ready', () => {
  fs.readFile(`${__dirname}/css/webview.css`, 'utf-8', (error, data) => {
    if (!error) {
      const formatedData = data.replace(/\s{2,10}/g, ' ').trim();
      webview.insertCSS(formatedData);
    }
  });
});
