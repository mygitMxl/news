"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Loading;
var mydata = {
  isLoading: false
};

function Loading() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mydata;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'change_loading':
      return {
        isLoading: action.payload
      };

    default:
      return state;
  }
}