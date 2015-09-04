"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),_get=function(e,t,a){for(var n=!0;n;){var r=e,s=t,l=a;i=u=o=void 0,n=!1,null===r&&(r=Function.prototype);var i=Object.getOwnPropertyDescriptor(r,s);if(void 0!==i){if("value"in i)return i.value;var o=i.get;return void 0===o?void 0:o.call(l)}var u=Object.getPrototypeOf(r);if(null===u)return void 0;e=u,t=s,a=l,n=!0}},_react=require("react"),_react2=_interopRequireDefault(_react),_materialUi=require("material-ui"),_materialUi2=_interopRequireDefault(_materialUi),_materialUiLibSvgIconsContentClear=require("material-ui/lib/svg-icons/content/clear"),_materialUiLibSvgIconsContentClear2=_interopRequireDefault(_materialUiLibSvgIconsContentClear),_actionsShuffleActionCreators=require("../../actions/ShuffleActionCreators"),_actionsShuffleActionCreators2=_interopRequireDefault(_actionsShuffleActionCreators),ThemeManager=new _materialUi2["default"].Styles.ThemeManager;ThemeManager.setTheme(ThemeManager.types.LIGHT);var shuffleTypes=[{payload:"cut",text:"Cut"},{payload:"hindu",text:"Hindu"},{payload:"faro",text:"Faro"},{payload:"deal",text:"Deal"}],styles={shuffleTimes:{width:100},shuffleItemHeader:{display:"flex",justifyContent:"space-between",alignItems:"center"},shuffleItemBody:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"},shuffleNumber:{alignSelf:"flex-start",marginLeft:25,marginBottom:30,width:150},rangeContainer:{display:"flex",alignItems:"center"},fromRange:{width:120,marginLeft:25},toRange:{width:120,marginLeft:25},checkbox:{marginLeft:20,marginTop:30,width:300}},ShuffleItem=function(e){function t(){_classCallCheck(this,t),_get(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.state={shuffleType:"cut",errorText:"",shuffleTimes:0,fromRaneError:"",toRangeError:"",endFromRangeError:"",endToRangeError:"",fromRange:-1,toRange:-1,endFromRange:-1,endToRange:-1,startRangeUseRandom:!1,startRangeTextDisabled:!1,endRangeUseRandom:!1,endRangeTextDisabled:!1,shuffleSeconds:2}}return _inherits(t,e),_createClass(t,null,[{key:"propTypes",value:{cardId:_react2["default"].PropTypes.number.isRequired,removeHandler:_react2["default"].PropTypes.func.isRequired,validateCheck:_react2["default"].PropTypes.func.isRequired,showRemoveButton:_react2["default"].PropTypes.bool,style:_react2["default"].PropTypes.object},enumerable:!0},{key:"childContextTypes",value:{muiTheme:_react2["default"].PropTypes.object},enumerable:!0}]),_createClass(t,[{key:"componentDidMount",value:function(){console.log("cardId: "+this.props.cardId),this._emitState()}},{key:"componentDidUpdate",value:function(e,t){this.state!==t&&this._emitState()}},{key:"getChildContext",value:function(){return{muiTheme:ThemeManager.getCurrentTheme()}}},{key:"render",value:function(){return _react2["default"].createElement(_materialUi.Card,{style:this.props.style},this.renderShuffleItemHeader(),this.renderShuffleBody(),this.renderShuffleNumber())}},{key:"renderShuffleItemHeader",value:function(){var e=null;return this.props.showRemoveButton&&(e=this.renderRemoveButton()),_react2["default"].createElement("div",{style:styles.shuffleItemHeader},_react2["default"].createElement(_materialUi.DropDownMenu,{menuItems:shuffleTypes,onChange:this.handleTypeChange.bind(this),style:{width:150}}),e)}},{key:"renderShuffleBody",value:function(){var e=null,t=null,a=this.state.shuffleType;return("cut"===a||"deal"===a)&&(e=this.renderDefaultRange()),"hindu"===a&&(e=this.renderHinduRange()),_react2["default"].createElement("div",{style:styles.shuffleItemBody},e,t)}},{key:"renderDefaultRange",value:function(e,t){return _react2["default"].createElement("div",{style:styles.rangeContainer},_react2["default"].createElement(_materialUi.TextField,{style:styles.fromRange,onChange:this.handleFromRangeChange.bind(this),floatingLabelText:e||"From range",errorText:this.state.fromRangeError,disabled:this.state.startRangeTextDisabled}),_react2["default"].createElement(_materialUi.TextField,{style:styles.toRange,onChange:this.handleToRangeChange.bind(this),floatingLabelText:t||"To range",errorText:this.state.toRangeError,disabled:this.state.startRangeTextDisabled}),_react2["default"].createElement(_materialUi.Checkbox,{style:styles.checkbox,name:"startRange",label:"Use Random Number",onCheck:this.handleStartRangeRandomCheck.bind(this)}))}},{key:"renderHinduRange",value:function(){return _react2["default"].createElement("div",null,this.renderDefaultRange("start from range","start to range"),_react2["default"].createElement("div",{style:styles.rangeContainer},_react2["default"].createElement(_materialUi.TextField,{style:styles.fromRange,onChange:this.handleEndFromRangeChange.bind(this),floatingLabelText:"end from range",errorText:this.state.endFromRangeError,disabled:this.state.endRangeTextDisabled}),_react2["default"].createElement(_materialUi.TextField,{style:styles.toRange,onChange:this.handleEndToRangeChange.bind(this),floatingLabelText:"end to range",errorText:this.state.endToRangeError,disabled:this.state.endRangeTextDisabled}),_react2["default"].createElement(_materialUi.Checkbox,{style:styles.checkbox,name:"endRange",label:"Use Random Number",onCheck:this.handleEndRangeRandomCheck.bind(this)})))}},{key:"renderShuffleNumber",value:function(){return _react2["default"].createElement(_materialUi.TextField,{style:styles.shuffleNumber,onChange:this.handleShuffleTimesChange.bind(this),floatingLabelText:"Shuffle Times",errorText:this.state.errorText})}},{key:"renderRemoveButton",value:function(){return _react2["default"].createElement(_materialUi.IconButton,{tooltip:"Remove",tooltipPosition:"bottom-left",onClick:this.handleRemove.bind(this)},_react2["default"].createElement(_materialUiLibSvgIconsContentClear2["default"],null))}},{key:"handleTypeChange",value:function(e,t,a){var n=a.payload,r=this._getSeconds(n);this.setState({shuffleType:n,shuffleSeconds:r})}},{key:"handleShuffleTimesChange",value:function(e){var t=e.target.value,a=this._isNumber(t),n=a?t:0,r=a?"":"Please input number";this.setState({errorText:r,shuffleTimes:n})}},{key:"handleRemove",value:function(e){this.props.removeHandler(this.props.cardId),this._removeState()}},{key:"handleFromRangeChange",value:function(e){var t=e.target.value,a=this._isNumber(t),n=a?t:-1,r=a?"":"Please input number";this.setState({fromRangeError:r,fromRange:n})}},{key:"handleToRangeChange",value:function(e){var t=e.target.value,a=this._isNumber(t),n=a?t:-1,r=a?"":"Please input number";this.setState({toRangeError:r,toRange:n})}},{key:"handleEndFromRangeChange",value:function(e){var t=e.target.value,a=this._isNumber(t),n=a?t:-1,r=a?"":"Please input number";this.setState({endFromRangeError:r,endFromRange:n})}},{key:"handleEndToRangeChange",value:function(e){var t=e.target.value,a=this._isNumber(t),n=a?t:-1,r=a?"":"Please input number";this.setState({endToRangeError:r,endToRange:n})}},{key:"handleStartRangeRandomCheck",value:function(e,t){this.setState({startRangeUseRandom:t,startRangeTextDisabled:t})}},{key:"handleEndRangeRandomCheck",value:function(e,t){this.setState({endRangeUseRandom:t,endRangeTextDisabled:t})}},{key:"_emitState",value:function(){var e={shuffleType:this.state.shuffleType,shuffleTimes:this.state.shuffleTimes,shuffleSeconds:this.state.shuffleSeconds};switch(console.log("item.shuffleType: "+e.shuffleType),e.shuffleType){case"cut":case"deal":e.fromRange=this.state.fromRange,e.toRange=this.state.toRange,e.startIsRandom=this.state.startRangeUseRandom;break;case"hindu":e.fromRange=this.state.fromRange,e.toRange=this.state.toRange,e.startIsRandom=this.state.startRangeUseRandom,e.endFromRange=this.state.endFromRange,e.endToRange=this.state.endToRange,e.endIsRandom=this.state.endRangeUseRandom}_actionsShuffleActionCreators2["default"].addItemCondition(this.props.cardId,e)}},{key:"_removeState",value:function(){_actionsShuffleActionCreators2["default"].removeItemCondition(this.props.cardId)}},{key:"_isNumber",value:function(e){return e.match(/[^0-9]+/)?!1:!0}},{key:"_getSeconds",value:function(e){switch(e){case"cut":return 2;case"hindu":return 3;case"deal":return 30;case"faro":return 7;default:return 2}}}]),t}(_react2["default"].Component);ShuffleItem.defaultProps={showRemoveButton:!0,style:{}},module.exports=ShuffleItem;