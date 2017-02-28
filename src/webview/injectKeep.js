const { ipcRenderer } = require('electron');

const toElement = function (document, html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
};

const IPC_AUTOLAUNCH_EVENT = 'handle-autolaunch';


window.onload = function () {
  const bodyDOM = document.querySelector('body');
  const autolaunchHandlerEvent = document.getElementById('autolaunch-handler-input');

  const settingsNode = toElement(document, '<a class="settings-icon" href="#openModal"><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/settings-128.png"></a>');
  const modalNode = toElement(document, '<div id="openModal" class="modalDialog"> <div><a href="#close" title="Close" class="close">X</a> <label><input type="checkbox" id="autolaunch-handler-input" /> Start with system</label> </div>');

  bodyDOM.insertBefore(settingsNode, bodyDOM.childNodes[0]);
  bodyDOM.insertBefore(modalNode, bodyDOM.childNodes[0]);

  autolaunchHandlerEvent.addEventListener('click', () => {
    ipcRenderer.send(IPC_AUTOLAUNCH_EVENT, autolaunchHandlerEvent.checked);
  });
};

