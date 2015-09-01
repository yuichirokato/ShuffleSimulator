"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_fs=require("fs"),_fs2=_interopRequireDefault(_fs),_path=require("path"),_path2=_interopRequireDefault(_path),dirHome=process.env["win32"==process.platform?"USERPROFILE":"HOME"],defaultPath=_path2["default"].join(dirHome,"Desktop"),FileWriter=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"writeCSV",value:function(e,t,r){console.log("write csv!");var n=this.arrayToCsvString(e),a=this.createSettingsTemplate(t),u=a+n;_fs2["default"].writeFileSync(defaultPath+"/result_"+r+".txt",u)}},{key:"writeProcess",value:function(e,t,r){var n=this.arrayToCsvString(e),a=this.createSettingsTemplate(t),u=n+a;_fs2["default"].writeFileSync(defaultPath+"/result_"+r+".txt",u)}},{key:"writeString",value:function(e,t){_fs2["default"].writeFileSync(defaultPath+"/result_"+t+".txt",e)}},{key:"arrayToCsvString",value:function(e){var t=this;return e.map(function(e){return t._cardToString(e)}).join(",")+"\r\n\n"}},{key:"createSettingsTemplate",value:function(e){var t="Type: "+e.shuffleType+", Range: "+e.fromRange+" ~ "+e.toRange+", Range2: "+e.endFromRange+" ~ "+e.endToRange+", Times: "+e.shuffleTimes+", \n\n";return t}},{key:"_cardToString",value:function(e){switch(e.sute){case"heart":return"1-"+e.number;case"speade":return"2-"+e.number;case"dia":return"3-"+e.number;case"club":return"4-"+e.number;default:return"1-"+e.number}}}]),e}();exports["default"]=new FileWriter,module.exports=exports["default"];