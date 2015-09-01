'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('app');

var _app2 = _interopRequireDefault(_app);

var _menu = require('menu');

var _menu2 = _interopRequireDefault(_menu);

var _menuItem = require('menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var template = [{
  label: 'Electron App',
  submenu: [{
    label: 'Quit',
    accelerator: 'Command+Q',
    click: function click() {
      _app2['default'].quit();
    }
  }]
}];

var appMenu = _menu2['default'].buildFromTemplate(template);

module.exports = appMenu;
//# sourceMappingURL=../../browser/menu/appMenu.js.map