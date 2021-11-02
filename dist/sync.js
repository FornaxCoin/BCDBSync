"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncBlockChain = exports.downloadBlockChain = exports.blockAndTransactionToDB = void 0;

var _Web3Wrapper = require("./Web3Wrapper.js");

var _index = require("../models/index.js");

var _Web3WebSocket = require("./Web3WebSocket.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = require('mongodb').ObjectID;

var syncBlockChain = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var response, responseCrash, currentBlock, previousCrash, latestBlock;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!true) {
              _context.next = 41;
              break;
            }

            console.log("inloop");
            _context.next = 4;
            return _index.Block.findOne({}).sort('-number');

          case 4:
            response = _context.sent;
            _context.next = 7;
            return _index.Block.findOne({
              number: null
            });

          case 7:
            responseCrash = _context.sent;
            currentBlock = -1;
            console.log("response", response);

            if (!(response !== null && response !== "" && !responseCrash)) {
              _context.next = 14;
              break;
            }

            currentBlock = response.number;
            _context.next = 22;
            break;

          case 14:
            _context.next = 16;
            return _index.Block.find({
              "_id": {
                "$lt": ObjectId(responseCrash.id)
              }
            }).sort({
              "_id": -1
            }).limit(1);

          case 16:
            previousCrash = _context.sent;
            //get the previous record of the given id
            currentBlock = previousCrash.number - 1;
            _context.next = 20;
            return _index.Block.deleteMany({
              number: {
                $gt: currentBlock
              }
            });

          case 20:
            _context.next = 22;
            return _index.Transaction.deleteMany({
              blockNumber: {
                $gt: currentBlock
              }
            });

          case 22:
            _context.next = 24;
            return (0, _Web3Wrapper.getBlock)('latest');

          case 24:
            latestBlock = _context.sent;
            console.log("currentBlock", currentBlock);

            if (!(currentBlock < latestBlock.number)) {
              _context.next = 32;
              break;
            }

            console.log("Downloading...");
            _context.next = 30;
            return downloadBlockChain(currentBlock + 1, latestBlock.number);

          case 30:
            _context.next = 39;
            break;

          case 32:
            if (!(currentBlock === latestBlock.number)) {
              _context.next = 39;
              break;
            }

            console.log("Syncing...");
            _context.next = 36;
            return (0, _Web3WebSocket.subscribeBlock)();

          case 36:
            return _context.abrupt("break", 41);

          case 39:
            _context.next = 0;
            break;

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function syncBlockChain() {
    return _ref.apply(this, arguments);
  };
}();

exports.syncBlockChain = syncBlockChain;

var downloadBlockChain = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fromBlockNumber, toBlockNumber) {
    var i;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Downloading...");
            i = fromBlockNumber;

          case 2:
            if (!(i <= toBlockNumber)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 5;
            return blockAndTransactionToDB(i);

          case 5:
            i++;
            _context2.next = 2;
            break;

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function downloadBlockChain(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.downloadBlockChain = downloadBlockChain;

var blockAndTransactionToDB = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(blockNumberOrBlockHash) {
    var block, newBlock, transactionsArray;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _Web3Wrapper.getBlock)(blockNumberOrBlockHash.toString());

          case 2:
            block = _context5.sent;
            newBlock = new _index.Block();
            newBlock = _objectSpread({}, block); // console.log("newBlocktransactions:",newBlock.transactions)

            transactionsArray = newBlock.transactions;
            newBlock.transactions = [];
            _context5.next = 9;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var receipt;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!(transactionsArray != null)) {
                        _context4.next = 3;
                        break;
                      }

                      _context4.next = 3;
                      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                        var _iterator, _step, transactionHash, transaction, newTransaction, response;

                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _iterator = _createForOfIteratorHelper(transactionsArray);
                                _context3.prev = 1;

                                _iterator.s();

                              case 3:
                                if ((_step = _iterator.n()).done) {
                                  _context3.next = 20;
                                  break;
                                }

                                transactionHash = _step.value;
                                _context3.next = 7;
                                return (0, _Web3Wrapper.getTransactionReceipt)(transactionHash);

                              case 7:
                                receipt = _context3.sent;
                                _context3.next = 10;
                                return (0, _Web3Wrapper.getTransaction)(transactionHash);

                              case 10:
                                transaction = _context3.sent;
                                newTransaction = new _index.Transaction(_objectSpread(_objectSpread({}, receipt), {}, {
                                  value: transaction.value,
                                  nonce: transaction.nonce,
                                  gasPrice: transaction.gasPrice,
                                  input: transaction.input
                                }));
                                console.log("transactionToDB:", newTransaction.transactionHash);
                                _context3.next = 15;
                                return newTransaction.save();

                              case 15:
                                response = _context3.sent;
                                console.log('transactionFromDB:', response.transactionHash);
                                newBlock.transactions.push(response._id);

                              case 18:
                                _context3.next = 3;
                                break;

                              case 20:
                                _context3.next = 25;
                                break;

                              case 22:
                                _context3.prev = 22;
                                _context3.t0 = _context3["catch"](1);

                                _iterator.e(_context3.t0);

                              case 25:
                                _context3.prev = 25;

                                _iterator.f();

                                return _context3.finish(25);

                              case 28:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3, null, [[1, 22, 25, 28]]);
                      }))();

                    case 3:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }))();

          case 9:
            console.log("blockToDB:", newBlock.number);
            _context5.next = 12;
            return _index.Block.create(newBlock);

          case 12:
            block = _context5.sent;
            console.log("blockFromBD:", block.number);

            if (!block.number) {
              process.exit(1);
            }

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function blockAndTransactionToDB(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.blockAndTransactionToDB = blockAndTransactionToDB;
//# sourceMappingURL=sync.js.map