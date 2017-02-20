const MenuBar = require('menubar');

exports.mb = MenuBar({
  width: 400,
  height: 600,
  icon: `${__dirname}/assets/keepTemplate.png`,
  preloadWindow: false,
});
