"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.persistor = void 0;

var _redux = require("redux");

var _CollApsedReducer = _interopRequireDefault(require("./reducer/CollApsedReducer "));

var _isLoading = _interopRequireDefault(require("./reducer/isLoading"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// defaults to localStorage for web
var persistConfig = {
  key: 'mxl',
  //localstorage中的key值
  storage: _storage["default"],
  //本地存储
  whitelist: ['counter'] //白名单，写上谁,谁就会持久化,不写不会持久化

};
var reducer = (0, _redux.combineReducers)({
  counter: _CollApsedReducer["default"],
  loading: _isLoading["default"]
});
var persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, reducer);
/* 持久化reducer */

var store = (0, _redux.legacy_createStore)(persistedReducer, (0, _reduxDevtoolsExtension.composeWithDevTools)());
/* 把持久化reducer放入store' */

exports.store = store;
var persistor = (0, _reduxPersist.persistStore)(store);
/* 持久化store */

exports.persistor = persistor;