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

var CHANGE_EVENT = 'change';
var conditions = [];
var isEnabledShuffleItems = false;

var ShuffleItemStore = (function (_EventEmitter) {
  _inherits(ShuffleItemStore, _EventEmitter);

  function ShuffleItemStore() {
    var _this = this;

    _classCallCheck(this, ShuffleItemStore);

    _get(Object.getPrototypeOf(ShuffleItemStore.prototype), 'constructor', this).call(this);
    this.dispatchToken = _dispatcherAppDispatcher2['default'].register(function (action) {
      switch (action.type) {
        case 'add':
          _this._addCondition(action);
          break;

        case 'remove':
          _this._removeCondition(action);
          break;

        default:
          break;
      }
    });
  }

  _createClass(ShuffleItemStore, [{
    key: 'emitChange',
    value: function emitChange() {
      this.emit(CHANGE_EVENT);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }, {
    key: 'getEnabledShuffleItems',
    value: function getEnabledShuffleItems() {
      return isEnabledShuffleItems;
    }
  }, {
    key: 'getConditions',
    value: function getConditions() {
      return conditions;
    }
  }, {
    key: '_addCondition',
    value: function _addCondition(action) {
      var _this2 = this;

      var itemId = action.itemId;
      conditions[itemId] = action.condition;

      var enabled = conditions.map(function (condition) {
        return _this2._validateCheck(condition);
      }).reduce(function (a, b) {
        return a && b;
      }, true);
      isEnabledShuffleItems = enabled;

      this.emitChange();
    }
  }, {
    key: '_removeCondition',
    value: function _removeCondition(action) {
      var _this3 = this;

      conditions.splice(action.itemId, 1);

      var enabled = conditions.map(function (condition) {
        return _this3._validateCheck(condition);
      }).reduce(function (a, b) {
        return a && b;
      }, true);
      isEnabledShuffleItems = enabled;

      this.emitChange();
    }
  }, {
    key: '_validateCheck',
    value: function _validateCheck(condition) {

      console.log("validate, condition.type: " + condition.shuffleType);

      switch (condition.shuffleType) {
        case 'cut':
        case 'deal':
          return this._defaultShuffleCheck(condition);
          break;

        case 'hindu':
          return this._hinduShuffleCheck(condition);
          break;

        case 'faro':
          return this._faroShuffleCheck(condition);
          break;

        default:
          return false;
      }
    }
  }, {
    key: '_defaultShuffleCheck',
    value: function _defaultShuffleCheck(condition) {
      var fromRangeValid = condition.fromRange !== -1;
      var toRangeValid = condition.toRange !== -1;
      var timesValid = condition.shuffleTimes > 0;
      var rangeValid = condition.fromRange <= condition.toRange;

      console.log("condition.fromRange !== -1: " + fromRangeValid);
      console.log("condition.toRange !== -1: " + toRangeValid);
      console.log("condition.shuffleTimes > 0: " + timesValid);
      console.log("condition.fromRange <= condition.toRange: " + rangeValid);

      return (fromRangeValid && toRangeValid && rangeValid || condition.startIsRandom) && timesValid;
    }
  }, {
    key: '_hinduShuffleCheck',
    value: function _hinduShuffleCheck(condition) {
      var first = this._defaultShuffleCheck(condition);
      var endFromRange = condition.endFromRange;
      var endToRange = condition.endToRange;

      return (endFromRange <= endToRange && endFromRange !== -1 && endToRange !== -1 || condition.endIsRandom) && first;
    }
  }, {
    key: '_faroShuffleCheck',
    value: function _faroShuffleCheck(condition) {
      return condition.shuffleTimes > 0;
    }
  }]);

  return ShuffleItemStore;
})(_events.EventEmitter);

exports['default'] = new ShuffleItemStore();
module.exports = exports['default'];
//# sourceMappingURL=../store/ShuffleItemStore.js.map