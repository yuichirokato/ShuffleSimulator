'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShuffleItem = require('./ShuffleItem');

var _ShuffleItem2 = _interopRequireDefault(_ShuffleItem);

var _materialUi = require('material-ui');

var _materialUi2 = _interopRequireDefault(_materialUi);

var _materialUiLibSvgIconsContentAdd = require('material-ui/lib/svg-icons/content/add');

var _materialUiLibSvgIconsContentAdd2 = _interopRequireDefault(_materialUiLibSvgIconsContentAdd);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _storeShuffleItemStore = require('../../store/ShuffleItemStore');

var _storeShuffleItemStore2 = _interopRequireDefault(_storeShuffleItemStore);

var _actionsShuffle = require('../../actions/Shuffle');

var _actionsShuffle2 = _interopRequireDefault(_actionsShuffle);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utilsFileWriter = require('../../utils/FileWriter');

var _utilsFileWriter2 = _interopRequireDefault(_utilsFileWriter);

(0, _reactTapEventPlugin2['default'])();
var ThemeManager = new _materialUi2['default'].Styles.ThemeManager();
var dirHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
var defaultPath = _path2['default'].join(dirHome, "Desktop");
var shufflePoints = [{ payload: 1, text: 'Continuity' }, { payload: 2, text: 'Fix' }];

var styles = {
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 10
  },
  numberOfCardsStyle: {
    marginLeft: 20
  },
  numberOfExecutionStyle: {
    marginLeft: 20
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  executionButtonStyle: {
    marginTop: 10,
    marginRight: 10
  },
  executionSecondsLabelStyle: {
    marginTop: 10
  }
};

