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

var _actionsShuffleActionCreators = require('../../actions/ShuffleActionCreators');

var _actionsShuffleActionCreators2 = _interopRequireDefault(_actionsShuffleActionCreators);

var ThemeManager = new _materialUi2['default'].Styles.ThemeManager();

ThemeManager.setTheme(ThemeManager.types.LIGHT);

var modeItems = [{ payload: "tramp", text: "Tramp" }, { payload: "custom", text: "Custom" }];

var holdemItems = [{ payload: '2', text: "2" }, { payload: '3', text: "3" }, { payload: '4', text: "4" }, { payload: '5', text: "5" }, { payload: '6', text: "6" }, { payload: '7', text: "7" }, { payload: '8', text: "8" }];

var styles = {
  list: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    flexBasis: 100
  },
  group: {
    marginTop: 20,
    marginLeft: 20
  },
  holdemToggle: {
    marginTop: 15,
    marginRight: 15
  },
  numberOfCardsField: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    width: 150
  }
};

var SideMenu = (function (_React$Component) {
  _inherits(SideMenu, _React$Component);

  _createClass(SideMenu, null, [{
    key: 'childContextTypes',
    value: {
      muiTheme: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  function SideMenu() {
    _classCallCheck(this, SideMenu);

    _get(Object.getPrototypeOf(SideMenu.prototype), 'constructor', this).call(this);
    this.state = {
      mode: 'tramp',
      holdemNumber: 0,
      isRenderHoldemNumber: false,
      errorText: ''
    };
  }

  _createClass(SideMenu, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }, {
    key: 'render',
    value: function render() {

      var body = this.renderTrampSettings();

      if (this.state.mode === 'custom') {
        body = this.renderCustomSettings();
      }

      return _react2['default'].createElement(
        _materialUi.Card,
        { style: styles.list },
        _react2['default'].createElement(_materialUi.DropDownMenu, { menuItems: modeItems,
          onChange: this.handleModeChange.bind(this) }),
        body,
        _react2['default'].createElement(_materialUi.Toggle, { name: 'displayProcess',
          label: 'displayProcess',
          style: styles.holdemToggle,
          onToggle: this.handleDisplayProcessChange.bind(this) })
      );
    }
  }, {
    key: 'renderCustomSettings',
    value: function renderCustomSettings() {
      return _react2['default'].createElement(_materialUi.TextField, {
        style: styles.numberOfCardsField,
        floatingLabelText: 'Number of cards',
        errorText: this.state.errorText,
        onChange: this.handleCustomCardsChange.bind(this) });
    }
  }, {
    key: 'renderTrampSettings',
    value: function renderTrampSettings() {
      var content = this.state.isRenderHoldemNumber ? this.renderHoldemNumber() : null;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_materialUi.Toggle, {
          style: styles.holdemToggle,
          name: 'hold\'em',
          label: 'Texas Hold\'em',
          onToggle: this.handleHoldemChange.bind(this) }),
        content
      );
    }
  }, {
    key: 'renderHoldemNumber',
    value: function renderHoldemNumber() {
      return _react2['default'].createElement(_materialUi.DropDownMenu, { menuItems: holdemItems,
        onChange: this.handleHoldemNumberChange.bind(this) });
    }
  }, {
    key: 'handleHoldemChange',
    value: function handleHoldemChange(e, toggled) {
      this.setState({
        isRenderHoldemNumber: toggled
      });
    }
  }, {
    key: 'handleHoldemNumberChange',
    value: function handleHoldemNumberChange(e, index, item) {
      this.setState({
        holdemNumber: item.payload
      });
    }
  }, {
    key: 'handleDisplayProcessChange',
    value: function handleDisplayProcessChange(e, toggled) {
      console.log("toggled: " + toggled);
      _actionsShuffleActionCreators2['default'].updateDisplayProcess(toggled);
    }
  }, {
    key: 'handleModeChange',
    value: function handleModeChange(e, index, item) {
      this.setState({
        mode: item.payload
      });
    }
  }, {
    key: 'handleCustomCardsChange',
    value: function handleCustomCardsChange(e) {
      var num = e.target.value;
      if (num.match(/[^0-9]+/)) {
        this.setState({
          errorText: "Please input number"
        });

        _actionsShuffleActionCreators2['default'].updateCustomNumberOfCards(0);
        return;
      }

      this.setState({
        errorText: ''
      });

      _actionsShuffleActionCreators2['default'].updateCustomNumberOfCards(num);
    }
  }]);

  return SideMenu;
})(_react2['default'].Component);

module.exports = SideMenu;
//# sourceMappingURL=../../renderer/components/SideMenu.js.map