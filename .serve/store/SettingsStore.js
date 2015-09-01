'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _dispatcherAppDispatcher = require('../dispatcher/AppDispatcher');

var _dispatcherAppDispatcher2 = _interopRequireDefault(_dispatcherAppDispatcher);

var isDisplayProcess = false;
var numberOfCards = 0;

var SettingsStore = (function (_EventEmitter) {
  _inherits(SettingsStore, _EventEmitter);

  function SettingsStore() {
    _classCallCheck(this, SettingsStore);

    _get(Object.getPrototypeOf(SettingsStore.prototype), 'constructor', this).call(this);

    this.dispatchToken = _dispatcherAppDispatcher2['default'].register(function (action) {
      if (action.type === 'updateDisplayProcess') {
        isDisplayProcess = action.isDisplay;
      }

      if (action.type === 'updateCustomNumberOfCards') {
        numberOfCards = action.number;
      }
    });
  }

  _createClass(SettingsStore, [{
    key: 'getEachDisplay',
    value: function getEachDisplay() {
      return isDisplayProcess;
    }
  }, {
    key: 'getNumberOfCards',
    value: function getNumberOfCards() {
      return numberOfCards;
    }
  }]);

  return SettingsStore;
})(_events.EventEmitter);

exports['default'] = new SettingsStore();
module.exports = exports['default'];
//# sourceMappingURL=../store/SettingsStore.js.map