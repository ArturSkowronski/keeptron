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
  webview.insertCSS('.modalDialog {position: fixed;font-family: Arial, Helvetica, sans-serif;top: 0;right: 0;bottom: 0;left: 0;background: rgba(0,0,0,0.8);z-index: 99999;opacity:0;-webkit-transition: opacity 400ms ease-in;-moz-transition: opacity 400ms ease-in;transition: opacity 400ms ease-in;pointer-events: none;}');
  webview.insertCSS('.modalDialog:target {opacity:1;pointer-events: auto;}.modalDialog > div {width: 200px;position: relative;margin: 10% auto;padding: 5px 20px 13px 20px;border-radius: 10px;background: #fff;}');
  // webview.openDevTools();
};

// Event Handlers
webview.addEventListener('new-window', openLinkInNewWindow);
webview.addEventListener('dom-ready', hideElements);