'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _storeSettingsStore = require('../store/SettingsStore');

var _storeSettingsStore2 = _interopRequireDefault(_storeSettingsStore);

var _utilsFileWriter = require('../utils/FileWriter');

var _utilsFileWriter2 = _interopRequireDefault(_utilsFileWriter);

var flatten = function flatten(list) {
  return [].concat.apply([], list);
};

var middleIndex = 0;
var gloabalIndex = 0;
var maxTimes = 0;
var localMaxTimes = 0;
var itemResults = [];
var localResults = [];
var results = [];
var isDisplayProcess = _storeSettingsStore2['default'].getEachDisplay();

var Shuffle = (function () {
  function Shuffle() {
    _classCallCheck(this, Shuffle);
  }

  _createClass(Shuffle, [{
    key: 'shuffleStart',

    // Nop
    value: function shuffleStart(conditions, times, deck) {
      var _deck = deck;

      if (deck.length === 0) {
        _deck = this._createDeck();
        maxTimes = times;
      }

      gloabalIndex = maxTimes - times;
      var result = this._localShuffle(conditions, _deck);

      if (times - 1 < 0) {
        var string = results.reduce(function (a, b) {
          return a + b;
        }, '');
        return { deck: result, string: string };
      }

      results[results.length] = localResults.join(',');
      localResults = [];
      return this.shuffleStart(conditions, times - 1, result);
    }
  }, {
    key: '_localShuffle',
    value: function _localShuffle(conditions, deck) {
      var _this = this;

      var _deck = deck;
      var eachDisplay = _storeSettingsStore2['default'].getEachDisplay();

      [].concat(_toConsumableArray(Array(conditions.length).keys())).forEach(function (index) {
        var condition = conditions[index];
        console.log("type: " + JSON.stringify(condition));
        middleIndex = index;
        _deck = _this._shuffleRouter(condition, _deck);
        var csv = _utilsFileWriter2['default'].arrayToCsvString(_deck);
        var template = _utilsFileWriter2['default'].createSettingsTemplate(condition);

        localResults[localResults.length] = template + csv;
      });

      return _deck;
    }
  }, {
    key: '_shuffleRouter',
    value: function _shuffleRouter(condition, deck) {

      console.log("condition: " + JSON.stringify(condition));

      var type = condition.shuffleType;

      if (type === 'cut' || type === 'deal') {
        var fromRange = condition.fromRange;
        var toRange = condition.toRange;
        var isRandom = condition.startIsRandom;
        var times = condition.shuffleTimes;
        return this._cutShuffle(fromRange, toRange, isRandom, times, deck);
      }

      if (type === 'hindu') {
        var fromRange = condition.fromRange;
        var toRange = condition.toRange;
        var endFromRange = condition.endFromRange;
        var endToRange = condition.endToRange;
        var isRandom = condition.startIsRandom;
        var endIsRandom = condition.endIsRandom;
        var times = condition.shuffleTimes;
        return this._hinduShuffle(fromRange, toRange, endFromRange, endToRange, isRandom, endIsRandom, times, deck);
      }

      if (type === 'faro') {
        var times = condition.shuffleTimes;
        return this._faroShuffle(times, deck);
      }
    }
  }, {
    key: '_cutShuffle',
    value: function _cutShuffle(fromNum, toNum, isRandom, times, deck) {
      var endPoint = isRandom ? this._createRandom() : this._createRandom(fromNum, toNum);
      var newDeck = deck.slice(0, endPoint);
      var result = deck.slice(endPoint).concat(newDeck);

      if (itemResults.length <= 0) {
        localMaxTimes = times;
      }

      var index = localMaxTimes - times;
      if (times - 1 < 0) {
        itemResults = [];
        return result;
      }

      if (isDisplayProcess) {
        var suffix = "cut-" + gloabalIndex + "-" + middleIndex + "-" + index;
        var condition = { shuffleType: "cut", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
        _utilsFileWriter2['default'].writeProcess(result, condition, suffix);
      }

      itemResults[itemResults.length] = index;

      return this._cutShuffle(fromNum, toNum, isRandom, times - 1, result);
    }
  }, {
    key: '_hinduShuffle',
    value: function _hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times, deck) {
      var start = isRandom ? this._createRandom() : this._createRandom(startFrom, startTo);
      var end = endIsRandom ? this._createRandom() : this._createRandom(endFrom, endTo);

      if (start >= end) {
        return this._hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times, deck);
      }

      if (itemResults.length <= 0) {
        localMaxTimes = times;
      }

      var middleDeck = deck.slice(start, end);
      var bottomDeck = deck.slice(end);
      var topDeck = deck.slice(0, start - 1);
      var result = [middleDeck, topDeck, bottomDeck].flatten();

      var index = localMaxTimes - times;
      if (times - 1 < 0) {
        itemResults = [];
        return result;
      }

      if (isDisplayProcess) {
        var suffix = "hindu-" + gloabalIndex + "-" + middleIndex + "-" + index;
        var condition = { shuffleType: "hindu", fromRange: startFrom, toRange: startTo, endFromRange: endFrom, endToRange: endTo, shuffleTimes: localMaxTimes };
        _utilsFileWriter2['default'].writeProcess(result, condition, suffix);
      }

      itemResults[itemResults.length] = index;

      return this._hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times - 1, result);
    }
  }, {
    key: '_faroShuffle',
    value: function _faroShuffle(times, deck) {
      var endPoint = deck.length / 2;
      var arrayRight = deck.slice(0, endPoint);
      var arrayLeft = deck.slice(endPoint);
      var result = [];
      var rightCount = 0;
      var leftCount = 0;

      if (itemResults.length <= 0) {
        localMaxTimes = times;
      }

      for (var i = 1; i < deck.length + 1; i++) {
        if (i === 1 || i % 2 !== 0) {
          result[i - 1] = arrayLeft[leftCount];
          leftCount++;
        } else {
          result[i - 1] = arrayRight[rightCount];
          rightCount++;
        }
      }

      if (times - 1 < 0) {
        itemResults = [];
        return result;
      }

      var index = localMaxTimes - times;
      if (isDisplayProcess) {
        var suffix = "faro-" + gloabalIndex + "-" + middleIndex + "-" + index;
        var condition = { shuffleType: "faro", shuffleTimes: localMaxTimes };
        _utilsFileWriter2['default'].writeProcess(result, condition, suffix);
      }

      itemResults[itemResults.length] = index;

      return this._faroShuffle(times - 1, result);
    }
  }, {
    key: '_dealShuffle',
    value: function _dealShuffle(fromNum, toNum, times, deck) {
      var _this2 = this;

      var num = _createSubDeckNumber(fromNum, toNum);
      var decks = _createEmptyDecks(num);
      var result = [];
      var surplus = deck.length % num;

      if (itemResults.length <= 0) {
        localMaxTimes = times;
      }

      if (num === 1) {
        deck.reverse();
        if (times - 1 < 0) {
          itemResults = [];
          return deck;
        }

        if (isDisplayProcess) {
          var suffix = "deal-" + gloabalIndex + "-" + middleIndex + "-" + index;
          var condition = { shuffleType: "deal", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
          _utilsFileWriter2['default'].writeProcess(deck, condition, suffix);
        }

        itemResults[itemResults.length] = index;

        return this._dealShuffle(fromNum, toNum, times - 1, deck);
      }

      result = [].concat(_toConsumableArray(Array(num).keys())).map(function (index) {
        return _this2._getSubDeckIndex(index, num).map(function (i) {
          return deck[i];
        });
      });

      if (surplus) {
        (function () {
          var surplusIndex = deck.length - surplus;
          [].concat(_toConsumableArray(Array(surplus).keys())).forEach(function (index) {
            var subDeckIndex = result[index].length;
            result[index][subDeckIndex] = deck[surplusIndex];
            surplusIndex++;
          });
        })();
      }

      if (times - 1 < 0) {
        itemResults = [];
        return flatten(result);
      }

      if (isDisplayProcess) {
        var suffix = "deal-" + gloabalIndex + "-" + middleIndex + "-" + index;
        var condition = { shuffleType: "deal", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
        _utilsFileWriter2['default'].writeProcess(flatten(result), condition, suffix);
      }

      itemResults[itemResults.length] = index;

      return this._dealShuffle(fromNum, toNum, times - 1, flatten(result));
    }
  }, {
    key: '_createDeck',
    value: function _createDeck() {
      var sutes = ['spade', 'club', 'heart', 'dia'];
      var result = flatten(sutes.map(function (sute) {
        return Array.from(Array(13).keys()).map(function (index) {
          return { sute: sute, number: index };
        });
      }));

      return result;
    }
  }, {
    key: '_createRandom',
    value: function _createRandom(fromNum, toNum) {
      if (fromNum === 'undefined' || toNum === 'undefined' || fromNum === toNum) {
        return Math.random() * (52 - 1) + 1;
      }

      return Math.random() * (toNum - fromNum) + fromNum;
    }
  }, {
    key: '_createEmptyDecks',
    value: function _createEmptyDecks(num) {
      return [].concat(_toConsumableArray(Array(num).keys())).map(function (index) {
        return [];
      });
    }
  }, {
    key: '_getSubDeckIndex',
    value: function _getSubDeckIndex(fromNum, byNum) {
      var maxIteration = deck.length / byNum;
      return [].concat(_toConsumableArray(Array(maxIteration + 1).keys())).map(function (i) {
        return fromNum + byNum * i;
      });
    }
  }, {
    key: '_createSubDeckNumber',
    value: function _createSubDeckNumber(fromNum, toNum) {
      if (from === 'undefined' || to === 'undefined' || fromNum === toNum) {
        return Math.random() * (8 - 1) + 1;
      }

      return Math.random() * (to - fromNum) + fromNum;
    }
  }]);

  return Shuffle;
})();

exports['default'] = new Shuffle();
module.exports = exports['default'];
//# sourceMappingURL=../actions/Shuffle.js.map