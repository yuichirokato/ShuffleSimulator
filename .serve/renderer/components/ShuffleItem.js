'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _materialUi2 = _interopRequireDefault(_materialUi);

var _materialUiLibSvgIconsContentClear = require('material-ui/lib/svg-icons/content/clear');

var _materialUiLibSvgIconsContentClear2 = _interopRequireDefault(_materialUiLibSvgIconsContentClear);

var _actionsShuffleActionCreators = require('../../actions/ShuffleActionCreators');

var _actionsShuffleActionCreators2 = _interopRequireDefault(_actionsShuffleActionCreators);

var ThemeManager = new _materialUi2['default'].Styles.ThemeManager();

ThemeManager.setTheme(ThemeManager.types.LIGHT);

var shuffleTypes = [{ payload: 'cut', text: 'Cut' }, { payload: 'hindu', text: 'Hindu' }, { payload: 'faro', text: 'Faro' }, { payload: 'deal', text: 'Deal' }];

var styles = {
  shuffleTimes: {
    width: 100
  },
  shuffleItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shuffleItemBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  shuffleNumber: {
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginBottom: 30,
    width: 150
  },
  rangeContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  fromRange: {
    width: 120,
    marginLeft: 25
  },
  toRange: {
    width: 120,
    marginLeft: 25
  },
  checkbox: {
    marginLeft: 20,
    marginTop: 30,
    width: 300
  }
};

