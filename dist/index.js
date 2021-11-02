"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEST_NET_WS = exports.TEST_NET_PORT_WS = exports.TEST_NET_PORT_HTTP = exports.TEST_NET_HTTP = exports.TEST = exports.NET_WS = exports.NET_HTTP = exports.MONGO_URI = exports.MAIN_NET_WS = exports.MAIN_NET_PORT_WS = exports.MAIN_NET_PORT_HTTP = exports.MAIN_NET_HTTP = exports.MAIN = void 0;

var _dotenv = require("dotenv");

var _config = (0, _dotenv.config)(),
    parsed = _config.parsed;

var MAIN = parsed.MAIN,
    TEST = parsed.TEST,
    TEST_NET_PORT_HTTP = parsed.TEST_NET_PORT_HTTP,
    TEST_NET_PORT_WS = parsed.TEST_NET_PORT_WS,
    MAIN_NET_PORT_HTTP = parsed.MAIN_NET_PORT_HTTP,
    MAIN_NET_PORT_WS = parsed.MAIN_NET_PORT_WS,
    NET_HTTP = parsed.NET_HTTP,
    NET_WS = parsed.NET_WS,
    _parsed$TEST_NET_HTTP = parsed.TEST_NET_HTTP,
    TEST_NET_HTTP = _parsed$TEST_NET_HTTP === void 0 ? "".concat(NET_HTTP).concat(TEST, ":").concat(TEST_NET_PORT_HTTP) : _parsed$TEST_NET_HTTP,
    _parsed$TEST_NET_WS = parsed.TEST_NET_WS,
    TEST_NET_WS = _parsed$TEST_NET_WS === void 0 ? "".concat(NET_WS).concat(TEST, ":").concat(TEST_NET_PORT_WS) : _parsed$TEST_NET_WS,
    _parsed$MAIN_NET_WS = parsed.MAIN_NET_WS,
    MAIN_NET_WS = _parsed$MAIN_NET_WS === void 0 ? 'wss://node.watchfornax.com/ws' : _parsed$MAIN_NET_WS,
    _parsed$MAIN_NET_HTTP = parsed.MAIN_NET_HTTP,
    MAIN_NET_HTTP = _parsed$MAIN_NET_HTTP === void 0 ? 'https://node.watchfornax.com/rpc' : _parsed$MAIN_NET_HTTP,
    MONGO_URI = parsed.MONGO_URI;
exports.MONGO_URI = MONGO_URI;
exports.MAIN_NET_HTTP = MAIN_NET_HTTP;
exports.MAIN_NET_WS = MAIN_NET_WS;
exports.TEST_NET_WS = TEST_NET_WS;
exports.TEST_NET_HTTP = TEST_NET_HTTP;
exports.NET_WS = NET_WS;
exports.NET_HTTP = NET_HTTP;
exports.MAIN_NET_PORT_WS = MAIN_NET_PORT_WS;
exports.MAIN_NET_PORT_HTTP = MAIN_NET_PORT_HTTP;
exports.TEST_NET_PORT_WS = TEST_NET_PORT_WS;
exports.TEST_NET_PORT_HTTP = TEST_NET_PORT_HTTP;
exports.TEST = TEST;
exports.MAIN = MAIN;
//# sourceMappingURL=index.js.map