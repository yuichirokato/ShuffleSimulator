"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),_get=function(e,t,a){for(var r=!0;r;){var n=e,o=t,l=a;i=u=s=void 0,r=!1,null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,o);if(void 0!==i){if("value"in i)return i.value;var s=i.get;return void 0===s?void 0:s.call(l)}var u=Object.getPrototypeOf(n);if(null===u)return void 0;e=u,t=o,a=l,r=!0}},_react=require("react"),_react2=_interopRequireDefault(_react),_materialUi=require("material-ui"),_materialUi2=_interopRequireDefault(_materialUi),_actionsShuffleActionCreators=require("../../actions/ShuffleActionCreators"),_actionsShuffleActionCreators2=_interopRequireDefault(_actionsShuffleActionCreators),ThemeManager=new _materialUi2["default"].Styles.ThemeManager,modeItems=[{payload:"tramp",text:"Tramp"},{payload:"custom",text:"Custom"}],holdemItems=[{payload:"2",text:"2\b"},{payload:"3",text:"3\b"},{payload:"4",text:"4\b"},{payload:"5",text:"5\b"},{payload:"6",text:"6\b"},{payload:"7",text:"7\b"},{payload:"8",text:"8\b"}],styles={list:{display:"flex",flexGrow:1,flexDirection:"column",flexBasis:100},group:{marginTop:20,marginLeft:20},holdemToggle:{marginTop:15,marginRight:15},numberOfCardsField:{marginTop:10,marginBottom:10,marginLeft:20,width:150}},SideMenu=function(e){function t(){_classCallCheck(this,t),_get(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.state={mode:"tramp",holdemNumber:0,isRenderHoldemNumber:!1,errorText:""}}return _inherits(t,e),_createClass(t,null,[{key:"childContextTypes",value:{muiTheme:_react2["default"].PropTypes.object},enumerable:!0}]),_createClass(t,[{key:"getChildContext",value:function(){return{muiTheme:ThemeManager.getCurrentTheme()}}},{key:"render",value:function(){var e=this.renderTrampSettings();return"custom"===this.state.mode&&(e=this.renderCustomSettings()),_react2["default"].createElement(_materialUi.Card,{style:styles.list},_react2["default"].createElement(_materialUi.DropDownMenu,{menuItems:modeItems,onChange:this.handleModeChange.bind(this)}),e,_react2["default"].createElement(_materialUi.Toggle,{name:"displayProcess",label:"displayProcess",style:styles.holdemToggle,onToggle:this.handleDisplayProcessChange.bind(this)}))}},{key:"renderCustomSettings",value:function(){return _react2["default"].createElement(_materialUi.TextField,{style:styles.numberOfCardsField,floatingLabelText:"Number of cards",errorText:this.state.errorText,onChange:this.handleCustomCardsChange.bind(this)})}},{key:"renderTrampSettings",value:function(){var e=this.state.isRenderHoldemNumber?this.renderHoldemNumber():null;return _react2["default"].createElement("div",null,_react2["default"].createElement(_materialUi.Toggle,{style:styles.holdemToggle,name:"hold'em",label:"Texas Hold'em",onToggle:this.handleHoldemChange.bind(this)}),e)}},{key:"renderHoldemNumber",value:function(){return _react2["default"].createElement(_materialUi.DropDownMenu,{menuItems:holdemItems,onChange:this.handleHoldemNumberChange.bind(this)})}},{key:"handleHoldemChange",value:function(e,t){this.setState({isRenderHoldemNumber:t})}},{key:"handleHoldemNumberChange",value:function(e,t,a){this.setState({holdemNumber:a.payload})}},{key:"handleDisplayProcessChange",value:function(e,t){console.log("toggled: "+t),_actionsShuffleActionCreators2["default"].updateDisplayProcess(t)}},{key:"handleModeChange",value:function(e,t,a){this.setState({mode:a.payload})}},{key:"handleCustomCardsChange",value:function(e){var t=e.target.value;return t.match(/[^0-9]+/)?(this.setState({errorText:"Please input number"}),void _actionsShuffleActionCreators2["default"].updateCustomNumberOfCards(0)):(this.setState({errorText:""}),void _actionsShuffleActionCreators2["default"].updateCustomNumberOfCards(t))}}]),t}(_react2["default"].Component);module.exports=SideMenu;