var ShuffleItem = (function (_React$Component) {
  _inherits(ShuffleItem, _React$Component);

  _createClass(ShuffleItem, null, [{
    key: 'propTypes',
    value: {
      cardId: _react2['default'].PropTypes.number.isRequired,
      removeHandler: _react2['default'].PropTypes.func.isRequired,
      validateCheck: _react2['default'].PropTypes.func.isRequired,
      showRemoveButton: _react2['default'].PropTypes.bool,
      style: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      muiTheme: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  function ShuffleItem() {
    _classCallCheck(this, ShuffleItem);

    _get(Object.getPrototypeOf(ShuffleItem.prototype), 'constructor', this).call(this);
    this.state = {
      shuffleType: 'cut',
      errorText: '',
      shuffleTimes: 0,
      fromRaneError: '',
      toRangeError: '',
      endFromRangeError: '',
      endToRangeError: '',
      fromRange: -1,
      toRange: -1,
      endFromRange: -1,
      endToRange: -1,
      startRangeUseRandom: false,
      startRangeTextDisabled: false,
      endRangeUseRandom: false,
      endRangeTextDisabled: false,
      shuffleSeconds: 2
    };
  }

  _createClass(ShuffleItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log("cardId: " + this.props.cardId);
      this._emitState();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state === prevState) {
        return;
      }

      this._emitState();
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
      return _react2['default'].createElement(
        _materialUi.Card,
        { style: this.props.style },
        this.renderShuffleItemHeader(),
        this.renderShuffleBody(),
        this.renderShuffleNumber()
      );
    }
  }, {
    key: 'renderShuffleItemHeader',
    value: function renderShuffleItemHeader() {

      var removeButton = null;
      if (this.props.showRemoveButton) {
        removeButton = this.renderRemoveButton();
      }

      return _react2['default'].createElement(
        'div',
        { style: styles.shuffleItemHeader },
        _react2['default'].createElement(_materialUi.DropDownMenu, {
          menuItems: shuffleTypes,
          onChange: this.handleTypeChange.bind(this),
          style: { width: 150 } }),
        removeButton
      );
    }
  }, {
    key: 'renderShuffleBody',
    value: function renderShuffleBody() {
      var shuffleRange = null;
      var cutType = null;
      var type = this.state.shuffleType;

      if (type === 'cut' || type === 'deal') {
        shuffleRange = this.renderDefaultRange();
      }

      if (type === 'hindu') {
        shuffleRange = this.renderHinduRange();
      }

      return _react2['default'].createElement(
        'div',
        { style: styles.shuffleItemBody },
        shuffleRange,
        cutType
      );
    }
  }, {
    key: 'renderDefaultRange',
    value: function renderDefaultRange(fromText, toText) {
      return _react2['default'].createElement(
        'div',
        { style: styles.rangeContainer },
        _react2['default'].createElement(_materialUi.TextField, {
          style: styles.fromRange,
          onChange: this.handleFromRangeChange.bind(this),
          floatingLabelText: fromText || "From range",
          errorText: this.state.fromRangeError,
          disabled: this.state.startRangeTextDisabled }),
        _react2['default'].createElement(_materialUi.TextField, {
          style: styles.toRange,
          onChange: this.handleToRangeChange.bind(this),
          floatingLabelText: toText || "To range",
          errorText: this.state.toRangeError,
          disabled: this.state.startRangeTextDisabled }),
        _react2['default'].createElement(_materialUi.Checkbox, {
          style: styles.checkbox,
          name: 'startRange',
          label: 'Use Random Number',
          onCheck: this.handleStartRangeRandomCheck.bind(this) })
      );
    }
  }, {
    key: 'renderHinduRange',
    value: function renderHinduRange() {
      return _react2['default'].createElement(
        'div',
        null,
        this.renderDefaultRange("start from range", "start to range"),
        _react2['default'].createElement(
          'div',
          { style: styles.rangeContainer },
          _react2['default'].createElement(_materialUi.TextField, {
            style: styles.fromRange,
            onChange: this.handleEndFromRangeChange.bind(this),
            floatingLabelText: 'end from range',
            errorText: this.state.endFromRangeError,
            disabled: this.state.endRangeTextDisabled }),
          _react2['default'].createElement(_materialUi.TextField, {
            style: styles.toRange,
            onChange: this.handleEndToRangeChange.bind(this),
            floatingLabelText: 'end to range',
            errorText: this.state.endToRangeError,
            disabled: this.state.endRangeTextDisabled }),
          _react2['default'].createElement(_materialUi.Checkbox, {
            style: styles.checkbox,
            name: 'endRange',
            label: 'Use Random Number',
            onCheck: this.handleEndRangeRandomCheck.bind(this) })
        )
      );
    }
  }, {
    key: 'renderShuffleNumber',
    value: function renderShuffleNumber() {
      return _react2['default'].createElement(_materialUi.TextField, {
        style: styles.shuffleNumber,
        onChange: this.handleShuffleTimesChange.bind(this),
        floatingLabelText: 'Shuffle Times',
        errorText: this.state.errorText });
    }
  }, {
    key: 'renderRemoveButton',
    value: function renderRemoveButton() {
      return _react2['default'].createElement(
        _materialUi.IconButton,
        {
          tooltip: 'Remove',
          tooltipPosition: 'bottom-left',
          onClick: this.handleRemove.bind(this) },
        _react2['default'].createElement(_materialUiLibSvgIconsContentClear2['default'], null)
      );
    }
  }, {
    key: 'handleTypeChange',
    value: function handleTypeChange(e, selectedIndex, item) {
      var type = item.payload;
      var seconds = this._getSeconds(type);

      this.setState({
        shuffleType: type,
        shuffleSeconds: seconds
      });
    }
  }, {
    key: 'handleShuffleTimesChange',
    value: function handleShuffleTimesChange(e) {
      var input = e.target.value;
      var isNumber = this._isNumber(input);
      var times = isNumber ? input : 0;
      var errorText = isNumber ? '' : 'Please input number';

      this.setState({
        errorText: errorText,
        shuffleTimes: times
      });
    }
  }, {
    key: 'handleRemove',
    value: function handleRemove(e) {
      this.props.removeHandler(this.props.cardId);
      this._removeState();
    }
  }, {
    key: 'handleFromRangeChange',
    value: function handleFromRangeChange(e) {
      var input = e.target.value;
      var isNumber = this._isNumber(input);
      var fromRange = isNumber ? input : -1;
      var errorText = isNumber ? '' : 'Please input number';

      this.setState({
        fromRangeError: errorText,
        fromRange: fromRange
      });
    }
  }, {
    key: 'handleToRangeChange',
    value: function handleToRangeChange(e) {
      var input = e.target.value;
      var isNumber = this._isNumber(input);
      var toRange = isNumber ? input : -1;
      var errorText = isNumber ? '' : 'Please input number';

      this.setState({
        toRangeError: errorText,
        toRange: toRange
      });
    }
  }, {
    key: 'handleEndFromRangeChange',
    value: function handleEndFromRangeChange(e) {
      var input = e.target.value;
      var isNumber = this._isNumber(input);
      var fromRange = isNumber ? input : -1;
      var errorText = isNumber ? '' : 'Please input number';

      this.setState({
        endFromRangeError: errorText,
        endFromRange: fromRange
      });
    }
  }, {
    key: 'handleEndToRangeChange',
    value: function handleEndToRangeChange(e) {
      var input = e.target.value;
      var isNumber = this._isNumber(input);
      var toRange = isNumber ? input : -1;
      var errorText = isNumber ? '' : 'Please input number';

      this.setState({
        endToRangeError: errorText,
        endToRange: toRange
      });
    }
  }, {
    key: 'handleStartRangeRandomCheck',
    value: function handleStartRangeRandomCheck(e, checked) {
      this.setState({
        startRangeUseRandom: checked,
        startRangeTextDisabled: checked
      });
    }
  }, {
    key: 'handleEndRangeRandomCheck',
    value: function handleEndRangeRandomCheck(e, checked) {
      this.setState({
        endRangeUseRandom: checked,
        endRangeTextDisabled: checked
      });
    }
  }, {
    key: '_emitState',
    value: function _emitState() {
      var item = {
        shuffleType: this.state.shuffleType,
        shuffleTimes: this.state.shuffleTimes,
        shuffleSeconds: this.state.shuffleSeconds
      };

      console.log("item.shuffleType: " + item.shuffleType);

      switch (item.shuffleType) {
        case 'cut':
        case 'deal':
          item.fromRange = this.state.fromRange;
          item.toRange = this.state.toRange;
          item.startIsRandom = this.state.startRangeUseRandom;
          break;

        case 'hindu':
          item.fromRange = this.state.fromRange;
          item.toRange = this.state.toRange;
          item.startIsRandom = this.state.startRangeUseRandom;
          item.endFromRange = this.state.endFromRange;
          item.endToRange = this.state.endToRange;
          item.endIsRandom = this.state.endRangeUseRandom;
          break;

        default:
          break;
      }

      _actionsShuffleActionCreators2['default'].addItemCondition(this.props.cardId, item);
    }
  }, {
    key: '_removeState',
    value: function _removeState() {
      _actionsShuffleActionCreators2['default'].removeItemCondition(this.props.cardId);
    }
  }, {
    key: '_isNumber',
    value: function _isNumber(input) {
      if (input.match(/[^0-9]+/)) {
        return false;
      }

      return true;
    }
  }, {
    key: '_getSeconds',
    value: function _getSeconds(type) {
      switch (type) {
        case 'cut':
          return 2;

        case 'hindu':
          return 3;

        case 'deal':
          return 30;

        case 'faro':
          return 7;

        default:
          return 2;
      }
    }
  }]);

  return ShuffleItem;
})(_react2['default'].Component);

ShuffleItem.defaultProps = {
  showRemoveButton: true,
  style: {}
};

module.exports = ShuffleItem;
//# sourceMappingURL=../../renderer/components/ShuffleItem.js.map