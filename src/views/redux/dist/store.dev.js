"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _CollApsedReducer = _interopRequireDefault(require("./reducer/CollApsedReducer "));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducer = (0, _redux.combineReducers)({
  counter: _CollApsedReducer["default"]
});
var store = (0, _redux.legacy_createStore)(reducer, (0, _reduxDevtoolsExtension.composeWithDevTools)());
var _default = store;
exports["default"] = _default;