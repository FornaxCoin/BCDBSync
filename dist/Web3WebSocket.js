"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeBlock = void 0;

var _web = _interopRequireDefault(require("web3"));

var _sync = require("./sync.js");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var web3 = new _web["default"](new _web["default"].providers.WebsocketProvider(_config.MAIN_NET_WS));

var subscribeBlock = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var subscription;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            subscription = web3.eth.subscribe('newBlockHeaders', function (error, result) {
              if (!error) {
                console.log(result);
                return;
              }

              console.error(error);
            }).on("connected", function (subscriptionId) {
              console.log(subscriptionId);
            }).on("data", function (blockHeader) {
              console.log(blockHeader);

              _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _sync.blockAndTransactionToDB)(blockHeader.number);

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }))();
            }).on("error", console.error);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function subscribeBlock() {
    return _ref.apply(this, arguments);
  };
}();

exports.subscribeBlock = subscribeBlock;
//# sourceMappingURL=Web3WebSocket.js.map