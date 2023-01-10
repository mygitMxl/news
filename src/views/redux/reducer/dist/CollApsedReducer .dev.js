"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Collapesed;
var mydata = {
  iscollapesed: false
};

function Collapesed() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mydata;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case 'change_collapsed':
      return {
        iscollapesed: !state.iscollapesed
      };

    default:
      return state;
  }
}