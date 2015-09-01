'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var dirHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
var defaultPath = _path2['default'].join(dirHome, "Desktop");

var FileWriter = (function () {
  function FileWriter() {
    _classCallCheck(this, FileWriter);
  }

  _createClass(FileWriter, [{
    key: 'writeCSV',
    value: function writeCSV(array, condition, suffix) {
      console.log("write csv!");
      var csv = this.arrayToCsvString(array);
      var template = this.createSettingsTemplate(condition);
      var output = template + csv;
      _fs2['default'].writeFileSync(defaultPath + "/result_" + suffix + ".txt", output);
    }
  }, {
    key: 'writeProcess',
    value: function writeProcess(array, condition, suffix) {
      var csv = this.arrayToCsvString(array);
      var template = this.createSettingsTemplate(condition);
      var output = csv + template;

      _fs2['default'].writeFileSync(defaultPath + "/result_" + suffix + ".txt", output);
    }
  }, {
    key: 'writeString',
    value: function writeString(string, suffix) {
      _fs2['default'].writeFileSync(defaultPath + "/result_" + suffix + ".txt", string);
    }
  }, {
    key: 'arrayToCsvString',
    value: function arrayToCsvString(array) {
      var _this = this;

      return array.map(function (card) {
        return _this._cardToString(card);
      }).join(",") + '\r\n\n';
    }
  }, {
    key: 'createSettingsTemplate',
    value: function createSettingsTemplate(condtion) {
      var template = "Type: " + condtion.shuffleType + ", " + "Range: " + condtion.fromRange + " ~ " + condtion.toRange + ", " + "Range2: " + condtion.endFromRange + " ~ " + condtion.endToRange + ", " + "Times: " + condtion.shuffleTimes + ", \n\n";
      return template;
    }
  }, {
    key: '_cardToString',
    value: function _cardToString(card) {
      switch (card.sute) {
        case 'heart':
          return "1-" + (card.number + 1);

        case 'spade':
          return "2-" + (card.number + 1);

        case 'dia':
          return "3-" + (card.number + 1);

        case 'club':
          return "4-" + (card.number + 1);

        default:
          return "1-" + (card.number + 1);
      }
    }
  }]);

  return FileWriter;
})();

exports['default'] = new FileWriter();
module.exports = exports['default'];
//# sourceMappingURL=../utils/FileWriter.js.map