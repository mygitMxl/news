"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("../views/redux/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.baseURL = 'http://localhost:8000';

_axios["default"].interceptors.request.use(function (config) {
  // Do something before request is sent
  // 显示loading
  _store["default"].dispatch({
    type: "change_loading",
    payload: true
  });

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
}); // Add a response interceptor


_axios["default"].interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  _store["default"].dispatch({
    type: "change_loading",
    payload: false
  }); //隐藏loading


  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  _store["default"].dispatch({
    type: "change_loading",
    payload: false
  }); //隐藏loading


  return Promise.reject(error);
});