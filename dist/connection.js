"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = require("../config/index.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var getConnection = function getConnection() {
  // console.log('uri',MONGO_URI)
  _mongoose["default"].connect(_index.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  _mongoose["default"].Promise = global.Promise;
  var db = _mongoose["default"].connection;
  return db;
};

var _default = getConnection;
exports["default"] = _default;
//# sourceMappingURL=connection.js.map