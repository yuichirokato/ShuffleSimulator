"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),_dispatcherAppDispatcher=require("../dispatcher/AppDispatcher"),_dispatcherAppDispatcher2=_interopRequireDefault(_dispatcherAppDispatcher),ShuffleActionCreators=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"addItemCondition",value:function(e,t){_dispatcherAppDispatcher2["default"].dispatch({type:"add",itemId:e,condition:t})}},{key:"removeItemCondition",value:function(e){_dispatcherAppDispatcher2["default"].dispatch({type:"remove",itemId:e})}},{key:"updateDisplayProcess",value:function(e){_dispatcherAppDispatcher2["default"].dispatch({type:"updateDisplayProcess",isDisplay:e})}},{key:"updateCustomNumberOfCards",value:function(e){_dispatcherAppDispatcher2["default"].dispatch({type:"updateCustomNumberOfCards",number:e})}}]),e}();exports["default"]=new ShuffleActionCreators,module.exports=exports["default"];