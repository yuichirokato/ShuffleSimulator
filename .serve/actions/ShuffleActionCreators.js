'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dispatcherAppDispatcher = require('../dispatcher/AppDispatcher');

var _dispatcherAppDispatcher2 = _interopRequireDefault(_dispatcherAppDispatcher);

var ShuffleActionCreators = (function () {
  function ShuffleActionCreators() {
    _classCallCheck(this, ShuffleActionCreators);
  }

  _createClass(ShuffleActionCreators, [{
    key: 'addItemCondition',
    value: function addItemCondition(id, condition) {
      _dispatcherAppDispatcher2['default'].dispatch({
        type: 'add',
        itemId: id,
        condition: condition
      });
    }
  }, {
    key: 'removeItemCondition',
    value: function removeItemCondition(id) {
      _dispatcherAppDispatcher2['default'].dispatch({
        type: 'remove',
        itemId: id
      });
    }
  }, {
    key: 'updateDisplayProcess',
    value: function updateDisplayProcess(isDisplay) {
      _dispatcherAppDispatcher2['default'].dispatch({
        type: 'updateDisplayProcess',
        isDisplay: isDisplay
      });
    }
  }, {
    key: 'updateCustomNumberOfCards',
    value: function updateCustomNumberOfCards(num) {
      _dispatcherAppDispatcher2['default'].dispatch({
        type: 'updateCustomNumberOfCards',
        number: num
      });
    }
  }]);

  return ShuffleActionCreators;
})();

exports['default'] = new ShuffleActionCreators();
module.exports = exports['default'];
//# sourceMappingURL=../actions/ShuffleActionCreators.js.map