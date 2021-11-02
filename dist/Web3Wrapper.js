"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.web3 = exports.toWei = exports.toEth = exports.signTransaction = exports.signAndSendTransaction = exports.sendSignedTransaction = exports.isSyncing = exports.getTransactionReceipt = exports.getTransactionCount = exports.getTransaction = exports.getBlockNumber = exports.getBlock = exports.getBalance = exports.getAccounts = void 0;

var _web = _interopRequireDefault(require("web3"));

var _index = require("../config/index.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var web3 = new _web["default"](_index.MAIN_NET_HTTP);
exports.web3 = web3;

var getBalance = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return web3.eth.getBalance(address);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getBalance(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getBalance = getBalance;

var getAccounts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return web3.eth.getAccounts();

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAccounts() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAccounts = getAccounts;

var getBlockNumber = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return web3.eth.getBlockNumber();

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getBlockNumber() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getBlockNumber = getBlockNumber;

var getBlock = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(blockHashIOrBlockNumber) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return web3.eth.getBlock(blockHashIOrBlockNumber);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getBlock(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getBlock = getBlock;

var isSyncing = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return web3.eth.isSyncing();

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function isSyncing() {
    return _ref5.apply(this, arguments);
  };
}();

exports.isSyncing = isSyncing;

var getTransactionCount = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(address) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return web3.eth.getTransactionCount(address);

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getTransactionCount(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getTransactionCount = getTransactionCount;

var getTransaction = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(transactionHash) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return web3.eth.getTransaction(transactionHash);

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getTransaction(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getTransaction = getTransaction;

var toEth = function toEth(wei) {
  return wei / 1000000000000000000;
};

exports.toEth = toEth;

var toWei = function toWei(eth) {
  return eth * 1000000000000000000;
};

exports.toWei = toWei;

var signAndSendTransaction = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(to, amount, gas, privateKey) {
    var Signed, receipt, transaction;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return signTransaction(to, amount, gas, privateKey);

          case 2:
            Signed = _context8.sent;
            _context8.next = 5;
            return sendSignedTransaction(Signed.rawTransaction);

          case 5:
            receipt = _context8.sent;
            _context8.next = 8;
            return getTransaction(receipt.transactionHash);

          case 8:
            transaction = _context8.sent;
            return _context8.abrupt("return", {
              signed: Signed,
              receipt: receipt,
              transaction: transaction
            });

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function signAndSendTransaction(_x5, _x6, _x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.signAndSendTransaction = signAndSendTransaction;

var signTransaction = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(to, amount, gas, privateKey) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return web3.eth.accounts.signTransaction({
              to: to,
              value: amount,
              gas: 2000000
            }, privateKey);

          case 2:
            return _context9.abrupt("return", _context9.sent);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function signTransaction(_x9, _x10, _x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

exports.signTransaction = signTransaction;

var sendSignedTransaction = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(rawTx) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return web3.eth.sendSignedTransaction(rawTx);

          case 2:
            return _context10.abrupt("return", _context10.sent);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function sendSignedTransaction(_x13) {
    return _ref10.apply(this, arguments);
  };
}();

exports.sendSignedTransaction = sendSignedTransaction;

var getTransactionReceipt = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(transactionHash) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return web3.eth.getTransactionReceipt(transactionHash);

          case 2:
            return _context11.abrupt("return", _context11.sent);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function getTransactionReceipt(_x14) {
    return _ref11.apply(this, arguments);
  };
}(); // export const getAccounts = async ()=>{
//     return await web3.eth.personal.getAccounts().then(console.log);
// }


exports.getTransactionReceipt = getTransactionReceipt;

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
  return regeneratorRuntime.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
        case "end":
          return _context12.stop();
      }
    }
  }, _callee12);
}))();
//# sourceMappingURL=Web3Wrapper.js.map