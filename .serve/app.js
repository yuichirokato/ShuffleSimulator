'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('app');

var _app2 = _interopRequireDefault(_app);

var _browserWindow = require('browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

var _crashReporter = require('crash-reporter');

var _crashReporter2 = _interopRequireDefault(_crashReporter);

var _menu = require('menu');

var _menu2 = _interopRequireDefault(_menu);

var _browserMenuAppMenu = require('./browser/menu/appMenu');

var _browserMenuAppMenu2 = _interopRequireDefault(_browserMenuAppMenu);

var _ipc = require('ipc');

var _ipc2 = _interopRequireDefault(_ipc);

var _dialog = require('dialog');

var _dialog2 = _interopRequireDefault(_dialog);

require('babel/polyfill');

var mainWindow = null;
if (process.env.NODE_ENV === 'develop') {
  _crashReporter2['default'].start();
  //appMenu.append(devMenu);
}

_app2['default'].on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    _app2['default'].quit();
  }
});

_app2['default'].on('ready', function () {
  //Menu.setApplicationMenu(appMenu);
  mainWindow = new _browserWindow2['default']({
    width: 1000,
    height: 800
  });

  mainWindow.loadUrl('file://' + __dirname + '/renderer/index.html');
});
//# sourceMappingURL=app.js.map