const { ipcRenderer } = require('electron');

const toElement = function (document, html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
};

const IPC_AUTOLAUNCH_EVENT = 'handle-autolaunch';

window.onload = function () {
  const bodyDOM = document.querySelector('body');

  const settingsNode = toElement(document, '<button class="fab"><a class="settings-icon" href="#openModal"><svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></a></button>');
  const modalNode = toElement(document, '<div id="openModal" class="modalDialog"> <div><a href="#close" title="Close" class="close">X</a> <label><p><h3>Settings</h3><input name="checkbox" type="checkbox" id="autolaunch-handler-input" /> Start with system</label></p></div> </div>');

  bodyDOM.insertBefore(settingsNode, bodyDOM.childNodes[0]);
  bodyDOM.insertBefore(modalNode, bodyDOM.childNodes[0]);

  const autolaunchHandlerEvent = document.getElementById('autolaunch-handler-input');

  autolaunchHandlerEvent.addEventListener('click', () => {
    ipcRenderer.send(IPC_AUTOLAUNCH_EVENT, autolaunchHandlerEvent.checked);
  });
};

