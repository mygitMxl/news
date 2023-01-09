"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _antd = require("antd");

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function usePublish(type) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      datasourse = _useState2[0],
      setdatasourse = _useState2[1];

  var _JSON$parse = JSON.parse(localStorage.getItem("token")),
      username = _JSON$parse.username;

  (0, _react.useEffect)(function () {
    (0, _axios["default"])("/news?author=".concat(username, "&publishState=").concat(type, "&_expand=category")).then(function (res) {
      // console.log(res.data)
      setdatasourse(res.data);
    });
  }, [username, type]);
  /* 发布按钮 */

  var handlePublish = function handlePublish(id) {
    setdatasourse(datasourse.filter(function (data) {
      return data.id !== id;
    }));

    _axios["default"].patch("/news/".concat(id), {
      "publishState": 2,
      "publishTime": Date.now()
    }).then(function (res) {
      _antd.notification.info({
        message: "\u901A\u77E5",
        description: "\u60A8\u53EF\u4EE5\u5230\u3010\u53D1\u5E03\u7BA1\u7406/\u5DF2\u7ECF\u53D1\u5E03\u3011\u4E2D\u67E5\u770B\u60A8\u7684\u65B0\u95FB",
        placement: "topRight"
      });
    });
  };
  /* 下线按钮 */


  var handleSunset = function handleSunset(id) {
    setdatasourse(datasourse.filter(function (item) {
      return item.id !== id;
    }));

    _axios["default"].patch("/news/".concat(id), {
      "publishState": 3
    }).then(function (res) {
      _antd.notification.info({
        message: "\u901A\u77E5",
        description: "\u60A8\u53EF\u4EE5\u5230\u3010\u53D1\u5E03\u7BA1\u7406/\u5DF2\u4E0B\u7EBF\u3011\u4E2D\u67E5\u770B\u60A8\u7684\u65B0\u95FB",
        placement: "bottomRight"
      });
    });
  };
  /* 删除去按钮 */


  var handleDelete = function handleDelete(id) {
    setdatasourse(datasourse.filter(function (item) {
      return item.id !== id;
    }));

    _axios["default"]["delete"]("/news/".concat(id)).then(function (res) {
      _antd.notification.info({
        message: "\u901A\u77E5",
        description: "\u60A8\u5DF2\u7ECF\u5220\u9664\u4E86\u5DF2\u4E0B\u7EBF\u7684\u65B0\u95FB",
        placement: "bottomRight"
      });
    });
  };

  return {
    datasourse: datasourse,
    handlePublish: handlePublish,
    handleSunset: handleSunset,
    handleDelete: handleDelete
  };
}

var _default = usePublish;
exports["default"] = _default;