var ShuffleMenu = (function (_React$Component) {
  _inherits(ShuffleMenu, _React$Component);

  function ShuffleMenu() {
    _classCallCheck(this, ShuffleMenu);

    _get(Object.getPrototypeOf(ShuffleMenu.prototype), 'constructor', this).call(this);
    this.state = {
      shuffleItems: [],
      checkNumberOfCards: 0,
      execution: 0,
      executionSeconds: 2,
      checkCardErrorText: '',
      executionErrorText: '',
      shuffleEnabled: false,
      outputPath: defaultPath
    };
  }

  _createClass(ShuffleMenu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.state.shuffleItems.length <= 0) {
        this.setState({
          shuffleItems: [this.renderShuffleItem(0, false)],
          executionSeconds: 2
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storeShuffleItemStore2['default'].addChangeListener(this.handleItemChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storeShuffleItemStore2['default'].removeChangeListener(this.handleItemChange.bind(this));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var conditions = _storeShuffleItemStore2['default'].getConditions();
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var items = this.state.shuffleItems.length > 0 ? this.state.shuffleItems : this.renderShuffleItem(0, false);

      return _react2['default'].createElement(
        'div',
        { className: 'shuffles' },
        items,
        this.renderAddButton(),
        this.renderCheckNumberOfCardsField(),
        this.renderShuffleNumberOfExecutionsField(),
        _react2['default'].createElement(
          'div',
          { style: styles.bottomContainer },
          this.renderExecutionSecondsLabel(),
          this.renderExecutionButton()
        ),
        _react2['default'].createElement(_materialUi.Snackbar, {
          message: 'Shuffles Complete',
          autoHideDuration: 3000,
          ref: 'snack' })
      );
    }
  }, {
    key: 'renderShuffleItem',
    value: function renderShuffleItem(id, showRemoveButton) {
      return _react2['default'].createElement(_ShuffleItem2['default'], {
        style: styles.cardStyle,
        cardId: id,
        showRemoveButton: showRemoveButton,
        removeHandler: this.handleItemRemove.bind(this) });
    }
  }, {
    key: 'renderAddButton',
    value: function renderAddButton() {
      return _react2['default'].createElement(
        'div',
        { className: 'add-button' },
        _react2['default'].createElement(
          _materialUi.FloatingActionButton,
          {
            onClick: this.handleAddButtonClick.bind(this),
            primary: true },
          _react2['default'].createElement(_materialUiLibSvgIconsContentAdd2['default'], null)
        )
      );
    }
  }, {
    key: 'renderCheckNumberOfCardsField',
    value: function renderCheckNumberOfCardsField() {
      return _react2['default'].createElement(_materialUi.TextField, {
        style: styles.numberOfCardsStyle,
        floatingLabelText: 'Check number of cards',
        errorText: this.state.checkCardErrorText,
        onChange: this.handleCheckNumberOfCardsChange.bind(this) });
    }
  }, {
    key: 'renderShuffleNumberOfExecutionsField',
    value: function renderShuffleNumberOfExecutionsField() {
      return _react2['default'].createElement(_materialUi.TextField, {
        style: styles.numberOfExecutionStyle,
        floatingLabelText: 'Shuffle number of execution',
        errorText: this.state.executionErrorText,
        onChange: this.handleShuffleNumberOfExecutionChange.bind(this) });
    }
  }, {
    key: 'renderExecutionButton',
    value: function renderExecutionButton() {
      return _react2['default'].createElement(_materialUi.RaisedButton, {
        style: styles.executionButtonStyle,
        disabled: !this.state.shuffleEnabled,
        label: 'Shuffle!',
        secondary: true,
        onClick: this.handleShuffleButtonClick.bind(this) });
    }
  }, {
    key: 'renderExecutionSecondsLabel',
    value: function renderExecutionSecondsLabel() {
      return _react2['default'].createElement(_materialUi.FlatButton, {
        style: styles.executionSecondsLabelStyle,
        label: this.state.executionSeconds + "  seconds",
        disabled: true });
    }
  }, {
    key: 'renderOutPutFilePath',
    value: function renderOutPutFilePath() {
      return _react2['default'].createElement(
        _materialUi.RaisedButton,
        { secondary: true, label: 'Path Select' },
        _react2['default'].createElement('input', { type: 'file', onChange: this.handlePathChange.bind(this) })
      );
    }
  }, {
    key: 'handleAddButtonClick',
    value: function handleAddButtonClick(e) {
      var num = this.state.shuffleItems.length;
      var items = this.state.shuffleItems;
      items[num] = this.renderShuffleItem(num, true);
      this.setState({
        shuffleItems: items,
        executionSeconds: this.state.executionSeconds + 2
      });
    }
  }, {
    key: 'handleShuffleButtonClick',
    value: function handleShuffleButtonClick(e) {
      var conditions = _storeShuffleItemStore2['default'].getConditions();
      var results = _actionsShuffle2['default'].shuffleStart(conditions, this.state.execution, []);
      var allShuffleTimes = this._calcAllShuffleTimes();
      var allShuffleSeconds = this._calcAllShuffleSeconds();
      var shuffleTypeNum = this._calcShuffleTypeNumber();
      var template = "Types: " + shuffleTypeNum + ", " + "AllShuffleTimes: " + allShuffleTimes + ", " + "AllShuffleSeconds: " + allShuffleSeconds + ", " + "CheckNumberOfCards: " + this.state.checkNumberOfCards + ", " + "ExecutionTimes: " + this.state.execution + "\n";
      var result = results.string + template;

      _utilsFileWriter2['default'].writeString(result, "all");
      this.refs.snack.show();
    }
  }, {
    key: 'handleCheckNumberOfCardsChange',
    value: function handleCheckNumberOfCardsChange(e) {
      var number = e.target.value;

      if (number.match(/[^0-9]+/)) {
        this.setState({
          checkCardErrorText: 'Please input number',
          checkNumberOfCards: 0,
          shuffleEnabled: false
        });
        return;
      }

      if (number > 52 && number) {
        this.setState({
          checkCardErrorText: 'Out of range',
          checkNumberOfCards: 0,
          shuffleEnabled: false
        });
        return;
      }

      var enabled = _storeShuffleItemStore2['default'].getEnabledShuffleItems();
      var isEnabled = enabled && this.state.execution > 0 && number > 0;
      this.setState({
        checkCardErrorText: '',
        checkNumberOfCards: number,
        shuffleEnabled: isEnabled
      });
    }
  }, {
    key: 'handleShuffleNumberOfExecutionChange',
    value: function handleShuffleNumberOfExecutionChange(e) {
      var number = e.target.value;

      if (number.match(/[^0-9]+/)) {
        this.setState({
          executionErrorText: 'Please input number',
          execution: 0,
          shuffleEnabled: false,
          executionSeconds: 0
        });
        return;
      }

      var enabled = _storeShuffleItemStore2['default'].getEnabledShuffleItems();
      var isEnabled = enabled && number > 0 && this.state.checkNumberOfCards > 0;
      var seconds = this._calcAllShuffleSeconds(number);
      this.setState({
        executionErrorText: '',
        execution: number,
        shuffleEnabled: isEnabled,
        executionSeconds: seconds
      });
    }
  }, {
    key: 'handleItemRemove',
    value: function handleItemRemove(e, index) {
      var items = this.state.shuffleItems;
      items.splice(index, 1);
      this.setState({
        suffleItems: items,
        executionSeconds: items.length * 3
      });
    }
  }, {
    key: 'handleItemChange',
    value: function handleItemChange() {
      this._updateEnabled();
    }
  }, {
    key: 'handlePathChange',
    value: function handlePathChange(e) {
      var path = e.target.value;
      this.setState({
        outputPath: path
      });
    }
  }, {
    key: '_updateEnabled',
    value: function _updateEnabled() {
      var enabled = _storeShuffleItemStore2['default'].getEnabledShuffleItems();
      var shuffleEnabled = enabled && this.state.execution > 0 && this.state.checkNumberOfCards > 0;
      var seconds = this._calcAllShuffleSeconds();
      this.setState({
        shuffleEnabled: shuffleEnabled,
        executionSeconds: seconds
      });
    }
  }, {
    key: '_calcAllShuffleTimes',
    value: function _calcAllShuffleTimes() {
      var conditions = _storeShuffleItemStore2['default'].getConditions();
      var execution = this.state.execution;
      return conditions.map(function (condition) {
        return condition.shuffleTimes;
      }).reduce(function (a, b) {
        return a + b;
      }, 0) * execution;
    }
  }, {
    key: '_calcAllShuffleSeconds',
    value: function _calcAllShuffleSeconds(execution) {
      var conditions = _storeShuffleItemStore2['default'].getConditions();
      var exe = execution === undefined ? this.state.execution : execution;

      return conditions.map(function (condition) {
        return condition.shuffleTimes * condition.shuffleSeconds;
      }).reduce(function (a, b) {
        return a + b;
      }, 0) * exe;
    }
  }, {
    key: '_calcShuffleTypeNumber',
    value: function _calcShuffleTypeNumber() {
      var conditions = _storeShuffleItemStore2['default'].getConditions();
      var cuts = conditions.filter(function (condition) {
        return condition.shuffleType === 'cut';
      }).length;
      var hindus = conditions.filter(function (condition) {
        return condition.shuffleType === 'hindu';
      }).length;
      var faros = conditions.filter(function (condition) {
        return condition.shuffleType === 'faro';
      }).length;
      var deals = conditions.filter(function (condition) {
        return condition.shuffleType === 'deal';
      }).length;

      return [cuts, hindus, faros, deals].filter(function (type) {
        return type > 0;
      }).length;
    }
  }], [{
    key: 'childContextTypes',
    value: {
      muiTheme: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  return ShuffleMenu;
})(_react2['default'].Component);

module.exports = ShuffleMenu;
//# sourceMappingURL=../../renderer/components/ShuffleMenu.js.map