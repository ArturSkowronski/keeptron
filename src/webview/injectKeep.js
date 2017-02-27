const { ipcRenderer } = require('electron');

function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
}

window.onload = function () {
  const settingsNode = htmlToElement('<a style="position: fixed; bottom: 1em;right: 1em; z-index: 1000;" class="settings-icon" href="#openModal"><img width="50" height="50" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/settings-128.png"></a>');
  const modalNode = htmlToElement('<div id="openModal" class="modalDialog"> <div> <a href="#close" title="Close" class="close">X</a> <label><input type="checkbox" id="autolaunch-handler" /> Start with system</label> </div>');
  const bodyDOM = document.querySelector('body');

  bodyDOM.insertBefore(settingsNode, bodyDOM.childNodes[0]);
  bodyDOM.insertBefore(modalNode, bodyDOM.childNodes[0]);

  const pulp = document.getElementById('autolaunch-handler');

  pulp.addEventListener('click', () => {
    ipcRenderer.send('handle-autolaunch', pulp.checked);
  });
};

