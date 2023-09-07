/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
    _require$codes = _require.codes,
    ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
    ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;

var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");

var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require2.inspect;

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isPromise = _require$types.isPromise,
    isRegExp = _require$types.isRegExp;

var objectAssign = Object.assign ? Object.assign : (__webpack_require__(/*! es6-object-assign */ "./node_modules/es6-object-assign/index.js").assign);
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;

function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");

  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
} // Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex


var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];

var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};

var warned = false; // The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}

function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;

  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }

    if (argsLen === 2) operator = '!=';
  }

  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };

  if (message !== undefined) {
    errArgs.message = message;
  }

  var err = new AssertionError(errArgs);

  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }

  throw err;
}

assert.fail = fail; // The AssertionError is defined in internal/error.

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;

    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }

    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
} // Pure assertion tests whether a value is truthy, as determined
// by !!value.


function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  innerOk.apply(void 0, [ok, args.length].concat(args));
}

assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.

/* eslint-disable no-restricted-properties */

assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
}; // The non-equality assertion tests for whether two objects are not
// equal with !=.


assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
}; // The equivalence assertion tests a deep equality relation.


assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
}; // The non-equivalence assertion tests for any deep inequality.


assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */


assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;

function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};

var Comparison = function Comparison(obj, keys, actual) {
  var _this = this;

  _classCallCheck(this, Comparison);

  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
};

function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }

    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}

function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.

    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    } // Handle primitives properly.


    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }

    var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
    // as well.

    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }

    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
        return;
      }

      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  } // Guard instanceof against arrow functions as they don't have a prototype.


  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION_SENTINEL;
}

function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.
  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.
  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;

    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn(); // Fail in case no promise is returned.

      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }

    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}

function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }

    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }

    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }

  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';

    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }

    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }

  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}

function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;

  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }

  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }

  throw actual;
}

assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};

assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};

assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};

assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};

assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';

    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }

    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    }); // Make sure we actually have a stack trace!

    var origStack = err.stack;

    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift(); // Filter all frames existing in err.stack.

      var tmp1 = newErr.stack.split('\n');

      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);

        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }

      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }

    throw newErr;
  }
}; // Expose a strict only variant of assert


function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  innerOk.apply(void 0, [strict, args.length].concat(args));
}

assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require.inspect;

var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
    ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat


function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));

  while (count) {
    str += str;
    count--;
  }

  str += str.substring(0, maxCount - str.length);
  return str;
}

var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
}; // Comparing short primitives should just show === / !== instead of using the
// diff.

var kMaxShortLength = 10;

function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}

function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}

function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.

  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  } // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.


  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.

    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;

      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        } // Ignore the first characters.


        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  } // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).


  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];

  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }

    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }

  var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.


    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);

      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }

    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }

  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }

  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }

  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");

  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;

    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the expected line to the cache.

      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++; // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the actual line to the result.

      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++; // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.

      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //

      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }

      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }

          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        } // Mark the current line as the last diverging one.


        lastPos = i; // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.

        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2; // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = ''; // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.

        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    } // Inspected object to big (Show ~20 rows max)


    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }

  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}

var AssertionError =
/*#__PURE__*/
function (_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(options) {
    var _this;

    _classCallCheck(this, AssertionError);

    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    var message = options.message,
        operator = options.operator,
        stackStartFn = options.stackStartFn;
    var actual = options.actual,
        expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;

    if (message != null) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      } // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.


      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }

      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.

        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        } // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.


        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);

          while (res.length > 27) {
            res.pop();
          }
        } // Only print a single input.


        if (res.length === 1) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
        } else {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
        }
      } else {
        var _res = inspectValue(actual);

        var other = '';
        var knownOperators = kReadableOperator[operator];

        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);

          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));

          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }

          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }

          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
      }
    }

    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;

    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    } // Create error message including the error code in the name.


    _this.stack; // Reset the name.

    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }

  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: inspect.custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread({}, ctx, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);

  return AssertionError;
}(_wrapNativeSuper(Error));

module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */

/* eslint node-core/alphabetize-errors: "error" */

/* eslint node-core/prefer-util-format-errors: "error" */
 // The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codes = {}; // Lazy loaded

var assert;
var util;

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inherits(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      var _this;

      _classCallCheck(this, NodeError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
      _this.code = code;
      return _this;
    }

    return NodeError;
  }(Base);

  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'

  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);

  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }

  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;

  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }

  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });

  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;

    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;

    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }

  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var regexFlagsSupported = /a/g.flags !== undefined;

var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};

var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};

var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
    isArrayBufferView = _require$types.isArrayBufferView,
    isDate = _require$types.isDate,
    isMap = _require$types.isMap,
    isRegExp = _require$types.isRegExp,
    isSet = _require$types.isSet,
    isNativeError = _require$types.isNativeError,
    isBoxedPrimitive = _require$types.isBoxedPrimitive,
    isNumberObject = _require$types.isNumberObject,
    isStringObject = _require$types.isStringObject,
    isBooleanObject = _require$types.isBooleanObject,
    isBigIntObject = _require$types.isBigIntObject,
    isSymbolObject = _require$types.isSymbolObject,
    isFloat32Array = _require$types.isFloat32Array,
    isFloat64Array = _require$types.isFloat64Array;

function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;

  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  } // The maximum size for an array is 2 ** 32 -1.


  return key.length === 10 && key >= Math.pow(2, 32);
}

function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
} // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3; // Check if they have the same source and flags

function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}

function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }

  return true;
}

function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}

function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}

function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }

  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }

  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }

  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }

  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
} // Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.


function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  } // Check more closely if val1 and val2 are equal.


  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }

    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }

    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }

      return false;
    }

    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }

  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }

    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.


  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }

  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    } // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.


    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);

    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (_keys.length !== _keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }

  return keyCheck(val1, val2, strict, memos, kNoIterator);
}

function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}

function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.

    if (aKeys.length !== bKeys.length) {
      return false;
    }
  } // Cheap key test


  var i = 0;

  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }

  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);

    if (symbolKeysA.length !== 0) {
      var count = 0;

      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];

        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }

          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }

      var symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }

  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  } // Use memos to handle cycles.


  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);

    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);

      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }

    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}

function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];

    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
} // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').


function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;

    case 'object':
      // Only pass in null as object!
      return undefined;

    case 'symbol':
      return false;

    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through

    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }

  }

  return true;
}

function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}

function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);

  if (altValue != null) {
    return altValue;
  }

  var curB = b.get(altValue);

  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }

  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}

function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);

  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.

    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      } // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.


      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.

      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }

      if (set === null) {
        set = new Set();
      }

      set.add(val);
    }
  }

  if (set !== null) {
    var bValues = arrayFromSet(b);

    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i]; // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.

      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];

    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);

  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
        key = _aEntries$i[0],
        item1 = _aEntries$i[1];

    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }

      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);

      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
        // keys.

        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;

        if (set === null) {
          set = new Set();
        }

        set.add(key);
      }
    }
  }

  if (set !== null) {
    var bEntries = arrayFromMap(b);

    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
          key = _bEntries$_i[0],
          item = _bEntries$_i[1];

      if (_typeof(key) === 'object' && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);

        for (; i < keysA.length; i++) {
          var key = keysA[i];

          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }

        if (keysA.length !== Object.keys(b).length) {
          return false;
        }

        return true;
      }
    }
  } // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:


  for (i = 0; i < keys.length; i++) {
    var _key = keys[i];

    if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
      return false;
    }
  }

  return true;
}

function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}

function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}

module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./src/pug/components/contact/contact.js":
/*!***********************************************!*\
  !*** ./src/pug/components/contact/contact.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var just_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-validate */ "./node_modules/just-validate/dist/just-validate.es.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");

if (document.querySelector('form').classList.contains('contact__form')) {
  var validationTwo = new just_validate__WEBPACK_IMPORTED_MODULE_0__["default"]('.contact__form', {
    errorFieldCssClass: "error",
    errorLabelCssClass: "error",
    successFieldCssClass: "success",
    focusInvalidField: false,
    lockForm: false
  });
  validationTwo.addField('#contact__form-name', [{
    rule: 'minLength',
    value: 2,
    errorMessage: 'Имя должно содержать более 2 символов'
  }, {
    rule: 'maxLength',
    value: 30
  }, {
    rule: 'required',
    value: true,
    errorMessage: 'Введите имя!'
  }]).addField('#contact__form-email', [{
    rule: 'required',
    value: true,
    errorMessage: 'Email обязателен'
  }, {
    rule: 'email',
    value: true,
    errorMessage: 'Введите корректный Email'
  }]).onSuccess(function (event) {
    var formData = new FormData(event.target);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    };
    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
    event.target.reset();
    document.querySelectorAll('.contact__form-input').forEach(function (e) {
      e.classList.remove('success');
    });
  });
}

/***/ }),

/***/ "./src/pug/components/form/form.js":
/*!*****************************************!*\
  !*** ./src/pug/components/form/form.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var just_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-validate */ "./node_modules/just-validate/dist/just-validate.es.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");

if (document.querySelector('form').classList.contains('form')) {
  var form = document.querySelector('.form');
  var telSelector = form.querySelector('input[type="tel"]');
  var inputMask = new Inputmask('+7 (999) 999-99-99');
  inputMask.mask(telSelector);
  var validation = new just_validate__WEBPACK_IMPORTED_MODULE_0__["default"]('.form', {
    errorFieldCssClass: "error",
    errorLabelCssClass: "error",
    successFieldCssClass: "success",
    focusInvalidField: false,
    lockForm: false
  });
  validation.addField('#name', [{
    rule: 'minLength',
    value: 2,
    errorMessage: 'Имя должно содержать более 2 символов'
  }, {
    rule: 'maxLength',
    value: 30
  }, {
    rule: 'required',
    value: true,
    errorMessage: 'Введите имя!'
  }]).addField('#telegram', [{
    rule: 'minLength',
    value: 2,
    errorMessage: 'Ник либо id не может содержать менее 2 символов'
  }, {
    rule: 'maxLength',
    value: 30
  }, {
    rule: 'required',
    value: true,
    errorMessage: 'Введите ник либо id вашего telegram!'
  }]).addField('#email', [{
    rule: 'required',
    value: true,
    errorMessage: 'Email обязателен'
  }, {
    rule: 'email',
    value: true,
    errorMessage: 'Введите корректный Email'
  }]).addField('#tel', [{
    rule: 'required',
    value: true,
    errorMessage: 'Телефон обязателен'
  }, {
    rule: 'function',
    validator: function validator() {
      var phone = telSelector.inputmask.unmaskedvalue();
      return phone.length === 10;
    },
    errorMessage: 'Введите корректный телефон'
  }]).onSuccess(function (event) {
    var formData = new FormData(event.target);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    };
    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
    event.target.reset();
    document.querySelectorAll('.form__input').forEach(function (e) {
      e.classList.remove('success');
    });
  });
}

/***/ }),

/***/ "./src/pug/static/header/burger/burger.js":
/*!************************************************!*\
  !*** ./src/pug/static/header/burger/burger.js ***!
  \************************************************/
/***/ (() => {

//Добавление класса lock для body при открытии меню=====================================================================
// import {body_lock, unlock} from '../../../../js/files/functions';
var unlock = true;

// BodyLock
function body_lock(delay) {
  var body = document.querySelector("body");
  if (body.classList.contains('_lock')) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}
function body_lock_remove(delay) {
  var body = document.querySelector("body");
  if (unlock) {
    var lock_padding = document.querySelectorAll("._lp");
    setTimeout(function () {
      for (var index = 0; index < lock_padding.length; index++) {
        var el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove("_lock");
    }, delay);
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
function body_lock_add(delay) {
  var body = document.querySelector("body");
  if (unlock) {
    var lock_padding = document.querySelectorAll("._lp");
    for (var index = 0; index < lock_padding.length; index++) {
      var el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.classList.add("_lock");
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
var bodyLockStatus = true;
var bodyLockToggle = function bodyLockToggle() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (document.documentElement.classList.contains('_lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
var bodyUnlock = function bodyUnlock() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var body = document.querySelector("body");
  if (bodyLockStatus) {
    var lock_padding = document.querySelectorAll("._lp");
    setTimeout(function () {
      for (var index = 0; index < lock_padding.length; index++) {
        var el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      document.documentElement.classList.remove("_lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
var bodyLock = function bodyLock() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var body = document.querySelector("body");
  if (bodyLockStatus) {
    var lock_padding = document.querySelectorAll("._lp");
    for (var index = 0; index < lock_padding.length; index++) {
      var el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    document.documentElement.classList.add("_lock");
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};

//Добавление класса бургеру===================================================================================
var iconMenu = document.querySelector(".icon-menu");
var menuBody = document.querySelector('.menu__body');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    if (unlock) {
      body_lock();
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    }
  });
}
//Прокрутка по клику и закрытие меню============================================================================
var menuLinks = document.querySelectorAll('._link[data-link]');
if (menuLinks.length > 0) {
  var onMenuLinkClick = function onMenuLinkClick(e) {
    var menuLink = e.target;
    if (menuLink.dataset.link && document.querySelector(menuLink.dataset.link)) {
      var linkBlock = document.querySelector(menuLink.dataset.link);
      var linkBlockValue = linkBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
      if (iconMenu.classList.contains('_active')) {
        if (unlock) {
          body_lock();
          iconMenu.classList.toggle('_active');
          menuBody.classList.toggle('_active');
        }
      }
      window.scrollTo({
        top: linkBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  };
  menuLinks.forEach(function (menuLink) {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
}

// const navigation = document.querySelector('.header');
// const navigationHeight = navigation.offsetHeight;
// document.documentElement.style.setProperty(
// 	'--scroll-padding',
// 	navigationHeight + 'px'
// )

var spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length > 0) {
  // Инициализация
  var initSpoilers = function initSpoilers(spoilersArray) {
    var matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    spoilersArray.forEach(function (spoilersBlock) {
      spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
      if (matchMedia.matches || !matchMedia) {
        spoilersBlock.classList.add('_init');
        initSpoilerBody(spoilersBlock);
        spoilersBlock.addEventListener("click", setSpoilerAction);
      } else {
        spoilersBlock.classList.remove('_init');
        initSpoilerBody(spoilersBlock, false);
        spoilersBlock.removeEventListener("click", setSpoilerAction);
      }
    });
  }; // Работа с контентом
  var initSpoilerBody = function initSpoilerBody(spoilersBlock) {
    var hideSpoilerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
    if (spoilerTitles.length > 0) {
      spoilerTitles.forEach(function (spoilerTitle) {
        if (hideSpoilerBody) {
          spoilerTitle.removeAttribute('tabindex');
          if (!spoilerTitle.classList.contains('_active')) {
            spoilerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spoilerTitle.setAttribute('tabindex', '-1');
          spoilerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  };
  var setSpoilerAction = function setSpoilerAction(e) {
    var el = e.target;
    if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
      var spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
      var spoilersBlock = spoilerTitle.closest('[data-spoilers]');
      var oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
      if (!spoilersBlock.querySelectorAll('._slide').length) {
        if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
          hideSpoilersBody(spoilersBlock);
        }
        spoilerTitle.classList.toggle('_active');
        _slideToggle(spoilerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  };
  var hideSpoilersBody = function hideSpoilersBody(spoilersBlock) {
    var spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
    if (spoilerActiveTitle) {
      spoilerActiveTitle.classList.remove('_active');
      _slideUp(spoilerActiveTitle.nextElementSibling, 500);
    }
  };
  // Получение обычных спойлеров
  var spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
    return !item.dataset.spoilers.split(",")[0];
  });
  // Инициализация обычных спойлеров
  if (spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular);
  }

  // Получение спойлеров с медиа запросами
  var spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
    return item.dataset.spoilers.split(",")[0];
  });

  // Инициализация спойлеров с медиа запросами
  if (spoilersMedia.length > 0) {
    var breakpointsArray = [];
    spoilersMedia.forEach(function (item) {
      var params = item.dataset.spoilers;
      var breakpoint = {};
      var paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные брейкпоинты
    var mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach(function (breakpoint) {
      var paramsArray = breakpoint.split(",");
      var mediaBreakpoint = paramsArray[1];
      var mediaType = paramsArray[2];
      var matchMedia = window.matchMedia(paramsArray[0]);

      // Объекты с нужными условиями
      var spoilersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      // Событие
      matchMedia.addListener(function () {
        initSpoilers(spoilersArray, matchMedia);
      });
      initSpoilers(spoilersArray, matchMedia);
    });
  }
}

// SlideToggle
var _slideUp = function _slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
var _slideDown = function _slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
var _slideToggle = function _slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "./node_modules/util/util.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

try {
	null.error; // eslint-disable-line no-unused-expressions
} catch (e) {
	// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
	var errorProto = getProto(getProto(e));
	INTRINSICS['%Error.prototype%'] = errorProto;
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/just-validate/dist/just-validate.es.js":
/*!*************************************************************!*\
  !*** ./node_modules/just-validate/dist/just-validate.es.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomStyleTagIds": () => (/* binding */ CustomStyleTagIds),
/* harmony export */   "GroupRules": () => (/* binding */ GroupRules),
/* harmony export */   "Rules": () => (/* binding */ Rules),
/* harmony export */   "default": () => (/* binding */ JustValidate)
/* harmony export */ });
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const INTEGER_REGEXP = /^-?[0-9]\d*$/;
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const STRONG_PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isEmpty = (value) => {
  let newVal = value;
  if (typeof value === "string") {
    newVal = value.trim();
  }
  return !newVal;
};
const isEmail = (value) => {
  return EMAIL_REGEXP.test(value);
};
const isLengthMoreThanMax = (value, len) => {
  return value.length > len;
};
const isLengthLessThanMin = (value, len) => {
  return value.length < len;
};
const isNumber = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  return !isNaN(+value) && !isNaN(parseFloat(value));
};
const isInteger = (value) => {
  return INTEGER_REGEXP.test(value);
};
const isPassword = (value) => {
  return PASSWORD_REGEXP.test(value);
};
const isStrongPassword = (value) => {
  return STRONG_PASSWORD_REGEXP.test(value);
};
const isNumberMoreThanMax = (value, len) => {
  return value > len;
};
const isNumberLessThanMin = (value, len) => {
  return value < len;
};
const isInvalidOrEmptyString = (value) => {
  return typeof value !== "string" || value === "";
};
var Rules = /* @__PURE__ */ ((Rules2) => {
  Rules2["Required"] = "required";
  Rules2["Email"] = "email";
  Rules2["MinLength"] = "minLength";
  Rules2["MaxLength"] = "maxLength";
  Rules2["Password"] = "password";
  Rules2["Number"] = "number";
  Rules2["Integer"] = "integer";
  Rules2["MaxNumber"] = "maxNumber";
  Rules2["MinNumber"] = "minNumber";
  Rules2["StrongPassword"] = "strongPassword";
  Rules2["CustomRegexp"] = "customRegexp";
  Rules2["MinFilesCount"] = "minFilesCount";
  Rules2["MaxFilesCount"] = "maxFilesCount";
  Rules2["Files"] = "files";
  return Rules2;
})(Rules || {});
var GroupRules = /* @__PURE__ */ ((GroupRules2) => {
  GroupRules2["Required"] = "required";
  return GroupRules2;
})(GroupRules || {});
var CustomStyleTagIds = /* @__PURE__ */ ((CustomStyleTagIds2) => {
  CustomStyleTagIds2["Label"] = "label";
  CustomStyleTagIds2["LabelArrow"] = "labelArrow";
  return CustomStyleTagIds2;
})(CustomStyleTagIds || {});
const defaultDictionary = [
  {
    key: Rules.Required,
    dict: {
      en: "The field is required"
    }
  },
  {
    key: Rules.Email,
    dict: {
      en: "Email has invalid format"
    }
  },
  {
    key: Rules.MaxLength,
    dict: {
      en: "The field must contain a maximum of :value characters"
    }
  },
  {
    key: Rules.MinLength,
    dict: {
      en: "The field must contain a minimum of :value characters"
    }
  },
  {
    key: Rules.Password,
    dict: {
      en: "Password must contain minimum eight characters, at least one letter and one number"
    }
  },
  {
    key: Rules.StrongPassword,
    dict: {
      en: "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    }
  },
  {
    key: Rules.Number,
    dict: {
      en: "Value should be a number"
    }
  },
  {
    key: Rules.MaxNumber,
    dict: {
      en: "Number should be less or equal than :value"
    }
  },
  {
    key: Rules.MinNumber,
    dict: {
      en: "Number should be more or equal than :value"
    }
  },
  {
    key: Rules.MinFilesCount,
    dict: {
      en: "Files count should be more or equal than :value"
    }
  },
  {
    key: Rules.MaxFilesCount,
    dict: {
      en: "Files count should be less or equal than :value"
    }
  },
  {
    key: Rules.Files,
    dict: {
      en: "Uploaded files have one or several invalid properties (extension/size/type etc)."
    }
  }
];
const DEFAULT_ERROR_FIELD_MESSAGE = "Value is incorrect";
const isPromise = (val) => typeof val === "object" && val !== null && "then" in val && typeof val.then === "function";
const getNodeParents = (el) => {
  let elem = el;
  const els = [];
  while (elem) {
    els.unshift(elem);
    elem = elem.parentNode;
  }
  return els;
};
const getClosestParent = (groups, parents) => {
  const reversedParents = [...parents].reverse();
  for (let i = 0, len = reversedParents.length; i < len; ++i) {
    const parent = reversedParents[i];
    for (const key in groups) {
      const group = groups[key];
      if (group.groupElem === parent) {
        return [key, group];
      }
    }
  }
  return null;
};
const getClassList = (classList) => {
  if (Array.isArray(classList)) {
    return classList.filter((cls) => cls.length > 0);
  }
  if (typeof classList === "string" && classList.trim()) {
    return [...classList.split(" ").filter((cls) => cls.length > 0)];
  }
  return [];
};
const isElement = (element) => {
  return element instanceof Element || element instanceof HTMLDocument;
};
const errorLabelCss = `.just-validate-error-label[data-tooltip=true]{position:fixed;padding:4px 8px;background:#423f3f;color:#fff;white-space:nowrap;z-index:10;border-radius:4px;transform:translateY(-5px)}.just-validate-error-label[data-tooltip=true]:before{content:'';width:0;height:0;border-left:solid 5px transparent;border-right:solid 5px transparent;border-bottom:solid 5px #423f3f;position:absolute;z-index:3;display:block;bottom:-5px;transform:rotate(180deg);left:calc(50% - 5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]{transform:translateX(-5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]:before{right:-7px;bottom:auto;left:auto;top:calc(50% - 2px);transform:rotate(90deg)}.just-validate-error-label[data-tooltip=true][data-direction=right]{transform:translateX(5px)}.just-validate-error-label[data-tooltip=true][data-direction=right]:before{right:auto;bottom:auto;left:-7px;top:calc(50% - 2px);transform:rotate(-90deg)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]{transform:translateY(5px)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]:before{right:auto;bottom:auto;left:calc(50% - 5px);top:-5px;transform:rotate(0)}`;
const TOOLTIP_ARROW_HEIGHT = 5;
const defaultGlobalConfig = {
  errorFieldStyle: {
    color: "#b81111",
    border: "1px solid #B81111"
  },
  errorFieldCssClass: "just-validate-error-field",
  successFieldCssClass: "just-validate-success-field",
  errorLabelStyle: {
    color: "#b81111"
  },
  errorLabelCssClass: "just-validate-error-label",
  successLabelCssClass: "just-validate-success-label",
  focusInvalidField: true,
  lockForm: true,
  testingMode: false,
  validateBeforeSubmitting: false
};
class JustValidate {
  constructor(form, globalConfig, dictLocale) {
    __publicField(this, "form", null);
    __publicField(this, "fields", {});
    __publicField(this, "groupFields", {});
    __publicField(this, "errors", {});
    __publicField(this, "isValid", false);
    __publicField(this, "isSubmitted", false);
    __publicField(this, "globalConfig", defaultGlobalConfig);
    __publicField(this, "errorLabels", {});
    __publicField(this, "successLabels", {});
    __publicField(this, "eventListeners", []);
    __publicField(this, "dictLocale", defaultDictionary);
    __publicField(this, "currentLocale", "en");
    __publicField(this, "customStyleTags", {});
    __publicField(this, "onSuccessCallback");
    __publicField(this, "onFailCallback");
    __publicField(this, "onValidateCallback");
    __publicField(this, "tooltips", []);
    __publicField(this, "lastScrollPosition");
    __publicField(this, "isScrollTick");
    __publicField(this, "fieldIds", /* @__PURE__ */ new Map());
    __publicField(this, "getKeyByFieldSelector", (field) => {
      return this.fieldIds.get(field);
    });
    __publicField(this, "getFieldSelectorByKey", (key) => {
      for (const [fieldSelector, k] of this.fieldIds) {
        if (key === k) {
          return fieldSelector;
        }
      }
      return void 0;
    });
    __publicField(this, "getCompatibleFields", () => {
      const fields = {};
      Object.keys(this.fields).forEach((key) => {
        let newKey = key;
        const fieldSelector = this.getFieldSelectorByKey(key);
        if (typeof fieldSelector === "string") {
          newKey = fieldSelector;
        }
        fields[newKey] = { ...this.fields[key] };
      });
      return fields;
    });
    __publicField(this, "setKeyByFieldSelector", (field) => {
      if (this.fieldIds.has(field)) {
        return this.fieldIds.get(field);
      }
      const key = String(this.fieldIds.size + 1);
      this.fieldIds.set(field, key);
      return key;
    });
    __publicField(this, "refreshAllTooltips", () => {
      this.tooltips.forEach((item) => {
        item.refresh();
      });
    });
    __publicField(this, "handleDocumentScroll", () => {
      this.lastScrollPosition = window.scrollY;
      if (!this.isScrollTick) {
        window.requestAnimationFrame(() => {
          this.refreshAllTooltips();
          this.isScrollTick = false;
        });
        this.isScrollTick = true;
      }
    });
    __publicField(this, "formSubmitHandler", (ev) => {
      ev.preventDefault();
      this.isSubmitted = true;
      this.validateHandler(ev);
    });
    __publicField(this, "handleFieldChange", (target) => {
      let foundKey;
      for (const key in this.fields) {
        const field = this.fields[key];
        if (field.elem === target) {
          foundKey = key;
          break;
        }
      }
      if (!foundKey) {
        return;
      }
      this.fields[foundKey].touched = true;
      this.validateField(foundKey, true);
    });
    __publicField(this, "handleGroupChange", (target) => {
      let foundKey;
      for (const key in this.groupFields) {
        const group = this.groupFields[key];
        if (group.elems.find((elem) => elem === target)) {
          foundKey = key;
          break;
        }
      }
      if (!foundKey) {
        return;
      }
      this.groupFields[foundKey].touched = true;
      this.validateGroup(foundKey, true);
    });
    __publicField(this, "handlerChange", (ev) => {
      if (!ev.target) {
        return;
      }
      this.handleFieldChange(ev.target);
      this.handleGroupChange(ev.target);
      this.renderErrors();
    });
    this.initialize(form, globalConfig, dictLocale);
  }
  initialize(form, globalConfig, dictLocale) {
    this.form = null;
    this.errors = {};
    this.isValid = false;
    this.isSubmitted = false;
    this.globalConfig = defaultGlobalConfig;
    this.errorLabels = {};
    this.successLabels = {};
    this.eventListeners = [];
    this.customStyleTags = {};
    this.tooltips = [];
    this.currentLocale = "en";
    if (typeof form === "string") {
      const elem = document.querySelector(form);
      if (!elem) {
        throw Error(
          `Form with ${form} selector not found! Please check the form selector`
        );
      }
      this.setForm(elem);
    } else if (form instanceof HTMLFormElement) {
      this.setForm(form);
    } else {
      throw Error(
        `Form selector is not valid. Please specify a string selector or a DOM element.`
      );
    }
    this.globalConfig = { ...defaultGlobalConfig, ...globalConfig };
    if (dictLocale) {
      this.dictLocale = [...dictLocale, ...defaultDictionary];
    }
    if (this.isTooltip()) {
      const styleTag = document.createElement("style");
      styleTag.textContent = errorLabelCss;
      this.customStyleTags[CustomStyleTagIds.Label] = document.head.appendChild(styleTag);
      this.addListener("scroll", document, this.handleDocumentScroll);
    }
  }
  getLocalisedString(rule, ruleValue, customMsg) {
    var _a;
    const search = customMsg != null ? customMsg : rule;
    let localisedStr = (_a = this.dictLocale.find((item) => item.key === search)) == null ? void 0 : _a.dict[this.currentLocale];
    if (!localisedStr) {
      if (customMsg) {
        localisedStr = customMsg;
      }
    }
    if (localisedStr && ruleValue !== void 0) {
      switch (rule) {
        case Rules.MaxLength:
        case Rules.MinLength:
        case Rules.MaxNumber:
        case Rules.MinNumber:
        case Rules.MinFilesCount:
        case Rules.MaxFilesCount:
          localisedStr = localisedStr.replace(":value", String(ruleValue));
      }
    }
    return localisedStr || customMsg || DEFAULT_ERROR_FIELD_MESSAGE;
  }
  getFieldErrorMessage(fieldRule, elem) {
    const msg = typeof fieldRule.errorMessage === "function" ? fieldRule.errorMessage(this.getElemValue(elem), this.fields) : fieldRule.errorMessage;
    return this.getLocalisedString(fieldRule.rule, fieldRule.value, msg);
  }
  getFieldSuccessMessage(successMessage, elem) {
    const msg = typeof successMessage === "function" ? successMessage(this.getElemValue(elem), this.fields) : successMessage;
    return this.getLocalisedString(void 0, void 0, msg);
  }
  getGroupErrorMessage(groupRule) {
    return this.getLocalisedString(
      groupRule.rule,
      void 0,
      groupRule.errorMessage
    );
  }
  getGroupSuccessMessage(groupRule) {
    if (!groupRule.successMessage) {
      return void 0;
    }
    return this.getLocalisedString(
      void 0,
      void 0,
      groupRule.successMessage
    );
  }
  setFieldInvalid(key, fieldRule) {
    this.fields[key].isValid = false;
    this.fields[key].errorMessage = this.getFieldErrorMessage(
      fieldRule,
      this.fields[key].elem
    );
  }
  setFieldValid(key, successMessage) {
    this.fields[key].isValid = true;
    if (successMessage !== void 0) {
      this.fields[key].successMessage = this.getFieldSuccessMessage(
        successMessage,
        this.fields[key].elem
      );
    }
  }
  setGroupInvalid(key, groupRule) {
    this.groupFields[key].isValid = false;
    this.groupFields[key].errorMessage = this.getGroupErrorMessage(groupRule);
  }
  setGroupValid(key, groupRule) {
    this.groupFields[key].isValid = true;
    this.groupFields[key].successMessage = this.getGroupSuccessMessage(groupRule);
  }
  getElemValue(elem) {
    switch (elem.type) {
      case "checkbox":
        return elem.checked;
      case "file":
        return elem.files;
      default:
        return elem.value;
    }
  }
  validateGroupRule(key, elems, groupRule) {
    switch (groupRule.rule) {
      case GroupRules.Required: {
        if (elems.every((elem) => !elem.checked)) {
          this.setGroupInvalid(key, groupRule);
        } else {
          this.setGroupValid(key, groupRule);
        }
      }
    }
  }
  validateFieldRule(key, elem, fieldRule, afterInputChanged = false) {
    const ruleValue = fieldRule.value;
    const elemValue = this.getElemValue(elem);
    if (fieldRule.plugin) {
      const result = fieldRule.plugin(
        elemValue,
        this.getCompatibleFields()
      );
      if (!result) {
        this.setFieldInvalid(key, fieldRule);
      }
      return;
    }
    switch (fieldRule.rule) {
      case Rules.Required: {
        if (isEmpty(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.Email: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isEmail(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MaxLength: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (isLengthMoreThanMax(elemValue, ruleValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MinLength: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (isLengthLessThanMin(elemValue, ruleValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.Password: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isPassword(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.StrongPassword: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isStrongPassword(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.Number: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isNumber(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.Integer: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isInteger(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MaxNumber: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        const num = +elemValue;
        if (Number.isNaN(num) || isNumberMoreThanMax(num, ruleValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MinNumber: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        const num = +elemValue;
        if (Number.isNaN(num) || isNumberLessThanMin(num, ruleValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.CustomRegexp: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        let regexp;
        try {
          regexp = new RegExp(ruleValue);
        } catch (e) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] should be a valid regexp. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        const str = String(elemValue);
        if (str !== "" && !regexp.test(str)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MinFilesCount: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (Number.isFinite(elemValue == null ? void 0 : elemValue.length) && elemValue.length < ruleValue) {
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        break;
      }
      case Rules.MaxFilesCount: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (Number.isFinite(elemValue == null ? void 0 : elemValue.length) && elemValue.length > ruleValue) {
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        break;
      }
      case Rules.Files: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        if (typeof ruleValue !== "object") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be an object. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        const filesConfig = ruleValue.files;
        if (typeof filesConfig !== "object") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be an object with files array. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        const isFilePropsInvalid = (file, fileConfig) => {
          const minSizeInvalid = Number.isFinite(fileConfig.minSize) && file.size < fileConfig.minSize;
          const maxSizeInvalid = Number.isFinite(fileConfig.maxSize) && file.size > fileConfig.maxSize;
          const nameInvalid = Array.isArray(fileConfig.names) && !fileConfig.names.includes(file.name);
          const extInvalid = Array.isArray(fileConfig.extensions) && !fileConfig.extensions.includes(
            file.name.split(".")[file.name.split(".").length - 1]
          );
          const typeInvalid = Array.isArray(fileConfig.types) && !fileConfig.types.includes(file.type);
          return minSizeInvalid || maxSizeInvalid || nameInvalid || extInvalid || typeInvalid;
        };
        if (typeof elemValue === "object" && elemValue !== null) {
          for (let fileIdx = 0, len = elemValue.length; fileIdx < len; ++fileIdx) {
            const file = elemValue.item(fileIdx);
            if (!file) {
              this.setFieldInvalid(key, fieldRule);
              break;
            }
            const filesInvalid = isFilePropsInvalid(file, filesConfig);
            if (filesInvalid) {
              this.setFieldInvalid(key, fieldRule);
              break;
            }
          }
        }
        break;
      }
      default: {
        if (typeof fieldRule.validator !== "function") {
          console.error(
            `Validator for custom rule for [${key}] field should be a function. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        const result = fieldRule.validator(
          elemValue,
          this.getCompatibleFields()
        );
        if (typeof result !== "boolean" && typeof result !== "function") {
          console.error(
            `Validator return value for [${key}] field should be boolean or function. It will be cast to boolean.`
          );
        }
        if (typeof result === "function") {
          if (afterInputChanged) {
            this.fields[key].asyncCheckPending = true;
          } else {
            this.fields[key].asyncCheckPending = false;
            const promise = result();
            if (!isPromise(promise)) {
              console.error(
                `Validator function for custom rule for [${key}] field should return a Promise. This field will be always invalid.`
              );
              this.setFieldInvalid(key, fieldRule);
              return;
            }
            return promise.then((resp) => {
              if (!resp) {
                this.setFieldInvalid(key, fieldRule);
              }
            }).catch(() => {
              this.setFieldInvalid(key, fieldRule);
            });
          }
        }
        if (!result) {
          this.setFieldInvalid(key, fieldRule);
        }
      }
    }
  }
  isFormValid() {
    let isValid = true;
    for (let i = 0, len = Object.values(this.fields).length; i < len; ++i) {
      const item = Object.values(this.fields)[i];
      if (item.isValid === void 0) {
        isValid = void 0;
        break;
      }
      if (item.isValid === false) {
        isValid = false;
        break;
      }
    }
    for (let i = 0, len = Object.values(this.groupFields).length; i < len; ++i) {
      const item = Object.values(this.groupFields)[i];
      if (item.isValid === void 0) {
        isValid = void 0;
        break;
      }
      if (item.isValid === false) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
  validateField(key, afterInputChanged = false) {
    var _a;
    const field = this.fields[key];
    field.isValid = true;
    const promises = [];
    [...field.rules].reverse().forEach((rule) => {
      const res = this.validateFieldRule(
        key,
        field.elem,
        rule,
        afterInputChanged
      );
      if (isPromise(res)) {
        promises.push(res);
      }
    });
    if (field.isValid) {
      this.setFieldValid(key, (_a = field.config) == null ? void 0 : _a.successMessage);
    }
    return Promise.allSettled(promises).finally(() => {
      var _a2;
      if (afterInputChanged) {
        (_a2 = this.onValidateCallback) == null ? void 0 : _a2.call(this, {
          isValid: this.isFormValid(),
          isSubmitted: this.isSubmitted,
          fields: this.getCompatibleFields(),
          groups: { ...this.groupFields }
        });
      }
    });
  }
  revalidateField(fieldSelector) {
    if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
      throw Error(
        `Field selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    const key = this.getKeyByFieldSelector(fieldSelector);
    if (!key || !this.fields[key]) {
      console.error(`Field not found. Check the field selector.`);
      return Promise.reject();
    }
    return new Promise((resolve) => {
      this.validateField(key, true).finally(() => {
        this.clearFieldStyle(key);
        this.clearFieldLabel(key);
        this.renderFieldError(key, true);
        resolve(!!this.fields[key].isValid);
      });
    });
  }
  revalidateGroup(groupSelector) {
    if (typeof groupSelector !== "string" && !isElement(groupSelector)) {
      throw Error(
        `Group selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    const key = this.getKeyByFieldSelector(groupSelector);
    if (!key || !this.groupFields[key]) {
      console.error(`Group not found. Check the group selector.`);
      return Promise.reject();
    }
    return new Promise((resolve) => {
      this.validateGroup(key).finally(() => {
        this.clearFieldLabel(key);
        this.renderGroupError(key, true);
        resolve(!!this.groupFields[key].isValid);
      });
    });
  }
  validateGroup(key, afterInputChanged = false) {
    const group = this.groupFields[key];
    const promises = [];
    [...group.rules].reverse().forEach((rule) => {
      const res = this.validateGroupRule(key, group.elems, rule);
      if (isPromise(res)) {
        promises.push(res);
      }
    });
    return Promise.allSettled(promises).finally(() => {
      var _a;
      if (afterInputChanged) {
        (_a = this.onValidateCallback) == null ? void 0 : _a.call(this, {
          isValid: this.isFormValid(),
          isSubmitted: this.isSubmitted,
          fields: this.getCompatibleFields(),
          groups: { ...this.groupFields }
        });
      }
    });
  }
  focusInvalidField() {
    for (const key in this.fields) {
      const field = this.fields[key];
      if (!field.isValid) {
        setTimeout(() => field.elem.focus(), 0);
        break;
      }
    }
  }
  afterSubmitValidation(forceRevalidation = false) {
    this.renderErrors(forceRevalidation);
    if (this.globalConfig.focusInvalidField) {
      this.focusInvalidField();
    }
  }
  validate(forceRevalidation = false) {
    return new Promise((resolve) => {
      const promises = [];
      Object.keys(this.fields).forEach((key) => {
        const promise = this.validateField(key);
        if (isPromise(promise)) {
          promises.push(promise);
        }
      });
      Object.keys(this.groupFields).forEach((key) => {
        const promise = this.validateGroup(key);
        if (isPromise(promise)) {
          promises.push(promise);
        }
      });
      Promise.allSettled(promises).then(() => {
        var _a;
        this.afterSubmitValidation(forceRevalidation);
        (_a = this.onValidateCallback) == null ? void 0 : _a.call(this, {
          isValid: this.isFormValid(),
          isSubmitted: this.isSubmitted,
          fields: this.getCompatibleFields(),
          groups: { ...this.groupFields }
        });
        resolve(!!promises.length);
      });
    });
  }
  revalidate() {
    return new Promise((resolve) => {
      this.validateHandler(void 0, true).finally(() => {
        if (this.globalConfig.focusInvalidField) {
          this.focusInvalidField();
        }
        resolve(this.isValid);
      });
    });
  }
  validateHandler(ev, forceRevalidation = false) {
    if (this.globalConfig.lockForm) {
      this.lockForm();
    }
    return this.validate(forceRevalidation).finally(() => {
      var _a, _b;
      if (this.globalConfig.lockForm) {
        this.unlockForm();
      }
      if (this.isValid) {
        (_a = this.onSuccessCallback) == null ? void 0 : _a.call(this, ev);
      } else {
        (_b = this.onFailCallback) == null ? void 0 : _b.call(this, this.getCompatibleFields(), this.groupFields);
      }
    });
  }
  setForm(form) {
    this.form = form;
    this.form.setAttribute("novalidate", "novalidate");
    this.removeListener("submit", this.form, this.formSubmitHandler);
    this.addListener("submit", this.form, this.formSubmitHandler);
  }
  addListener(type, elem, handler) {
    elem.addEventListener(type, handler);
    this.eventListeners.push({ type, elem, func: handler });
  }
  removeListener(type, elem, handler) {
    elem.removeEventListener(type, handler);
    this.eventListeners = this.eventListeners.filter(
      (item) => item.type !== type || item.elem !== elem
    );
  }
  addField(fieldSelector, rules, config) {
    if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
      throw Error(
        `Field selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    let elem;
    if (typeof fieldSelector === "string") {
      elem = this.form.querySelector(fieldSelector);
    } else {
      elem = fieldSelector;
    }
    if (!elem) {
      throw Error(
        `Field doesn't exist in the DOM! Please check the field selector.`
      );
    }
    if (!Array.isArray(rules) || !rules.length) {
      throw Error(
        `Rules argument should be an array and should contain at least 1 element.`
      );
    }
    rules.forEach((item) => {
      if (!("rule" in item || "validator" in item || "plugin" in item)) {
        throw Error(
          `Rules argument must contain at least one rule or validator property.`
        );
      }
      if (!item.validator && !item.plugin && (!item.rule || !Object.values(Rules).includes(item.rule))) {
        throw Error(
          `Rule should be one of these types: ${Object.values(Rules).join(
            ", "
          )}. Provided value: ${item.rule}`
        );
      }
    });
    const key = this.setKeyByFieldSelector(fieldSelector);
    this.fields[key] = {
      elem,
      rules,
      isValid: void 0,
      touched: false,
      config
    };
    this.setListeners(elem);
    if (this.isSubmitted || this.globalConfig.validateBeforeSubmitting) {
      this.validateField(key);
    }
    return this;
  }
  removeField(fieldSelector) {
    if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
      throw Error(
        `Field selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    const key = this.getKeyByFieldSelector(fieldSelector);
    if (!key || !this.fields[key]) {
      console.error(`Field not found. Check the field selector.`);
      return this;
    }
    const type = this.getListenerType(this.fields[key].elem.type);
    this.removeListener(type, this.fields[key].elem, this.handlerChange);
    this.clearErrors();
    delete this.fields[key];
    return this;
  }
  removeGroup(group) {
    if (typeof group !== "string") {
      throw Error(
        `Group selector is not valid. Please specify a string selector.`
      );
    }
    const key = this.getKeyByFieldSelector(group);
    if (!key || !this.groupFields[key]) {
      console.error(`Group not found. Check the group selector.`);
      return this;
    }
    this.groupFields[key].elems.forEach((elem) => {
      const type = this.getListenerType(elem.type);
      this.removeListener(type, elem, this.handlerChange);
    });
    this.clearErrors();
    delete this.groupFields[key];
    return this;
  }
  addRequiredGroup(groupField, errorMessage, config, successMessage) {
    if (typeof groupField !== "string" && !isElement(groupField)) {
      throw Error(
        `Group selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    let elem;
    if (typeof groupField === "string") {
      elem = this.form.querySelector(groupField);
    } else {
      elem = groupField;
    }
    if (!elem) {
      throw Error(`Group selector not found! Please check the group selector.`);
    }
    const inputs = elem.querySelectorAll("input");
    const childrenInputs = Array.from(inputs).filter((input) => {
      const parent = getClosestParent(this.groupFields, getNodeParents(input));
      if (!parent) {
        return true;
      }
      return parent[1].elems.find((elem2) => elem2 !== input);
    });
    const key = this.setKeyByFieldSelector(groupField);
    this.groupFields[key] = {
      rules: [
        {
          rule: GroupRules.Required,
          errorMessage,
          successMessage
        }
      ],
      groupElem: elem,
      elems: childrenInputs,
      touched: false,
      isValid: void 0,
      config
    };
    inputs.forEach((input) => {
      this.setListeners(input);
    });
    return this;
  }
  getListenerType(type) {
    switch (type) {
      case "checkbox":
      case "select-one":
      case "file":
      case "radio": {
        return "change";
      }
      default: {
        return "input";
      }
    }
  }
  setListeners(elem) {
    const type = this.getListenerType(elem.type);
    this.removeListener(type, elem, this.handlerChange);
    this.addListener(type, elem, this.handlerChange);
  }
  clearFieldLabel(key) {
    var _a, _b;
    (_a = this.errorLabels[key]) == null ? void 0 : _a.remove();
    (_b = this.successLabels[key]) == null ? void 0 : _b.remove();
  }
  clearFieldStyle(key) {
    var _a, _b, _c, _d;
    const field = this.fields[key];
    const errorStyle = ((_a = field.config) == null ? void 0 : _a.errorFieldStyle) || this.globalConfig.errorFieldStyle;
    Object.keys(errorStyle).forEach((key2) => {
      field.elem.style[key2] = "";
    });
    const successStyle = ((_b = field.config) == null ? void 0 : _b.successFieldStyle) || this.globalConfig.successFieldStyle || {};
    Object.keys(successStyle).forEach((key2) => {
      field.elem.style[key2] = "";
    });
    field.elem.classList.remove(
      ...getClassList(
        ((_c = field.config) == null ? void 0 : _c.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
      ),
      ...getClassList(
        ((_d = field.config) == null ? void 0 : _d.successFieldCssClass) || this.globalConfig.successFieldCssClass
      )
    );
  }
  clearErrors() {
    var _a, _b;
    Object.keys(this.errorLabels).forEach(
      (key) => this.errorLabels[key].remove()
    );
    Object.keys(this.successLabels).forEach(
      (key) => this.successLabels[key].remove()
    );
    for (const key in this.fields) {
      this.clearFieldStyle(key);
    }
    for (const key in this.groupFields) {
      const group = this.groupFields[key];
      const errorStyle = ((_a = group.config) == null ? void 0 : _a.errorFieldStyle) || this.globalConfig.errorFieldStyle;
      Object.keys(errorStyle).forEach((key2) => {
        group.elems.forEach((elem) => {
          var _a2;
          elem.style[key2] = "";
          elem.classList.remove(
            ...getClassList(
              ((_a2 = group.config) == null ? void 0 : _a2.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
            )
          );
        });
      });
      const successStyle = ((_b = group.config) == null ? void 0 : _b.successFieldStyle) || this.globalConfig.successFieldStyle || {};
      Object.keys(successStyle).forEach((key2) => {
        group.elems.forEach((elem) => {
          var _a2;
          elem.style[key2] = "";
          elem.classList.remove(
            ...getClassList(
              ((_a2 = group.config) == null ? void 0 : _a2.successFieldCssClass) || this.globalConfig.successFieldCssClass
            )
          );
        });
      });
    }
    this.tooltips = [];
  }
  isTooltip() {
    return !!this.globalConfig.tooltip;
  }
  lockForm() {
    const elems = this.form.querySelectorAll(
      "input, textarea, button, select"
    );
    for (let i = 0, len = elems.length; i < len; ++i) {
      elems[i].setAttribute(
        "data-just-validate-fallback-disabled",
        elems[i].disabled ? "true" : "false"
      );
      elems[i].setAttribute("disabled", "disabled");
      elems[i].style.pointerEvents = "none";
      elems[i].style.webkitFilter = "grayscale(100%)";
      elems[i].style.filter = "grayscale(100%)";
    }
  }
  unlockForm() {
    const elems = this.form.querySelectorAll(
      "input, textarea, button, select"
    );
    for (let i = 0, len = elems.length; i < len; ++i) {
      if (elems[i].getAttribute("data-just-validate-fallback-disabled") !== "true") {
        elems[i].removeAttribute("disabled");
      }
      elems[i].style.pointerEvents = "";
      elems[i].style.webkitFilter = "";
      elems[i].style.filter = "";
    }
  }
  renderTooltip(elem, errorLabel, position) {
    var _a;
    const { top, left, width, height } = elem.getBoundingClientRect();
    const errorLabelRect = errorLabel.getBoundingClientRect();
    const pos = position || ((_a = this.globalConfig.tooltip) == null ? void 0 : _a.position);
    switch (pos) {
      case "left": {
        errorLabel.style.top = `${top + height / 2 - errorLabelRect.height / 2}px`;
        errorLabel.style.left = `${left - errorLabelRect.width - TOOLTIP_ARROW_HEIGHT}px`;
        break;
      }
      case "top": {
        errorLabel.style.top = `${top - errorLabelRect.height - TOOLTIP_ARROW_HEIGHT}px`;
        errorLabel.style.left = `${left + width / 2 - errorLabelRect.width / 2}px`;
        break;
      }
      case "right": {
        errorLabel.style.top = `${top + height / 2 - errorLabelRect.height / 2}px`;
        errorLabel.style.left = `${left + width + TOOLTIP_ARROW_HEIGHT}px`;
        break;
      }
      case "bottom": {
        errorLabel.style.top = `${top + height + TOOLTIP_ARROW_HEIGHT}px`;
        errorLabel.style.left = `${left + width / 2 - errorLabelRect.width / 2}px`;
        break;
      }
    }
    errorLabel.dataset.direction = pos;
    const refresh = () => {
      this.renderTooltip(elem, errorLabel, position);
    };
    return {
      refresh
    };
  }
  createErrorLabelElem(key, errorMessage, config) {
    const errorLabel = document.createElement("div");
    errorLabel.innerHTML = errorMessage;
    const customErrorLabelStyle = this.isTooltip() ? config == null ? void 0 : config.errorLabelStyle : (config == null ? void 0 : config.errorLabelStyle) || this.globalConfig.errorLabelStyle;
    Object.assign(errorLabel.style, customErrorLabelStyle);
    errorLabel.classList.add(
      ...getClassList(
        (config == null ? void 0 : config.errorLabelCssClass) || this.globalConfig.errorLabelCssClass
      ),
      "just-validate-error-label"
    );
    if (this.isTooltip()) {
      errorLabel.dataset.tooltip = "true";
    }
    if (this.globalConfig.testingMode) {
      errorLabel.dataset.testId = `error-label-${key}`;
    }
    this.errorLabels[key] = errorLabel;
    return errorLabel;
  }
  createSuccessLabelElem(key, successMessage, config) {
    if (successMessage === void 0) {
      return null;
    }
    const successLabel = document.createElement("div");
    successLabel.innerHTML = successMessage;
    const customSuccessLabelStyle = (config == null ? void 0 : config.successLabelStyle) || this.globalConfig.successLabelStyle;
    Object.assign(successLabel.style, customSuccessLabelStyle);
    successLabel.classList.add(
      ...getClassList(
        (config == null ? void 0 : config.successLabelCssClass) || this.globalConfig.successLabelCssClass
      ),
      "just-validate-success-label"
    );
    if (this.globalConfig.testingMode) {
      successLabel.dataset.testId = `success-label-${key}`;
    }
    this.successLabels[key] = successLabel;
    return successLabel;
  }
  renderErrorsContainer(label, errorsContainer) {
    const container = errorsContainer || this.globalConfig.errorsContainer;
    if (typeof container === "string") {
      const elem = this.form.querySelector(container);
      if (elem) {
        elem.appendChild(label);
        return true;
      } else {
        console.error(
          `Error container with ${container} selector not found. Errors will be rendered as usual`
        );
      }
    }
    if (container instanceof Element) {
      container.appendChild(label);
      return true;
    }
    if (container !== void 0) {
      console.error(
        `Error container not found. It should be a string or existing Element. Errors will be rendered as usual`
      );
    }
    return false;
  }
  renderGroupLabel(elem, label, errorsContainer, isSuccess) {
    if (!isSuccess) {
      const renderedInErrorsContainer = this.renderErrorsContainer(
        label,
        errorsContainer
      );
      if (renderedInErrorsContainer) {
        return;
      }
    }
    elem.appendChild(label);
  }
  renderFieldLabel(elem, label, errorsContainer, isSuccess) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!isSuccess) {
      const renderedInErrorsContainer = this.renderErrorsContainer(
        label,
        errorsContainer
      );
      if (renderedInErrorsContainer) {
        return;
      }
    }
    if (elem.type === "checkbox" || elem.type === "radio") {
      const labelElem = document.querySelector(
        `label[for="${elem.getAttribute("id")}"]`
      );
      if (((_b = (_a = elem.parentElement) == null ? void 0 : _a.tagName) == null ? void 0 : _b.toLowerCase()) === "label") {
        (_d = (_c = elem.parentElement) == null ? void 0 : _c.parentElement) == null ? void 0 : _d.appendChild(label);
      } else if (labelElem) {
        (_e = labelElem.parentElement) == null ? void 0 : _e.appendChild(label);
      } else {
        (_f = elem.parentElement) == null ? void 0 : _f.appendChild(label);
      }
    } else {
      (_g = elem.parentElement) == null ? void 0 : _g.appendChild(label);
    }
  }
  showLabels(fields, isError) {
    Object.keys(fields).forEach((fieldName, i) => {
      const error = fields[fieldName];
      const key = this.getKeyByFieldSelector(fieldName);
      if (!key || !this.fields[key]) {
        console.error(`Field not found. Check the field selector.`);
        return;
      }
      const field = this.fields[key];
      field.isValid = !isError;
      this.clearFieldStyle(key);
      this.clearFieldLabel(key);
      this.renderFieldError(key, false, error);
      if (i === 0 && this.globalConfig.focusInvalidField) {
        setTimeout(() => field.elem.focus(), 0);
      }
    });
  }
  showErrors(fields) {
    if (typeof fields !== "object") {
      throw Error(
        "[showErrors]: Errors should be an object with key: value format"
      );
    }
    this.showLabels(fields, true);
  }
  showSuccessLabels(fields) {
    if (typeof fields !== "object") {
      throw Error(
        "[showSuccessLabels]: Labels should be an object with key: value format"
      );
    }
    this.showLabels(fields, false);
  }
  renderFieldError(key, forced = false, message) {
    var _a, _b, _c, _d, _e, _f;
    const field = this.fields[key];
    if (field.isValid === false) {
      this.isValid = false;
    }
    if (field.isValid === void 0 || !forced && !this.isSubmitted && !field.touched && message === void 0) {
      return;
    }
    if (field.isValid) {
      if (!field.asyncCheckPending) {
        const successLabel = this.createSuccessLabelElem(
          key,
          message !== void 0 ? message : field.successMessage,
          field.config
        );
        if (successLabel) {
          this.renderFieldLabel(
            field.elem,
            successLabel,
            (_a = field.config) == null ? void 0 : _a.errorsContainer,
            true
          );
        }
        field.elem.classList.add(
          ...getClassList(
            ((_b = field.config) == null ? void 0 : _b.successFieldCssClass) || this.globalConfig.successFieldCssClass
          )
        );
      }
      return;
    }
    field.elem.classList.add(
      ...getClassList(
        ((_c = field.config) == null ? void 0 : _c.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
      )
    );
    const errorLabel = this.createErrorLabelElem(
      key,
      message !== void 0 ? message : field.errorMessage,
      field.config
    );
    this.renderFieldLabel(
      field.elem,
      errorLabel,
      (_d = field.config) == null ? void 0 : _d.errorsContainer
    );
    if (this.isTooltip()) {
      this.tooltips.push(
        this.renderTooltip(
          field.elem,
          errorLabel,
          (_f = (_e = field.config) == null ? void 0 : _e.tooltip) == null ? void 0 : _f.position
        )
      );
    }
  }
  renderGroupError(key, force = true) {
    var _a, _b, _c, _d;
    const group = this.groupFields[key];
    if (group.isValid === false) {
      this.isValid = false;
    }
    if (group.isValid === void 0 || !force && !this.isSubmitted && !group.touched) {
      return;
    }
    if (group.isValid) {
      group.elems.forEach((elem) => {
        var _a2, _b2;
        Object.assign(
          elem.style,
          ((_a2 = group.config) == null ? void 0 : _a2.successFieldStyle) || this.globalConfig.successFieldStyle
        );
        elem.classList.add(
          ...getClassList(
            ((_b2 = group.config) == null ? void 0 : _b2.successFieldCssClass) || this.globalConfig.successFieldCssClass
          )
        );
      });
      const successLabel = this.createSuccessLabelElem(
        key,
        group.successMessage,
        group.config
      );
      if (successLabel) {
        this.renderGroupLabel(
          group.groupElem,
          successLabel,
          (_a = group.config) == null ? void 0 : _a.errorsContainer,
          true
        );
      }
      return;
    }
    this.isValid = false;
    group.elems.forEach((elem) => {
      var _a2, _b2;
      Object.assign(
        elem.style,
        ((_a2 = group.config) == null ? void 0 : _a2.errorFieldStyle) || this.globalConfig.errorFieldStyle
      );
      elem.classList.add(
        ...getClassList(
          ((_b2 = group.config) == null ? void 0 : _b2.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
        )
      );
    });
    const errorLabel = this.createErrorLabelElem(
      key,
      group.errorMessage,
      group.config
    );
    this.renderGroupLabel(
      group.groupElem,
      errorLabel,
      (_b = group.config) == null ? void 0 : _b.errorsContainer
    );
    if (this.isTooltip()) {
      this.tooltips.push(
        this.renderTooltip(
          group.groupElem,
          errorLabel,
          (_d = (_c = group.config) == null ? void 0 : _c.tooltip) == null ? void 0 : _d.position
        )
      );
    }
  }
  renderErrors(forceRevalidation = false) {
    if (!this.isSubmitted && !forceRevalidation && !this.globalConfig.validateBeforeSubmitting) {
      return;
    }
    this.clearErrors();
    this.isValid = true;
    for (const key in this.groupFields) {
      this.renderGroupError(key);
    }
    for (const key in this.fields) {
      this.renderFieldError(key);
    }
  }
  destroy() {
    this.eventListeners.forEach((event) => {
      this.removeListener(event.type, event.elem, event.func);
    });
    Object.keys(this.customStyleTags).forEach((key) => {
      this.customStyleTags[key].remove();
    });
    this.clearErrors();
    if (this.globalConfig.lockForm) {
      this.unlockForm();
    }
  }
  refresh() {
    this.destroy();
    if (!this.form) {
      console.error("Cannot initialize the library! Form is not defined");
    } else {
      this.initialize(this.form, this.globalConfig);
      Object.keys(this.fields).forEach((key) => {
        const fieldSelector = this.getFieldSelectorByKey(key);
        if (fieldSelector) {
          this.addField(
            fieldSelector,
            [...this.fields[key].rules],
            this.fields[key].config
          );
        }
      });
    }
  }
  setCurrentLocale(locale) {
    if (typeof locale !== "string" && locale !== void 0) {
      console.error("Current locale should be a string");
      return;
    }
    this.currentLocale = locale;
    if (this.isSubmitted) {
      this.validate();
    }
  }
  onSuccess(callback) {
    this.onSuccessCallback = callback;
    return this;
  }
  onFail(callback) {
    this.onFailCallback = callback;
    return this;
  }
  onValidate(callback) {
    this.onValidateCallback = callback;
    return this;
  }
}



/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pug_static_header_burger_burger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pug/static/header/burger/burger */ "./src/pug/static/header/burger/burger.js");
/* harmony import */ var _pug_static_header_burger_burger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pug_static_header_burger_burger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pug_components_form_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pug/components/form/form */ "./src/pug/components/form/form.js");
/* harmony import */ var _pug_components_contact_contact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pug/components/contact/contact */ "./src/pug/components/contact/contact.js");



addEventListener('resize', function () {
  var windowInnerWidth = window.innerWidth - 167;
  document.documentElement.style.setProperty('--position', windowInnerWidth + 'px');
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsTUFBTTtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMkJBQTJCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQSxZQUFZLG9CQUFvQixVQUFVO0FBQzFDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMkJBQTJCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZDQUE2QztBQUMvRSxtQ0FBbUMsbURBQW1EO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtREFBbUQ7QUFDckYsbUNBQW1DLDRDQUE0QztBQUMvRTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsNkNBQTZDO0FBQy9FLG1DQUFtQyxvQ0FBb0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQztBQUN0RSxtQ0FBbUMsNENBQTRDO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsSUFBSTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxJQUFJO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsUUFBUSxPQUFPO0FBQ2Ysa0NBQWtDLFdBQVc7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix3QkFBd0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsT0FBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7QUFHZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDLEtBQUs7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxrR0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBLGVBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQixrSEFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsV0FBVztBQUNYLEVBQUUsT0FBTztBQUNUOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQSxxR0FBc0M7O0FBRXRDLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTyxxQ0FBcUM7QUFDeEUsNEJBQTRCLE9BQU8sc0RBQXNEO0FBQ3pGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7OztBQzFzQk47O0FBRWIsY0FBYyxtQkFBTyxDQUFDLGtEQUFVO0FBQ2hDLDJCQUEyQixtQkFBTyxDQUFDLDhFQUF3QjtBQUMzRCxnQkFBZ0IsbUJBQU8sQ0FBQyxrRUFBcUI7QUFDN0MsV0FBVyxtQkFBTyxDQUFDLDBDQUFNOztBQUV6QjtBQUNBLHFCQUFxQixtQkFBTyxDQUFDLHNFQUF1Qjs7QUFFcEQsNENBQTRDLHFCQUFNO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQSxtQkFBbUIsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRTNDO0FBQ0EsNkJBQTZCO0FBQzdCLDBEQUEwRDtBQUMxRDtBQUNBOzs7Ozs7Ozs7Ozs7QUN0RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDLHFCQUFNOztBQUVsRDtBQUNBO0FBQ0EsaUJBQWlCLDBCQUEwQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMxQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOMkM7QUFDUDtBQUNNO0FBRTFDNUQsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQU07RUFDaEMsSUFBTXVFLGdCQUFnQixHQUFHcEYsTUFBTSxDQUFDQyxVQUFVLEdBQUcsR0FBRztFQUNoRHpELFFBQVEsQ0FBQ2dFLGVBQWUsQ0FBQ1YsS0FBSyxDQUFDdUYsV0FBVyxDQUFDLFlBQVksRUFBRUQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQ2xGLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvYXNzZXJ0L2J1aWxkL2Fzc2VydC5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvYXNzZXJ0L2Fzc2VydGlvbl9lcnJvci5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvZXJyb3JzLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9pbnRlcm5hbC91dGlsL2NvbXBhcmlzb25zLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vc3JjL3B1Zy9jb21wb25lbnRzL2NvbnRhY3QvY29udGFjdC5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL3NyYy9wdWcvY29tcG9uZW50cy9mb3JtL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9zcmMvcHVnL3N0YXRpYy9oZWFkZXIvYnVyZ2VyL2J1cmdlci5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jb25zb2xlLWJyb3dzZXJpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvZGVmaW5lLXByb3BlcnRpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvZXM2LW9iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2luZGV4LmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvZ29wZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9oYXMtcHJvcGVydHktZGVzY3JpcHRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvc2hhbXMuanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvaGFzLXRvc3RyaW5ndGFnL3NoYW1zLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9pcy1hcmd1bWVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvaXMtY2FsbGFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvaXMtZ2VuZXJhdG9yLWZ1bmN0aW9uL2luZGV4LmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9pcy1uYW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvaXMtbmFuL3BvbHlmaWxsLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9zaGltLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2lzLXR5cGVkLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2p1c3QtdmFsaWRhdGUvZGlzdC9qdXN0LXZhbGlkYXRlLmVzLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL3BvbHlmaWxsLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9zaGltLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2luZGV4LmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC90eXBlcy5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvd2hpY2gtdHlwZWQtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvYXZhaWxhYmxlLXR5cGVkLWFycmF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zbGFncmFjaC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NsYWdyYWNoLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2xhZ3JhY2gtdGVtcGxhdGUvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9hc3NlcnQuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMmE1MWFlNDI0YTUxM2VjOWE2YWEzNDY2YmFhMGNjMWQ1NWRkNGYzYlxuLy8gT3JpZ2luYWxseSBmcm9tIG5hcndoYWwuanMgKGh0dHA6Ly9uYXJ3aGFsanMub3JnKVxuLy8gQ29weXJpZ2h0IChjKSAyMDA5IFRob21hcyBSb2JpbnNvbiA8Mjgwbm9ydGguY29tPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlICdTb2Z0d2FyZScpLCB0b1xuLy8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbi8vIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuLy8gc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAnQVMgSVMnLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL2ludGVybmFsL2Vycm9ycycpLFxuICAgIF9yZXF1aXJlJGNvZGVzID0gX3JlcXVpcmUuY29kZXMsXG4gICAgRVJSX0FNQklHVU9VU19BUkdVTUVOVCA9IF9yZXF1aXJlJGNvZGVzLkVSUl9BTUJJR1VPVVNfQVJHVU1FTlQsXG4gICAgRVJSX0lOVkFMSURfQVJHX1RZUEUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVFlQRSxcbiAgICBFUlJfSU5WQUxJRF9BUkdfVkFMVUUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVkFMVUUsXG4gICAgRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFID0gX3JlcXVpcmUkY29kZXMuRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFLFxuICAgIEVSUl9NSVNTSU5HX0FSR1MgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfTUlTU0lOR19BUkdTO1xuXG52YXIgQXNzZXJ0aW9uRXJyb3IgPSByZXF1aXJlKCcuL2ludGVybmFsL2Fzc2VydC9hc3NlcnRpb25fZXJyb3InKTtcblxudmFyIF9yZXF1aXJlMiA9IHJlcXVpcmUoJ3V0aWwvJyksXG4gICAgaW5zcGVjdCA9IF9yZXF1aXJlMi5pbnNwZWN0O1xuXG52YXIgX3JlcXVpcmUkdHlwZXMgPSByZXF1aXJlKCd1dGlsLycpLnR5cGVzLFxuICAgIGlzUHJvbWlzZSA9IF9yZXF1aXJlJHR5cGVzLmlzUHJvbWlzZSxcbiAgICBpc1JlZ0V4cCA9IF9yZXF1aXJlJHR5cGVzLmlzUmVnRXhwO1xuXG52YXIgb2JqZWN0QXNzaWduID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24gOiByZXF1aXJlKCdlczYtb2JqZWN0LWFzc2lnbicpLmFzc2lnbjtcbnZhciBvYmplY3RJcyA9IE9iamVjdC5pcyA/IE9iamVjdC5pcyA6IHJlcXVpcmUoJ29iamVjdC1pcycpO1xudmFyIGVycm9yQ2FjaGUgPSBuZXcgTWFwKCk7XG52YXIgaXNEZWVwRXF1YWw7XG52YXIgaXNEZWVwU3RyaWN0RXF1YWw7XG52YXIgcGFyc2VFeHByZXNzaW9uQXQ7XG52YXIgZmluZE5vZGVBcm91bmQ7XG52YXIgZGVjb2RlcjtcblxuZnVuY3Rpb24gbGF6eUxvYWRDb21wYXJpc29uKCkge1xuICB2YXIgY29tcGFyaXNvbiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucycpO1xuXG4gIGlzRGVlcEVxdWFsID0gY29tcGFyaXNvbi5pc0RlZXBFcXVhbDtcbiAgaXNEZWVwU3RyaWN0RXF1YWwgPSBjb21wYXJpc29uLmlzRGVlcFN0cmljdEVxdWFsO1xufSAvLyBFc2NhcGUgY29udHJvbCBjaGFyYWN0ZXJzIGJ1dCBub3QgXFxuIGFuZCBcXHQgdG8ga2VlcCB0aGUgbGluZSBicmVha3MgYW5kXG4vLyBpbmRlbnRhdGlvbiBpbnRhY3QuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuXG5cbnZhciBlc2NhcGVTZXF1ZW5jZXNSZWdFeHAgPSAvW1xceDAwLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXS9nO1xudmFyIG1ldGEgPSBbXCJcXFxcdTAwMDBcIiwgXCJcXFxcdTAwMDFcIiwgXCJcXFxcdTAwMDJcIiwgXCJcXFxcdTAwMDNcIiwgXCJcXFxcdTAwMDRcIiwgXCJcXFxcdTAwMDVcIiwgXCJcXFxcdTAwMDZcIiwgXCJcXFxcdTAwMDdcIiwgJ1xcXFxiJywgJycsICcnLCBcIlxcXFx1MDAwYlwiLCAnXFxcXGYnLCAnJywgXCJcXFxcdTAwMGVcIiwgXCJcXFxcdTAwMGZcIiwgXCJcXFxcdTAwMTBcIiwgXCJcXFxcdTAwMTFcIiwgXCJcXFxcdTAwMTJcIiwgXCJcXFxcdTAwMTNcIiwgXCJcXFxcdTAwMTRcIiwgXCJcXFxcdTAwMTVcIiwgXCJcXFxcdTAwMTZcIiwgXCJcXFxcdTAwMTdcIiwgXCJcXFxcdTAwMThcIiwgXCJcXFxcdTAwMTlcIiwgXCJcXFxcdTAwMWFcIiwgXCJcXFxcdTAwMWJcIiwgXCJcXFxcdTAwMWNcIiwgXCJcXFxcdTAwMWRcIiwgXCJcXFxcdTAwMWVcIiwgXCJcXFxcdTAwMWZcIl07XG5cbnZhciBlc2NhcGVGbiA9IGZ1bmN0aW9uIGVzY2FwZUZuKHN0cikge1xuICByZXR1cm4gbWV0YVtzdHIuY2hhckNvZGVBdCgwKV07XG59O1xuXG52YXIgd2FybmVkID0gZmFsc2U7IC8vIFRoZSBhc3NlcnQgbW9kdWxlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IHRocm93XG4vLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcbi8vIGFzc2VydCBtb2R1bGUgbXVzdCBjb25mb3JtIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLlxuXG52YXIgYXNzZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSBvaztcbnZhciBOT19FWENFUFRJT05fU0VOVElORUwgPSB7fTsgLy8gQWxsIG9mIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIG11c3QgdGhyb3cgYW4gQXNzZXJ0aW9uRXJyb3Jcbi8vIHdoZW4gYSBjb3JyZXNwb25kaW5nIGNvbmRpdGlvbiBpcyBub3QgbWV0LCB3aXRoIGEgbWVzc2FnZSB0aGF0XG4vLyBtYXkgYmUgdW5kZWZpbmVkIGlmIG5vdCBwcm92aWRlZC4gQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBpbm5lckZhaWwob2JqKSB7XG4gIGlmIChvYmoubWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBvYmoubWVzc2FnZTtcbiAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG9iaik7XG59XG5cbmZ1bmN0aW9uIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IsIHN0YWNrU3RhcnRGbikge1xuICB2YXIgYXJnc0xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbnRlcm5hbE1lc3NhZ2U7XG5cbiAgaWYgKGFyZ3NMZW4gPT09IDApIHtcbiAgICBpbnRlcm5hbE1lc3NhZ2UgPSAnRmFpbGVkJztcbiAgfSBlbHNlIGlmIChhcmdzTGVuID09PSAxKSB7XG4gICAgbWVzc2FnZSA9IGFjdHVhbDtcbiAgICBhY3R1YWwgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHdhcm5lZCA9PT0gZmFsc2UpIHtcbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgICB2YXIgd2FybiA9IHByb2Nlc3MuZW1pdFdhcm5pbmcgPyBwcm9jZXNzLmVtaXRXYXJuaW5nIDogY29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7XG4gICAgICB3YXJuKCdhc3NlcnQuZmFpbCgpIHdpdGggbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBpcyBkZXByZWNhdGVkLiAnICsgJ1BsZWFzZSB1c2UgYXNzZXJ0LnN0cmljdEVxdWFsKCkgaW5zdGVhZCBvciBvbmx5IHBhc3MgYSBtZXNzYWdlLicsICdEZXByZWNhdGlvbldhcm5pbmcnLCAnREVQMDA5NCcpO1xuICAgIH1cblxuICAgIGlmIChhcmdzTGVuID09PSAyKSBvcGVyYXRvciA9ICchPSc7XG4gIH1cblxuICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBtZXNzYWdlO1xuICB2YXIgZXJyQXJncyA9IHtcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yID09PSB1bmRlZmluZWQgPyAnZmFpbCcgOiBvcGVyYXRvcixcbiAgICBzdGFja1N0YXJ0Rm46IHN0YWNrU3RhcnRGbiB8fCBmYWlsXG4gIH07XG5cbiAgaWYgKG1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgIGVyckFyZ3MubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKGVyckFyZ3MpO1xuXG4gIGlmIChpbnRlcm5hbE1lc3NhZ2UpIHtcbiAgICBlcnIubWVzc2FnZSA9IGludGVybmFsTWVzc2FnZTtcbiAgICBlcnIuZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gIH1cblxuICB0aHJvdyBlcnI7XG59XG5cbmFzc2VydC5mYWlsID0gZmFpbDsgLy8gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gaW50ZXJuYWwvZXJyb3IuXG5cbmFzc2VydC5Bc3NlcnRpb25FcnJvciA9IEFzc2VydGlvbkVycm9yO1xuXG5mdW5jdGlvbiBpbm5lck9rKGZuLCBhcmdMZW4sIHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICB2YXIgZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuXG4gICAgaWYgKGFyZ0xlbiA9PT0gMCkge1xuICAgICAgZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gICAgICBtZXNzYWdlID0gJ05vIHZhbHVlIGFyZ3VtZW50IHBhc3NlZCB0byBgYXNzZXJ0Lm9rKClgJztcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgdGhyb3cgbWVzc2FnZTtcbiAgICB9XG5cbiAgICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKHtcbiAgICAgIGFjdHVhbDogdmFsdWUsXG4gICAgICBleHBlY3RlZDogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJz09JyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICB9KTtcbiAgICBlcnIuZ2VuZXJhdGVkTWVzc2FnZSA9IGdlbmVyYXRlZE1lc3NhZ2U7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59IC8vIFB1cmUgYXNzZXJ0aW9uIHRlc3RzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0cnV0aHksIGFzIGRldGVybWluZWRcbi8vIGJ5ICEhdmFsdWUuXG5cblxuZnVuY3Rpb24gb2soKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpbm5lck9rLmFwcGx5KHZvaWQgMCwgW29rLCBhcmdzLmxlbmd0aF0uY29uY2F0KGFyZ3MpKTtcbn1cblxuYXNzZXJ0Lm9rID0gb2s7IC8vIFRoZSBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc2hhbGxvdywgY29lcmNpdmUgZXF1YWxpdHkgd2l0aCA9PS5cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzICovXG5cbmFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIGVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblxuXG4gIGlmIChhY3R1YWwgIT0gZXhwZWN0ZWQpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICc9PScsXG4gICAgICBzdGFja1N0YXJ0Rm46IGVxdWFsXG4gICAgfSk7XG4gIH1cbn07IC8vIFRoZSBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciB3aGV0aGVyIHR3byBvYmplY3RzIGFyZSBub3Rcbi8vIGVxdWFsIHdpdGggIT0uXG5cblxuYXNzZXJ0Lm5vdEVxdWFsID0gZnVuY3Rpb24gbm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXG5cbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJyE9JyxcbiAgICAgIHN0YWNrU3RhcnRGbjogbm90RXF1YWxcbiAgICB9KTtcbiAgfVxufTsgLy8gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG5cblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcblxuICBpZiAoIWlzRGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnZGVlcEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZGVlcEVxdWFsXG4gICAgfSk7XG4gIH1cbn07IC8vIFRoZSBub24tZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGZvciBhbnkgZGVlcCBpbmVxdWFsaXR5LlxuXG5cbmFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbiBub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cblxuICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG5cbiAgaWYgKGlzRGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnbm90RGVlcEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogbm90RGVlcEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cblxuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIGRlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcblxuICBpZiAoIWlzRGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnZGVlcFN0cmljdEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZGVlcFN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbmFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWwgPSBub3REZWVwU3RyaWN0RXF1YWw7XG5cbmZ1bmN0aW9uIG5vdERlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcblxuICBpZiAoaXNEZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdub3REZWVwU3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3REZWVwU3RyaWN0RXF1YWxcbiAgICB9KTtcbiAgfVxufVxuXG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBzdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmICghb2JqZWN0SXMoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdzdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IHN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbmFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIG5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKG9iamVjdElzKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnbm90U3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3RTdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuXG52YXIgQ29tcGFyaXNvbiA9IGZ1bmN0aW9uIENvbXBhcmlzb24ob2JqLCBrZXlzLCBhY3R1YWwpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29tcGFyaXNvbik7XG5cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgaWYgKGFjdHVhbCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBhY3R1YWxba2V5XSA9PT0gJ3N0cmluZycgJiYgaXNSZWdFeHAob2JqW2tleV0pICYmIG9ialtrZXldLnRlc3QoYWN0dWFsW2tleV0pKSB7XG4gICAgICAgIF90aGlzW2tleV0gPSBhY3R1YWxba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gY29tcGFyZUV4Y2VwdGlvbktleShhY3R1YWwsIGV4cGVjdGVkLCBrZXksIG1lc3NhZ2UsIGtleXMsIGZuKSB7XG4gIGlmICghKGtleSBpbiBhY3R1YWwpIHx8ICFpc0RlZXBTdHJpY3RFcXVhbChhY3R1YWxba2V5XSwgZXhwZWN0ZWRba2V5XSkpIHtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIC8vIENyZWF0ZSBwbGFjZWhvbGRlciBvYmplY3RzIHRvIGNyZWF0ZSBhIG5pY2Ugb3V0cHV0LlxuICAgICAgdmFyIGEgPSBuZXcgQ29tcGFyaXNvbihhY3R1YWwsIGtleXMpO1xuICAgICAgdmFyIGIgPSBuZXcgQ29tcGFyaXNvbihleHBlY3RlZCwga2V5cywgYWN0dWFsKTtcbiAgICAgIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgICBhY3R1YWw6IGEsXG4gICAgICAgIGV4cGVjdGVkOiBiLFxuICAgICAgICBvcGVyYXRvcjogJ2RlZXBTdHJpY3RFcXVhbCcsXG4gICAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICAgIH0pO1xuICAgICAgZXJyLmFjdHVhbCA9IGFjdHVhbDtcbiAgICAgIGVyci5leHBlY3RlZCA9IGV4cGVjdGVkO1xuICAgICAgZXJyLm9wZXJhdG9yID0gZm4ubmFtZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6IGZuLm5hbWUsXG4gICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCwgbXNnLCBmbikge1xuICBpZiAodHlwZW9mIGV4cGVjdGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGlzUmVnRXhwKGV4cGVjdGVkKSkgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKTsgLy8gYXNzZXJ0LmRvZXNOb3RUaHJvdyBkb2VzIG5vdCBhY2NlcHQgb2JqZWN0cy5cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2V4cGVjdGVkJywgWydGdW5jdGlvbicsICdSZWdFeHAnXSwgZXhwZWN0ZWQpO1xuICAgIH0gLy8gSGFuZGxlIHByaW1pdGl2ZXMgcHJvcGVybHkuXG5cblxuICAgIGlmIChfdHlwZW9mKGFjdHVhbCkgIT09ICdvYmplY3QnIHx8IGFjdHVhbCA9PT0gbnVsbCkge1xuICAgICAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgb3BlcmF0b3I6ICdkZWVwU3RyaWN0RXF1YWwnLFxuICAgICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgICB9KTtcbiAgICAgIGVyci5vcGVyYXRvciA9IGZuLm5hbWU7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhleHBlY3RlZCk7IC8vIFNwZWNpYWwgaGFuZGxlIGVycm9ycyB0byBtYWtlIHN1cmUgdGhlIG5hbWUgYW5kIHRoZSBtZXNzYWdlIGFyZSBjb21wYXJlZFxuICAgIC8vIGFzIHdlbGwuXG5cbiAgICBpZiAoZXhwZWN0ZWQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAga2V5cy5wdXNoKCduYW1lJywgJ21lc3NhZ2UnKTtcbiAgICB9IGVsc2UgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1ZBTFVFKCdlcnJvcicsIGV4cGVjdGVkLCAnbWF5IG5vdCBiZSBhbiBlbXB0eSBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgYWN0dWFsW2tleV0gPT09ICdzdHJpbmcnICYmIGlzUmVnRXhwKGV4cGVjdGVkW2tleV0pICYmIGV4cGVjdGVkW2tleV0udGVzdChhY3R1YWxba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb21wYXJlRXhjZXB0aW9uS2V5KGFjdHVhbCwgZXhwZWN0ZWQsIGtleSwgbXNnLCBrZXlzLCBmbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gR3VhcmQgaW5zdGFuY2VvZiBhZ2FpbnN0IGFycm93IGZ1bmN0aW9ucyBhcyB0aGV5IGRvbid0IGhhdmUgYSBwcm90b3R5cGUuXG5cblxuICBpZiAoZXhwZWN0ZWQucHJvdG90eXBlICE9PSB1bmRlZmluZWQgJiYgYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChFcnJvci5pc1Byb3RvdHlwZU9mKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBleHBlY3RlZC5jYWxsKHt9LCBhY3R1YWwpID09PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRBY3R1YWwoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnZm4nLCAnRnVuY3Rpb24nLCBmbik7XG4gIH1cblxuICB0cnkge1xuICAgIGZuKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIHJldHVybiBOT19FWENFUFRJT05fU0VOVElORUw7XG59XG5cbmZ1bmN0aW9uIGNoZWNrSXNQcm9taXNlKG9iaikge1xuICAvLyBBY2NlcHQgbmF0aXZlIEVTNiBwcm9taXNlcyBhbmQgcHJvbWlzZXMgdGhhdCBhcmUgaW1wbGVtZW50ZWQgaW4gYSBzaW1pbGFyXG4gIC8vIHdheS4gRG8gbm90IGFjY2VwdCB0aGVuYWJsZXMgdGhhdCB1c2UgYSBmdW5jdGlvbiBhcyBgb2JqYCBhbmQgdGhhdCBoYXZlIG5vXG4gIC8vIGBjYXRjaGAgaGFuZGxlci5cbiAgLy8gVE9ETzogdGhlbmFibGVzIGFyZSBjaGVja2VkIHVwIHVudGlsIHRoZXkgaGF2ZSB0aGUgY29ycmVjdCBtZXRob2RzLFxuICAvLyBidXQgYWNjb3JkaW5nIHRvIGRvY3VtZW50YXRpb24sIHRoZSBgdGhlbmAgbWV0aG9kIHNob3VsZCByZWNlaXZlXG4gIC8vIHRoZSBgZnVsZmlsbGAgYW5kIGByZWplY3RgIGFyZ3VtZW50cyBhcyB3ZWxsIG9yIGl0IG1heSBiZSBuZXZlciByZXNvbHZlZC5cbiAgcmV0dXJuIGlzUHJvbWlzZShvYmopIHx8IG9iaiAhPT0gbnVsbCAmJiBfdHlwZW9mKG9iaikgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNhdGNoID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiB3YWl0Rm9yQWN0dWFsKHByb21pc2VGbikge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdFByb21pc2U7XG5cbiAgICBpZiAodHlwZW9mIHByb21pc2VGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gUmV0dXJuIGEgcmVqZWN0ZWQgcHJvbWlzZSBpZiBgcHJvbWlzZUZuYCB0aHJvd3Mgc3luY2hyb25vdXNseS5cbiAgICAgIHJlc3VsdFByb21pc2UgPSBwcm9taXNlRm4oKTsgLy8gRmFpbCBpbiBjYXNlIG5vIHByb21pc2UgaXMgcmV0dXJuZWQuXG5cbiAgICAgIGlmICghY2hlY2tJc1Byb21pc2UocmVzdWx0UHJvbWlzZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX1JFVFVSTl9WQUxVRSgnaW5zdGFuY2Ugb2YgUHJvbWlzZScsICdwcm9taXNlRm4nLCByZXN1bHRQcm9taXNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNoZWNrSXNQcm9taXNlKHByb21pc2VGbikpIHtcbiAgICAgIHJlc3VsdFByb21pc2UgPSBwcm9taXNlRm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgncHJvbWlzZUZuJywgWydGdW5jdGlvbicsICdQcm9taXNlJ10sIHByb21pc2VGbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdFByb21pc2U7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9fRVhDRVBUSU9OX1NFTlRJTkVMO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4cGVjdHNFcnJvcihzdGFja1N0YXJ0Rm4sIGFjdHVhbCwgZXJyb3IsIG1lc3NhZ2UpIHtcbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdlcnJvcicsIFsnT2JqZWN0JywgJ0Vycm9yJywgJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBlcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsKSB7XG4gICAgICBpZiAoYWN0dWFsLm1lc3NhZ2UgPT09IGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFUlJfQU1CSUdVT1VTX0FSR1VNRU5UKCdlcnJvci9tZXNzYWdlJywgXCJUaGUgZXJyb3IgbWVzc2FnZSBcXFwiXCIuY29uY2F0KGFjdHVhbC5tZXNzYWdlLCBcIlxcXCIgaXMgaWRlbnRpY2FsIHRvIHRoZSBtZXNzYWdlLlwiKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY3R1YWwgPT09IGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0FNQklHVU9VU19BUkdVTUVOVCgnZXJyb3IvbWVzc2FnZScsIFwiVGhlIGVycm9yIFxcXCJcIi5jb25jYXQoYWN0dWFsLCBcIlxcXCIgaXMgaWRlbnRpY2FsIHRvIHRoZSBtZXNzYWdlLlwiKSk7XG4gICAgfVxuXG4gICAgbWVzc2FnZSA9IGVycm9yO1xuICAgIGVycm9yID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKGVycm9yICE9IG51bGwgJiYgX3R5cGVvZihlcnJvcikgIT09ICdvYmplY3QnICYmIHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnZXJyb3InLCBbJ09iamVjdCcsICdFcnJvcicsICdGdW5jdGlvbicsICdSZWdFeHAnXSwgZXJyb3IpO1xuICB9XG5cbiAgaWYgKGFjdHVhbCA9PT0gTk9fRVhDRVBUSU9OX1NFTlRJTkVMKSB7XG4gICAgdmFyIGRldGFpbHMgPSAnJztcblxuICAgIGlmIChlcnJvciAmJiBlcnJvci5uYW1lKSB7XG4gICAgICBkZXRhaWxzICs9IFwiIChcIi5jb25jYXQoZXJyb3IubmFtZSwgXCIpXCIpO1xuICAgIH1cblxuICAgIGRldGFpbHMgKz0gbWVzc2FnZSA/IFwiOiBcIi5jb25jYXQobWVzc2FnZSkgOiAnLic7XG4gICAgdmFyIGZuVHlwZSA9IHN0YWNrU3RhcnRGbi5uYW1lID09PSAncmVqZWN0cycgPyAncmVqZWN0aW9uJyA6ICdleGNlcHRpb24nO1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IHVuZGVmaW5lZCxcbiAgICAgIGV4cGVjdGVkOiBlcnJvcixcbiAgICAgIG9wZXJhdG9yOiBzdGFja1N0YXJ0Rm4ubmFtZSxcbiAgICAgIG1lc3NhZ2U6IFwiTWlzc2luZyBleHBlY3RlZCBcIi5jb25jYXQoZm5UeXBlKS5jb25jYXQoZGV0YWlscyksXG4gICAgICBzdGFja1N0YXJ0Rm46IHN0YWNrU3RhcnRGblxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGVycm9yICYmICFleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGVycm9yLCBtZXNzYWdlLCBzdGFja1N0YXJ0Rm4pKSB7XG4gICAgdGhyb3cgYWN0dWFsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4cGVjdHNOb0Vycm9yKHN0YWNrU3RhcnRGbiwgYWN0dWFsLCBlcnJvciwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09PSBOT19FWENFUFRJT05fU0VOVElORUwpIHJldHVybjtcblxuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICBlcnJvciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICghZXJyb3IgfHwgZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBlcnJvcikpIHtcbiAgICB2YXIgZGV0YWlscyA9IG1lc3NhZ2UgPyBcIjogXCIuY29uY2F0KG1lc3NhZ2UpIDogJy4nO1xuICAgIHZhciBmblR5cGUgPSBzdGFja1N0YXJ0Rm4ubmFtZSA9PT0gJ2RvZXNOb3RSZWplY3QnID8gJ3JlamVjdGlvbicgOiAnZXhjZXB0aW9uJztcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXJyb3IsXG4gICAgICBvcGVyYXRvcjogc3RhY2tTdGFydEZuLm5hbWUsXG4gICAgICBtZXNzYWdlOiBcIkdvdCB1bndhbnRlZCBcIi5jb25jYXQoZm5UeXBlKS5jb25jYXQoZGV0YWlscywgXCJcXG5cIikgKyBcIkFjdHVhbCBtZXNzYWdlOiBcXFwiXCIuY29uY2F0KGFjdHVhbCAmJiBhY3R1YWwubWVzc2FnZSwgXCJcXFwiXCIpLFxuICAgICAgc3RhY2tTdGFydEZuOiBzdGFja1N0YXJ0Rm5cbiAgICB9KTtcbiAgfVxuXG4gIHRocm93IGFjdHVhbDtcbn1cblxuYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uIHRocm93cyhwcm9taXNlRm4pIHtcbiAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgZXhwZWN0c0Vycm9yLmFwcGx5KHZvaWQgMCwgW3Rocm93cywgZ2V0QWN0dWFsKHByb21pc2VGbildLmNvbmNhdChhcmdzKSk7XG59O1xuXG5hc3NlcnQucmVqZWN0cyA9IGZ1bmN0aW9uIHJlamVjdHMocHJvbWlzZUZuKSB7XG4gIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMyA+IDEgPyBfbGVuMyAtIDEgOiAwKSwgX2tleTMgPSAxOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgYXJnc1tfa2V5MyAtIDFdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgfVxuXG4gIHJldHVybiB3YWl0Rm9yQWN0dWFsKHByb21pc2VGbikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIGV4cGVjdHNFcnJvci5hcHBseSh2b2lkIDAsIFtyZWplY3RzLCByZXN1bHRdLmNvbmNhdChhcmdzKSk7XG4gIH0pO1xufTtcblxuYXNzZXJ0LmRvZXNOb3RUaHJvdyA9IGZ1bmN0aW9uIGRvZXNOb3RUaHJvdyhmbikge1xuICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjQgPiAxID8gX2xlbjQgLSAxIDogMCksIF9rZXk0ID0gMTsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gIH1cblxuICBleHBlY3RzTm9FcnJvci5hcHBseSh2b2lkIDAsIFtkb2VzTm90VGhyb3csIGdldEFjdHVhbChmbildLmNvbmNhdChhcmdzKSk7XG59O1xuXG5hc3NlcnQuZG9lc05vdFJlamVjdCA9IGZ1bmN0aW9uIGRvZXNOb3RSZWplY3QoZm4pIHtcbiAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41ID4gMSA/IF9sZW41IC0gMSA6IDApLCBfa2V5NSA9IDE7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICBhcmdzW19rZXk1IC0gMV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICB9XG5cbiAgcmV0dXJuIHdhaXRGb3JBY3R1YWwoZm4pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiBleHBlY3RzTm9FcnJvci5hcHBseSh2b2lkIDAsIFtkb2VzTm90UmVqZWN0LCByZXN1bHRdLmNvbmNhdChhcmdzKSk7XG4gIH0pO1xufTtcblxuYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbiBpZkVycm9yKGVycikge1xuICBpZiAoZXJyICE9PSBudWxsICYmIGVyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnaWZFcnJvciBnb3QgdW53YW50ZWQgZXhjZXB0aW9uOiAnO1xuXG4gICAgaWYgKF90eXBlb2YoZXJyKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGVyci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGVyci5tZXNzYWdlLmxlbmd0aCA9PT0gMCAmJiBlcnIuY29uc3RydWN0b3IpIHtcbiAgICAgICAgbWVzc2FnZSArPSBlcnIuY29uc3RydWN0b3IubmFtZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gZXJyLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UgKz0gaW5zcGVjdChlcnIpO1xuICAgIH1cblxuICAgIHZhciBuZXdFcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgYWN0dWFsOiBlcnIsXG4gICAgICBleHBlY3RlZDogbnVsbCxcbiAgICAgIG9wZXJhdG9yOiAnaWZFcnJvcicsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgc3RhY2tTdGFydEZuOiBpZkVycm9yXG4gICAgfSk7IC8vIE1ha2Ugc3VyZSB3ZSBhY3R1YWxseSBoYXZlIGEgc3RhY2sgdHJhY2UhXG5cbiAgICB2YXIgb3JpZ1N0YWNrID0gZXJyLnN0YWNrO1xuXG4gICAgaWYgKHR5cGVvZiBvcmlnU3RhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBUaGlzIHdpbGwgcmVtb3ZlIGFueSBkdXBsaWNhdGVkIGZyYW1lcyBmcm9tIHRoZSBlcnJvciBmcmFtZXMgdGFrZW5cbiAgICAgIC8vIGZyb20gd2l0aGluIGBpZkVycm9yYCBhbmQgYWRkIHRoZSBvcmlnaW5hbCBlcnJvciBmcmFtZXMgdG8gdGhlIG5ld2x5XG4gICAgICAvLyBjcmVhdGVkIG9uZXMuXG4gICAgICB2YXIgdG1wMiA9IG9yaWdTdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB0bXAyLnNoaWZ0KCk7IC8vIEZpbHRlciBhbGwgZnJhbWVzIGV4aXN0aW5nIGluIGVyci5zdGFjay5cblxuICAgICAgdmFyIHRtcDEgPSBuZXdFcnIuc3RhY2suc3BsaXQoJ1xcbicpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRtcDIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gRmluZCB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgZnJhbWUuXG4gICAgICAgIHZhciBwb3MgPSB0bXAxLmluZGV4T2YodG1wMltpXSk7XG5cbiAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBPbmx5IGtlZXAgbmV3IGZyYW1lcy5cbiAgICAgICAgICB0bXAxID0gdG1wMS5zbGljZSgwLCBwb3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5ld0Vyci5zdGFjayA9IFwiXCIuY29uY2F0KHRtcDEuam9pbignXFxuJyksIFwiXFxuXCIpLmNvbmNhdCh0bXAyLmpvaW4oJ1xcbicpKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXdFcnI7XG4gIH1cbn07IC8vIEV4cG9zZSBhIHN0cmljdCBvbmx5IHZhcmlhbnQgb2YgYXNzZXJ0XG5cblxuZnVuY3Rpb24gc3RyaWN0KCkge1xuICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjYpLCBfa2V5NiA9IDA7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICBhcmdzW19rZXk2XSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gIH1cblxuICBpbm5lck9rLmFwcGx5KHZvaWQgMCwgW3N0cmljdCwgYXJncy5sZW5ndGhdLmNvbmNhdChhcmdzKSk7XG59XG5cbmFzc2VydC5zdHJpY3QgPSBvYmplY3RBc3NpZ24oc3RyaWN0LCBhc3NlcnQsIHtcbiAgZXF1YWw6IGFzc2VydC5zdHJpY3RFcXVhbCxcbiAgZGVlcEVxdWFsOiBhc3NlcnQuZGVlcFN0cmljdEVxdWFsLFxuICBub3RFcXVhbDogYXNzZXJ0Lm5vdFN0cmljdEVxdWFsLFxuICBub3REZWVwRXF1YWw6IGFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWxcbn0pO1xuYXNzZXJ0LnN0cmljdC5zdHJpY3QgPSBhc3NlcnQuc3RyaWN0OyIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvYXNzZXJ0L2Fzc2VydGlvbl9lcnJvci5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8wODE3ODQwZjc3NTAzMjE2OWRkZDcwYzg1YWMwNTlmMThmZmNjODFjXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7IGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykgeyBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlOyB9KSk7IH0gb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKSB7IHZhciBfY2FjaGUgPSB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgPyBuZXcgTWFwKCkgOiB1bmRlZmluZWQ7IF93cmFwTmF0aXZlU3VwZXIgPSBmdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKSB7IGlmIChDbGFzcyA9PT0gbnVsbCB8fCAhX2lzTmF0aXZlRnVuY3Rpb24oQ2xhc3MpKSByZXR1cm4gQ2xhc3M7IGlmICh0eXBlb2YgQ2xhc3MgIT09IFwiZnVuY3Rpb25cIikgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gaWYgKHR5cGVvZiBfY2FjaGUgIT09IFwidW5kZWZpbmVkXCIpIHsgaWYgKF9jYWNoZS5oYXMoQ2xhc3MpKSByZXR1cm4gX2NhY2hlLmdldChDbGFzcyk7IF9jYWNoZS5zZXQoQ2xhc3MsIFdyYXBwZXIpOyB9IGZ1bmN0aW9uIFdyYXBwZXIoKSB7IHJldHVybiBfY29uc3RydWN0KENsYXNzLCBhcmd1bWVudHMsIF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3Rvcik7IH0gV3JhcHBlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogV3JhcHBlciwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihXcmFwcGVyLCBDbGFzcyk7IH07IHJldHVybiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKTsgfVxuXG5mdW5jdGlvbiBpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7IGlmIChpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkgeyBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7IH0gZWxzZSB7IF9jb25zdHJ1Y3QgPSBmdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHsgdmFyIGEgPSBbbnVsbF07IGEucHVzaC5hcHBseShhLCBhcmdzKTsgdmFyIENvbnN0cnVjdG9yID0gRnVuY3Rpb24uYmluZC5hcHBseShQYXJlbnQsIGEpOyB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTsgaWYgKENsYXNzKSBfc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7IHJldHVybiBpbnN0YW5jZTsgfTsgfSByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZUZ1bmN0aW9uKGZuKSB7IHJldHVybiBGdW5jdGlvbi50b1N0cmluZy5jYWxsKGZuKS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSAhPT0gLTE7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCd1dGlsLycpLFxuICAgIGluc3BlY3QgPSBfcmVxdWlyZS5pbnNwZWN0O1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgnLi4vZXJyb3JzJyksXG4gICAgRVJSX0lOVkFMSURfQVJHX1RZUEUgPSBfcmVxdWlyZTIuY29kZXMuRVJSX0lOVkFMSURfQVJHX1RZUEU7IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9lbmRzV2l0aFxuXG5cbmZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc2VhcmNoLCB0aGlzX2xlbikge1xuICBpZiAodGhpc19sZW4gPT09IHVuZGVmaW5lZCB8fCB0aGlzX2xlbiA+IHN0ci5sZW5ndGgpIHtcbiAgICB0aGlzX2xlbiA9IHN0ci5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gc3RyLnN1YnN0cmluZyh0aGlzX2xlbiAtIHNlYXJjaC5sZW5ndGgsIHRoaXNfbGVuKSA9PT0gc2VhcmNoO1xufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvcmVwZWF0XG5cblxuZnVuY3Rpb24gcmVwZWF0KHN0ciwgY291bnQpIHtcbiAgY291bnQgPSBNYXRoLmZsb29yKGNvdW50KTtcbiAgaWYgKHN0ci5sZW5ndGggPT0gMCB8fCBjb3VudCA9PSAwKSByZXR1cm4gJyc7XG4gIHZhciBtYXhDb3VudCA9IHN0ci5sZW5ndGggKiBjb3VudDtcbiAgY291bnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKGNvdW50KSAvIE1hdGgubG9nKDIpKTtcblxuICB3aGlsZSAoY291bnQpIHtcbiAgICBzdHIgKz0gc3RyO1xuICAgIGNvdW50LS07XG4gIH1cblxuICBzdHIgKz0gc3RyLnN1YnN0cmluZygwLCBtYXhDb3VudCAtIHN0ci5sZW5ndGgpO1xuICByZXR1cm4gc3RyO1xufVxuXG52YXIgYmx1ZSA9ICcnO1xudmFyIGdyZWVuID0gJyc7XG52YXIgcmVkID0gJyc7XG52YXIgd2hpdGUgPSAnJztcbnZhciBrUmVhZGFibGVPcGVyYXRvciA9IHtcbiAgZGVlcFN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIHN0cmljdGx5IGRlZXAtZXF1YWw6JyxcbiAgc3RyaWN0RXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgc3RyaWN0bHkgZXF1YWw6JyxcbiAgc3RyaWN0RXF1YWxPYmplY3Q6ICdFeHBlY3RlZCBcImFjdHVhbFwiIHRvIGJlIHJlZmVyZW5jZS1lcXVhbCB0byBcImV4cGVjdGVkXCI6JyxcbiAgZGVlcEVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIGxvb3NlbHkgZGVlcC1lcXVhbDonLFxuICBlcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBsb29zZWx5IGVxdWFsOicsXG4gIG5vdERlZXBTdHJpY3RFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgbm90IHRvIGJlIHN0cmljdGx5IGRlZXAtZXF1YWwgdG86JyxcbiAgbm90U3RyaWN0RXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIHRvIGJlIHN0cmljdGx5IHVuZXF1YWwgdG86JyxcbiAgbm90U3RyaWN0RXF1YWxPYmplY3Q6ICdFeHBlY3RlZCBcImFjdHVhbFwiIG5vdCB0byBiZSByZWZlcmVuY2UtZXF1YWwgdG8gXCJleHBlY3RlZFwiOicsXG4gIG5vdERlZXBFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgbm90IHRvIGJlIGxvb3NlbHkgZGVlcC1lcXVhbCB0bzonLFxuICBub3RFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgdG8gYmUgbG9vc2VseSB1bmVxdWFsIHRvOicsXG4gIG5vdElkZW50aWNhbDogJ1ZhbHVlcyBpZGVudGljYWwgYnV0IG5vdCByZWZlcmVuY2UtZXF1YWw6J1xufTsgLy8gQ29tcGFyaW5nIHNob3J0IHByaW1pdGl2ZXMgc2hvdWxkIGp1c3Qgc2hvdyA9PT0gLyAhPT0gaW5zdGVhZCBvZiB1c2luZyB0aGVcbi8vIGRpZmYuXG5cbnZhciBrTWF4U2hvcnRMZW5ndGggPSAxMDtcblxuZnVuY3Rpb24gY29weUVycm9yKHNvdXJjZSkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciB0YXJnZXQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpKTtcbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgJ21lc3NhZ2UnLCB7XG4gICAgdmFsdWU6IHNvdXJjZS5tZXNzYWdlXG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBpbnNwZWN0VmFsdWUodmFsKSB7XG4gIC8vIFRoZSB1dGlsLmluc3BlY3QgZGVmYXVsdCB2YWx1ZXMgY291bGQgYmUgY2hhbmdlZC4gVGhpcyBtYWtlcyBzdXJlIHRoZVxuICAvLyBlcnJvciBtZXNzYWdlcyBjb250YWluIHRoZSBuZWNlc3NhcnkgaW5mb3JtYXRpb24gbmV2ZXJ0aGVsZXNzLlxuICByZXR1cm4gaW5zcGVjdCh2YWwsIHtcbiAgICBjb21wYWN0OiBmYWxzZSxcbiAgICBjdXN0b21JbnNwZWN0OiBmYWxzZSxcbiAgICBkZXB0aDogMTAwMCxcbiAgICBtYXhBcnJheUxlbmd0aDogSW5maW5pdHksXG4gICAgLy8gQXNzZXJ0IGNvbXBhcmVzIG9ubHkgZW51bWVyYWJsZSBwcm9wZXJ0aWVzICh3aXRoIGEgZmV3IGV4Y2VwdGlvbnMpLlxuICAgIHNob3dIaWRkZW46IGZhbHNlLFxuICAgIC8vIEhhdmluZyBhIGxvbmcgbGluZSBhcyBlcnJvciBpcyBiZXR0ZXIgdGhhbiB3cmFwcGluZyB0aGUgbGluZSBmb3JcbiAgICAvLyBjb21wYXJpc29uIGZvciBub3cuXG4gICAgLy8gVE9ETyhCcmlkZ2VBUik6IGBicmVha0xlbmd0aGAgc2hvdWxkIGJlIGxpbWl0ZWQgYXMgc29vbiBhcyBzb29uIGFzIHdlXG4gICAgLy8gaGF2ZSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBpbnNwZWN0ZWQgcHJvcGVydGllcyAoaS5lLiwga25vdyB3aGVyZVxuICAgIC8vIGluIHdoYXQgbGluZSB0aGUgcHJvcGVydHkgc3RhcnRzIGFuZCBlbmRzKS5cbiAgICBicmVha0xlbmd0aDogSW5maW5pdHksXG4gICAgLy8gQXNzZXJ0IGRvZXMgbm90IGRldGVjdCBwcm94aWVzIGN1cnJlbnRseS5cbiAgICBzaG93UHJveHk6IGZhbHNlLFxuICAgIHNvcnRlZDogdHJ1ZSxcbiAgICAvLyBJbnNwZWN0IGdldHRlcnMgYXMgd2UgYWxzbyBjaGVjayB0aGVtIHdoZW4gY29tcGFyaW5nIGVudHJpZXMuXG4gICAgZ2V0dGVyczogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXJyRGlmZihhY3R1YWwsIGV4cGVjdGVkLCBvcGVyYXRvcikge1xuICB2YXIgb3RoZXIgPSAnJztcbiAgdmFyIHJlcyA9ICcnO1xuICB2YXIgbGFzdFBvcyA9IDA7XG4gIHZhciBlbmQgPSAnJztcbiAgdmFyIHNraXBwZWQgPSBmYWxzZTtcbiAgdmFyIGFjdHVhbEluc3BlY3RlZCA9IGluc3BlY3RWYWx1ZShhY3R1YWwpO1xuICB2YXIgYWN0dWFsTGluZXMgPSBhY3R1YWxJbnNwZWN0ZWQuc3BsaXQoJ1xcbicpO1xuICB2YXIgZXhwZWN0ZWRMaW5lcyA9IGluc3BlY3RWYWx1ZShleHBlY3RlZCkuc3BsaXQoJ1xcbicpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBpbmRpY2F0b3IgPSAnJzsgLy8gSW4gY2FzZSBib3RoIHZhbHVlcyBhcmUgb2JqZWN0cyBleHBsaWNpdGx5IG1hcmsgdGhlbSBhcyBub3QgcmVmZXJlbmNlIGVxdWFsXG4gIC8vIGZvciB0aGUgYHN0cmljdEVxdWFsYCBvcGVyYXRvci5cblxuICBpZiAob3BlcmF0b3IgPT09ICdzdHJpY3RFcXVhbCcgJiYgX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBfdHlwZW9mKGV4cGVjdGVkKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsICYmIGV4cGVjdGVkICE9PSBudWxsKSB7XG4gICAgb3BlcmF0b3IgPSAnc3RyaWN0RXF1YWxPYmplY3QnO1xuICB9IC8vIElmIFwiYWN0dWFsXCIgYW5kIFwiZXhwZWN0ZWRcIiBmaXQgb24gYSBzaW5nbGUgbGluZSBhbmQgdGhleSBhcmUgbm90IHN0cmljdGx5XG4gIC8vIGVxdWFsLCBjaGVjayBmdXJ0aGVyIHNwZWNpYWwgaGFuZGxpbmcuXG5cblxuICBpZiAoYWN0dWFsTGluZXMubGVuZ3RoID09PSAxICYmIGV4cGVjdGVkTGluZXMubGVuZ3RoID09PSAxICYmIGFjdHVhbExpbmVzWzBdICE9PSBleHBlY3RlZExpbmVzWzBdKSB7XG4gICAgdmFyIGlucHV0TGVuZ3RoID0gYWN0dWFsTGluZXNbMF0ubGVuZ3RoICsgZXhwZWN0ZWRMaW5lc1swXS5sZW5ndGg7IC8vIElmIHRoZSBjaGFyYWN0ZXIgbGVuZ3RoIG9mIFwiYWN0dWFsXCIgYW5kIFwiZXhwZWN0ZWRcIiB0b2dldGhlciBpcyBsZXNzIHRoYW5cbiAgICAvLyBrTWF4U2hvcnRMZW5ndGggYW5kIGlmIG5laXRoZXIgaXMgYW4gb2JqZWN0IGFuZCBhdCBsZWFzdCBvbmUgb2YgdGhlbSBpc1xuICAgIC8vIG5vdCBgemVyb2AsIHVzZSB0aGUgc3RyaWN0IGVxdWFsIGNvbXBhcmlzb24gdG8gdmlzdWFsaXplIHRoZSBvdXRwdXQuXG5cbiAgICBpZiAoaW5wdXRMZW5ndGggPD0ga01heFNob3J0TGVuZ3RoKSB7XG4gICAgICBpZiAoKF90eXBlb2YoYWN0dWFsKSAhPT0gJ29iamVjdCcgfHwgYWN0dWFsID09PSBudWxsKSAmJiAoX3R5cGVvZihleHBlY3RlZCkgIT09ICdvYmplY3QnIHx8IGV4cGVjdGVkID09PSBudWxsKSAmJiAoYWN0dWFsICE9PSAwIHx8IGV4cGVjdGVkICE9PSAwKSkge1xuICAgICAgICAvLyAtMCA9PT0gKzBcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXSwgXCJcXG5cXG5cIikgKyBcIlwiLmNvbmNhdChhY3R1YWxMaW5lc1swXSwgXCIgIT09IFwiKS5jb25jYXQoZXhwZWN0ZWRMaW5lc1swXSwgXCJcXG5cIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciAhPT0gJ3N0cmljdEVxdWFsT2JqZWN0Jykge1xuICAgICAgLy8gSWYgdGhlIHN0ZGVyciBpcyBhIHR0eSBhbmQgdGhlIGlucHV0IGxlbmd0aCBpcyBsb3dlciB0aGFuIHRoZSBjdXJyZW50XG4gICAgICAvLyBjb2x1bW5zIHBlciBsaW5lLCBhZGQgYSBtaXNtYXRjaCBpbmRpY2F0b3IgYmVsb3cgdGhlIG91dHB1dC4gSWYgaXQgaXNcbiAgICAgIC8vIG5vdCBhIHR0eSwgdXNlIGEgZGVmYXVsdCB2YWx1ZSBvZiA4MCBjaGFyYWN0ZXJzLlxuICAgICAgdmFyIG1heExlbmd0aCA9IHByb2Nlc3Muc3RkZXJyICYmIHByb2Nlc3Muc3RkZXJyLmlzVFRZID8gcHJvY2Vzcy5zdGRlcnIuY29sdW1ucyA6IDgwO1xuXG4gICAgICBpZiAoaW5wdXRMZW5ndGggPCBtYXhMZW5ndGgpIHtcbiAgICAgICAgd2hpbGUgKGFjdHVhbExpbmVzWzBdW2ldID09PSBleHBlY3RlZExpbmVzWzBdW2ldKSB7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9IC8vIElnbm9yZSB0aGUgZmlyc3QgY2hhcmFjdGVycy5cblxuXG4gICAgICAgIGlmIChpID4gMikge1xuICAgICAgICAgIC8vIEFkZCBwb3NpdGlvbiBpbmRpY2F0b3IgZm9yIHRoZSBmaXJzdCBtaXNtYXRjaCBpbiBjYXNlIGl0IGlzIGFcbiAgICAgICAgICAvLyBzaW5nbGUgbGluZSBhbmQgdGhlIGlucHV0IGxlbmd0aCBpcyBsZXNzIHRoYW4gdGhlIGNvbHVtbiBsZW5ndGguXG4gICAgICAgICAgaW5kaWNhdG9yID0gXCJcXG4gIFwiLmNvbmNhdChyZXBlYXQoJyAnLCBpKSwgXCJeXCIpO1xuICAgICAgICAgIGkgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IC8vIFJlbW92ZSBhbGwgZW5kaW5nIGxpbmVzIHRoYXQgbWF0Y2ggKHRoaXMgb3B0aW1pemVzIHRoZSBvdXRwdXQgZm9yXG4gIC8vIHJlYWRhYmlsaXR5IGJ5IHJlZHVjaW5nIHRoZSBudW1iZXIgb2YgdG90YWwgY2hhbmdlZCBsaW5lcykuXG5cblxuICB2YXIgYSA9IGFjdHVhbExpbmVzW2FjdHVhbExpbmVzLmxlbmd0aCAtIDFdO1xuICB2YXIgYiA9IGV4cGVjdGVkTGluZXNbZXhwZWN0ZWRMaW5lcy5sZW5ndGggLSAxXTtcblxuICB3aGlsZSAoYSA9PT0gYikge1xuICAgIGlmIChpKysgPCAyKSB7XG4gICAgICBlbmQgPSBcIlxcbiAgXCIuY29uY2F0KGEpLmNvbmNhdChlbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdGhlciA9IGE7XG4gICAgfVxuXG4gICAgYWN0dWFsTGluZXMucG9wKCk7XG4gICAgZXhwZWN0ZWRMaW5lcy5wb3AoKTtcbiAgICBpZiAoYWN0dWFsTGluZXMubGVuZ3RoID09PSAwIHx8IGV4cGVjdGVkTGluZXMubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICBhID0gYWN0dWFsTGluZXNbYWN0dWFsTGluZXMubGVuZ3RoIC0gMV07XG4gICAgYiA9IGV4cGVjdGVkTGluZXNbZXhwZWN0ZWRMaW5lcy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIHZhciBtYXhMaW5lcyA9IE1hdGgubWF4KGFjdHVhbExpbmVzLmxlbmd0aCwgZXhwZWN0ZWRMaW5lcy5sZW5ndGgpOyAvLyBTdHJpY3QgZXF1YWwgd2l0aCBpZGVudGljYWwgb2JqZWN0cyB0aGF0IGFyZSBub3QgaWRlbnRpY2FsIGJ5IHJlZmVyZW5jZS5cbiAgLy8gRS5nLiwgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCh7IGE6IFN5bWJvbCgpIH0sIHsgYTogU3ltYm9sKCkgfSlcblxuICBpZiAobWF4TGluZXMgPT09IDApIHtcbiAgICAvLyBXZSBoYXZlIHRvIGdldCB0aGUgcmVzdWx0IGFnYWluLiBUaGUgbGluZXMgd2VyZSBhbGwgcmVtb3ZlZCBiZWZvcmUuXG4gICAgdmFyIF9hY3R1YWxMaW5lcyA9IGFjdHVhbEluc3BlY3RlZC5zcGxpdCgnXFxuJyk7IC8vIE9ubHkgcmVtb3ZlIGxpbmVzIGluIGNhc2UgaXQgbWFrZXMgc2Vuc2UgdG8gY29sbGFwc2UgdGhvc2UuXG4gICAgLy8gVE9ETzogQWNjZXB0IGVudiB0byBhbHdheXMgc2hvdyB0aGUgZnVsbCBlcnJvci5cblxuXG4gICAgaWYgKF9hY3R1YWxMaW5lcy5sZW5ndGggPiAzMCkge1xuICAgICAgX2FjdHVhbExpbmVzWzI2XSA9IFwiXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG5cbiAgICAgIHdoaWxlIChfYWN0dWFsTGluZXMubGVuZ3RoID4gMjcpIHtcbiAgICAgICAgX2FjdHVhbExpbmVzLnBvcCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChrUmVhZGFibGVPcGVyYXRvci5ub3RJZGVudGljYWwsIFwiXFxuXFxuXCIpLmNvbmNhdChfYWN0dWFsTGluZXMuam9pbignXFxuJyksIFwiXFxuXCIpO1xuICB9XG5cbiAgaWYgKGkgPiAzKSB7XG4gICAgZW5kID0gXCJcXG5cIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKS5jb25jYXQoZW5kKTtcbiAgICBza2lwcGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChvdGhlciAhPT0gJycpIHtcbiAgICBlbmQgPSBcIlxcbiAgXCIuY29uY2F0KG90aGVyKS5jb25jYXQoZW5kKTtcbiAgICBvdGhlciA9ICcnO1xuICB9XG5cbiAgdmFyIHByaW50ZWRMaW5lcyA9IDA7XG4gIHZhciBtc2cgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl0gKyBcIlxcblwiLmNvbmNhdChncmVlbiwgXCIrIGFjdHVhbFwiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQocmVkLCBcIi0gZXhwZWN0ZWRcIikuY29uY2F0KHdoaXRlKTtcbiAgdmFyIHNraXBwZWRNc2cgPSBcIiBcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlLCBcIiBMaW5lcyBza2lwcGVkXCIpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBtYXhMaW5lczsgaSsrKSB7XG4gICAgLy8gT25seSBleHRyYSBleHBlY3RlZCBsaW5lcyBleGlzdFxuICAgIHZhciBjdXIgPSBpIC0gbGFzdFBvcztcblxuICAgIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPCBpICsgMSkge1xuICAgICAgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgbW9yZSB0aGFuIG9uZSBsaW5lIGFib3ZlIGFuZCB0aGVcbiAgICAgIC8vIGN1cnJlbnQgbGluZSBpcyBhdCBsZWFzdCBsaW5lIHRocmVlLCBhZGQgc29tZSBvZiB0aGUgZm9ybWVyIGxpbmVzIGFuZFxuICAgICAgLy8gYWxzbyBhZGQgZG90cyB0byBpbmRpY2F0ZSBza2lwcGVkIGVudHJpZXMuXG4gICAgICBpZiAoY3VyID4gMSAmJiBpID4gMikge1xuICAgICAgICBpZiAoY3VyID4gNCkge1xuICAgICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgICAgIHNraXBwZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGN1ciA+IDMpIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChleHBlY3RlZExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChleHBlY3RlZExpbmVzW2kgLSAxXSk7XG4gICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgfSAvLyBNYXJrIHRoZSBjdXJyZW50IGxpbmUgYXMgdGhlIGxhc3QgZGl2ZXJnaW5nIG9uZS5cblxuXG4gICAgICBsYXN0UG9zID0gaTsgLy8gQWRkIHRoZSBleHBlY3RlZCBsaW5lIHRvIHRoZSBjYWNoZS5cblxuICAgICAgb3RoZXIgKz0gXCJcXG5cIi5jb25jYXQocmVkLCBcIi1cIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkTGluZXNbaV0pO1xuICAgICAgcHJpbnRlZExpbmVzKys7IC8vIE9ubHkgZXh0cmEgYWN0dWFsIGxpbmVzIGV4aXN0XG4gICAgfSBlbHNlIGlmIChleHBlY3RlZExpbmVzLmxlbmd0aCA8IGkgKyAxKSB7XG4gICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBtb3JlIHRoYW4gb25lIGxpbmUgYWJvdmUgYW5kIHRoZVxuICAgICAgLy8gY3VycmVudCBsaW5lIGlzIGF0IGxlYXN0IGxpbmUgdGhyZWUsIGFkZCBzb21lIG9mIHRoZSBmb3JtZXIgbGluZXMgYW5kXG4gICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgIGlmIChjdXIgPiAxICYmIGkgPiAyKSB7XG4gICAgICAgIGlmIChjdXIgPiA0KSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgc2tpcHBlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VyID4gMykge1xuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lc1tpIC0gMV0pO1xuICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgIH0gLy8gTWFyayB0aGUgY3VycmVudCBsaW5lIGFzIHRoZSBsYXN0IGRpdmVyZ2luZyBvbmUuXG5cblxuICAgICAgbGFzdFBvcyA9IGk7IC8vIEFkZCB0aGUgYWN0dWFsIGxpbmUgdG8gdGhlIHJlc3VsdC5cblxuICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGdyZWVuLCBcIitcIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGFjdHVhbExpbmVzW2ldKTtcbiAgICAgIHByaW50ZWRMaW5lcysrOyAvLyBMaW5lcyBkaXZlcmdlXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBleHBlY3RlZExpbmUgPSBleHBlY3RlZExpbmVzW2ldO1xuICAgICAgdmFyIGFjdHVhbExpbmUgPSBhY3R1YWxMaW5lc1tpXTsgLy8gSWYgdGhlIGxpbmVzIGRpdmVyZ2UsIHNwZWNpZmljYWxseSBjaGVjayBmb3IgbGluZXMgdGhhdCBvbmx5IGRpdmVyZ2UgYnlcbiAgICAgIC8vIGEgdHJhaWxpbmcgY29tbWEuIEluIHRoYXQgY2FzZSBpdCBpcyBhY3R1YWxseSBpZGVudGljYWwgYW5kIHdlIHNob3VsZFxuICAgICAgLy8gbWFyayBpdCBhcyBzdWNoLlxuXG4gICAgICB2YXIgZGl2ZXJnaW5nTGluZXMgPSBhY3R1YWxMaW5lICE9PSBleHBlY3RlZExpbmUgJiYgKCFlbmRzV2l0aChhY3R1YWxMaW5lLCAnLCcpIHx8IGFjdHVhbExpbmUuc2xpY2UoMCwgLTEpICE9PSBleHBlY3RlZExpbmUpOyAvLyBJZiB0aGUgZXhwZWN0ZWQgbGluZSBoYXMgYSB0cmFpbGluZyBjb21tYSBidXQgaXMgb3RoZXJ3aXNlIGlkZW50aWNhbCxcbiAgICAgIC8vIGFkZCBhIGNvbW1hIGF0IHRoZSBlbmQgb2YgdGhlIGFjdHVhbCBsaW5lLiBPdGhlcndpc2UgdGhlIG91dHB1dCBjb3VsZFxuICAgICAgLy8gbG9vayB3ZWlyZCBhcyBpbjpcbiAgICAgIC8vXG4gICAgICAvLyAgIFtcbiAgICAgIC8vICAgICAxICAgICAgICAgLy8gTm8gY29tbWEgYXQgdGhlIGVuZCFcbiAgICAgIC8vICsgICAyXG4gICAgICAvLyAgIF1cbiAgICAgIC8vXG5cbiAgICAgIGlmIChkaXZlcmdpbmdMaW5lcyAmJiBlbmRzV2l0aChleHBlY3RlZExpbmUsICcsJykgJiYgZXhwZWN0ZWRMaW5lLnNsaWNlKDAsIC0xKSA9PT0gYWN0dWFsTGluZSkge1xuICAgICAgICBkaXZlcmdpbmdMaW5lcyA9IGZhbHNlO1xuICAgICAgICBhY3R1YWxMaW5lICs9ICcsJztcbiAgICAgIH1cblxuICAgICAgaWYgKGRpdmVyZ2luZ0xpbmVzKSB7XG4gICAgICAgIC8vIElmIHRoZSBsYXN0IGRpdmVyZ2luZyBsaW5lIGlzIG1vcmUgdGhhbiBvbmUgbGluZSBhYm92ZSBhbmQgdGhlXG4gICAgICAgIC8vIGN1cnJlbnQgbGluZSBpcyBhdCBsZWFzdCBsaW5lIHRocmVlLCBhZGQgc29tZSBvZiB0aGUgZm9ybWVyIGxpbmVzIGFuZFxuICAgICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgICAgaWYgKGN1ciA+IDEgJiYgaSA+IDIpIHtcbiAgICAgICAgICBpZiAoY3VyID4gNCkge1xuICAgICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgICBza2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1ciA+IDMpIHtcbiAgICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lc1tpIC0gMV0pO1xuICAgICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgICB9IC8vIE1hcmsgdGhlIGN1cnJlbnQgbGluZSBhcyB0aGUgbGFzdCBkaXZlcmdpbmcgb25lLlxuXG5cbiAgICAgICAgbGFzdFBvcyA9IGk7IC8vIEFkZCB0aGUgYWN0dWFsIGxpbmUgdG8gdGhlIHJlc3VsdCBhbmQgY2FjaGUgdGhlIGV4cGVjdGVkIGRpdmVyZ2luZ1xuICAgICAgICAvLyBsaW5lIHNvIGNvbnNlY3V0aXZlIGRpdmVyZ2luZyBsaW5lcyBzaG93IHVwIGFzICsrKy0tLSBhbmQgbm90ICstKy0rLS5cblxuICAgICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoZ3JlZW4sIFwiK1wiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoYWN0dWFsTGluZSk7XG4gICAgICAgIG90aGVyICs9IFwiXFxuXCIuY29uY2F0KHJlZCwgXCItXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChleHBlY3RlZExpbmUpO1xuICAgICAgICBwcmludGVkTGluZXMgKz0gMjsgLy8gTGluZXMgYXJlIGlkZW50aWNhbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWRkIGFsbCBjYWNoZWQgaW5mb3JtYXRpb24gdG8gdGhlIHJlc3VsdCBiZWZvcmUgYWRkaW5nIG90aGVyIHRoaW5nc1xuICAgICAgICAvLyBhbmQgcmVzZXQgdGhlIGNhY2hlLlxuICAgICAgICByZXMgKz0gb3RoZXI7XG4gICAgICAgIG90aGVyID0gJyc7IC8vIElmIHRoZSBsYXN0IGRpdmVyZ2luZyBsaW5lIGlzIGV4YWN0bHkgb25lIGxpbmUgYWJvdmUgb3IgaWYgaXQgaXMgdGhlXG4gICAgICAgIC8vIHZlcnkgZmlyc3QgbGluZSwgYWRkIHRoZSBsaW5lIHRvIHRoZSByZXN1bHQuXG5cbiAgICAgICAgaWYgKGN1ciA9PT0gMSB8fCBpID09PSAwKSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIEluc3BlY3RlZCBvYmplY3QgdG8gYmlnIChTaG93IH4yMCByb3dzIG1heClcblxuXG4gICAgaWYgKHByaW50ZWRMaW5lcyA+IDIwICYmIGkgPCBtYXhMaW5lcyAtIDIpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChtc2cpLmNvbmNhdChza2lwcGVkTXNnLCBcIlxcblwiKS5jb25jYXQocmVzLCBcIlxcblwiKS5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKS5jb25jYXQob3RoZXIsIFwiXFxuXCIpICsgXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQobXNnKS5jb25jYXQoc2tpcHBlZCA/IHNraXBwZWRNc2cgOiAnJywgXCJcXG5cIikuY29uY2F0KHJlcykuY29uY2F0KG90aGVyKS5jb25jYXQoZW5kKS5jb25jYXQoaW5kaWNhdG9yKTtcbn1cblxudmFyIEFzc2VydGlvbkVycm9yID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRXJyb3IpIHtcbiAgX2luaGVyaXRzKEFzc2VydGlvbkVycm9yLCBfRXJyb3IpO1xuXG4gIGZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXNzZXJ0aW9uRXJyb3IpO1xuXG4gICAgaWYgKF90eXBlb2Yob3B0aW9ucykgIT09ICdvYmplY3QnIHx8IG9wdGlvbnMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnb3B0aW9ucycsICdPYmplY3QnLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSxcbiAgICAgICAgb3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yLFxuICAgICAgICBzdGFja1N0YXJ0Rm4gPSBvcHRpb25zLnN0YWNrU3RhcnRGbjtcbiAgICB2YXIgYWN0dWFsID0gb3B0aW9ucy5hY3R1YWwsXG4gICAgICAgIGV4cGVjdGVkID0gb3B0aW9ucy5leHBlY3RlZDtcbiAgICB2YXIgbGltaXQgPSBFcnJvci5zdGFja1RyYWNlTGltaXQ7XG4gICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMDtcblxuICAgIGlmIChtZXNzYWdlICE9IG51bGwpIHtcbiAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEFzc2VydGlvbkVycm9yKS5jYWxsKHRoaXMsIFN0cmluZyhtZXNzYWdlKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuaXNUVFkpIHtcbiAgICAgICAgLy8gUmVzZXQgb24gZWFjaCBjYWxsIHRvIG1ha2Ugc3VyZSB3ZSBoYW5kbGUgZHluYW1pY2FsbHkgc2V0IGVudmlyb25tZW50XG4gICAgICAgIC8vIHZhcmlhYmxlcyBjb3JyZWN0LlxuICAgICAgICBpZiAocHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuZ2V0Q29sb3JEZXB0aCAmJiBwcm9jZXNzLnN0ZGVyci5nZXRDb2xvckRlcHRoKCkgIT09IDEpIHtcbiAgICAgICAgICBibHVlID0gXCJcXHgxQlszNG1cIjtcbiAgICAgICAgICBncmVlbiA9IFwiXFx4MUJbMzJtXCI7XG4gICAgICAgICAgd2hpdGUgPSBcIlxceDFCWzM5bVwiO1xuICAgICAgICAgIHJlZCA9IFwiXFx4MUJbMzFtXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmx1ZSA9ICcnO1xuICAgICAgICAgIGdyZWVuID0gJyc7XG4gICAgICAgICAgd2hpdGUgPSAnJztcbiAgICAgICAgICByZWQgPSAnJztcbiAgICAgICAgfVxuICAgICAgfSAvLyBQcmV2ZW50IHRoZSBlcnJvciBzdGFjayBmcm9tIGJlaW5nIHZpc2libGUgYnkgZHVwbGljYXRpbmcgdGhlIGVycm9yXG4gICAgICAvLyBpbiBhIHZlcnkgY2xvc2Ugd2F5IHRvIHRoZSBvcmlnaW5hbCBpbiBjYXNlIGJvdGggc2lkZXMgYXJlIGFjdHVhbGx5XG4gICAgICAvLyBpbnN0YW5jZXMgb2YgRXJyb3IuXG5cblxuICAgICAgaWYgKF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsICYmIF90eXBlb2YoZXhwZWN0ZWQpID09PSAnb2JqZWN0JyAmJiBleHBlY3RlZCAhPT0gbnVsbCAmJiAnc3RhY2snIGluIGFjdHVhbCAmJiBhY3R1YWwgaW5zdGFuY2VvZiBFcnJvciAmJiAnc3RhY2snIGluIGV4cGVjdGVkICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgYWN0dWFsID0gY29weUVycm9yKGFjdHVhbCk7XG4gICAgICAgIGV4cGVjdGVkID0gY29weUVycm9yKGV4cGVjdGVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wZXJhdG9yID09PSAnZGVlcFN0cmljdEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ3N0cmljdEVxdWFsJykge1xuICAgICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBjcmVhdGVFcnJEaWZmKGFjdHVhbCwgZXhwZWN0ZWQsIG9wZXJhdG9yKSkpO1xuICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJ25vdERlZXBTdHJpY3RFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdub3RTdHJpY3RFcXVhbCcpIHtcbiAgICAgICAgLy8gSW4gY2FzZSB0aGUgb2JqZWN0cyBhcmUgZXF1YWwgYnV0IHRoZSBvcGVyYXRvciByZXF1aXJlcyB1bmVxdWFsLCBzaG93XG4gICAgICAgIC8vIHRoZSBmaXJzdCBvYmplY3QgYW5kIHNheSBBIGVxdWFscyBCXG4gICAgICAgIHZhciBiYXNlID0ga1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdO1xuICAgICAgICB2YXIgcmVzID0gaW5zcGVjdFZhbHVlKGFjdHVhbCkuc3BsaXQoJ1xcbicpOyAvLyBJbiBjYXNlIFwiYWN0dWFsXCIgaXMgYW4gb2JqZWN0LCBpdCBzaG91bGQgbm90IGJlIHJlZmVyZW5jZSBlcXVhbC5cblxuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdub3RTdHJpY3RFcXVhbCcgJiYgX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwpIHtcbiAgICAgICAgICBiYXNlID0ga1JlYWRhYmxlT3BlcmF0b3Iubm90U3RyaWN0RXF1YWxPYmplY3Q7XG4gICAgICAgIH0gLy8gT25seSByZW1vdmUgbGluZXMgaW4gY2FzZSBpdCBtYWtlcyBzZW5zZSB0byBjb2xsYXBzZSB0aG9zZS5cbiAgICAgICAgLy8gVE9ETzogQWNjZXB0IGVudiB0byBhbHdheXMgc2hvdyB0aGUgZnVsbCBlcnJvci5cblxuXG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMzApIHtcbiAgICAgICAgICByZXNbMjZdID0gXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcblxuICAgICAgICAgIHdoaWxlIChyZXMubGVuZ3RoID4gMjcpIHtcbiAgICAgICAgICAgIHJlcy5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gT25seSBwcmludCBhIHNpbmdsZSBpbnB1dC5cblxuXG4gICAgICAgIGlmIChyZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQXNzZXJ0aW9uRXJyb3IpLmNhbGwodGhpcywgXCJcIi5jb25jYXQoYmFzZSwgXCIgXCIpLmNvbmNhdChyZXNbMF0pKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQXNzZXJ0aW9uRXJyb3IpLmNhbGwodGhpcywgXCJcIi5jb25jYXQoYmFzZSwgXCJcXG5cXG5cIikuY29uY2F0KHJlcy5qb2luKCdcXG4nKSwgXCJcXG5cIikpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF9yZXMgPSBpbnNwZWN0VmFsdWUoYWN0dWFsKTtcblxuICAgICAgICB2YXIgb3RoZXIgPSAnJztcbiAgICAgICAgdmFyIGtub3duT3BlcmF0b3JzID0ga1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdO1xuXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ25vdERlZXBFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdub3RFcXVhbCcpIHtcbiAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoa1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdLCBcIlxcblxcblwiKS5jb25jYXQoX3Jlcyk7XG5cbiAgICAgICAgICBpZiAoX3Jlcy5sZW5ndGggPiAxMDI0KSB7XG4gICAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoX3Jlcy5zbGljZSgwLCAxMDIxKSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG90aGVyID0gXCJcIi5jb25jYXQoaW5zcGVjdFZhbHVlKGV4cGVjdGVkKSk7XG5cbiAgICAgICAgICBpZiAoX3Jlcy5sZW5ndGggPiA1MTIpIHtcbiAgICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChfcmVzLnNsaWNlKDAsIDUwOSksIFwiLi4uXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvdGhlci5sZW5ndGggPiA1MTIpIHtcbiAgICAgICAgICAgIG90aGVyID0gXCJcIi5jb25jYXQob3RoZXIuc2xpY2UoMCwgNTA5KSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnZGVlcEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ2VxdWFsJykge1xuICAgICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KGtub3duT3BlcmF0b3JzLCBcIlxcblxcblwiKS5jb25jYXQoX3JlcywgXCJcXG5cXG5zaG91bGQgZXF1YWxcXG5cXG5cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG90aGVyID0gXCIgXCIuY29uY2F0KG9wZXJhdG9yLCBcIiBcIikuY29uY2F0KG90aGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBcIlwiLmNvbmNhdChfcmVzKS5jb25jYXQob3RoZXIpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gbGltaXQ7XG4gICAgX3RoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9ICFtZXNzYWdlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgJ25hbWUnLCB7XG4gICAgICB2YWx1ZTogJ0Fzc2VydGlvbkVycm9yIFtFUlJfQVNTRVJUSU9OXScsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgX3RoaXMuY29kZSA9ICdFUlJfQVNTRVJUSU9OJztcbiAgICBfdGhpcy5hY3R1YWwgPSBhY3R1YWw7XG4gICAgX3RoaXMuZXhwZWN0ZWQgPSBleHBlY3RlZDtcbiAgICBfdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBzdGFja1N0YXJ0Rm4pO1xuICAgIH0gLy8gQ3JlYXRlIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBlcnJvciBjb2RlIGluIHRoZSBuYW1lLlxuXG5cbiAgICBfdGhpcy5zdGFjazsgLy8gUmVzZXQgdGhlIG5hbWUuXG5cbiAgICBfdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFzc2VydGlvbkVycm9yLCBbe1xuICAgIGtleTogXCJ0b1N0cmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLm5hbWUsIFwiIFtcIikuY29uY2F0KHRoaXMuY29kZSwgXCJdOiBcIikuY29uY2F0KHRoaXMubWVzc2FnZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBpbnNwZWN0LmN1c3RvbSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUocmVjdXJzZVRpbWVzLCBjdHgpIHtcbiAgICAgIC8vIFRoaXMgbGltaXRzIHRoZSBgYWN0dWFsYCBhbmQgYGV4cGVjdGVkYCBwcm9wZXJ0eSBkZWZhdWx0IGluc3BlY3Rpb24gdG9cbiAgICAgIC8vIHRoZSBtaW5pbXVtIGRlcHRoLiBPdGhlcndpc2UgdGhvc2UgdmFsdWVzIHdvdWxkIGJlIHRvbyB2ZXJib3NlIGNvbXBhcmVkXG4gICAgICAvLyB0byB0aGUgYWN0dWFsIGVycm9yIG1lc3NhZ2Ugd2hpY2ggY29udGFpbnMgYSBjb21iaW5lZCB2aWV3IG9mIHRoZXNlIHR3b1xuICAgICAgLy8gaW5wdXQgdmFsdWVzLlxuICAgICAgcmV0dXJuIGluc3BlY3QodGhpcywgX29iamVjdFNwcmVhZCh7fSwgY3R4LCB7XG4gICAgICAgIGN1c3RvbUluc3BlY3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aDogMFxuICAgICAgfSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBc3NlcnRpb25FcnJvcjtcbn0oX3dyYXBOYXRpdmVTdXBlcihFcnJvcikpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2VydGlvbkVycm9yOyIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvZXJyb3JzLmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzNiMDQ0OTYyYzQ4ZmUzMTM5MDU4NzdhOTZiNWQwODk0YTU0MDRmNmZcblxuLyogZXNsaW50IG5vZGUtY29yZS9kb2N1bWVudGVkLWVycm9yczogXCJlcnJvclwiICovXG5cbi8qIGVzbGludCBub2RlLWNvcmUvYWxwaGFiZXRpemUtZXJyb3JzOiBcImVycm9yXCIgKi9cblxuLyogZXNsaW50IG5vZGUtY29yZS9wcmVmZXItdXRpbC1mb3JtYXQtZXJyb3JzOiBcImVycm9yXCIgKi9cbid1c2Ugc3RyaWN0JzsgLy8gVGhlIHdob2xlIHBvaW50IGJlaGluZCB0aGlzIGludGVybmFsIG1vZHVsZSBpcyB0byBhbGxvdyBOb2RlLmpzIHRvIG5vXG4vLyBsb25nZXIgYmUgZm9yY2VkIHRvIHRyZWF0IGV2ZXJ5IGVycm9yIG1lc3NhZ2UgY2hhbmdlIGFzIGEgc2VtdmVyLW1ham9yXG4vLyBjaGFuZ2UuIFRoZSBOb2RlRXJyb3IgY2xhc3NlcyBoZXJlIGFsbCBleHBvc2UgYSBgY29kZWAgcHJvcGVydHkgd2hvc2Vcbi8vIHZhbHVlIHN0YXRpY2FsbHkgYW5kIHBlcm1hbmVudGx5IGlkZW50aWZpZXMgdGhlIGVycm9yLiBXaGlsZSB0aGUgZXJyb3Jcbi8vIG1lc3NhZ2UgbWF5IGNoYW5nZSwgdGhlIGNvZGUgc2hvdWxkIG5vdC5cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG52YXIgY29kZXMgPSB7fTsgLy8gTGF6eSBsb2FkZWRcblxudmFyIGFzc2VydDtcbnZhciB1dGlsO1xuXG5mdW5jdGlvbiBjcmVhdGVFcnJvclR5cGUoY29kZSwgbWVzc2FnZSwgQmFzZSkge1xuICBpZiAoIUJhc2UpIHtcbiAgICBCYXNlID0gRXJyb3I7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNZXNzYWdlKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UoYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIE5vZGVFcnJvciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9CYXNlKSB7XG4gICAgX2luaGVyaXRzKE5vZGVFcnJvciwgX0Jhc2UpO1xuXG4gICAgZnVuY3Rpb24gTm9kZUVycm9yKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5vZGVFcnJvcik7XG5cbiAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKE5vZGVFcnJvcikuY2FsbCh0aGlzLCBnZXRNZXNzYWdlKGFyZzEsIGFyZzIsIGFyZzMpKSk7XG4gICAgICBfdGhpcy5jb2RlID0gY29kZTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gTm9kZUVycm9yO1xuICB9KEJhc2UpO1xuXG4gIGNvZGVzW2NvZGVdID0gTm9kZUVycm9yO1xufSAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi92MTAuOC4wL2xpYi9pbnRlcm5hbC9lcnJvcnMuanNcblxuXG5mdW5jdGlvbiBvbmVPZihleHBlY3RlZCwgdGhpbmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXhwZWN0ZWQpKSB7XG4gICAgdmFyIGxlbiA9IGV4cGVjdGVkLmxlbmd0aDtcbiAgICBleHBlY3RlZCA9IGV4cGVjdGVkLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhpKTtcbiAgICB9KTtcblxuICAgIGlmIChsZW4gPiAyKSB7XG4gICAgICByZXR1cm4gXCJvbmUgb2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkLnNsaWNlKDAsIGxlbiAtIDEpLmpvaW4oJywgJyksIFwiLCBvciBcIikgKyBleHBlY3RlZFtsZW4gLSAxXTtcbiAgICB9IGVsc2UgaWYgKGxlbiA9PT0gMikge1xuICAgICAgcmV0dXJuIFwib25lIG9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZFswXSwgXCIgb3IgXCIpLmNvbmNhdChleHBlY3RlZFsxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIm9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZFswXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIm9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChTdHJpbmcoZXhwZWN0ZWQpKTtcbiAgfVxufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvc3RhcnRzV2l0aFxuXG5cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyLCBzZWFyY2gsIHBvcykge1xuICByZXR1cm4gc3RyLnN1YnN0cighcG9zIHx8IHBvcyA8IDAgPyAwIDogK3Bvcywgc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDtcbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2VuZHNXaXRoXG5cblxuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzZWFyY2gsIHRoaXNfbGVuKSB7XG4gIGlmICh0aGlzX2xlbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXNfbGVuID4gc3RyLmxlbmd0aCkge1xuICAgIHRoaXNfbGVuID0gc3RyLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKHRoaXNfbGVuIC0gc2VhcmNoLmxlbmd0aCwgdGhpc19sZW4pID09PSBzZWFyY2g7XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9pbmNsdWRlc1xuXG5cbmZ1bmN0aW9uIGluY2x1ZGVzKHN0ciwgc2VhcmNoLCBzdGFydCkge1xuICBpZiAodHlwZW9mIHN0YXJ0ICE9PSAnbnVtYmVyJykge1xuICAgIHN0YXJ0ID0gMDtcbiAgfVxuXG4gIGlmIChzdGFydCArIHNlYXJjaC5sZW5ndGggPiBzdHIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzZWFyY2gsIHN0YXJ0KSAhPT0gLTE7XG4gIH1cbn1cblxuY3JlYXRlRXJyb3JUeXBlKCdFUlJfQU1CSUdVT1VTX0FSR1VNRU5UJywgJ1RoZSBcIiVzXCIgYXJndW1lbnQgaXMgYW1iaWd1b3VzLiAlcycsIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJywgZnVuY3Rpb24gKG5hbWUsIGV4cGVjdGVkLCBhY3R1YWwpIHtcbiAgaWYgKGFzc2VydCA9PT0gdW5kZWZpbmVkKSBhc3NlcnQgPSByZXF1aXJlKCcuLi9hc3NlcnQnKTtcbiAgYXNzZXJ0KHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJywgXCInbmFtZScgbXVzdCBiZSBhIHN0cmluZ1wiKTsgLy8gZGV0ZXJtaW5lcjogJ211c3QgYmUnIG9yICdtdXN0IG5vdCBiZSdcblxuICB2YXIgZGV0ZXJtaW5lcjtcblxuICBpZiAodHlwZW9mIGV4cGVjdGVkID09PSAnc3RyaW5nJyAmJiBzdGFydHNXaXRoKGV4cGVjdGVkLCAnbm90ICcpKSB7XG4gICAgZGV0ZXJtaW5lciA9ICdtdXN0IG5vdCBiZSc7XG4gICAgZXhwZWN0ZWQgPSBleHBlY3RlZC5yZXBsYWNlKC9ebm90IC8sICcnKTtcbiAgfSBlbHNlIHtcbiAgICBkZXRlcm1pbmVyID0gJ211c3QgYmUnO1xuICB9XG5cbiAgdmFyIG1zZztcblxuICBpZiAoZW5kc1dpdGgobmFtZSwgJyBhcmd1bWVudCcpKSB7XG4gICAgLy8gRm9yIGNhc2VzIGxpa2UgJ2ZpcnN0IGFyZ3VtZW50J1xuICAgIG1zZyA9IFwiVGhlIFwiLmNvbmNhdChuYW1lLCBcIiBcIikuY29uY2F0KGRldGVybWluZXIsIFwiIFwiKS5jb25jYXQob25lT2YoZXhwZWN0ZWQsICd0eXBlJykpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0eXBlID0gaW5jbHVkZXMobmFtZSwgJy4nKSA/ICdwcm9wZXJ0eScgOiAnYXJndW1lbnQnO1xuICAgIG1zZyA9IFwiVGhlIFxcXCJcIi5jb25jYXQobmFtZSwgXCJcXFwiIFwiKS5jb25jYXQodHlwZSwgXCIgXCIpLmNvbmNhdChkZXRlcm1pbmVyLCBcIiBcIikuY29uY2F0KG9uZU9mKGV4cGVjdGVkLCAndHlwZScpKTtcbiAgfSAvLyBUT0RPKEJyaWRnZUFSKTogSW1wcm92ZSB0aGUgb3V0cHV0IGJ5IHNob3dpbmcgYG51bGxgIGFuZCBzaW1pbGFyLlxuXG5cbiAgbXNnICs9IFwiLiBSZWNlaXZlZCB0eXBlIFwiLmNvbmNhdChfdHlwZW9mKGFjdHVhbCkpO1xuICByZXR1cm4gbXNnO1xufSwgVHlwZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0lOVkFMSURfQVJHX1ZBTFVFJywgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gIHZhciByZWFzb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICdpcyBpbnZhbGlkJztcbiAgaWYgKHV0aWwgPT09IHVuZGVmaW5lZCkgdXRpbCA9IHJlcXVpcmUoJ3V0aWwvJyk7XG4gIHZhciBpbnNwZWN0ZWQgPSB1dGlsLmluc3BlY3QodmFsdWUpO1xuXG4gIGlmIChpbnNwZWN0ZWQubGVuZ3RoID4gMTI4KSB7XG4gICAgaW5zcGVjdGVkID0gXCJcIi5jb25jYXQoaW5zcGVjdGVkLnNsaWNlKDAsIDEyOCksIFwiLi4uXCIpO1xuICB9XG5cbiAgcmV0dXJuIFwiVGhlIGFyZ3VtZW50ICdcIi5jb25jYXQobmFtZSwgXCInIFwiKS5jb25jYXQocmVhc29uLCBcIi4gUmVjZWl2ZWQgXCIpLmNvbmNhdChpbnNwZWN0ZWQpO1xufSwgVHlwZUVycm9yLCBSYW5nZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFJywgZnVuY3Rpb24gKGlucHV0LCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgdHlwZTtcblxuICBpZiAodmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgIHR5cGUgPSBcImluc3RhbmNlIG9mIFwiLmNvbmNhdCh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICB0eXBlID0gXCJ0eXBlIFwiLmNvbmNhdChfdHlwZW9mKHZhbHVlKSk7XG4gIH1cblxuICByZXR1cm4gXCJFeHBlY3RlZCBcIi5jb25jYXQoaW5wdXQsIFwiIHRvIGJlIHJldHVybmVkIGZyb20gdGhlIFxcXCJcIikuY29uY2F0KG5hbWUsIFwiXFxcIlwiKSArIFwiIGZ1bmN0aW9uIGJ1dCBnb3QgXCIuY29uY2F0KHR5cGUsIFwiLlwiKTtcbn0sIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9NSVNTSU5HX0FSR1MnLCBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoYXNzZXJ0ID09PSB1bmRlZmluZWQpIGFzc2VydCA9IHJlcXVpcmUoJy4uL2Fzc2VydCcpO1xuICBhc3NlcnQoYXJncy5sZW5ndGggPiAwLCAnQXQgbGVhc3Qgb25lIGFyZyBuZWVkcyB0byBiZSBzcGVjaWZpZWQnKTtcbiAgdmFyIG1zZyA9ICdUaGUgJztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICBhcmdzID0gYXJncy5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KGEsIFwiXFxcIlwiKTtcbiAgfSk7XG5cbiAgc3dpdGNoIChsZW4pIHtcbiAgICBjYXNlIDE6XG4gICAgICBtc2cgKz0gXCJcIi5jb25jYXQoYXJnc1swXSwgXCIgYXJndW1lbnRcIik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMjpcbiAgICAgIG1zZyArPSBcIlwiLmNvbmNhdChhcmdzWzBdLCBcIiBhbmQgXCIpLmNvbmNhdChhcmdzWzFdLCBcIiBhcmd1bWVudHNcIik7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBtc2cgKz0gYXJncy5zbGljZSgwLCBsZW4gLSAxKS5qb2luKCcsICcpO1xuICAgICAgbXNnICs9IFwiLCBhbmQgXCIuY29uY2F0KGFyZ3NbbGVuIC0gMV0sIFwiIGFyZ3VtZW50c1wiKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIFwiXCIuY29uY2F0KG1zZywgXCIgbXVzdCBiZSBzcGVjaWZpZWRcIik7XG59LCBUeXBlRXJyb3IpO1xubW9kdWxlLmV4cG9ydHMuY29kZXMgPSBjb2RlczsiLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL3V0aWwvY29tcGFyaXNvbnMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMTEyY2M3YzI3NTUxMjU0YWEyYjE3MDk4ZmI3NzQ4NjdmMDVlZDBkOVxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxudmFyIHJlZ2V4RmxhZ3NTdXBwb3J0ZWQgPSAvYS9nLmZsYWdzICE9PSB1bmRlZmluZWQ7XG5cbnZhciBhcnJheUZyb21TZXQgPSBmdW5jdGlvbiBhcnJheUZyb21TZXQoc2V0KSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBzZXQuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gYXJyYXkucHVzaCh2YWx1ZSk7XG4gIH0pO1xuICByZXR1cm4gYXJyYXk7XG59O1xuXG52YXIgYXJyYXlGcm9tTWFwID0gZnVuY3Rpb24gYXJyYXlGcm9tTWFwKG1hcCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICByZXR1cm4gYXJyYXkucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9KTtcbiAgcmV0dXJuIGFycmF5O1xufTtcblxudmFyIG9iamVjdElzID0gT2JqZWN0LmlzID8gT2JqZWN0LmlzIDogcmVxdWlyZSgnb2JqZWN0LWlzJyk7XG52YXIgb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBbXTtcbn07XG52YXIgbnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gPyBOdW1iZXIuaXNOYU4gOiByZXF1aXJlKCdpcy1uYW4nKTtcblxuZnVuY3Rpb24gdW5jdXJyeVRoaXMoZikge1xuICByZXR1cm4gZi5jYWxsLmJpbmQoZik7XG59XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSk7XG52YXIgb2JqZWN0VG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKTtcblxudmFyIF9yZXF1aXJlJHR5cGVzID0gcmVxdWlyZSgndXRpbC8nKS50eXBlcyxcbiAgICBpc0FueUFycmF5QnVmZmVyID0gX3JlcXVpcmUkdHlwZXMuaXNBbnlBcnJheUJ1ZmZlcixcbiAgICBpc0FycmF5QnVmZmVyVmlldyA9IF9yZXF1aXJlJHR5cGVzLmlzQXJyYXlCdWZmZXJWaWV3LFxuICAgIGlzRGF0ZSA9IF9yZXF1aXJlJHR5cGVzLmlzRGF0ZSxcbiAgICBpc01hcCA9IF9yZXF1aXJlJHR5cGVzLmlzTWFwLFxuICAgIGlzUmVnRXhwID0gX3JlcXVpcmUkdHlwZXMuaXNSZWdFeHAsXG4gICAgaXNTZXQgPSBfcmVxdWlyZSR0eXBlcy5pc1NldCxcbiAgICBpc05hdGl2ZUVycm9yID0gX3JlcXVpcmUkdHlwZXMuaXNOYXRpdmVFcnJvcixcbiAgICBpc0JveGVkUHJpbWl0aXZlID0gX3JlcXVpcmUkdHlwZXMuaXNCb3hlZFByaW1pdGl2ZSxcbiAgICBpc051bWJlck9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzTnVtYmVyT2JqZWN0LFxuICAgIGlzU3RyaW5nT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNTdHJpbmdPYmplY3QsXG4gICAgaXNCb29sZWFuT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNCb29sZWFuT2JqZWN0LFxuICAgIGlzQmlnSW50T2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNCaWdJbnRPYmplY3QsXG4gICAgaXNTeW1ib2xPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc1N5bWJvbE9iamVjdCxcbiAgICBpc0Zsb2F0MzJBcnJheSA9IF9yZXF1aXJlJHR5cGVzLmlzRmxvYXQzMkFycmF5LFxuICAgIGlzRmxvYXQ2NEFycmF5ID0gX3JlcXVpcmUkdHlwZXMuaXNGbG9hdDY0QXJyYXk7XG5cbmZ1bmN0aW9uIGlzTm9uSW5kZXgoa2V5KSB7XG4gIGlmIChrZXkubGVuZ3RoID09PSAwIHx8IGtleS5sZW5ndGggPiAxMCkgcmV0dXJuIHRydWU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY29kZSA9IGtleS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlIDwgNDggfHwgY29kZSA+IDU3KSByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBUaGUgbWF4aW11bSBzaXplIGZvciBhbiBhcnJheSBpcyAyICoqIDMyIC0xLlxuXG5cbiAgcmV0dXJuIGtleS5sZW5ndGggPT09IDEwICYmIGtleSA+PSBNYXRoLnBvdygyLCAzMik7XG59XG5cbmZ1bmN0aW9uIGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLmZpbHRlcihpc05vbkluZGV4KS5jb25jYXQob2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbHVlKS5maWx0ZXIoT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5iaW5kKHZhbHVlKSkpO1xufSAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2Jsb2IvNjgwZTllNWU0ODhmMjJhYWMyNzU5OWE1N2RjODQ0YTYzMTU5MjhkZC9pbmRleC5qc1xuLy8gb3JpZ2luYWwgbm90aWNlOlxuXG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cblxuZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgeCA9IGEubGVuZ3RoO1xuICB2YXIgeSA9IGIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldO1xuICAgICAgeSA9IGJbaV07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBpZiAoeSA8IHgpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG52YXIgT05MWV9FTlVNRVJBQkxFID0gdW5kZWZpbmVkO1xudmFyIGtTdHJpY3QgPSB0cnVlO1xudmFyIGtMb29zZSA9IGZhbHNlO1xudmFyIGtOb0l0ZXJhdG9yID0gMDtcbnZhciBrSXNBcnJheSA9IDE7XG52YXIga0lzU2V0ID0gMjtcbnZhciBrSXNNYXAgPSAzOyAvLyBDaGVjayBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgc291cmNlIGFuZCBmbGFnc1xuXG5mdW5jdGlvbiBhcmVTaW1pbGFyUmVnRXhwcyhhLCBiKSB7XG4gIHJldHVybiByZWdleEZsYWdzU3VwcG9ydGVkID8gYS5zb3VyY2UgPT09IGIuc291cmNlICYmIGEuZmxhZ3MgPT09IGIuZmxhZ3MgOiBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkgPT09IFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChiKTtcbn1cblxuZnVuY3Rpb24gYXJlU2ltaWxhckZsb2F0QXJyYXlzKGEsIGIpIHtcbiAgaWYgKGEuYnl0ZUxlbmd0aCAhPT0gYi5ieXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYS5ieXRlTGVuZ3RoOyBvZmZzZXQrKykge1xuICAgIGlmIChhW29mZnNldF0gIT09IGJbb2Zmc2V0XSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBhcmVTaW1pbGFyVHlwZWRBcnJheXMoYSwgYikge1xuICBpZiAoYS5ieXRlTGVuZ3RoICE9PSBiLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gY29tcGFyZShuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBhLmJ5dGVMZW5ndGgpLCBuZXcgVWludDhBcnJheShiLmJ1ZmZlciwgYi5ieXRlT2Zmc2V0LCBiLmJ5dGVMZW5ndGgpKSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gYXJlRXF1YWxBcnJheUJ1ZmZlcnMoYnVmMSwgYnVmMikge1xuICByZXR1cm4gYnVmMS5ieXRlTGVuZ3RoID09PSBidWYyLmJ5dGVMZW5ndGggJiYgY29tcGFyZShuZXcgVWludDhBcnJheShidWYxKSwgbmV3IFVpbnQ4QXJyYXkoYnVmMikpID09PSAwO1xufVxuXG5mdW5jdGlvbiBpc0VxdWFsQm94ZWRQcmltaXRpdmUodmFsMSwgdmFsMikge1xuICBpZiAoaXNOdW1iZXJPYmplY3QodmFsMSkpIHtcbiAgICByZXR1cm4gaXNOdW1iZXJPYmplY3QodmFsMikgJiYgb2JqZWN0SXMoTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSksIE51bWJlci5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpKTtcbiAgfVxuXG4gIGlmIChpc1N0cmluZ09iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc1N0cmluZ09iamVjdCh2YWwyKSAmJiBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG4gIH1cblxuICBpZiAoaXNCb29sZWFuT2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzQm9vbGVhbk9iamVjdCh2YWwyKSAmJiBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuXG4gIGlmIChpc0JpZ0ludE9iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc0JpZ0ludE9iamVjdCh2YWwyKSAmJiBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG4gIH1cblxuICByZXR1cm4gaXNTeW1ib2xPYmplY3QodmFsMikgJiYgU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpO1xufSAvLyBOb3RlczogVHlwZSB0YWdzIGFyZSBoaXN0b3JpY2FsIFtbQ2xhc3NdXSBwcm9wZXJ0aWVzIHRoYXQgY2FuIGJlIHNldCBieVxuLy8gRnVuY3Rpb25UZW1wbGF0ZTo6U2V0Q2xhc3NOYW1lKCkgaW4gQysrIG9yIFN5bWJvbC50b1N0cmluZ1RhZyBpbiBKU1xuLy8gYW5kIHJldHJpZXZlZCB1c2luZyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSBpbiBKU1xuLy8gU2VlIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbi8vIGZvciBhIGxpc3Qgb2YgdGFncyBwcmUtZGVmaW5lZCBpbiB0aGUgc3BlYy5cbi8vIFRoZXJlIGFyZSBzb21lIHVuc3BlY2lmaWVkIHRhZ3MgaW4gdGhlIHdpbGQgdG9vIChlLmcuIHR5cGVkIGFycmF5IHRhZ3MpLlxuLy8gU2luY2UgdGFncyBjYW4gYmUgYWx0ZXJlZCwgdGhleSBvbmx5IHNlcnZlIGZhc3QgZmFpbHVyZXNcbi8vXG4vLyBUeXBlZCBhcnJheXMgYW5kIGJ1ZmZlcnMgYXJlIGNoZWNrZWQgYnkgY29tcGFyaW5nIHRoZSBjb250ZW50IGluIHRoZWlyXG4vLyB1bmRlcmx5aW5nIEFycmF5QnVmZmVyLiBUaGlzIG9wdGltaXphdGlvbiByZXF1aXJlcyB0aGF0IGl0J3Ncbi8vIHJlYXNvbmFibGUgdG8gaW50ZXJwcmV0IHRoZWlyIHVuZGVybHlpbmcgbWVtb3J5IGluIHRoZSBzYW1lIHdheSxcbi8vIHdoaWNoIGlzIGNoZWNrZWQgYnkgY29tcGFyaW5nIHRoZWlyIHR5cGUgdGFncy5cbi8vIChlLmcuIGEgVWludDhBcnJheSBhbmQgYSBVaW50MTZBcnJheSB3aXRoIHRoZSBzYW1lIG1lbW9yeSBjb250ZW50XG4vLyBjb3VsZCBzdGlsbCBiZSBkaWZmZXJlbnQgYmVjYXVzZSB0aGV5IHdpbGwgYmUgaW50ZXJwcmV0ZWQgZGlmZmVyZW50bHkpLlxuLy9cbi8vIEZvciBzdHJpY3QgY29tcGFyaXNvbiwgb2JqZWN0cyBzaG91bGQgaGF2ZVxuLy8gYSkgVGhlIHNhbWUgYnVpbHQtaW4gdHlwZSB0YWdzXG4vLyBiKSBUaGUgc2FtZSBwcm90b3R5cGVzLlxuXG5cbmZ1bmN0aW9uIGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MpIHtcbiAgLy8gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAodmFsMSA9PT0gdmFsMikge1xuICAgIGlmICh2YWwxICE9PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gc3RyaWN0ID8gb2JqZWN0SXModmFsMSwgdmFsMikgOiB0cnVlO1xuICB9IC8vIENoZWNrIG1vcmUgY2xvc2VseSBpZiB2YWwxIGFuZCB2YWwyIGFyZSBlcXVhbC5cblxuXG4gIGlmIChzdHJpY3QpIHtcbiAgICBpZiAoX3R5cGVvZih2YWwxKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsMSA9PT0gJ251bWJlcicgJiYgbnVtYmVySXNOYU4odmFsMSkgJiYgbnVtYmVySXNOYU4odmFsMik7XG4gICAgfVxuXG4gICAgaWYgKF90eXBlb2YodmFsMikgIT09ICdvYmplY3QnIHx8IHZhbDEgPT09IG51bGwgfHwgdmFsMiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsMSkgIT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsMSA9PT0gbnVsbCB8fCBfdHlwZW9mKHZhbDEpICE9PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHZhbDIgPT09IG51bGwgfHwgX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuICAgICAgICByZXR1cm4gdmFsMSA9PSB2YWwyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHZhbDIgPT09IG51bGwgfHwgX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB2YXIgdmFsMVRhZyA9IG9iamVjdFRvU3RyaW5nKHZhbDEpO1xuICB2YXIgdmFsMlRhZyA9IG9iamVjdFRvU3RyaW5nKHZhbDIpO1xuXG4gIGlmICh2YWwxVGFnICE9PSB2YWwyVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsMSkpIHtcbiAgICAvLyBDaGVjayBmb3Igc3BhcnNlIGFycmF5cyBhbmQgZ2VuZXJhbCBmYXN0IHBhdGhcbiAgICBpZiAodmFsMS5sZW5ndGggIT09IHZhbDIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGtleXMxID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDEsIE9OTFlfRU5VTUVSQUJMRSk7XG4gICAgdmFyIGtleXMyID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDIsIE9OTFlfRU5VTUVSQUJMRSk7XG5cbiAgICBpZiAoa2V5czEubGVuZ3RoICE9PSBrZXlzMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga0lzQXJyYXksIGtleXMxKTtcbiAgfSAvLyBbYnJvd3NlcmlmeV0gVGhpcyB0cmlnZ2VycyBvbiBjZXJ0YWluIHR5cGVzIGluIElFIChNYXAvU2V0KSBzbyB3ZSBkb24ndFxuICAvLyB3YW4ndCB0byBlYXJseSByZXR1cm4gb3V0IG9mIHRoZSByZXN0IG9mIHRoZSBjaGVja3MuIEhvd2V2ZXIgd2UgY2FuIGNoZWNrXG4gIC8vIGlmIHRoZSBzZWNvbmQgdmFsdWUgaXMgb25lIG9mIHRoZXNlIHZhbHVlcyBhbmQgdGhlIGZpcnN0IGlzbid0LlxuXG5cbiAgaWYgKHZhbDFUYWcgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgLy8gcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtOb0l0ZXJhdG9yKTtcbiAgICBpZiAoIWlzTWFwKHZhbDEpICYmIGlzTWFwKHZhbDIpIHx8ICFpc1NldCh2YWwxKSAmJiBpc1NldCh2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc0RhdGUodmFsMSkpIHtcbiAgICBpZiAoIWlzRGF0ZSh2YWwyKSB8fCBEYXRlLnByb3RvdHlwZS5nZXRUaW1lLmNhbGwodmFsMSkgIT09IERhdGUucHJvdG90eXBlLmdldFRpbWUuY2FsbCh2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1JlZ0V4cCh2YWwxKSkge1xuICAgIGlmICghaXNSZWdFeHAodmFsMikgfHwgIWFyZVNpbWlsYXJSZWdFeHBzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzTmF0aXZlRXJyb3IodmFsMSkgfHwgdmFsMSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgLy8gRG8gbm90IGNvbXBhcmUgdGhlIHN0YWNrIGFzIGl0IG1pZ2h0IGRpZmZlciBldmVuIHRob3VnaCB0aGUgZXJyb3IgaXRzZWxmXG4gICAgLy8gaXMgb3RoZXJ3aXNlIGlkZW50aWNhbC5cbiAgICBpZiAodmFsMS5tZXNzYWdlICE9PSB2YWwyLm1lc3NhZ2UgfHwgdmFsMS5uYW1lICE9PSB2YWwyLm5hbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNBcnJheUJ1ZmZlclZpZXcodmFsMSkpIHtcbiAgICBpZiAoIXN0cmljdCAmJiAoaXNGbG9hdDMyQXJyYXkodmFsMSkgfHwgaXNGbG9hdDY0QXJyYXkodmFsMSkpKSB7XG4gICAgICBpZiAoIWFyZVNpbWlsYXJGbG9hdEFycmF5cyh2YWwxLCB2YWwyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghYXJlU2ltaWxhclR5cGVkQXJyYXlzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAvLyBCdWZmZXIuY29tcGFyZSByZXR1cm5zIHRydWUsIHNvIHZhbDEubGVuZ3RoID09PSB2YWwyLmxlbmd0aC4gSWYgdGhleSBib3RoXG4gICAgLy8gb25seSBjb250YWluIG51bWVyaWMga2V5cywgd2UgZG9uJ3QgbmVlZCB0byBleGFtIGZ1cnRoZXIgdGhhbiBjaGVja2luZ1xuICAgIC8vIHRoZSBzeW1ib2xzLlxuXG5cbiAgICB2YXIgX2tleXMgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMSwgT05MWV9FTlVNRVJBQkxFKTtcblxuICAgIHZhciBfa2V5czIgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMiwgT05MWV9FTlVNRVJBQkxFKTtcblxuICAgIGlmIChfa2V5cy5sZW5ndGggIT09IF9rZXlzMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IsIF9rZXlzKTtcbiAgfSBlbHNlIGlmIChpc1NldCh2YWwxKSkge1xuICAgIGlmICghaXNTZXQodmFsMikgfHwgdmFsMS5zaXplICE9PSB2YWwyLnNpemUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga0lzU2V0KTtcbiAgfSBlbHNlIGlmIChpc01hcCh2YWwxKSkge1xuICAgIGlmICghaXNNYXAodmFsMikgfHwgdmFsMS5zaXplICE9PSB2YWwyLnNpemUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga0lzTWFwKTtcbiAgfSBlbHNlIGlmIChpc0FueUFycmF5QnVmZmVyKHZhbDEpKSB7XG4gICAgaWYgKCFhcmVFcXVhbEFycmF5QnVmZmVycyh2YWwxLCB2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0JveGVkUHJpbWl0aXZlKHZhbDEpICYmICFpc0VxdWFsQm94ZWRQcmltaXRpdmUodmFsMSwgdmFsMikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IpO1xufVxuXG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlcyh2YWwsIGtleXMpIHtcbiAgcmV0dXJuIGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbCwgayk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBpdGVyYXRpb25UeXBlLCBhS2V5cykge1xuICAvLyBGb3IgYWxsIHJlbWFpbmluZyBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSwgb2JqZWN0cyBhbmQgTWFwcyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSBoYXZpbmc6XG4gIC8vIGEpIFRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBlbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAgLy8gYikgVGhlIHNhbWUgc2V0IG9mIGtleXMvaW5kZXhlcyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKVxuICAvLyBjKSBFcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXkvaW5kZXhcbiAgLy8gZCkgRm9yIFNldHMgYW5kIE1hcHMsIGVxdWFsIGNvbnRlbnRzXG4gIC8vIE5vdGU6IHRoaXMgYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA1KSB7XG4gICAgYUtleXMgPSBPYmplY3Qua2V5cyh2YWwxKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyh2YWwyKTsgLy8gVGhlIHBhaXIgbXVzdCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzLlxuXG4gICAgaWYgKGFLZXlzLmxlbmd0aCAhPT0gYktleXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IC8vIENoZWFwIGtleSB0ZXN0XG5cblxuICB2YXIgaSA9IDA7XG5cbiAgZm9yICg7IGkgPCBhS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkodmFsMiwgYUtleXNbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0cmljdCAmJiBhcmd1bWVudHMubGVuZ3RoID09PSA1KSB7XG4gICAgdmFyIHN5bWJvbEtleXNBID0gb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbDEpO1xuXG4gICAgaWYgKHN5bWJvbEtleXNBLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHN5bWJvbEtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBzeW1ib2xLZXlzQVtpXTtcblxuICAgICAgICBpZiAocHJvcGVydHlJc0VudW1lcmFibGUodmFsMSwga2V5KSkge1xuICAgICAgICAgIGlmICghcHJvcGVydHlJc0VudW1lcmFibGUodmFsMiwga2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbDIsIGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHN5bWJvbEtleXNCID0gb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbDIpO1xuXG4gICAgICBpZiAoc3ltYm9sS2V5c0EubGVuZ3RoICE9PSBzeW1ib2xLZXlzQi5sZW5ndGggJiYgZ2V0RW51bWVyYWJsZXModmFsMiwgc3ltYm9sS2V5c0IpLmxlbmd0aCAhPT0gY291bnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX3N5bWJvbEtleXNCID0gb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbDIpO1xuXG4gICAgICBpZiAoX3N5bWJvbEtleXNCLmxlbmd0aCAhPT0gMCAmJiBnZXRFbnVtZXJhYmxlcyh2YWwyLCBfc3ltYm9sS2V5c0IpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGFLZXlzLmxlbmd0aCA9PT0gMCAmJiAoaXRlcmF0aW9uVHlwZSA9PT0ga05vSXRlcmF0b3IgfHwgaXRlcmF0aW9uVHlwZSA9PT0ga0lzQXJyYXkgJiYgdmFsMS5sZW5ndGggPT09IDAgfHwgdmFsMS5zaXplID09PSAwKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIFVzZSBtZW1vcyB0byBoYW5kbGUgY3ljbGVzLlxuXG5cbiAgaWYgKG1lbW9zID09PSB1bmRlZmluZWQpIHtcbiAgICBtZW1vcyA9IHtcbiAgICAgIHZhbDE6IG5ldyBNYXAoKSxcbiAgICAgIHZhbDI6IG5ldyBNYXAoKSxcbiAgICAgIHBvc2l0aW9uOiAwXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBXZSBwcmV2ZW50IHVwIHRvIHR3byBtYXAuaGFzKHgpIGNhbGxzIGJ5IGRpcmVjdGx5IHJldHJpZXZpbmcgdGhlIHZhbHVlXG4gICAgLy8gYW5kIGNoZWNraW5nIGZvciB1bmRlZmluZWQuIFRoZSBtYXAgY2FuIG9ubHkgY29udGFpbiBudW1iZXJzLCBzbyBpdCBpc1xuICAgIC8vIHNhZmUgdG8gY2hlY2sgZm9yIHVuZGVmaW5lZCBvbmx5LlxuICAgIHZhciB2YWwyTWVtb0EgPSBtZW1vcy52YWwxLmdldCh2YWwxKTtcblxuICAgIGlmICh2YWwyTWVtb0EgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHZhbDJNZW1vQiA9IG1lbW9zLnZhbDIuZ2V0KHZhbDIpO1xuXG4gICAgICBpZiAodmFsMk1lbW9CICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbDJNZW1vQSA9PT0gdmFsMk1lbW9CO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9zLnBvc2l0aW9uKys7XG4gIH1cblxuICBtZW1vcy52YWwxLnNldCh2YWwxLCBtZW1vcy5wb3NpdGlvbik7XG4gIG1lbW9zLnZhbDIuc2V0KHZhbDIsIG1lbW9zLnBvc2l0aW9uKTtcbiAgdmFyIGFyZUVxID0gb2JqRXF1aXYodmFsMSwgdmFsMiwgc3RyaWN0LCBhS2V5cywgbWVtb3MsIGl0ZXJhdGlvblR5cGUpO1xuICBtZW1vcy52YWwxLmRlbGV0ZSh2YWwxKTtcbiAgbWVtb3MudmFsMi5kZWxldGUodmFsMik7XG4gIHJldHVybiBhcmVFcTtcbn1cblxuZnVuY3Rpb24gc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgdmFsMSwgc3RyaWN0LCBtZW1vKSB7XG4gIC8vIEdvIGxvb2tpbmcuXG4gIHZhciBzZXRWYWx1ZXMgPSBhcnJheUZyb21TZXQoc2V0KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNldFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWwyID0gc2V0VmFsdWVzW2ldO1xuXG4gICAgaWYgKGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtbykpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgbWF0Y2hpbmcgZWxlbWVudCB0byBtYWtlIHN1cmUgd2UgZG8gbm90IGNoZWNrIHRoYXQgYWdhaW4uXG4gICAgICBzZXQuZGVsZXRlKHZhbDIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufSAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9FcXVhbGl0eV9jb21wYXJpc29uc19hbmRfc2FtZW5lc3MjTG9vc2VfZXF1YWxpdHlfdXNpbmdcbi8vIFNhZGx5IGl0IGlzIG5vdCBwb3NzaWJsZSB0byBkZXRlY3QgY29ycmVzcG9uZGluZyB2YWx1ZXMgcHJvcGVybHkgaW4gY2FzZSB0aGVcbi8vIHR5cGUgaXMgYSBzdHJpbmcsIG51bWJlciwgYmlnaW50IG9yIGJvb2xlYW4uIFRoZSByZWFzb24gaXMgdGhhdCB0aG9zZSB2YWx1ZXNcbi8vIGNhbiBtYXRjaCBsb3RzIG9mIGRpZmZlcmVudCBzdHJpbmcgdmFsdWVzIChlLmcuLCAxbiA9PSAnKzAwMDAxJykuXG5cblxuZnVuY3Rpb24gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pIHtcbiAgc3dpdGNoIChfdHlwZW9mKHByaW0pKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIC8vIE9ubHkgcGFzcyBpbiBudWxsIGFzIG9iamVjdCFcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHByaW0gPSArcHJpbTtcbiAgICAvLyBMb29zZSBlcXVhbCBlbnRyaWVzIGV4aXN0IG9ubHkgaWYgdGhlIHN0cmluZyBpcyBwb3NzaWJsZSB0byBjb252ZXJ0IHRvXG4gICAgLy8gYSByZWd1bGFyIG51bWJlciBhbmQgbm90IE5hTi5cbiAgICAvLyBGYWxsIHRocm91Z2hcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBpZiAobnVtYmVySXNOYU4ocHJpbSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0TWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHByaW0pIHtcbiAgdmFyIGFsdFZhbHVlID0gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pO1xuICBpZiAoYWx0VmFsdWUgIT0gbnVsbCkgcmV0dXJuIGFsdFZhbHVlO1xuICByZXR1cm4gYi5oYXMoYWx0VmFsdWUpICYmICFhLmhhcyhhbHRWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIG1hcE1pZ2h0SGF2ZUxvb3NlUHJpbShhLCBiLCBwcmltLCBpdGVtLCBtZW1vKSB7XG4gIHZhciBhbHRWYWx1ZSA9IGZpbmRMb29zZU1hdGNoaW5nUHJpbWl0aXZlcyhwcmltKTtcblxuICBpZiAoYWx0VmFsdWUgIT0gbnVsbCkge1xuICAgIHJldHVybiBhbHRWYWx1ZTtcbiAgfVxuXG4gIHZhciBjdXJCID0gYi5nZXQoYWx0VmFsdWUpO1xuXG4gIGlmIChjdXJCID09PSB1bmRlZmluZWQgJiYgIWIuaGFzKGFsdFZhbHVlKSB8fCAhaW5uZXJEZWVwRXF1YWwoaXRlbSwgY3VyQiwgZmFsc2UsIG1lbW8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuICFhLmhhcyhhbHRWYWx1ZSkgJiYgaW5uZXJEZWVwRXF1YWwoaXRlbSwgY3VyQiwgZmFsc2UsIG1lbW8pO1xufVxuXG5mdW5jdGlvbiBzZXRFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW8pIHtcbiAgLy8gVGhpcyBpcyBhIGxhemlseSBpbml0aWF0ZWQgU2V0IG9mIGVudHJpZXMgd2hpY2ggaGF2ZSB0byBiZSBjb21wYXJlZFxuICAvLyBwYWlyd2lzZS5cbiAgdmFyIHNldCA9IG51bGw7XG4gIHZhciBhVmFsdWVzID0gYXJyYXlGcm9tU2V0KGEpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYVZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWwgPSBhVmFsdWVzW2ldOyAvLyBOb3RlOiBDaGVja2luZyBmb3IgdGhlIG9iamVjdHMgZmlyc3QgaW1wcm92ZXMgdGhlIHBlcmZvcm1hbmNlIGZvciBvYmplY3RcbiAgICAvLyBoZWF2eSBzZXRzIGJ1dCBpdCBpcyBhIG1pbm9yIHNsb3cgZG93biBmb3IgcHJpbWl0aXZlcy4gQXMgdGhleSBhcmUgZmFzdFxuICAgIC8vIHRvIGNoZWNrIHRoaXMgaW1wcm92ZXMgdGhlIHdvcnN0IGNhc2Ugc2NlbmFyaW8gaW5zdGVhZC5cblxuICAgIGlmIChfdHlwZW9mKHZhbCkgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICB9IC8vIElmIHRoZSBzcGVjaWZpZWQgdmFsdWUgZG9lc24ndCBleGlzdCBpbiB0aGUgc2Vjb25kIHNldCBpdHMgYW4gbm90IG51bGxcbiAgICAgIC8vIG9iamVjdCAob3Igbm9uIHN0cmljdCBvbmx5OiBhIG5vdCBtYXRjaGluZyBwcmltaXRpdmUpIHdlJ2xsIG5lZWQgdG8gZ29cbiAgICAgIC8vIGh1bnRpbmcgZm9yIHNvbWV0aGluZyB0aGF0cyBkZWVwLShzdHJpY3QtKWVxdWFsIHRvIGl0LiBUbyBtYWtlIHRoaXNcbiAgICAgIC8vIE8obiBsb2cgbikgY29tcGxleGl0eSB3ZSBoYXZlIHRvIGNvcHkgdGhlc2UgdmFsdWVzIGluIGEgbmV3IHNldCBmaXJzdC5cblxuXG4gICAgICBzZXQuYWRkKHZhbCk7XG4gICAgfSBlbHNlIGlmICghYi5oYXModmFsKSkge1xuICAgICAgaWYgKHN0cmljdCkgcmV0dXJuIGZhbHNlOyAvLyBGYXN0IHBhdGggdG8gZGV0ZWN0IG1pc3Npbmcgc3RyaW5nLCBzeW1ib2wsIHVuZGVmaW5lZCBhbmQgbnVsbCB2YWx1ZXMuXG5cbiAgICAgIGlmICghc2V0TWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH1cblxuICAgICAgc2V0LmFkZCh2YWwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzZXQgIT09IG51bGwpIHtcbiAgICB2YXIgYlZhbHVlcyA9IGFycmF5RnJvbVNldChiKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBiVmFsdWVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF92YWwgPSBiVmFsdWVzW19pXTsgLy8gV2UgaGF2ZSB0byBjaGVjayBpZiBhIHByaW1pdGl2ZSB2YWx1ZSBpcyBhbHJlYWR5XG4gICAgICAvLyBtYXRjaGluZyBhbmQgb25seSBpZiBpdCdzIG5vdCwgZ28gaHVudGluZyBmb3IgaXQuXG5cbiAgICAgIGlmIChfdHlwZW9mKF92YWwpID09PSAnb2JqZWN0JyAmJiBfdmFsICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgX3ZhbCwgc3RyaWN0LCBtZW1vKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmICFhLmhhcyhfdmFsKSAmJiAhc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgX3ZhbCwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldC5zaXplID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG1hcEhhc0VxdWFsRW50cnkoc2V0LCBtYXAsIGtleTEsIGl0ZW0xLCBzdHJpY3QsIG1lbW8pIHtcbiAgLy8gVG8gYmUgYWJsZSB0byBoYW5kbGUgY2FzZXMgbGlrZTpcbiAgLy8gICBNYXAoW1t7fSwgJ2EnXSwgW3t9LCAnYiddXSkgdnMgTWFwKFtbe30sICdiJ10sIFt7fSwgJ2EnXV0pXG4gIC8vIC4uLiB3ZSBuZWVkIHRvIGNvbnNpZGVyICphbGwqIG1hdGNoaW5nIGtleXMsIG5vdCBqdXN0IHRoZSBmaXJzdCB3ZSBmaW5kLlxuICB2YXIgc2V0VmFsdWVzID0gYXJyYXlGcm9tU2V0KHNldCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5MiA9IHNldFZhbHVlc1tpXTtcblxuICAgIGlmIChpbm5lckRlZXBFcXVhbChrZXkxLCBrZXkyLCBzdHJpY3QsIG1lbW8pICYmIGlubmVyRGVlcEVxdWFsKGl0ZW0xLCBtYXAuZ2V0KGtleTIpLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICBzZXQuZGVsZXRlKGtleTIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBtYXBFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW8pIHtcbiAgdmFyIHNldCA9IG51bGw7XG4gIHZhciBhRW50cmllcyA9IGFycmF5RnJvbU1hcChhKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFFbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9hRW50cmllcyRpID0gX3NsaWNlZFRvQXJyYXkoYUVudHJpZXNbaV0sIDIpLFxuICAgICAgICBrZXkgPSBfYUVudHJpZXMkaVswXSxcbiAgICAgICAgaXRlbTEgPSBfYUVudHJpZXMkaVsxXTtcblxuICAgIGlmIChfdHlwZW9mKGtleSkgPT09ICdvYmplY3QnICYmIGtleSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICB9XG5cbiAgICAgIHNldC5hZGQoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnkgZGlyZWN0bHkgcmV0cmlldmluZyB0aGUgdmFsdWUgd2UgcHJldmVudCBhbm90aGVyIGIuaGFzKGtleSkgY2hlY2sgaW5cbiAgICAgIC8vIGFsbW9zdCBhbGwgcG9zc2libGUgY2FzZXMuXG4gICAgICB2YXIgaXRlbTIgPSBiLmdldChrZXkpO1xuXG4gICAgICBpZiAoaXRlbTIgPT09IHVuZGVmaW5lZCAmJiAhYi5oYXMoa2V5KSB8fCAhaW5uZXJEZWVwRXF1YWwoaXRlbTEsIGl0ZW0yLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICAgIGlmIChzdHJpY3QpIHJldHVybiBmYWxzZTsgLy8gRmFzdCBwYXRoIHRvIGRldGVjdCBtaXNzaW5nIHN0cmluZywgc3ltYm9sLCB1bmRlZmluZWQgYW5kIG51bGxcbiAgICAgICAgLy8ga2V5cy5cblxuICAgICAgICBpZiAoIW1hcE1pZ2h0SGF2ZUxvb3NlUHJpbShhLCBiLCBrZXksIGl0ZW0xLCBtZW1vKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQuYWRkKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHNldCAhPT0gbnVsbCkge1xuICAgIHZhciBiRW50cmllcyA9IGFycmF5RnJvbU1hcChiKTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGJFbnRyaWVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfYkVudHJpZXMkX2kgPSBfc2xpY2VkVG9BcnJheShiRW50cmllc1tfaTJdLCAyKSxcbiAgICAgICAgICBrZXkgPSBfYkVudHJpZXMkX2lbMF0sXG4gICAgICAgICAgaXRlbSA9IF9iRW50cmllcyRfaVsxXTtcblxuICAgICAgaWYgKF90eXBlb2Yoa2V5KSA9PT0gJ29iamVjdCcgJiYga2V5ICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghbWFwSGFzRXF1YWxFbnRyeShzZXQsIGEsIGtleSwgaXRlbSwgc3RyaWN0LCBtZW1vKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmICghYS5oYXMoa2V5KSB8fCAhaW5uZXJEZWVwRXF1YWwoYS5nZXQoa2V5KSwgaXRlbSwgZmFsc2UsIG1lbW8pKSAmJiAhbWFwSGFzRXF1YWxFbnRyeShzZXQsIGEsIGtleSwgaXRlbSwgZmFsc2UsIG1lbW8pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2V0LnNpemUgPT09IDA7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgc3RyaWN0LCBrZXlzLCBtZW1vcywgaXRlcmF0aW9uVHlwZSkge1xuICAvLyBTZXRzIGFuZCBtYXBzIGRvbid0IGhhdmUgdGhlaXIgZW50cmllcyBhY2Nlc3NpYmxlIHZpYSBub3JtYWwgb2JqZWN0XG4gIC8vIHByb3BlcnRpZXMuXG4gIHZhciBpID0gMDtcblxuICBpZiAoaXRlcmF0aW9uVHlwZSA9PT0ga0lzU2V0KSB7XG4gICAgaWYgKCFzZXRFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpdGVyYXRpb25UeXBlID09PSBrSXNNYXApIHtcbiAgICBpZiAoIW1hcEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGl0ZXJhdGlvblR5cGUgPT09IGtJc0FycmF5KSB7XG4gICAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkoYSwgaSkpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShiLCBpKSB8fCAhaW5uZXJEZWVwRXF1YWwoYVtpXSwgYltpXSwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkoYiwgaSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXJyYXkgaXMgc3BhcnNlLlxuICAgICAgICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhhKTtcblxuICAgICAgICBmb3IgKDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXNBW2ldO1xuXG4gICAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShiLCBrZXkpIHx8ICFpbm5lckRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5c0EubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gVGhlIHBhaXIgbXVzdCBoYXZlIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleS5cbiAgLy8gUG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdDpcblxuXG4gIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9rZXkgPSBrZXlzW2ldO1xuXG4gICAgaWYgKCFpbm5lckRlZXBFcXVhbChhW19rZXldLCBiW19rZXldLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0RlZXBFcXVhbCh2YWwxLCB2YWwyKSB7XG4gIHJldHVybiBpbm5lckRlZXBFcXVhbCh2YWwxLCB2YWwyLCBrTG9vc2UpO1xufVxuXG5mdW5jdGlvbiBpc0RlZXBTdHJpY3RFcXVhbCh2YWwxLCB2YWwyKSB7XG4gIHJldHVybiBpbm5lckRlZXBFcXVhbCh2YWwxLCB2YWwyLCBrU3RyaWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzRGVlcEVxdWFsOiBpc0RlZXBFcXVhbCxcbiAgaXNEZWVwU3RyaWN0RXF1YWw6IGlzRGVlcFN0cmljdEVxdWFsXG59OyIsImltcG9ydCBKdXN0VmFsaWRhdGUgZnJvbSAnanVzdC12YWxpZGF0ZSc7XHJcblxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpLmNsYXNzTGlzdC5jb250YWlucygnY29udGFjdF9fZm9ybScpKSB7XHJcblx0Y29uc3QgdmFsaWRhdGlvblR3byA9IG5ldyBKdXN0VmFsaWRhdGUoJy5jb250YWN0X19mb3JtJywge1xyXG5cdFx0ZXJyb3JGaWVsZENzc0NsYXNzOiBcImVycm9yXCIsXHJcblx0XHRlcnJvckxhYmVsQ3NzQ2xhc3M6IFwiZXJyb3JcIixcclxuXHRcdHN1Y2Nlc3NGaWVsZENzc0NsYXNzOiBcInN1Y2Nlc3NcIixcclxuXHRcdGZvY3VzSW52YWxpZEZpZWxkOiBmYWxzZSxcclxuXHRcdGxvY2tGb3JtOiBmYWxzZSxcclxuXHR9KTtcclxuXHJcblx0dmFsaWRhdGlvblR3b1xyXG5cdFx0LmFkZEZpZWxkKCcjY29udGFjdF9fZm9ybS1uYW1lJywgW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0cnVsZTogJ21pbkxlbmd0aCcsXHJcblx0XHRcdFx0dmFsdWU6IDIsXHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAn0JjQvNGPINC00L7Qu9C20L3QviDRgdC+0LTQtdGA0LbQsNGC0Ywg0LHQvtC70LXQtSAyINGB0LjQvNCy0L7Qu9C+0LInXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRydWxlOiAnbWF4TGVuZ3RoJyxcclxuXHRcdFx0XHR2YWx1ZTogMzAsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRydWxlOiAncmVxdWlyZWQnLFxyXG5cdFx0XHRcdHZhbHVlOiB0cnVlLFxyXG5cdFx0XHRcdGVycm9yTWVzc2FnZTogJ9CS0LLQtdC00LjRgtC1INC40LzRjyEnXHJcblx0XHRcdH1cclxuXHRcdF0pXHJcblx0XHQuYWRkRmllbGQoJyNjb250YWN0X19mb3JtLWVtYWlsJywgW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0cnVsZTogJ3JlcXVpcmVkJyxcclxuXHRcdFx0XHR2YWx1ZTogdHJ1ZSxcclxuXHRcdFx0XHRlcnJvck1lc3NhZ2U6ICdFbWFpbCDQvtCx0Y/Qt9Cw0YLQtdC70LXQvScsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRydWxlOiAnZW1haWwnLFxyXG5cdFx0XHRcdHZhbHVlOiB0cnVlLFxyXG5cdFx0XHRcdGVycm9yTWVzc2FnZTogJ9CS0LLQtdC00LjRgtC1INC60L7RgNGA0LXQutGC0L3Ri9C5IEVtYWlsJyxcclxuXHRcdFx0fSxcclxuXHRcdF0pLm9uU3VjY2VzcygoZXZlbnQpID0+IHtcclxuXHRcdGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQpO1xyXG5cdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ9Ce0YLQv9GA0LDQstC70LXQvdC+Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR4aHIub3BlbignUE9TVCcsICdtYWlsLnBocCcsIHRydWUpO1xyXG5cdFx0eGhyLnNlbmQoZm9ybURhdGEpO1xyXG5cdFx0ZXZlbnQudGFyZ2V0LnJlc2V0KCk7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFjdF9fZm9ybS1pbnB1dCcpLmZvckVhY2goZSA9PiB7XHJcblx0XHRcdGUuY2xhc3NMaXN0LnJlbW92ZSgnc3VjY2VzcycpXHJcblx0XHR9KVxyXG5cdH0pO1xyXG59XHJcbiIsImltcG9ydCBKdXN0VmFsaWRhdGUgZnJvbSAnanVzdC12YWxpZGF0ZSc7XHJcblxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpLmNsYXNzTGlzdC5jb250YWlucygnZm9ybScpKSB7XHJcblx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtJyk7XHJcblx0Y29uc3QgdGVsU2VsZWN0b3IgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nKTtcclxuXHRjb25zdCBpbnB1dE1hc2sgPSBuZXcgSW5wdXRtYXNrKCcrNyAoOTk5KSA5OTktOTktOTknKTtcclxuXHRpbnB1dE1hc2subWFzayh0ZWxTZWxlY3Rvcik7XHJcblxyXG5cdGNvbnN0IHZhbGlkYXRpb24gPSBuZXcgSnVzdFZhbGlkYXRlKCcuZm9ybScsIHtcclxuXHRcdGVycm9yRmllbGRDc3NDbGFzczogXCJlcnJvclwiLFxyXG5cdFx0ZXJyb3JMYWJlbENzc0NsYXNzOiBcImVycm9yXCIsXHJcblx0XHRzdWNjZXNzRmllbGRDc3NDbGFzczogXCJzdWNjZXNzXCIsXHJcblx0XHRmb2N1c0ludmFsaWRGaWVsZDogZmFsc2UsXHJcblx0XHRsb2NrRm9ybTogZmFsc2UsXHJcblx0fSk7XHJcblxyXG5cdHZhbGlkYXRpb25cclxuXHRcdC5hZGRGaWVsZCgnI25hbWUnLCBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRydWxlOiAnbWluTGVuZ3RoJyxcclxuXHRcdFx0XHR2YWx1ZTogMixcclxuXHRcdFx0XHRlcnJvck1lc3NhZ2U6ICfQmNC80Y8g0LTQvtC70LbQvdC+INGB0L7QtNC10YDQttCw0YLRjCDQsdC+0LvQtdC1IDIg0YHQuNC80LLQvtC70L7QsidcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJ1bGU6ICdtYXhMZW5ndGgnLFxyXG5cdFx0XHRcdHZhbHVlOiAzMCxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJ1bGU6ICdyZXF1aXJlZCcsXHJcblx0XHRcdFx0dmFsdWU6IHRydWUsXHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAn0JLQstC10LTQuNGC0LUg0LjQvNGPISdcclxuXHRcdFx0fVxyXG5cdFx0XSlcclxuXHRcdC5hZGRGaWVsZCgnI3RlbGVncmFtJywgW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0cnVsZTogJ21pbkxlbmd0aCcsXHJcblx0XHRcdFx0dmFsdWU6IDIsXHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAn0J3QuNC6INC70LjQsdC+IGlkINC90LUg0LzQvtC20LXRgiDRgdC+0LTQtdGA0LbQsNGC0Ywg0LzQtdC90LXQtSAyINGB0LjQvNCy0L7Qu9C+0LInXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRydWxlOiAnbWF4TGVuZ3RoJyxcclxuXHRcdFx0XHR2YWx1ZTogMzAsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRydWxlOiAncmVxdWlyZWQnLFxyXG5cdFx0XHRcdHZhbHVlOiB0cnVlLFxyXG5cdFx0XHRcdGVycm9yTWVzc2FnZTogJ9CS0LLQtdC00LjRgtC1INC90LjQuiDQu9C40LHQviBpZCDQstCw0YjQtdCz0L4gdGVsZWdyYW0hJ1xyXG5cdFx0XHR9XHJcblx0XHRdKVxyXG5cdFx0LmFkZEZpZWxkKCcjZW1haWwnLCBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRydWxlOiAncmVxdWlyZWQnLFxyXG5cdFx0XHRcdHZhbHVlOiB0cnVlLFxyXG5cdFx0XHRcdGVycm9yTWVzc2FnZTogJ0VtYWlsINC+0LHRj9C30LDRgtC10LvQtdC9JyxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJ1bGU6ICdlbWFpbCcsXHJcblx0XHRcdFx0dmFsdWU6IHRydWUsXHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAn0JLQstC10LTQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdGL0LkgRW1haWwnLFxyXG5cdFx0XHR9LFxyXG5cdFx0XSlcclxuXHRcdC5hZGRGaWVsZCgnI3RlbCcsIFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJ1bGU6ICdyZXF1aXJlZCcsXHJcblx0XHRcdFx0dmFsdWU6IHRydWUsXHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAn0KLQtdC70LXRhNC+0L0g0L7QsdGP0LfQsNGC0LXQu9C10L0nLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cnVsZTogJ2Z1bmN0aW9uJyxcclxuXHRcdFx0XHR2YWxpZGF0b3I6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHBob25lID0gdGVsU2VsZWN0b3IuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKTtcclxuXHRcdFx0XHRcdHJldHVybiBwaG9uZS5sZW5ndGggPT09IDEwO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAn0JLQstC10LTQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQtdC70LXRhNC+0L0nLFxyXG5cdFx0XHR9LFxyXG5cdFx0XSkub25TdWNjZXNzKChldmVudCkgPT4ge1xyXG5cdFx0bGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCk7XHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuXHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygn0J7RgtC/0YDQsNCy0LvQtdC90L4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHhoci5vcGVuKCdQT1NUJywgJ21haWwucGhwJywgdHJ1ZSk7XHJcblx0XHR4aHIuc2VuZChmb3JtRGF0YSk7XHJcblx0XHRldmVudC50YXJnZXQucmVzZXQoKTtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19pbnB1dCcpLmZvckVhY2goZSA9PiB7XHJcblx0XHRcdGUuY2xhc3NMaXN0LnJlbW92ZSgnc3VjY2VzcycpXHJcblx0XHR9KVxyXG5cdH0pO1xyXG59XHJcbiIsIi8v0JTQvtCx0LDQstC70LXQvdC40LUg0LrQu9Cw0YHRgdCwIGxvY2sg0LTQu9GPIGJvZHkg0L/RgNC4INC+0YLQutGA0YvRgtC40Lgg0LzQtdC90Y49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gaW1wb3J0IHtib2R5X2xvY2ssIHVubG9ja30gZnJvbSAnLi4vLi4vLi4vLi4vanMvZmlsZXMvZnVuY3Rpb25zJztcclxubGV0IHVubG9jayA9IHRydWU7XHJcblxyXG4vLyBCb2R5TG9ja1xyXG5mdW5jdGlvbiBib2R5X2xvY2soZGVsYXkpIHtcclxuXHRsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG5cdGlmIChib2R5LmNsYXNzTGlzdC5jb250YWlucygnX2xvY2snKSkge1xyXG5cdFx0Ym9keV9sb2NrX3JlbW92ZShkZWxheSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGJvZHlfbG9ja19hZGQoZGVsYXkpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYm9keV9sb2NrX3JlbW92ZShkZWxheSkge1xyXG5cdGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcblx0aWYgKHVubG9jaykge1xyXG5cdFx0bGV0IGxvY2tfcGFkZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuX2xwXCIpO1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsb2NrX3BhZGRpbmcubGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0XHRcdFx0Y29uc3QgZWwgPSBsb2NrX3BhZGRpbmdbaW5kZXhdO1xyXG5cdFx0XHRcdGVsLnN0eWxlLnBhZGRpbmdSaWdodCA9ICcwcHgnO1xyXG5cdFx0XHR9XHJcblx0XHRcdGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzBweCc7XHJcblx0XHRcdGJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9sb2NrXCIpO1xyXG5cdFx0fSwgZGVsYXkpO1xyXG5cclxuXHRcdHVubG9jayA9IGZhbHNlO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHVubG9jayA9IHRydWU7XHJcblx0XHR9LCBkZWxheSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBib2R5X2xvY2tfYWRkKGRlbGF5KSB7XHJcblx0bGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuXHRpZiAodW5sb2NrKSB7XHJcblx0XHRsZXQgbG9ja19wYWRkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5fbHBcIik7XHJcblx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbG9ja19wYWRkaW5nLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRjb25zdCBlbCA9IGxvY2tfcGFkZGluZ1tpbmRleF07XHJcblx0XHRcdGVsLnN0eWxlLnBhZGRpbmdSaWdodCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKS5vZmZzZXRXaWR0aCArICdweCc7XHJcblx0XHR9XHJcblx0XHRib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKS5vZmZzZXRXaWR0aCArICdweCc7XHJcblx0XHRib2R5LmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKTtcclxuXHJcblx0XHR1bmxvY2sgPSBmYWxzZTtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR1bmxvY2sgPSB0cnVlO1xyXG5cdFx0fSwgZGVsYXkpO1xyXG5cdH1cclxufVxyXG5cclxubGV0IGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcclxubGV0IGJvZHlMb2NrVG9nZ2xlID0gKGRlbGF5ID0gNTAwKSA9PiB7XHJcblx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ19sb2NrJykpIHtcclxuXHRcdGJvZHlVbmxvY2soZGVsYXkpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRib2R5TG9jayhkZWxheSk7XHJcblx0fVxyXG59XHJcbmxldCBib2R5VW5sb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XHJcblx0bGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuXHRpZiAoYm9keUxvY2tTdGF0dXMpIHtcclxuXHRcdGxldCBsb2NrX3BhZGRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLl9scFwiKTtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbG9ja19wYWRkaW5nLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRcdGNvbnN0IGVsID0gbG9ja19wYWRkaW5nW2luZGV4XTtcclxuXHRcdFx0XHRlbC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMHB4JztcclxuXHRcdFx0fVxyXG5cdFx0XHRib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcwcHgnO1xyXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9sb2NrXCIpO1xyXG5cdFx0fSwgZGVsYXkpO1xyXG5cdFx0Ym9keUxvY2tTdGF0dXMgPSBmYWxzZTtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRib2R5TG9ja1N0YXR1cyA9IHRydWU7XHJcblx0XHR9LCBkZWxheSk7XHJcblx0fVxyXG59XHJcbmxldCBib2R5TG9jayA9IChkZWxheSA9IDUwMCkgPT4ge1xyXG5cdGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcblx0aWYgKGJvZHlMb2NrU3RhdHVzKSB7XHJcblx0XHRsZXQgbG9ja19wYWRkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5fbHBcIik7XHJcblx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbG9ja19wYWRkaW5nLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRjb25zdCBlbCA9IGxvY2tfcGFkZGluZ1tpbmRleF07XHJcblx0XHRcdGVsLnN0eWxlLnBhZGRpbmdSaWdodCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKS5vZmZzZXRXaWR0aCArICdweCc7XHJcblx0XHR9XHJcblx0XHRib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKS5vZmZzZXRXaWR0aCArICdweCc7XHJcblx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpO1xyXG5cclxuXHRcdGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ym9keUxvY2tTdGF0dXMgPSB0cnVlO1xyXG5cdFx0fSwgZGVsYXkpO1xyXG5cdH1cclxufVxyXG5cclxuLy/QlNC+0LHQsNCy0LvQtdC90LjQtSDQutC70LDRgdGB0LAg0LHRg9GA0LPQtdGA0YM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5sZXQgaWNvbk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb24tbWVudVwiKTtcclxuY29uc3QgbWVudUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpO1xyXG5pZiAoaWNvbk1lbnUpIHtcclxuXHRpY29uTWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICh1bmxvY2spIHtcclxuXHRcdFx0Ym9keV9sb2NrKCk7XHJcblx0XHRcdGljb25NZW51LmNsYXNzTGlzdC50b2dnbGUoJ19hY3RpdmUnKTtcclxuXHRcdFx0bWVudUJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnX2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbi8v0J/RgNC+0LrRgNGD0YLQutCwINC/0L4g0LrQu9C40LrRgyDQuCDQt9Cw0LrRgNGL0YLQuNC1INC80LXQvdGOPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuX2xpbmtbZGF0YS1saW5rXScpO1xyXG5pZiAobWVudUxpbmtzLmxlbmd0aCA+IDApIHtcclxuXHRtZW51TGlua3MuZm9yRWFjaChtZW51TGluayA9PiB7XHJcblx0XHRtZW51TGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25NZW51TGlua0NsaWNrKTtcclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gb25NZW51TGlua0NsaWNrKGUpIHtcclxuXHRcdGNvbnN0IG1lbnVMaW5rID0gZS50YXJnZXQ7XHJcblx0XHRpZiAobWVudUxpbmsuZGF0YXNldC5saW5rICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWVudUxpbmsuZGF0YXNldC5saW5rKSkge1xyXG5cdFx0XHRjb25zdCBsaW5rQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1lbnVMaW5rLmRhdGFzZXQubGluayk7XHJcblx0XHRcdGNvbnN0IGxpbmtCbG9ja1ZhbHVlID0gbGlua0Jsb2NrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHBhZ2VZT2Zmc2V0IC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0XHRpZiAoaWNvbk1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdfYWN0aXZlJykpIHtcclxuXHRcdFx0XHRpZiAodW5sb2NrKSB7XHJcblx0XHRcdFx0XHRib2R5X2xvY2soKTtcclxuXHRcdFx0XHRcdGljb25NZW51LmNsYXNzTGlzdC50b2dnbGUoJ19hY3RpdmUnKTtcclxuXHRcdFx0XHRcdG1lbnVCb2R5LmNsYXNzTGlzdC50b2dnbGUoJ19hY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0d2luZG93LnNjcm9sbFRvKHtcclxuXHRcdFx0XHR0b3A6IGxpbmtCbG9ja1ZhbHVlLFxyXG5cdFx0XHRcdGJlaGF2aW9yOiBcInNtb290aFwiXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vLyBjb25zdCBuYXZpZ2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4vLyBjb25zdCBuYXZpZ2F0aW9uSGVpZ2h0ID0gbmF2aWdhdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbi8vIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcclxuLy8gXHQnLS1zY3JvbGwtcGFkZGluZycsXHJcbi8vIFx0bmF2aWdhdGlvbkhlaWdodCArICdweCdcclxuLy8gKVxyXG5cclxuY29uc3Qgc3BvaWxlcnNBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwb2lsZXJzXScpO1xyXG5pZiAoc3BvaWxlcnNBcnJheS5sZW5ndGggPiAwKSB7XHJcblx0Ly8g0J/QvtC70YPRh9C10L3QuNC1INC+0LHRi9GH0L3Ri9GFINGB0L/QvtC50LvQtdGA0L7QslxyXG5cdGNvbnN0IHNwb2lsZXJzUmVndWxhciA9IEFycmF5LmZyb20oc3BvaWxlcnNBcnJheSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xyXG5cdFx0cmV0dXJuICFpdGVtLmRhdGFzZXQuc3BvaWxlcnMuc3BsaXQoXCIsXCIpWzBdO1xyXG5cdH0pO1xyXG5cdC8vINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC+0LHRi9GH0L3Ri9GFINGB0L/QvtC50LvQtdGA0L7QslxyXG5cdGlmIChzcG9pbGVyc1JlZ3VsYXIubGVuZ3RoID4gMCkge1xyXG5cdFx0aW5pdFNwb2lsZXJzKHNwb2lsZXJzUmVndWxhcik7XHJcblx0fVxyXG5cclxuXHQvLyDQn9C+0LvRg9GH0LXQvdC40LUg0YHQv9C+0LnQu9C10YDQvtCyINGBINC80LXQtNC40LAg0LfQsNC/0YDQvtGB0LDQvNC4XHJcblx0Y29uc3Qgc3BvaWxlcnNNZWRpYSA9IEFycmF5LmZyb20oc3BvaWxlcnNBcnJheSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xyXG5cdFx0cmV0dXJuIGl0ZW0uZGF0YXNldC5zcG9pbGVycy5zcGxpdChcIixcIilbMF07XHJcblx0fSk7XHJcblxyXG5cdC8vINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L/QvtC50LvQtdGA0L7QsiDRgSDQvNC10LTQuNCwINC30LDQv9GA0L7RgdCw0LzQuFxyXG5cdGlmIChzcG9pbGVyc01lZGlhLmxlbmd0aCA+IDApIHtcclxuXHRcdGNvbnN0IGJyZWFrcG9pbnRzQXJyYXkgPSBbXTtcclxuXHRcdHNwb2lsZXJzTWVkaWEuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgcGFyYW1zID0gaXRlbS5kYXRhc2V0LnNwb2lsZXJzO1xyXG5cdFx0XHRjb25zdCBicmVha3BvaW50ID0ge307XHJcblx0XHRcdGNvbnN0IHBhcmFtc0FycmF5ID0gcGFyYW1zLnNwbGl0KFwiLFwiKTtcclxuXHRcdFx0YnJlYWtwb2ludC52YWx1ZSA9IHBhcmFtc0FycmF5WzBdO1xyXG5cdFx0XHRicmVha3BvaW50LnR5cGUgPSBwYXJhbXNBcnJheVsxXSA/IHBhcmFtc0FycmF5WzFdLnRyaW0oKSA6IFwibWF4XCI7XHJcblx0XHRcdGJyZWFrcG9pbnQuaXRlbSA9IGl0ZW07XHJcblx0XHRcdGJyZWFrcG9pbnRzQXJyYXkucHVzaChicmVha3BvaW50KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vINCf0L7Qu9GD0YfQsNC10Lwg0YPQvdC40LrQsNC70YzQvdGL0LUg0LHRgNC10LnQutC/0L7QuNC90YLRi1xyXG5cdFx0bGV0IG1lZGlhUXVlcmllcyA9IGJyZWFrcG9pbnRzQXJyYXkubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdHJldHVybiAnKCcgKyBpdGVtLnR5cGUgKyBcIi13aWR0aDogXCIgKyBpdGVtLnZhbHVlICsgXCJweCksXCIgKyBpdGVtLnZhbHVlICsgJywnICsgaXRlbS50eXBlO1xyXG5cdFx0fSk7XHJcblx0XHRtZWRpYVF1ZXJpZXMgPSBtZWRpYVF1ZXJpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi5pbmRleE9mKGl0ZW0pID09PSBpbmRleDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vINCg0LDQsdC+0YLQsNC10Lwg0YEg0LrQsNC20LTRi9C8INCx0YDQtdC50LrQv9C+0LjQvdGC0L7QvFxyXG5cdFx0bWVkaWFRdWVyaWVzLmZvckVhY2goYnJlYWtwb2ludCA9PiB7XHJcblx0XHRcdGNvbnN0IHBhcmFtc0FycmF5ID0gYnJlYWtwb2ludC5zcGxpdChcIixcIik7XHJcblx0XHRcdGNvbnN0IG1lZGlhQnJlYWtwb2ludCA9IHBhcmFtc0FycmF5WzFdO1xyXG5cdFx0XHRjb25zdCBtZWRpYVR5cGUgPSBwYXJhbXNBcnJheVsyXTtcclxuXHRcdFx0Y29uc3QgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhKHBhcmFtc0FycmF5WzBdKTtcclxuXHJcblx0XHRcdC8vINCe0LHRitC10LrRgtGLINGBINC90YPQttC90YvQvNC4INGD0YHQu9C+0LLQuNGP0LzQuFxyXG5cdFx0XHRjb25zdCBzcG9pbGVyc0FycmF5ID0gYnJlYWtwb2ludHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHRpZiAoaXRlbS52YWx1ZSA9PT0gbWVkaWFCcmVha3BvaW50ICYmIGl0ZW0udHlwZSA9PT0gbWVkaWFUeXBlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvLyDQodC+0LHRi9GC0LjQtVxyXG5cdFx0XHRtYXRjaE1lZGlhLmFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRpbml0U3BvaWxlcnMoc3BvaWxlcnNBcnJheSwgbWF0Y2hNZWRpYSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpbml0U3BvaWxlcnMoc3BvaWxlcnNBcnJheSwgbWF0Y2hNZWRpYSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcblx0ZnVuY3Rpb24gaW5pdFNwb2lsZXJzKHNwb2lsZXJzQXJyYXksIG1hdGNoTWVkaWEgPSBmYWxzZSkge1xyXG5cdFx0c3BvaWxlcnNBcnJheS5mb3JFYWNoKHNwb2lsZXJzQmxvY2sgPT4ge1xyXG5cdFx0XHRzcG9pbGVyc0Jsb2NrID0gbWF0Y2hNZWRpYSA/IHNwb2lsZXJzQmxvY2suaXRlbSA6IHNwb2lsZXJzQmxvY2s7XHJcblx0XHRcdGlmIChtYXRjaE1lZGlhLm1hdGNoZXMgfHwgIW1hdGNoTWVkaWEpIHtcclxuXHRcdFx0XHRzcG9pbGVyc0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ19pbml0Jyk7XHJcblx0XHRcdFx0aW5pdFNwb2lsZXJCb2R5KHNwb2lsZXJzQmxvY2spO1xyXG5cdFx0XHRcdHNwb2lsZXJzQmxvY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNldFNwb2lsZXJBY3Rpb24pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNwb2lsZXJzQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnX2luaXQnKTtcclxuXHRcdFx0XHRpbml0U3BvaWxlckJvZHkoc3BvaWxlcnNCbG9jaywgZmFsc2UpO1xyXG5cdFx0XHRcdHNwb2lsZXJzQmxvY2sucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNldFNwb2lsZXJBY3Rpb24pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINCg0LDQsdC+0YLQsCDRgSDQutC+0L3RgtC10L3RgtC+0LxcclxuXHRmdW5jdGlvbiBpbml0U3BvaWxlckJvZHkoc3BvaWxlcnNCbG9jaywgaGlkZVNwb2lsZXJCb2R5ID0gdHJ1ZSkge1xyXG5cdFx0Y29uc3Qgc3BvaWxlclRpdGxlcyA9IHNwb2lsZXJzQmxvY2sucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BvaWxlcl0nKTtcclxuXHRcdGlmIChzcG9pbGVyVGl0bGVzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0c3BvaWxlclRpdGxlcy5mb3JFYWNoKHNwb2lsZXJUaXRsZSA9PiB7XHJcblx0XHRcdFx0aWYgKGhpZGVTcG9pbGVyQm9keSkge1xyXG5cdFx0XHRcdFx0c3BvaWxlclRpdGxlLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcclxuXHRcdFx0XHRcdGlmICghc3BvaWxlclRpdGxlLmNsYXNzTGlzdC5jb250YWlucygnX2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHRcdHNwb2lsZXJUaXRsZS5uZXh0RWxlbWVudFNpYmxpbmcuaGlkZGVuID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3BvaWxlclRpdGxlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcclxuXHRcdFx0XHRcdHNwb2lsZXJUaXRsZS5uZXh0RWxlbWVudFNpYmxpbmcuaGlkZGVuID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldFNwb2lsZXJBY3Rpb24oZSkge1xyXG5cdFx0Y29uc3QgZWwgPSBlLnRhcmdldDtcclxuXHRcdGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3BvaWxlcicpIHx8IGVsLmNsb3Nlc3QoJ1tkYXRhLXNwb2lsZXJdJykpIHtcclxuXHRcdFx0Y29uc3Qgc3BvaWxlclRpdGxlID0gZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNwb2lsZXInKSA/IGVsIDogZWwuY2xvc2VzdCgnW2RhdGEtc3BvaWxlcl0nKTtcclxuXHRcdFx0Y29uc3Qgc3BvaWxlcnNCbG9jayA9IHNwb2lsZXJUaXRsZS5jbG9zZXN0KCdbZGF0YS1zcG9pbGVyc10nKTtcclxuXHRcdFx0Y29uc3Qgb25lU3BvaWxlciA9IHNwb2lsZXJzQmxvY2suaGFzQXR0cmlidXRlKCdkYXRhLW9uZS1zcG9pbGVyJykgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdGlmICghc3BvaWxlcnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCcuX3NsaWRlJykubGVuZ3RoKSB7XHJcblx0XHRcdFx0aWYgKG9uZVNwb2lsZXIgJiYgIXNwb2lsZXJUaXRsZS5jbGFzc0xpc3QuY29udGFpbnMoJ19hY3RpdmUnKSkge1xyXG5cdFx0XHRcdFx0aGlkZVNwb2lsZXJzQm9keShzcG9pbGVyc0Jsb2NrKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c3BvaWxlclRpdGxlLmNsYXNzTGlzdC50b2dnbGUoJ19hY3RpdmUnKTtcclxuXHRcdFx0XHRfc2xpZGVUb2dnbGUoc3BvaWxlclRpdGxlLm5leHRFbGVtZW50U2libGluZywgNTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoaWRlU3BvaWxlcnNCb2R5KHNwb2lsZXJzQmxvY2spIHtcclxuXHRcdGNvbnN0IHNwb2lsZXJBY3RpdmVUaXRsZSA9IHNwb2lsZXJzQmxvY2sucXVlcnlTZWxlY3RvcignW2RhdGEtc3BvaWxlcl0uX2FjdGl2ZScpO1xyXG5cdFx0aWYgKHNwb2lsZXJBY3RpdmVUaXRsZSkge1xyXG5cdFx0XHRzcG9pbGVyQWN0aXZlVGl0bGUuY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpO1xyXG5cdFx0XHRfc2xpZGVVcChzcG9pbGVyQWN0aXZlVGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLCA1MDApO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLy8gU2xpZGVUb2dnbGVcclxubGV0IF9zbGlkZVVwID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDApID0+IHtcclxuXHRpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XHJcblx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XHJcblx0XHR0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gJ2hlaWdodCwgbWFyZ2luLCBwYWRkaW5nJztcclxuXHRcdHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XHJcblx0XHR0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodCArICdweCc7XHJcblx0XHR0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0dGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblx0XHR0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gMDtcclxuXHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcclxuXHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcclxuXHRcdHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xyXG5cdFx0dGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XHJcblx0XHR3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHRhcmdldC5oaWRkZW4gPSB0cnVlO1xyXG5cdFx0XHR0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xyXG5cdFx0XHR0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctdG9wJyk7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScpO1xyXG5cdFx0XHR0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93Jyk7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xyXG5cdFx0XHR0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcclxuXHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xyXG5cdFx0fSwgZHVyYXRpb24pO1xyXG5cdH1cclxufVxyXG5sZXQgX3NsaWRlRG93biA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XHJcblx0aWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xyXG5cdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ19zbGlkZScpO1xyXG5cdFx0aWYgKHRhcmdldC5oaWRkZW4pIHtcclxuXHRcdFx0dGFyZ2V0LmhpZGRlbiA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGhlaWdodCA9IHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcblx0XHR0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHRcdHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwO1xyXG5cdFx0dGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xyXG5cdFx0dGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xyXG5cdFx0dGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XHJcblx0XHR0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcclxuXHRcdHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcblx0XHR0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJoZWlnaHQsIG1hcmdpbiwgcGFkZGluZ1wiO1xyXG5cdFx0dGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcclxuXHRcdHRhcmdldC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xyXG5cdFx0dGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xyXG5cdFx0dGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xyXG5cdFx0dGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XHJcblx0XHR0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcclxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xyXG5cdFx0XHR0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5Jyk7XHJcblx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcclxuXHRcdH0sIGR1cmF0aW9uKTtcclxuXHR9XHJcbn1cclxubGV0IF9zbGlkZVRvZ2dsZSA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XHJcblx0aWYgKHRhcmdldC5oaWRkZW4pIHtcclxuXHRcdHJldHVybiBfc2xpZGVEb3duKHRhcmdldCwgZHVyYXRpb24pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gX3NsaWRlVXAodGFyZ2V0LCBkdXJhdGlvbik7XHJcblx0fVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkYXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHklJyk7XG52YXIgJGNhbGwgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCUnKTtcbnZhciAkcmVmbGVjdEFwcGx5ID0gR2V0SW50cmluc2ljKCclUmVmbGVjdC5hcHBseSUnLCB0cnVlKSB8fCBiaW5kLmNhbGwoJGNhbGwsICRhcHBseSk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJywgdHJ1ZSk7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmRlZmluZVByb3BlcnR5JScsIHRydWUpO1xudmFyICRtYXggPSBHZXRJbnRyaW5zaWMoJyVNYXRoLm1heCUnKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQob3JpZ2luYWxGdW5jdGlvbikge1xuXHR2YXIgZnVuYyA9ICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG5cdGlmICgkZ09QRCAmJiAkZGVmaW5lUHJvcGVydHkpIHtcblx0XHR2YXIgZGVzYyA9ICRnT1BEKGZ1bmMsICdsZW5ndGgnKTtcblx0XHRpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcblx0XHRcdC8vIG9yaWdpbmFsIGxlbmd0aCwgcGx1cyB0aGUgcmVjZWl2ZXIsIG1pbnVzIGFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyAoYWZ0ZXIgdGhlIHJlY2VpdmVyKVxuXHRcdFx0JGRlZmluZVByb3BlcnR5KFxuXHRcdFx0XHRmdW5jLFxuXHRcdFx0XHQnbGVuZ3RoJyxcblx0XHRcdFx0eyB2YWx1ZTogMSArICRtYXgoMCwgb3JpZ2luYWxGdW5jdGlvbi5sZW5ndGggLSAoYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB9XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuYztcbn07XG5cbnZhciBhcHBseUJpbmQgPSBmdW5jdGlvbiBhcHBseUJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRhcHBseSwgYXJndW1lbnRzKTtcbn07XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0JGRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnYXBwbHknLCB7IHZhbHVlOiBhcHBseUJpbmQgfSk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cy5hcHBseSA9IGFwcGx5QmluZDtcbn1cbiIsIi8qZ2xvYmFsIHdpbmRvdywgZ2xvYmFsKi9cbnZhciB1dGlsID0gcmVxdWlyZShcInV0aWxcIilcbnZhciBhc3NlcnQgPSByZXF1aXJlKFwiYXNzZXJ0XCIpXG5mdW5jdGlvbiBub3coKSB7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSB9XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxudmFyIGNvbnNvbGVcbnZhciB0aW1lcyA9IHt9XG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jb25zb2xlKSB7XG4gICAgY29uc29sZSA9IGdsb2JhbC5jb25zb2xlXG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmNvbnNvbGUpIHtcbiAgICBjb25zb2xlID0gd2luZG93LmNvbnNvbGVcbn0gZWxzZSB7XG4gICAgY29uc29sZSA9IHt9XG59XG5cbnZhciBmdW5jdGlvbnMgPSBbXG4gICAgW2xvZywgXCJsb2dcIl0sXG4gICAgW2luZm8sIFwiaW5mb1wiXSxcbiAgICBbd2FybiwgXCJ3YXJuXCJdLFxuICAgIFtlcnJvciwgXCJlcnJvclwiXSxcbiAgICBbdGltZSwgXCJ0aW1lXCJdLFxuICAgIFt0aW1lRW5kLCBcInRpbWVFbmRcIl0sXG4gICAgW3RyYWNlLCBcInRyYWNlXCJdLFxuICAgIFtkaXIsIFwiZGlyXCJdLFxuICAgIFtjb25zb2xlQXNzZXJ0LCBcImFzc2VydFwiXVxuXVxuXG5mb3IgKHZhciBpID0gMDsgaSA8IGZ1bmN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0dXBsZSA9IGZ1bmN0aW9uc1tpXVxuICAgIHZhciBmID0gdHVwbGVbMF1cbiAgICB2YXIgbmFtZSA9IHR1cGxlWzFdXG5cbiAgICBpZiAoIWNvbnNvbGVbbmFtZV0pIHtcbiAgICAgICAgY29uc29sZVtuYW1lXSA9IGZcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uc29sZVxuXG5mdW5jdGlvbiBsb2coKSB7fVxuXG5mdW5jdGlvbiBpbmZvKCkge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gd2FybigpIHtcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG59XG5cbmZ1bmN0aW9uIGVycm9yKCkge1xuICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG59XG5cbmZ1bmN0aW9uIHRpbWUobGFiZWwpIHtcbiAgICB0aW1lc1tsYWJlbF0gPSBub3coKVxufVxuXG5mdW5jdGlvbiB0aW1lRW5kKGxhYmVsKSB7XG4gICAgdmFyIHRpbWUgPSB0aW1lc1tsYWJlbF1cbiAgICBpZiAoIXRpbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbDogXCIgKyBsYWJlbClcbiAgICB9XG5cbiAgICBkZWxldGUgdGltZXNbbGFiZWxdXG4gICAgdmFyIGR1cmF0aW9uID0gbm93KCkgLSB0aW1lXG4gICAgY29uc29sZS5sb2cobGFiZWwgKyBcIjogXCIgKyBkdXJhdGlvbiArIFwibXNcIilcbn1cblxuZnVuY3Rpb24gdHJhY2UoKSB7XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcigpXG4gICAgZXJyLm5hbWUgPSBcIlRyYWNlXCJcbiAgICBlcnIubWVzc2FnZSA9IHV0aWwuZm9ybWF0LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjaylcbn1cblxuZnVuY3Rpb24gZGlyKG9iamVjdCkge1xuICAgIGNvbnNvbGUubG9nKHV0aWwuaW5zcGVjdChvYmplY3QpICsgXCJcXG5cIilcbn1cblxuZnVuY3Rpb24gY29uc29sZUFzc2VydChleHByZXNzaW9uKSB7XG4gICAgaWYgKCFleHByZXNzaW9uKSB7XG4gICAgICAgIHZhciBhcnIgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICAgICAgYXNzZXJ0Lm9rKGZhbHNlLCB1dGlsLmZvcm1hdC5hcHBseShudWxsLCBhcnIpKVxuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKCdvYmplY3Qta2V5cycpO1xudmFyIGhhc1N5bWJvbHMgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2woJ2ZvbycpID09PSAnc3ltYm9sJztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xudmFyIG9yaWdEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4pIHtcblx0cmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzID0gcmVxdWlyZSgnaGFzLXByb3BlcnR5LWRlc2NyaXB0b3JzJykoKTtcblxudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSBvcmlnRGVmaW5lUHJvcGVydHkgJiYgaGFzUHJvcGVydHlEZXNjcmlwdG9ycztcblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgdmFsdWUsIHByZWRpY2F0ZSkge1xuXHRpZiAobmFtZSBpbiBvYmplY3QpIHtcblx0XHRpZiAocHJlZGljYXRlID09PSB0cnVlKSB7XG5cdFx0XHRpZiAob2JqZWN0W25hbWVdID09PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghaXNGdW5jdGlvbihwcmVkaWNhdGUpIHx8ICFwcmVkaWNhdGUoKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXHRpZiAoc3VwcG9ydHNEZXNjcmlwdG9ycykge1xuXHRcdG9yaWdEZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRvYmplY3RbbmFtZV0gPSB2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHR9XG59O1xuXG52YXIgZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmplY3QsIG1hcCkge1xuXHR2YXIgcHJlZGljYXRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDoge307XG5cdHZhciBwcm9wcyA9IGtleXMobWFwKTtcblx0aWYgKGhhc1N5bWJvbHMpIHtcblx0XHRwcm9wcyA9IGNvbmNhdC5jYWxsKHByb3BzLCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG1hcCkpO1xuXHR9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BzW2ldLCBtYXBbcHJvcHNbaV1dLCBwcmVkaWNhdGVzW3Byb3BzW2ldXSk7XG5cdH1cbn07XG5cbmRlZmluZVByb3BlcnRpZXMuc3VwcG9ydHNEZXNjcmlwdG9ycyA9ICEhc3VwcG9ydHNEZXNjcmlwdG9ycztcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuIiwiLyoqXG4gKiBDb2RlIHJlZmFjdG9yZWQgZnJvbSBNb3ppbGxhIERldmVsb3BlciBOZXR3b3JrOlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgZmlyc3RTb3VyY2UpIHtcbiAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKG5leHRTb3VyY2UgPT09IHVuZGVmaW5lZCB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIga2V5c0FycmF5ID0gT2JqZWN0LmtleXMoT2JqZWN0KG5leHRTb3VyY2UpKTtcbiAgICBmb3IgKHZhciBuZXh0SW5kZXggPSAwLCBsZW4gPSBrZXlzQXJyYXkubGVuZ3RoOyBuZXh0SW5kZXggPCBsZW47IG5leHRJbmRleCsrKSB7XG4gICAgICB2YXIgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgaWYgKGRlc2MgIT09IHVuZGVmaW5lZCAmJiBkZXNjLmVudW1lcmFibGUpIHtcbiAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdG87XG59XG5cbmZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICBpZiAoIU9iamVjdC5hc3NpZ24pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnYXNzaWduJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBhc3NpZ25cbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXNzaWduOiBhc3NpZ24sXG4gIHBvbHlmaWxsOiBwb2x5ZmlsbFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCdpcy1jYWxsYWJsZScpO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGZvckVhY2hBcnJheSA9IGZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCBpKSkge1xuICAgICAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcihhcnJheVtpXSwgaSwgYXJyYXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBhcnJheVtpXSwgaSwgYXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2hTdHJpbmcgPSBmdW5jdGlvbiBmb3JFYWNoU3RyaW5nKHN0cmluZywgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0cmluZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAvLyBubyBzdWNoIHRoaW5nIGFzIGEgc3BhcnNlIHN0cmluZy5cbiAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2hPYmplY3QgPSBmdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcihvYmplY3Rba10sIGssIG9iamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIG9iamVjdFtrXSwgaywgb2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgdGhpc0FyZykge1xuICAgIGlmICghaXNDYWxsYWJsZShpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdmFyIHJlY2VpdmVyO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIHtcbiAgICAgICAgcmVjZWl2ZXIgPSB0aGlzQXJnO1xuICAgIH1cblxuICAgIGlmICh0b1N0ci5jYWxsKGxpc3QpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgbm8taW52YWxpZC10aGlzOiAxICovXG5cbnZhciBFUlJPUl9NRVNTQUdFID0gJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgJztcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY1R5cGUgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQodGhhdCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmNhbGwodGFyZ2V0KSAhPT0gZnVuY1R5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJPUl9NRVNTQUdFICsgdGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICB2YXIgYm91bmQ7XG4gICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhhdCxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBib3VuZExlbmd0aCA9IE1hdGgubWF4KDAsIHRhcmdldC5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgdmFyIGJvdW5kQXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZEFyZ3MucHVzaCgnJCcgKyBpKTtcbiAgICB9XG5cbiAgICBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgYm91bmRBcmdzLmpvaW4oJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKTsgfScpKGJpbmRlcik7XG5cbiAgICBpZiAodGFyZ2V0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgRW1wdHkgPSBmdW5jdGlvbiBFbXB0eSgpIHt9O1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICBib3VuZC5wcm90b3R5cGUgPSBuZXcgRW1wdHkoKTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgaW1wbGVtZW50YXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdHJldHVybiAkRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOyByZXR1cm4gKCcgKyBleHByZXNzaW9uU3ludGF4ICsgJykuY29uc3RydWN0b3I7JykoKTtcblx0fSBjYXRjaCAoZSkge31cbn07XG5cbnZhciAkZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5pZiAoJGdPUEQpIHtcblx0dHJ5IHtcblx0XHQkZ09QRCh7fSwgJycpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0JGdPUEQgPSBudWxsOyAvLyB0aGlzIGlzIElFIDgsIHdoaWNoIGhhcyBhIGJyb2tlbiBnT1BEXG5cdH1cbn1cblxudmFyIHRocm93VHlwZUVycm9yID0gZnVuY3Rpb24gKCkge1xuXHR0aHJvdyBuZXcgJFR5cGVFcnJvcigpO1xufTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cbnZhciBuZWVkc0V2YWwgPSB7fTtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCclQWdncmVnYXRlRXJyb3IlJzogdHlwZW9mIEFnZ3JlZ2F0ZUVycm9yID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFnZ3JlZ2F0ZUVycm9yLFxuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogbmVlZHNFdmFsLFxuXHQnJUF0b21pY3MlJzogdHlwZW9mIEF0b21pY3MgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXRvbWljcyxcblx0JyVCaWdJbnQlJzogdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQsXG5cdCclQmlnSW50NjRBcnJheSUnOiB0eXBlb2YgQmlnSW50NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQ2NEFycmF5LFxuXHQnJUJpZ1VpbnQ2NEFycmF5JSc6IHR5cGVvZiBCaWdVaW50NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdVaW50NjRBcnJheSxcblx0JyVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGUlJzogRGF0ZSxcblx0JyVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCclZW5jb2RlVVJJJSc6IGVuY29kZVVSSSxcblx0JyVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJUVycm9yJSc6IEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6IE9iamVjdCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbnRyeSB7XG5cdG51bGwuZXJyb3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG59IGNhdGNoIChlKSB7XG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXNoYWRvd3JlYWxtL3B1bGwvMzg0I2lzc3VlY29tbWVudC0xMzY0MjY0MjI5XG5cdHZhciBlcnJvclByb3RvID0gZ2V0UHJvdG8oZ2V0UHJvdG8oZSkpO1xuXHRJTlRSSU5TSUNTWyclRXJyb3IucHJvdG90eXBlJSddID0gZXJyb3JQcm90bztcbn1cblxudmFyIGRvRXZhbCA9IGZ1bmN0aW9uIGRvRXZhbChuYW1lKSB7XG5cdHZhciB2YWx1ZTtcblx0aWYgKG5hbWUgPT09ICclQXN5bmNGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2Z1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3IlJykge1xuXHRcdHZhciBmbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJyk7XG5cdFx0aWYgKGZuKSB7XG5cdFx0XHR2YWx1ZSA9IGZuLnByb3RvdHlwZTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJScpIHtcblx0XHR2YXIgZ2VuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3IlJyk7XG5cdFx0aWYgKGdlbikge1xuXHRcdFx0dmFsdWUgPSBnZXRQcm90byhnZW4ucHJvdG90eXBlKTtcblx0XHR9XG5cdH1cblxuXHRJTlRSSU5TSUNTW25hbWVdID0gdmFsdWU7XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxudmFyIExFR0FDWV9BTElBU0VTID0ge1xuXHQnJUFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b3R5cGUlJzogWydBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvX2VudHJpZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZW50cmllcyddLFxuXHQnJUFycmF5UHJvdG9fZm9yRWFjaCUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdmb3JFYWNoJ10sXG5cdCclQXJyYXlQcm90b19rZXlzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2tleXMnXSxcblx0JyVBcnJheVByb3RvX3ZhbHVlcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICd2YWx1ZXMnXSxcblx0JyVBc3luY0Z1bmN0aW9uUHJvdG90eXBlJSc6IFsnQXN5bmNGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3JQcm90b3R5cGUlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVCb29sZWFuUHJvdG90eXBlJSc6IFsnQm9vbGVhbicsICdwcm90b3R5cGUnXSxcblx0JyVEYXRhVmlld1Byb3RvdHlwZSUnOiBbJ0RhdGFWaWV3JywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGVQcm90b3R5cGUlJzogWydEYXRlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUVycm9yUHJvdG90eXBlJSc6IFsnRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRXZhbEVycm9yUHJvdG90eXBlJSc6IFsnRXZhbEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0MzJBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDY0QXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDY0QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRnVuY3Rpb25Qcm90b3R5cGUlJzogWydGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3IlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3JQcm90b3R5cGUlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclSW50OEFycmF5UHJvdG90eXBlJSc6IFsnSW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDE2QXJyYXlQcm90b3R5cGUlJzogWydJbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDMyQXJyYXlQcm90b3R5cGUlJzogWydJbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUpTT05QYXJzZSUnOiBbJ0pTT04nLCAncGFyc2UnXSxcblx0JyVKU09OU3RyaW5naWZ5JSc6IFsnSlNPTicsICdzdHJpbmdpZnknXSxcblx0JyVNYXBQcm90b3R5cGUlJzogWydNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclTnVtYmVyUHJvdG90eXBlJSc6IFsnTnVtYmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJU9iamVjdFByb3RvdHlwZSUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnXSxcblx0JyVPYmpQcm90b190b1N0cmluZyUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndG9TdHJpbmcnXSxcblx0JyVPYmpQcm90b192YWx1ZU9mJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd2YWx1ZU9mJ10sXG5cdCclUHJvbWlzZVByb3RvdHlwZSUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJ10sXG5cdCclUHJvbWlzZVByb3RvX3RoZW4lJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZScsICd0aGVuJ10sXG5cdCclUHJvbWlzZV9hbGwlJzogWydQcm9taXNlJywgJ2FsbCddLFxuXHQnJVByb21pc2VfcmVqZWN0JSc6IFsnUHJvbWlzZScsICdyZWplY3QnXSxcblx0JyVQcm9taXNlX3Jlc29sdmUlJzogWydQcm9taXNlJywgJ3Jlc29sdmUnXSxcblx0JyVSYW5nZUVycm9yUHJvdG90eXBlJSc6IFsnUmFuZ2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWZlcmVuY2VFcnJvclByb3RvdHlwZSUnOiBbJ1JlZmVyZW5jZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZ0V4cFByb3RvdHlwZSUnOiBbJ1JlZ0V4cCcsICdwcm90b3R5cGUnXSxcblx0JyVTZXRQcm90b3R5cGUlJzogWydTZXQnLCAncHJvdG90eXBlJ10sXG5cdCclU2hhcmVkQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydTaGFyZWRBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVTdHJpbmdQcm90b3R5cGUlJzogWydTdHJpbmcnLCAncHJvdG90eXBlJ10sXG5cdCclU3ltYm9sUHJvdG90eXBlJSc6IFsnU3ltYm9sJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bnRheEVycm9yUHJvdG90eXBlJSc6IFsnU3ludGF4RXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZWRBcnJheVByb3RvdHlwZSUnOiBbJ1R5cGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZUVycm9yUHJvdG90eXBlJSc6IFsnVHlwZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4QXJyYXlQcm90b3R5cGUlJzogWydVaW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhDbGFtcGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDE2QXJyYXlQcm90b3R5cGUlJzogWydVaW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVSSUVycm9yUHJvdG90eXBlJSc6IFsnVVJJRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha01hcFByb3RvdHlwZSUnOiBbJ1dlYWtNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha1NldFByb3RvdHlwZSUnOiBbJ1dlYWtTZXQnLCAncHJvdG90eXBlJ11cbn07XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJ2hhcycpO1xudmFyICRjb25jYXQgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgQXJyYXkucHJvdG90eXBlLmNvbmNhdCk7XG52YXIgJHNwbGljZUFwcGx5ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmFwcGx5LCBBcnJheS5wcm90b3R5cGUuc3BsaWNlKTtcbnZhciAkcmVwbGFjZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xudmFyICRzdHJTbGljZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnNsaWNlKTtcbnZhciAkZXhlYyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBSZWdFeHAucHJvdG90eXBlLmV4ZWMpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciBmaXJzdCA9ICRzdHJTbGljZShzdHJpbmcsIDAsIDEpO1xuXHR2YXIgbGFzdCA9ICRzdHJTbGljZShzdHJpbmcsIC0xKTtcblx0aWYgKGZpcnN0ID09PSAnJScgJiYgbGFzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBjbG9zaW5nIGAlYCcpO1xuXHR9IGVsc2UgaWYgKGxhc3QgPT09ICclJyAmJiBmaXJzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBvcGVuaW5nIGAlYCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogbnVtYmVyIHx8IG1hdGNoO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4vKiBlbmQgYWRhcHRhdGlvbiAqL1xuXG52YXIgZ2V0QmFzZUludHJpbnNpYyA9IGZ1bmN0aW9uIGdldEJhc2VJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWNOYW1lID0gbmFtZTtcblx0dmFyIGFsaWFzO1xuXHRpZiAoaGFzT3duKExFR0FDWV9BTElBU0VTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdGFsaWFzID0gTEVHQUNZX0FMSUFTRVNbaW50cmluc2ljTmFtZV07XG5cdFx0aW50cmluc2ljTmFtZSA9ICclJyArIGFsaWFzWzBdICsgJyUnO1xuXHR9XG5cblx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdHZhciB2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljTmFtZV07XG5cdFx0aWYgKHZhbHVlID09PSBuZWVkc0V2YWwpIHtcblx0XHRcdHZhbHVlID0gZG9FdmFsKGludHJpbnNpY05hbWUpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJiAhYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSEnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0YWxpYXM6IGFsaWFzLFxuXHRcdFx0bmFtZTogaW50cmluc2ljTmFtZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHZXRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdGlmICgkZXhlYygvXiU/W14lXSolPyQvLCBuYW1lKSA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2AlYCBtYXkgbm90IGJlIHByZXNlbnQgYW55d2hlcmUgYnV0IGF0IHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiB0aGUgaW50cmluc2ljIG5hbWUnKTtcblx0fVxuXHR2YXIgcGFydHMgPSBzdHJpbmdUb1BhdGgobmFtZSk7XG5cdHZhciBpbnRyaW5zaWNCYXNlTmFtZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0c1swXSA6ICcnO1xuXG5cdHZhciBpbnRyaW5zaWMgPSBnZXRCYXNlSW50cmluc2ljKCclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnLCBhbGxvd01pc3NpbmcpO1xuXHR2YXIgaW50cmluc2ljUmVhbE5hbWUgPSBpbnRyaW5zaWMubmFtZTtcblx0dmFyIHZhbHVlID0gaW50cmluc2ljLnZhbHVlO1xuXHR2YXIgc2tpcEZ1cnRoZXJDYWNoaW5nID0gZmFsc2U7XG5cblx0dmFyIGFsaWFzID0gaW50cmluc2ljLmFsaWFzO1xuXHRpZiAoYWxpYXMpIHtcblx0XHRpbnRyaW5zaWNCYXNlTmFtZSA9IGFsaWFzWzBdO1xuXHRcdCRzcGxpY2VBcHBseShwYXJ0cywgJGNvbmNhdChbMCwgMV0sIGFsaWFzKSk7XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMSwgaXNPd24gPSB0cnVlOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHR2YXIgcGFydCA9IHBhcnRzW2ldO1xuXHRcdHZhciBmaXJzdCA9ICRzdHJTbGljZShwYXJ0LCAwLCAxKTtcblx0XHR2YXIgbGFzdCA9ICRzdHJTbGljZShwYXJ0LCAtMSk7XG5cdFx0aWYgKFxuXHRcdFx0KFxuXHRcdFx0XHQoZmlyc3QgPT09ICdcIicgfHwgZmlyc3QgPT09IFwiJ1wiIHx8IGZpcnN0ID09PSAnYCcpXG5cdFx0XHRcdHx8IChsYXN0ID09PSAnXCInIHx8IGxhc3QgPT09IFwiJ1wiIHx8IGxhc3QgPT09ICdgJylcblx0XHRcdClcblx0XHRcdCYmIGZpcnN0ICE9PSBsYXN0XG5cdFx0KSB7XG5cdFx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdwcm9wZXJ0eSBuYW1lcyB3aXRoIHF1b3RlcyBtdXN0IGhhdmUgbWF0Y2hpbmcgcXVvdGVzJyk7XG5cdFx0fVxuXHRcdGlmIChwYXJ0ID09PSAnY29uc3RydWN0b3InIHx8ICFpc093bikge1xuXHRcdFx0c2tpcEZ1cnRoZXJDYWNoaW5nID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbnRyaW5zaWNCYXNlTmFtZSArPSAnLicgKyBwYXJ0O1xuXHRcdGludHJpbnNpY1JlYWxOYW1lID0gJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJSc7XG5cblx0XHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY1JlYWxOYW1lKSkge1xuXHRcdFx0dmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0XHRcdGlmICghKHBhcnQgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdGlmICghYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Jhc2UgaW50cmluc2ljIGZvciAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgdGhlIHByb3BlcnR5IGlzIG5vdCBhdmFpbGFibGUuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZvaWQgdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCRnT1BEICYmIChpICsgMSkgPj0gcGFydHMubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBkZXNjID0gJGdPUEQodmFsdWUsIHBhcnQpO1xuXHRcdFx0XHRpc093biA9ICEhZGVzYztcblxuXHRcdFx0XHQvLyBCeSBjb252ZW50aW9uLCB3aGVuIGEgZGF0YSBwcm9wZXJ0eSBpcyBjb252ZXJ0ZWQgdG8gYW4gYWNjZXNzb3Jcblx0XHRcdFx0Ly8gcHJvcGVydHkgdG8gZW11bGF0ZSBhIGRhdGEgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBzdWZmZXIgZnJvbVxuXHRcdFx0XHQvLyB0aGUgb3ZlcnJpZGUgbWlzdGFrZSwgdGhhdCBhY2Nlc3NvcidzIGdldHRlciBpcyBtYXJrZWQgd2l0aFxuXHRcdFx0XHQvLyBhbiBgb3JpZ2luYWxWYWx1ZWAgcHJvcGVydHkuIEhlcmUsIHdoZW4gd2UgZGV0ZWN0IHRoaXMsIHdlXG5cdFx0XHRcdC8vIHVwaG9sZCB0aGUgaWxsdXNpb24gYnkgcHJldGVuZGluZyB0byBzZWUgdGhhdCBvcmlnaW5hbCBkYXRhXG5cdFx0XHRcdC8vIHByb3BlcnR5LCBpLmUuLCByZXR1cm5pbmcgdGhlIHZhbHVlIHJhdGhlciB0aGFuIHRoZSBnZXR0ZXJcblx0XHRcdFx0Ly8gaXRzZWxmLlxuXHRcdFx0XHRpZiAoaXNPd24gJiYgJ2dldCcgaW4gZGVzYyAmJiAhKCdvcmlnaW5hbFZhbHVlJyBpbiBkZXNjLmdldCkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlc2MuZ2V0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzT3duID0gaGFzT3duKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzT3duICYmICFza2lwRnVydGhlckNhY2hpbmcpIHtcblx0XHRcdFx0SU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRnT1BEID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnLCB0cnVlKTtcblxuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoW10sICdsZW5ndGgnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGdPUERcblx0XHQkZ09QRCA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSAkZ09QRDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IEdldEludHJpbnNpYygnJU9iamVjdC5kZWZpbmVQcm9wZXJ0eSUnLCB0cnVlKTtcblxudmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvcnMgPSBmdW5jdGlvbiBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzKCkge1xuXHRpZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdFx0dHJ5IHtcblx0XHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcblxuaGFzUHJvcGVydHlEZXNjcmlwdG9ycy5oYXNBcnJheUxlbmd0aERlZmluZUJ1ZyA9IGZ1bmN0aW9uIGhhc0FycmF5TGVuZ3RoRGVmaW5lQnVnKCkge1xuXHQvLyBub2RlIHYwLjYgaGFzIGEgYnVnIHdoZXJlIGFycmF5IGxlbmd0aHMgY2FuIGJlIFNldCBidXQgbm90IERlZmluZWRcblx0aWYgKCFoYXNQcm9wZXJ0eURlc2NyaXB0b3JzKCkpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHR0cnkge1xuXHRcdHJldHVybiAkZGVmaW5lUHJvcGVydHkoW10sICdsZW5ndGgnLCB7IHZhbHVlOiAxIH0pLmxlbmd0aCAhPT0gMTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIEluIEZpcmVmb3ggNC0yMiwgZGVmaW5pbmcgbGVuZ3RoIG9uIGFuIGFycmF5IHRocm93cyBhbiBleGNlcHRpb24uXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzUHJvcGVydHlEZXNjcmlwdG9ycztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9yaWdTeW1ib2wgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2w7XG52YXIgaGFzU3ltYm9sU2hhbSA9IHJlcXVpcmUoJy4vc2hhbXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNOYXRpdmVTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIG9yaWdTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIG9yaWdTeW1ib2woJ2ZvbycpICE9PSAnc3ltYm9sJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2woJ2JhcicpICE9PSAnc3ltYm9sJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRyZXR1cm4gaGFzU3ltYm9sU2hhbSgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IGNvbXBsZXhpdHk6IFsyLCAxOF0sIG1heC1zdGF0ZW1lbnRzOiBbMiwgMzNdICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1N5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcpIHsgcmV0dXJuIHRydWU7IH1cblxuXHR2YXIgb2JqID0ge307XG5cdHZhciBzeW0gPSBTeW1ib2woJ3Rlc3QnKTtcblx0dmFyIHN5bU9iaiA9IE9iamVjdChzeW0pO1xuXHRpZiAodHlwZW9mIHN5bSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW1PYmopICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL29iamVjdC5hc3NpZ24vaXNzdWVzLzE3XG5cdC8vIGlmIChzeW0gaW5zdGFuY2VvZiBTeW1ib2wpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL2dldC1vd24tcHJvcGVydHktc3ltYm9scy9pc3N1ZXMvNFxuXHQvLyBpZiAoIShzeW1PYmogaW5zdGFuY2VvZiBTeW1ib2wpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIGlmICh0eXBlb2YgU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gaWYgKFN0cmluZyhzeW0pICE9PSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltVmFsID0gNDI7XG5cdG9ialtzeW1dID0gc3ltVmFsO1xuXHRmb3IgKHN5bSBpbiBvYmopIHsgcmV0dXJuIGZhbHNlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLXVucmVhY2hhYmxlLWxvb3Bcblx0aWYgKHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1zID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopO1xuXHRpZiAoc3ltcy5sZW5ndGggIT09IDEgfHwgc3ltc1swXSAhPT0gc3ltKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBzeW0pO1xuXHRcdGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSBzeW1WYWwgfHwgZGVzY3JpcHRvci5lbnVtZXJhYmxlICE9PSB0cnVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzL3NoYW1zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzVG9TdHJpbmdUYWdTaGFtcygpIHtcblx0cmV0dXJuIGhhc1N5bWJvbHMoKSAmJiAhIVN5bWJvbC50b1N0cmluZ1RhZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgICB9XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc1RvU3RyaW5nVGFnID0gcmVxdWlyZSgnaGFzLXRvc3RyaW5ndGFnL3NoYW1zJykoKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcblxudmFyIGlzU3RhbmRhcmRBcmd1bWVudHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHRpZiAoaGFzVG9TdHJpbmdUYWcgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsdWUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuICR0b1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xufTtcblxudmFyIGlzTGVnYWN5QXJndW1lbnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0aWYgKGlzU3RhbmRhcmRBcmd1bWVudHModmFsdWUpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmXG5cdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInICYmXG5cdFx0dmFsdWUubGVuZ3RoID49IDAgJiZcblx0XHQkdG9TdHJpbmcodmFsdWUpICE9PSAnW29iamVjdCBBcnJheV0nICYmXG5cdFx0JHRvU3RyaW5nKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG52YXIgc3VwcG9ydHNTdGFuZGFyZEFyZ3VtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBpc1N0YW5kYXJkQXJndW1lbnRzKGFyZ3VtZW50cyk7XG59KCkpO1xuXG5pc1N0YW5kYXJkQXJndW1lbnRzLmlzTGVnYWN5QXJndW1lbnRzID0gaXNMZWdhY3lBcmd1bWVudHM7IC8vIGZvciB0ZXN0c1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPyBpc1N0YW5kYXJkQXJndW1lbnRzIDogaXNMZWdhY3lBcmd1bWVudHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmblRvU3RyID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIHJlZmxlY3RBcHBseSA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0ICE9PSBudWxsICYmIFJlZmxlY3QuYXBwbHk7XG52YXIgYmFkQXJyYXlMaWtlO1xudmFyIGlzQ2FsbGFibGVNYXJrZXI7XG5pZiAodHlwZW9mIHJlZmxlY3RBcHBseSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG5cdHRyeSB7XG5cdFx0YmFkQXJyYXlMaWtlID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnbGVuZ3RoJywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRocm93IGlzQ2FsbGFibGVNYXJrZXI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aXNDYWxsYWJsZU1hcmtlciA9IHt9O1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG5cdFx0cmVmbGVjdEFwcGx5KGZ1bmN0aW9uICgpIHsgdGhyb3cgNDI7IH0sIG51bGwsIGJhZEFycmF5TGlrZSk7XG5cdH0gY2F0Y2ggKF8pIHtcblx0XHRpZiAoXyAhPT0gaXNDYWxsYWJsZU1hcmtlcikge1xuXHRcdFx0cmVmbGVjdEFwcGx5ID0gbnVsbDtcblx0XHR9XG5cdH1cbn0gZWxzZSB7XG5cdHJlZmxlY3RBcHBseSA9IG51bGw7XG59XG5cbnZhciBjb25zdHJ1Y3RvclJlZ2V4ID0gL15cXHMqY2xhc3NcXGIvO1xudmFyIGlzRVM2Q2xhc3NGbiA9IGZ1bmN0aW9uIGlzRVM2Q2xhc3NGdW5jdGlvbih2YWx1ZSkge1xuXHR0cnkge1xuXHRcdHZhciBmblN0ciA9IGZuVG9TdHIuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIGNvbnN0cnVjdG9yUmVnZXgudGVzdChmblN0cik7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7IC8vIG5vdCBhIGZ1bmN0aW9uXG5cdH1cbn07XG5cbnZhciB0cnlGdW5jdGlvbk9iamVjdCA9IGZ1bmN0aW9uIHRyeUZ1bmN0aW9uVG9TdHIodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRpZiAoaXNFUzZDbGFzc0ZuKHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmblRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBvYmplY3RDbGFzcyA9ICdbb2JqZWN0IE9iamVjdF0nO1xudmFyIGZuQ2xhc3MgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xudmFyIGdlbkNsYXNzID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcbnZhciBkZGFDbGFzcyA9ICdbb2JqZWN0IEhUTUxBbGxDb2xsZWN0aW9uXSc7IC8vIElFIDExXG52YXIgZGRhQ2xhc3MyID0gJ1tvYmplY3QgSFRNTCBkb2N1bWVudC5hbGwgY2xhc3NdJztcbnZhciBkZGFDbGFzczMgPSAnW29iamVjdCBIVE1MQ29sbGVjdGlvbl0nOyAvLyBJRSA5LTEwXG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmICEhU3ltYm9sLnRvU3RyaW5nVGFnOyAvLyBiZXR0ZXI6IHVzZSBgaGFzLXRvc3RyaW5ndGFnYFxuXG52YXIgaXNJRTY4ID0gISgwIGluIFssXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc3BhcnNlLWFycmF5cywgY29tbWEtc3BhY2luZ1xuXG52YXIgaXNEREEgPSBmdW5jdGlvbiBpc0RvY3VtZW50RG90QWxsKCkgeyByZXR1cm4gZmFsc2U7IH07XG5pZiAodHlwZW9mIGRvY3VtZW50ID09PSAnb2JqZWN0Jykge1xuXHQvLyBGaXJlZm94IDMgY2Fub25pY2FsaXplcyBEREEgdG8gdW5kZWZpbmVkIHdoZW4gaXQncyBub3QgYWNjZXNzZWQgZGlyZWN0bHlcblx0dmFyIGFsbCA9IGRvY3VtZW50LmFsbDtcblx0aWYgKHRvU3RyLmNhbGwoYWxsKSA9PT0gdG9TdHIuY2FsbChkb2N1bWVudC5hbGwpKSB7XG5cdFx0aXNEREEgPSBmdW5jdGlvbiBpc0RvY3VtZW50RG90QWxsKHZhbHVlKSB7XG5cdFx0XHQvKiBnbG9iYWxzIGRvY3VtZW50OiBmYWxzZSAqL1xuXHRcdFx0Ly8gaW4gSUUgNi04LCB0eXBlb2YgZG9jdW1lbnQuYWxsIGlzIFwib2JqZWN0XCIgYW5kIGl0J3MgdHJ1dGh5XG5cdFx0XHRpZiAoKGlzSUU2OCB8fCAhdmFsdWUpICYmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIHN0ciA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRzdHIgPT09IGRkYUNsYXNzXG5cdFx0XHRcdFx0XHR8fCBzdHIgPT09IGRkYUNsYXNzMlxuXHRcdFx0XHRcdFx0fHwgc3RyID09PSBkZGFDbGFzczMgLy8gb3BlcmEgMTIuMTZcblx0XHRcdFx0XHRcdHx8IHN0ciA9PT0gb2JqZWN0Q2xhc3MgLy8gSUUgNi04XG5cdFx0XHRcdFx0KSAmJiB2YWx1ZSgnJykgPT0gbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcblx0XHRcdFx0fSBjYXRjaCAoZSkgeyAvKiovIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVmbGVjdEFwcGx5XG5cdD8gZnVuY3Rpb24gaXNDYWxsYWJsZSh2YWx1ZSkge1xuXHRcdGlmIChpc0REQSh2YWx1ZSkpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR0cnkge1xuXHRcdFx0cmVmbGVjdEFwcGx5KHZhbHVlLCBudWxsLCBiYWRBcnJheUxpa2UpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmIChlICE9PSBpc0NhbGxhYmxlTWFya2VyKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gIWlzRVM2Q2xhc3NGbih2YWx1ZSkgJiYgdHJ5RnVuY3Rpb25PYmplY3QodmFsdWUpO1xuXHR9XG5cdDogZnVuY3Rpb24gaXNDYWxsYWJsZSh2YWx1ZSkge1xuXHRcdGlmIChpc0REQSh2YWx1ZSkpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAoaGFzVG9TdHJpbmdUYWcpIHsgcmV0dXJuIHRyeUZ1bmN0aW9uT2JqZWN0KHZhbHVlKTsgfVxuXHRcdGlmIChpc0VTNkNsYXNzRm4odmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHZhciBzdHJDbGFzcyA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdGlmIChzdHJDbGFzcyAhPT0gZm5DbGFzcyAmJiBzdHJDbGFzcyAhPT0gZ2VuQ2xhc3MgJiYgISgvXlxcW29iamVjdCBIVE1MLykudGVzdChzdHJDbGFzcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0cmV0dXJuIHRyeUZ1bmN0aW9uT2JqZWN0KHZhbHVlKTtcblx0fTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmblRvU3RyID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGlzRm5SZWdleCA9IC9eXFxzKig/OmZ1bmN0aW9uKT9cXCovO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gcmVxdWlyZSgnaGFzLXRvc3RyaW5ndGFnL3NoYW1zJykoKTtcbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBnZXRHZW5lcmF0b3JGdW5jID0gZnVuY3Rpb24gKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dHJ5IHtcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ3JldHVybiBmdW5jdGlvbiooKSB7fScpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0fVxufTtcbnZhciBHZW5lcmF0b3JGdW5jdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0dlbmVyYXRvckZ1bmN0aW9uKGZuKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKGlzRm5SZWdleC50ZXN0KGZuVG9TdHIuY2FsbChmbikpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKCFoYXNUb1N0cmluZ1RhZykge1xuXHRcdHZhciBzdHIgPSB0b1N0ci5jYWxsKGZuKTtcblx0XHRyZXR1cm4gc3RyID09PSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXHR9XG5cdGlmICghZ2V0UHJvdG8pIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKHR5cGVvZiBHZW5lcmF0b3JGdW5jdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR2YXIgZ2VuZXJhdG9yRnVuYyA9IGdldEdlbmVyYXRvckZ1bmMoKTtcblx0XHRHZW5lcmF0b3JGdW5jdGlvbiA9IGdlbmVyYXRvckZ1bmMgPyBnZXRQcm90byhnZW5lcmF0b3JGdW5jKSA6IGZhbHNlO1xuXHR9XG5cdHJldHVybiBnZXRQcm90byhmbikgPT09IEdlbmVyYXRvckZ1bmN0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTmFOKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCdjYWxsLWJpbmQnKTtcbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgcG9seWZpbGwgPSBjYWxsQmluZChnZXRQb2x5ZmlsbCgpLCBOdW1iZXIpO1xuXG4vKiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLmlzbmFuICovXG5cbmRlZmluZShwb2x5ZmlsbCwge1xuXHRnZXRQb2x5ZmlsbDogZ2V0UG9seWZpbGwsXG5cdGltcGxlbWVudGF0aW9uOiBpbXBsZW1lbnRhdGlvbixcblx0c2hpbTogc2hpbVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcG9seWZpbGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQb2x5ZmlsbCgpIHtcblx0aWYgKE51bWJlci5pc05hTiAmJiBOdW1iZXIuaXNOYU4oTmFOKSAmJiAhTnVtYmVyLmlzTmFOKCdhJykpIHtcblx0XHRyZXR1cm4gTnVtYmVyLmlzTmFOO1xuXHR9XG5cdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuXG4vKiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLmlzbmFuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbU51bWJlcklzTmFOKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoTnVtYmVyLCB7IGlzTmFOOiBwb2x5ZmlsbCB9LCB7XG5cdFx0aXNOYU46IGZ1bmN0aW9uIHRlc3RJc05hTigpIHtcblx0XHRcdHJldHVybiBOdW1iZXIuaXNOYU4gIT09IHBvbHlmaWxsO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbnZhciBhdmFpbGFibGVUeXBlZEFycmF5cyA9IHJlcXVpcmUoJ2F2YWlsYWJsZS10eXBlZC1hcnJheXMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJ2hhcy10b3N0cmluZ3RhZy9zaGFtcycpKCk7XG52YXIgZ09QRCA9IHJlcXVpcmUoJ2dvcGQnKTtcblxudmFyIGcgPSB0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiBnbG9iYWxUaGlzO1xudmFyIHR5cGVkQXJyYXlzID0gYXZhaWxhYmxlVHlwZWRBcnJheXMoKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJvdW5kKCdBcnJheS5wcm90b3R5cGUuaW5kZXhPZicsIHRydWUpIHx8IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIHZhbHVlKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gaTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIC0xO1xufTtcbnZhciAkc2xpY2UgPSBjYWxsQm91bmQoJ1N0cmluZy5wcm90b3R5cGUuc2xpY2UnKTtcbnZhciB0b1N0clRhZ3MgPSB7fTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjsgLy8gcmVxdWlyZSgnZ2V0cHJvdG90eXBlb2YnKTtcbmlmIChoYXNUb1N0cmluZ1RhZyAmJiBnT1BEICYmIGdldFByb3RvdHlwZU9mKSB7XG5cdGZvckVhY2godHlwZWRBcnJheXMsIGZ1bmN0aW9uICh0eXBlZEFycmF5KSB7XG5cdFx0dmFyIGFyciA9IG5ldyBnW3R5cGVkQXJyYXldKCk7XG5cdFx0aWYgKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBhcnIpIHtcblx0XHRcdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGFycik7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IGdPUEQocHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHRpZiAoIWRlc2NyaXB0b3IpIHtcblx0XHRcdFx0dmFyIHN1cGVyUHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90byk7XG5cdFx0XHRcdGRlc2NyaXB0b3IgPSBnT1BEKHN1cGVyUHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHR9XG5cdFx0XHR0b1N0clRhZ3NbdHlwZWRBcnJheV0gPSBkZXNjcmlwdG9yLmdldDtcblx0XHR9XG5cdH0pO1xufVxuXG52YXIgdHJ5VHlwZWRBcnJheXMgPSBmdW5jdGlvbiB0cnlBbGxUeXBlZEFycmF5cyh2YWx1ZSkge1xuXHR2YXIgYW55VHJ1ZSA9IGZhbHNlO1xuXHRmb3JFYWNoKHRvU3RyVGFncywgZnVuY3Rpb24gKGdldHRlciwgdHlwZWRBcnJheSkge1xuXHRcdGlmICghYW55VHJ1ZSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YW55VHJ1ZSA9IGdldHRlci5jYWxsKHZhbHVlKSA9PT0gdHlwZWRBcnJheTtcblx0XHRcdH0gY2F0Y2ggKGUpIHsgLyoqLyB9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGFueVRydWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuXHRpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcgfHwgIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsdWUpKSB7XG5cdFx0dmFyIHRhZyA9ICRzbGljZSgkdG9TdHJpbmcodmFsdWUpLCA4LCAtMSk7XG5cdFx0cmV0dXJuICRpbmRleE9mKHR5cGVkQXJyYXlzLCB0YWcpID4gLTE7XG5cdH1cblx0aWYgKCFnT1BEKSB7IHJldHVybiBmYWxzZTsgfVxuXHRyZXR1cm4gdHJ5VHlwZWRBcnJheXModmFsdWUpO1xufTtcbiIsInZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19kZWZOb3JtYWxQcm9wID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ga2V5IGluIG9iaiA/IF9fZGVmUHJvcChvYmosIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZSB9KSA6IG9ialtrZXldID0gdmFsdWU7XG52YXIgX19wdWJsaWNGaWVsZCA9IChvYmosIGtleSwgdmFsdWUpID0+IHtcbiAgX19kZWZOb3JtYWxQcm9wKG9iaiwgdHlwZW9mIGtleSAhPT0gXCJzeW1ib2xcIiA/IGtleSArIFwiXCIgOiBrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcbmNvbnN0IEVNQUlMX1JFR0VYUCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG5jb25zdCBJTlRFR0VSX1JFR0VYUCA9IC9eLT9bMC05XVxcZCokLztcbmNvbnN0IFBBU1NXT1JEX1JFR0VYUCA9IC9eKD89LipbQS1aYS16XSkoPz0uKlxcZCkuezgsfSQvO1xuY29uc3QgU1RST05HX1BBU1NXT1JEX1JFR0VYUCA9IC9eKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qXFxkKSg/PS4qW0AkISUqPyZdKVtBLVphLXpcXGRAJCElKj8mXXs4LH0kLztcbmNvbnN0IGlzRW1wdHkgPSAodmFsdWUpID0+IHtcbiAgbGV0IG5ld1ZhbCA9IHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgbmV3VmFsID0gdmFsdWUudHJpbSgpO1xuICB9XG4gIHJldHVybiAhbmV3VmFsO1xufTtcbmNvbnN0IGlzRW1haWwgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIEVNQUlMX1JFR0VYUC50ZXN0KHZhbHVlKTtcbn07XG5jb25zdCBpc0xlbmd0aE1vcmVUaGFuTWF4ID0gKHZhbHVlLCBsZW4pID0+IHtcbiAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IGxlbjtcbn07XG5jb25zdCBpc0xlbmd0aExlc3NUaGFuTWluID0gKHZhbHVlLCBsZW4pID0+IHtcbiAgcmV0dXJuIHZhbHVlLmxlbmd0aCA8IGxlbjtcbn07XG5jb25zdCBpc051bWJlciA9ICh2YWx1ZSkgPT4ge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAhaXNOYU4oK3ZhbHVlKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpO1xufTtcbmNvbnN0IGlzSW50ZWdlciA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gSU5URUdFUl9SRUdFWFAudGVzdCh2YWx1ZSk7XG59O1xuY29uc3QgaXNQYXNzd29yZCA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gUEFTU1dPUkRfUkVHRVhQLnRlc3QodmFsdWUpO1xufTtcbmNvbnN0IGlzU3Ryb25nUGFzc3dvcmQgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIFNUUk9OR19QQVNTV09SRF9SRUdFWFAudGVzdCh2YWx1ZSk7XG59O1xuY29uc3QgaXNOdW1iZXJNb3JlVGhhbk1heCA9ICh2YWx1ZSwgbGVuKSA9PiB7XG4gIHJldHVybiB2YWx1ZSA+IGxlbjtcbn07XG5jb25zdCBpc051bWJlckxlc3NUaGFuTWluID0gKHZhbHVlLCBsZW4pID0+IHtcbiAgcmV0dXJuIHZhbHVlIDwgbGVuO1xufTtcbmNvbnN0IGlzSW52YWxpZE9yRW1wdHlTdHJpbmcgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSA9PT0gXCJcIjtcbn07XG52YXIgUnVsZXMgPSAvKiBAX19QVVJFX18gKi8gKChSdWxlczIpID0+IHtcbiAgUnVsZXMyW1wiUmVxdWlyZWRcIl0gPSBcInJlcXVpcmVkXCI7XG4gIFJ1bGVzMltcIkVtYWlsXCJdID0gXCJlbWFpbFwiO1xuICBSdWxlczJbXCJNaW5MZW5ndGhcIl0gPSBcIm1pbkxlbmd0aFwiO1xuICBSdWxlczJbXCJNYXhMZW5ndGhcIl0gPSBcIm1heExlbmd0aFwiO1xuICBSdWxlczJbXCJQYXNzd29yZFwiXSA9IFwicGFzc3dvcmRcIjtcbiAgUnVsZXMyW1wiTnVtYmVyXCJdID0gXCJudW1iZXJcIjtcbiAgUnVsZXMyW1wiSW50ZWdlclwiXSA9IFwiaW50ZWdlclwiO1xuICBSdWxlczJbXCJNYXhOdW1iZXJcIl0gPSBcIm1heE51bWJlclwiO1xuICBSdWxlczJbXCJNaW5OdW1iZXJcIl0gPSBcIm1pbk51bWJlclwiO1xuICBSdWxlczJbXCJTdHJvbmdQYXNzd29yZFwiXSA9IFwic3Ryb25nUGFzc3dvcmRcIjtcbiAgUnVsZXMyW1wiQ3VzdG9tUmVnZXhwXCJdID0gXCJjdXN0b21SZWdleHBcIjtcbiAgUnVsZXMyW1wiTWluRmlsZXNDb3VudFwiXSA9IFwibWluRmlsZXNDb3VudFwiO1xuICBSdWxlczJbXCJNYXhGaWxlc0NvdW50XCJdID0gXCJtYXhGaWxlc0NvdW50XCI7XG4gIFJ1bGVzMltcIkZpbGVzXCJdID0gXCJmaWxlc1wiO1xuICByZXR1cm4gUnVsZXMyO1xufSkoUnVsZXMgfHwge30pO1xudmFyIEdyb3VwUnVsZXMgPSAvKiBAX19QVVJFX18gKi8gKChHcm91cFJ1bGVzMikgPT4ge1xuICBHcm91cFJ1bGVzMltcIlJlcXVpcmVkXCJdID0gXCJyZXF1aXJlZFwiO1xuICByZXR1cm4gR3JvdXBSdWxlczI7XG59KShHcm91cFJ1bGVzIHx8IHt9KTtcbnZhciBDdXN0b21TdHlsZVRhZ0lkcyA9IC8qIEBfX1BVUkVfXyAqLyAoKEN1c3RvbVN0eWxlVGFnSWRzMikgPT4ge1xuICBDdXN0b21TdHlsZVRhZ0lkczJbXCJMYWJlbFwiXSA9IFwibGFiZWxcIjtcbiAgQ3VzdG9tU3R5bGVUYWdJZHMyW1wiTGFiZWxBcnJvd1wiXSA9IFwibGFiZWxBcnJvd1wiO1xuICByZXR1cm4gQ3VzdG9tU3R5bGVUYWdJZHMyO1xufSkoQ3VzdG9tU3R5bGVUYWdJZHMgfHwge30pO1xuY29uc3QgZGVmYXVsdERpY3Rpb25hcnkgPSBbXG4gIHtcbiAgICBrZXk6IFJ1bGVzLlJlcXVpcmVkLFxuICAgIGRpY3Q6IHtcbiAgICAgIGVuOiBcIlRoZSBmaWVsZCBpcyByZXF1aXJlZFwiXG4gICAgfVxuICB9LFxuICB7XG4gICAga2V5OiBSdWxlcy5FbWFpbCxcbiAgICBkaWN0OiB7XG4gICAgICBlbjogXCJFbWFpbCBoYXMgaW52YWxpZCBmb3JtYXRcIlxuICAgIH1cbiAgfSxcbiAge1xuICAgIGtleTogUnVsZXMuTWF4TGVuZ3RoLFxuICAgIGRpY3Q6IHtcbiAgICAgIGVuOiBcIlRoZSBmaWVsZCBtdXN0IGNvbnRhaW4gYSBtYXhpbXVtIG9mIDp2YWx1ZSBjaGFyYWN0ZXJzXCJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBrZXk6IFJ1bGVzLk1pbkxlbmd0aCxcbiAgICBkaWN0OiB7XG4gICAgICBlbjogXCJUaGUgZmllbGQgbXVzdCBjb250YWluIGEgbWluaW11bSBvZiA6dmFsdWUgY2hhcmFjdGVyc1wiXG4gICAgfVxuICB9LFxuICB7XG4gICAga2V5OiBSdWxlcy5QYXNzd29yZCxcbiAgICBkaWN0OiB7XG4gICAgICBlbjogXCJQYXNzd29yZCBtdXN0IGNvbnRhaW4gbWluaW11bSBlaWdodCBjaGFyYWN0ZXJzLCBhdCBsZWFzdCBvbmUgbGV0dGVyIGFuZCBvbmUgbnVtYmVyXCJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBrZXk6IFJ1bGVzLlN0cm9uZ1Bhc3N3b3JkLFxuICAgIGRpY3Q6IHtcbiAgICAgIGVuOiBcIlBhc3N3b3JkIHNob3VsZCBjb250YWluIG1pbmltdW0gZWlnaHQgY2hhcmFjdGVycywgYXQgbGVhc3Qgb25lIHVwcGVyY2FzZSBsZXR0ZXIsIG9uZSBsb3dlcmNhc2UgbGV0dGVyLCBvbmUgbnVtYmVyIGFuZCBvbmUgc3BlY2lhbCBjaGFyYWN0ZXJcIlxuICAgIH1cbiAgfSxcbiAge1xuICAgIGtleTogUnVsZXMuTnVtYmVyLFxuICAgIGRpY3Q6IHtcbiAgICAgIGVuOiBcIlZhbHVlIHNob3VsZCBiZSBhIG51bWJlclwiXG4gICAgfVxuICB9LFxuICB7XG4gICAga2V5OiBSdWxlcy5NYXhOdW1iZXIsXG4gICAgZGljdDoge1xuICAgICAgZW46IFwiTnVtYmVyIHNob3VsZCBiZSBsZXNzIG9yIGVxdWFsIHRoYW4gOnZhbHVlXCJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBrZXk6IFJ1bGVzLk1pbk51bWJlcixcbiAgICBkaWN0OiB7XG4gICAgICBlbjogXCJOdW1iZXIgc2hvdWxkIGJlIG1vcmUgb3IgZXF1YWwgdGhhbiA6dmFsdWVcIlxuICAgIH1cbiAgfSxcbiAge1xuICAgIGtleTogUnVsZXMuTWluRmlsZXNDb3VudCxcbiAgICBkaWN0OiB7XG4gICAgICBlbjogXCJGaWxlcyBjb3VudCBzaG91bGQgYmUgbW9yZSBvciBlcXVhbCB0aGFuIDp2YWx1ZVwiXG4gICAgfVxuICB9LFxuICB7XG4gICAga2V5OiBSdWxlcy5NYXhGaWxlc0NvdW50LFxuICAgIGRpY3Q6IHtcbiAgICAgIGVuOiBcIkZpbGVzIGNvdW50IHNob3VsZCBiZSBsZXNzIG9yIGVxdWFsIHRoYW4gOnZhbHVlXCJcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBrZXk6IFJ1bGVzLkZpbGVzLFxuICAgIGRpY3Q6IHtcbiAgICAgIGVuOiBcIlVwbG9hZGVkIGZpbGVzIGhhdmUgb25lIG9yIHNldmVyYWwgaW52YWxpZCBwcm9wZXJ0aWVzIChleHRlbnNpb24vc2l6ZS90eXBlIGV0YykuXCJcbiAgICB9XG4gIH1cbl07XG5jb25zdCBERUZBVUxUX0VSUk9SX0ZJRUxEX01FU1NBR0UgPSBcIlZhbHVlIGlzIGluY29ycmVjdFwiO1xuY29uc3QgaXNQcm9taXNlID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiB2YWwgIT09IG51bGwgJiYgXCJ0aGVuXCIgaW4gdmFsICYmIHR5cGVvZiB2YWwudGhlbiA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgZ2V0Tm9kZVBhcmVudHMgPSAoZWwpID0+IHtcbiAgbGV0IGVsZW0gPSBlbDtcbiAgY29uc3QgZWxzID0gW107XG4gIHdoaWxlIChlbGVtKSB7XG4gICAgZWxzLnVuc2hpZnQoZWxlbSk7XG4gICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZWxzO1xufTtcbmNvbnN0IGdldENsb3Nlc3RQYXJlbnQgPSAoZ3JvdXBzLCBwYXJlbnRzKSA9PiB7XG4gIGNvbnN0IHJldmVyc2VkUGFyZW50cyA9IFsuLi5wYXJlbnRzXS5yZXZlcnNlKCk7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSByZXZlcnNlZFBhcmVudHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBjb25zdCBwYXJlbnQgPSByZXZlcnNlZFBhcmVudHNbaV07XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZ3JvdXBzKSB7XG4gICAgICBjb25zdCBncm91cCA9IGdyb3Vwc1trZXldO1xuICAgICAgaWYgKGdyb3VwLmdyb3VwRWxlbSA9PT0gcGFyZW50KSB7XG4gICAgICAgIHJldHVybiBba2V5LCBncm91cF07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcbmNvbnN0IGdldENsYXNzTGlzdCA9IChjbGFzc0xpc3QpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KSkge1xuICAgIHJldHVybiBjbGFzc0xpc3QuZmlsdGVyKChjbHMpID0+IGNscy5sZW5ndGggPiAwKTtcbiAgfVxuICBpZiAodHlwZW9mIGNsYXNzTGlzdCA9PT0gXCJzdHJpbmdcIiAmJiBjbGFzc0xpc3QudHJpbSgpKSB7XG4gICAgcmV0dXJuIFsuLi5jbGFzc0xpc3Quc3BsaXQoXCIgXCIpLmZpbHRlcigoY2xzKSA9PiBjbHMubGVuZ3RoID4gMCldO1xuICB9XG4gIHJldHVybiBbXTtcbn07XG5jb25zdCBpc0VsZW1lbnQgPSAoZWxlbWVudCkgPT4ge1xuICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQgfHwgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEb2N1bWVudDtcbn07XG5jb25zdCBlcnJvckxhYmVsQ3NzID0gYC5qdXN0LXZhbGlkYXRlLWVycm9yLWxhYmVsW2RhdGEtdG9vbHRpcD10cnVlXXtwb3NpdGlvbjpmaXhlZDtwYWRkaW5nOjRweCA4cHg7YmFja2dyb3VuZDojNDIzZjNmO2NvbG9yOiNmZmY7d2hpdGUtc3BhY2U6bm93cmFwO3otaW5kZXg6MTA7Ym9yZGVyLXJhZGl1czo0cHg7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTVweCl9Lmp1c3QtdmFsaWRhdGUtZXJyb3ItbGFiZWxbZGF0YS10b29sdGlwPXRydWVdOmJlZm9yZXtjb250ZW50OicnO3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLWxlZnQ6c29saWQgNXB4IHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDpzb2xpZCA1cHggdHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbTpzb2xpZCA1cHggIzQyM2YzZjtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjM7ZGlzcGxheTpibG9jaztib3R0b206LTVweDt0cmFuc2Zvcm06cm90YXRlKDE4MGRlZyk7bGVmdDpjYWxjKDUwJSAtIDVweCl9Lmp1c3QtdmFsaWRhdGUtZXJyb3ItbGFiZWxbZGF0YS10b29sdGlwPXRydWVdW2RhdGEtZGlyZWN0aW9uPWxlZnRde3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01cHgpfS5qdXN0LXZhbGlkYXRlLWVycm9yLWxhYmVsW2RhdGEtdG9vbHRpcD10cnVlXVtkYXRhLWRpcmVjdGlvbj1sZWZ0XTpiZWZvcmV7cmlnaHQ6LTdweDtib3R0b206YXV0bztsZWZ0OmF1dG87dG9wOmNhbGMoNTAlIC0gMnB4KTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKX0uanVzdC12YWxpZGF0ZS1lcnJvci1sYWJlbFtkYXRhLXRvb2x0aXA9dHJ1ZV1bZGF0YS1kaXJlY3Rpb249cmlnaHRde3RyYW5zZm9ybTp0cmFuc2xhdGVYKDVweCl9Lmp1c3QtdmFsaWRhdGUtZXJyb3ItbGFiZWxbZGF0YS10b29sdGlwPXRydWVdW2RhdGEtZGlyZWN0aW9uPXJpZ2h0XTpiZWZvcmV7cmlnaHQ6YXV0bztib3R0b206YXV0bztsZWZ0Oi03cHg7dG9wOmNhbGMoNTAlIC0gMnB4KTt0cmFuc2Zvcm06cm90YXRlKC05MGRlZyl9Lmp1c3QtdmFsaWRhdGUtZXJyb3ItbGFiZWxbZGF0YS10b29sdGlwPXRydWVdW2RhdGEtZGlyZWN0aW9uPWJvdHRvbV17dHJhbnNmb3JtOnRyYW5zbGF0ZVkoNXB4KX0uanVzdC12YWxpZGF0ZS1lcnJvci1sYWJlbFtkYXRhLXRvb2x0aXA9dHJ1ZV1bZGF0YS1kaXJlY3Rpb249Ym90dG9tXTpiZWZvcmV7cmlnaHQ6YXV0bztib3R0b206YXV0bztsZWZ0OmNhbGMoNTAlIC0gNXB4KTt0b3A6LTVweDt0cmFuc2Zvcm06cm90YXRlKDApfWA7XG5jb25zdCBUT09MVElQX0FSUk9XX0hFSUdIVCA9IDU7XG5jb25zdCBkZWZhdWx0R2xvYmFsQ29uZmlnID0ge1xuICBlcnJvckZpZWxkU3R5bGU6IHtcbiAgICBjb2xvcjogXCIjYjgxMTExXCIsXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjQjgxMTExXCJcbiAgfSxcbiAgZXJyb3JGaWVsZENzc0NsYXNzOiBcImp1c3QtdmFsaWRhdGUtZXJyb3ItZmllbGRcIixcbiAgc3VjY2Vzc0ZpZWxkQ3NzQ2xhc3M6IFwianVzdC12YWxpZGF0ZS1zdWNjZXNzLWZpZWxkXCIsXG4gIGVycm9yTGFiZWxTdHlsZToge1xuICAgIGNvbG9yOiBcIiNiODExMTFcIlxuICB9LFxuICBlcnJvckxhYmVsQ3NzQ2xhc3M6IFwianVzdC12YWxpZGF0ZS1lcnJvci1sYWJlbFwiLFxuICBzdWNjZXNzTGFiZWxDc3NDbGFzczogXCJqdXN0LXZhbGlkYXRlLXN1Y2Nlc3MtbGFiZWxcIixcbiAgZm9jdXNJbnZhbGlkRmllbGQ6IHRydWUsXG4gIGxvY2tGb3JtOiB0cnVlLFxuICB0ZXN0aW5nTW9kZTogZmFsc2UsXG4gIHZhbGlkYXRlQmVmb3JlU3VibWl0dGluZzogZmFsc2Vcbn07XG5jbGFzcyBKdXN0VmFsaWRhdGUge1xuICBjb25zdHJ1Y3Rvcihmb3JtLCBnbG9iYWxDb25maWcsIGRpY3RMb2NhbGUpIHtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwiZm9ybVwiLCBudWxsKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwiZmllbGRzXCIsIHt9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwiZ3JvdXBGaWVsZHNcIiwge30pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJlcnJvcnNcIiwge30pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJpc1ZhbGlkXCIsIGZhbHNlKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwiaXNTdWJtaXR0ZWRcIiwgZmFsc2UpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJnbG9iYWxDb25maWdcIiwgZGVmYXVsdEdsb2JhbENvbmZpZyk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcImVycm9yTGFiZWxzXCIsIHt9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwic3VjY2Vzc0xhYmVsc1wiLCB7fSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcImV2ZW50TGlzdGVuZXJzXCIsIFtdKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwiZGljdExvY2FsZVwiLCBkZWZhdWx0RGljdGlvbmFyeSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcImN1cnJlbnRMb2NhbGVcIiwgXCJlblwiKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwiY3VzdG9tU3R5bGVUYWdzXCIsIHt9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25TdWNjZXNzQ2FsbGJhY2tcIik7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uRmFpbENhbGxiYWNrXCIpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvblZhbGlkYXRlQ2FsbGJhY2tcIik7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcInRvb2x0aXBzXCIsIFtdKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwibGFzdFNjcm9sbFBvc2l0aW9uXCIpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJpc1Njcm9sbFRpY2tcIik7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcImZpZWxkSWRzXCIsIC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCkpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJnZXRLZXlCeUZpZWxkU2VsZWN0b3JcIiwgKGZpZWxkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5maWVsZElkcy5nZXQoZmllbGQpO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJnZXRGaWVsZFNlbGVjdG9yQnlLZXlcIiwgKGtleSkgPT4ge1xuICAgICAgZm9yIChjb25zdCBbZmllbGRTZWxlY3Rvciwga10gb2YgdGhpcy5maWVsZElkcykge1xuICAgICAgICBpZiAoa2V5ID09PSBrKSB7XG4gICAgICAgICAgcmV0dXJuIGZpZWxkU2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcImdldENvbXBhdGlibGVGaWVsZHNcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgZmllbGRzID0ge307XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpZWxkcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCBuZXdLZXkgPSBrZXk7XG4gICAgICAgIGNvbnN0IGZpZWxkU2VsZWN0b3IgPSB0aGlzLmdldEZpZWxkU2VsZWN0b3JCeUtleShrZXkpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkU2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBuZXdLZXkgPSBmaWVsZFNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkc1tuZXdLZXldID0geyAuLi50aGlzLmZpZWxkc1trZXldIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgfSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcInNldEtleUJ5RmllbGRTZWxlY3RvclwiLCAoZmllbGQpID0+IHtcbiAgICAgIGlmICh0aGlzLmZpZWxkSWRzLmhhcyhmaWVsZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRJZHMuZ2V0KGZpZWxkKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGtleSA9IFN0cmluZyh0aGlzLmZpZWxkSWRzLnNpemUgKyAxKTtcbiAgICAgIHRoaXMuZmllbGRJZHMuc2V0KGZpZWxkLCBrZXkpO1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwicmVmcmVzaEFsbFRvb2x0aXBzXCIsICgpID0+IHtcbiAgICAgIHRoaXMudG9vbHRpcHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJoYW5kbGVEb2N1bWVudFNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmxhc3RTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgaWYgKCF0aGlzLmlzU2Nyb2xsVGljaykge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlZnJlc2hBbGxUb29sdGlwcygpO1xuICAgICAgICAgIHRoaXMuaXNTY3JvbGxUaWNrID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmlzU2Nyb2xsVGljayA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcImZvcm1TdWJtaXRIYW5kbGVyXCIsIChldikgPT4ge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaXNTdWJtaXR0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy52YWxpZGF0ZUhhbmRsZXIoZXYpO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJoYW5kbGVGaWVsZENoYW5nZVwiLCAodGFyZ2V0KSA9PiB7XG4gICAgICBsZXQgZm91bmRLZXk7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW2tleV07XG4gICAgICAgIGlmIChmaWVsZC5lbGVtID09PSB0YXJnZXQpIHtcbiAgICAgICAgICBmb3VuZEtleSA9IGtleTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFmb3VuZEtleSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmZpZWxkc1tmb3VuZEtleV0udG91Y2hlZCA9IHRydWU7XG4gICAgICB0aGlzLnZhbGlkYXRlRmllbGQoZm91bmRLZXksIHRydWUpO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJoYW5kbGVHcm91cENoYW5nZVwiLCAodGFyZ2V0KSA9PiB7XG4gICAgICBsZXQgZm91bmRLZXk7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmdyb3VwRmllbGRzKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5ncm91cEZpZWxkc1trZXldO1xuICAgICAgICBpZiAoZ3JvdXAuZWxlbXMuZmluZCgoZWxlbSkgPT4gZWxlbSA9PT0gdGFyZ2V0KSkge1xuICAgICAgICAgIGZvdW5kS2V5ID0ga2V5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZvdW5kS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ3JvdXBGaWVsZHNbZm91bmRLZXldLnRvdWNoZWQgPSB0cnVlO1xuICAgICAgdGhpcy52YWxpZGF0ZUdyb3VwKGZvdW5kS2V5LCB0cnVlKTtcbiAgICB9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwiaGFuZGxlckNoYW5nZVwiLCAoZXYpID0+IHtcbiAgICAgIGlmICghZXYudGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuaGFuZGxlRmllbGRDaGFuZ2UoZXYudGFyZ2V0KTtcbiAgICAgIHRoaXMuaGFuZGxlR3JvdXBDaGFuZ2UoZXYudGFyZ2V0KTtcbiAgICAgIHRoaXMucmVuZGVyRXJyb3JzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5pbml0aWFsaXplKGZvcm0sIGdsb2JhbENvbmZpZywgZGljdExvY2FsZSk7XG4gIH1cbiAgaW5pdGlhbGl6ZShmb3JtLCBnbG9iYWxDb25maWcsIGRpY3RMb2NhbGUpIHtcbiAgICB0aGlzLmZvcm0gPSBudWxsO1xuICAgIHRoaXMuZXJyb3JzID0ge307XG4gICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgdGhpcy5pc1N1Ym1pdHRlZCA9IGZhbHNlO1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gZGVmYXVsdEdsb2JhbENvbmZpZztcbiAgICB0aGlzLmVycm9yTGFiZWxzID0ge307XG4gICAgdGhpcy5zdWNjZXNzTGFiZWxzID0ge307XG4gICAgdGhpcy5ldmVudExpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMuY3VzdG9tU3R5bGVUYWdzID0ge307XG4gICAgdGhpcy50b29sdGlwcyA9IFtdO1xuICAgIHRoaXMuY3VycmVudExvY2FsZSA9IFwiZW5cIjtcbiAgICBpZiAodHlwZW9mIGZvcm0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm0pO1xuICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIGBGb3JtIHdpdGggJHtmb3JtfSBzZWxlY3RvciBub3QgZm91bmQhIFBsZWFzZSBjaGVjayB0aGUgZm9ybSBzZWxlY3RvcmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0Rm9ybShlbGVtKTtcbiAgICB9IGVsc2UgaWYgKGZvcm0gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuc2V0Rm9ybShmb3JtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIGBGb3JtIHNlbGVjdG9yIGlzIG5vdCB2YWxpZC4gUGxlYXNlIHNwZWNpZnkgYSBzdHJpbmcgc2VsZWN0b3Igb3IgYSBET00gZWxlbWVudC5gXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmdsb2JhbENvbmZpZyA9IHsgLi4uZGVmYXVsdEdsb2JhbENvbmZpZywgLi4uZ2xvYmFsQ29uZmlnIH07XG4gICAgaWYgKGRpY3RMb2NhbGUpIHtcbiAgICAgIHRoaXMuZGljdExvY2FsZSA9IFsuLi5kaWN0TG9jYWxlLCAuLi5kZWZhdWx0RGljdGlvbmFyeV07XG4gICAgfVxuICAgIGlmICh0aGlzLmlzVG9vbHRpcCgpKSB7XG4gICAgICBjb25zdCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgIHN0eWxlVGFnLnRleHRDb250ZW50ID0gZXJyb3JMYWJlbENzcztcbiAgICAgIHRoaXMuY3VzdG9tU3R5bGVUYWdzW0N1c3RvbVN0eWxlVGFnSWRzLkxhYmVsXSA9IGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcihcInNjcm9sbFwiLCBkb2N1bWVudCwgdGhpcy5oYW5kbGVEb2N1bWVudFNjcm9sbCk7XG4gICAgfVxuICB9XG4gIGdldExvY2FsaXNlZFN0cmluZyhydWxlLCBydWxlVmFsdWUsIGN1c3RvbU1zZykge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBzZWFyY2ggPSBjdXN0b21Nc2cgIT0gbnVsbCA/IGN1c3RvbU1zZyA6IHJ1bGU7XG4gICAgbGV0IGxvY2FsaXNlZFN0ciA9IChfYSA9IHRoaXMuZGljdExvY2FsZS5maW5kKChpdGVtKSA9PiBpdGVtLmtleSA9PT0gc2VhcmNoKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLmRpY3RbdGhpcy5jdXJyZW50TG9jYWxlXTtcbiAgICBpZiAoIWxvY2FsaXNlZFN0cikge1xuICAgICAgaWYgKGN1c3RvbU1zZykge1xuICAgICAgICBsb2NhbGlzZWRTdHIgPSBjdXN0b21Nc2c7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb2NhbGlzZWRTdHIgJiYgcnVsZVZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgIHN3aXRjaCAocnVsZSkge1xuICAgICAgICBjYXNlIFJ1bGVzLk1heExlbmd0aDpcbiAgICAgICAgY2FzZSBSdWxlcy5NaW5MZW5ndGg6XG4gICAgICAgIGNhc2UgUnVsZXMuTWF4TnVtYmVyOlxuICAgICAgICBjYXNlIFJ1bGVzLk1pbk51bWJlcjpcbiAgICAgICAgY2FzZSBSdWxlcy5NaW5GaWxlc0NvdW50OlxuICAgICAgICBjYXNlIFJ1bGVzLk1heEZpbGVzQ291bnQ6XG4gICAgICAgICAgbG9jYWxpc2VkU3RyID0gbG9jYWxpc2VkU3RyLnJlcGxhY2UoXCI6dmFsdWVcIiwgU3RyaW5nKHJ1bGVWYWx1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG9jYWxpc2VkU3RyIHx8IGN1c3RvbU1zZyB8fCBERUZBVUxUX0VSUk9SX0ZJRUxEX01FU1NBR0U7XG4gIH1cbiAgZ2V0RmllbGRFcnJvck1lc3NhZ2UoZmllbGRSdWxlLCBlbGVtKSB7XG4gICAgY29uc3QgbXNnID0gdHlwZW9mIGZpZWxkUnVsZS5lcnJvck1lc3NhZ2UgPT09IFwiZnVuY3Rpb25cIiA/IGZpZWxkUnVsZS5lcnJvck1lc3NhZ2UodGhpcy5nZXRFbGVtVmFsdWUoZWxlbSksIHRoaXMuZmllbGRzKSA6IGZpZWxkUnVsZS5lcnJvck1lc3NhZ2U7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TG9jYWxpc2VkU3RyaW5nKGZpZWxkUnVsZS5ydWxlLCBmaWVsZFJ1bGUudmFsdWUsIG1zZyk7XG4gIH1cbiAgZ2V0RmllbGRTdWNjZXNzTWVzc2FnZShzdWNjZXNzTWVzc2FnZSwgZWxlbSkge1xuICAgIGNvbnN0IG1zZyA9IHR5cGVvZiBzdWNjZXNzTWVzc2FnZSA9PT0gXCJmdW5jdGlvblwiID8gc3VjY2Vzc01lc3NhZ2UodGhpcy5nZXRFbGVtVmFsdWUoZWxlbSksIHRoaXMuZmllbGRzKSA6IHN1Y2Nlc3NNZXNzYWdlO1xuICAgIHJldHVybiB0aGlzLmdldExvY2FsaXNlZFN0cmluZyh2b2lkIDAsIHZvaWQgMCwgbXNnKTtcbiAgfVxuICBnZXRHcm91cEVycm9yTWVzc2FnZShncm91cFJ1bGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRMb2NhbGlzZWRTdHJpbmcoXG4gICAgICBncm91cFJ1bGUucnVsZSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIGdyb3VwUnVsZS5lcnJvck1lc3NhZ2VcbiAgICApO1xuICB9XG4gIGdldEdyb3VwU3VjY2Vzc01lc3NhZ2UoZ3JvdXBSdWxlKSB7XG4gICAgaWYgKCFncm91cFJ1bGUuc3VjY2Vzc01lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldExvY2FsaXNlZFN0cmluZyhcbiAgICAgIHZvaWQgMCxcbiAgICAgIHZvaWQgMCxcbiAgICAgIGdyb3VwUnVsZS5zdWNjZXNzTWVzc2FnZVxuICAgICk7XG4gIH1cbiAgc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKSB7XG4gICAgdGhpcy5maWVsZHNba2V5XS5pc1ZhbGlkID0gZmFsc2U7XG4gICAgdGhpcy5maWVsZHNba2V5XS5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEZpZWxkRXJyb3JNZXNzYWdlKFxuICAgICAgZmllbGRSdWxlLFxuICAgICAgdGhpcy5maWVsZHNba2V5XS5lbGVtXG4gICAgKTtcbiAgfVxuICBzZXRGaWVsZFZhbGlkKGtleSwgc3VjY2Vzc01lc3NhZ2UpIHtcbiAgICB0aGlzLmZpZWxkc1trZXldLmlzVmFsaWQgPSB0cnVlO1xuICAgIGlmIChzdWNjZXNzTWVzc2FnZSAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLmZpZWxkc1trZXldLnN1Y2Nlc3NNZXNzYWdlID0gdGhpcy5nZXRGaWVsZFN1Y2Nlc3NNZXNzYWdlKFxuICAgICAgICBzdWNjZXNzTWVzc2FnZSxcbiAgICAgICAgdGhpcy5maWVsZHNba2V5XS5lbGVtXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBzZXRHcm91cEludmFsaWQoa2V5LCBncm91cFJ1bGUpIHtcbiAgICB0aGlzLmdyb3VwRmllbGRzW2tleV0uaXNWYWxpZCA9IGZhbHNlO1xuICAgIHRoaXMuZ3JvdXBGaWVsZHNba2V5XS5lcnJvck1lc3NhZ2UgPSB0aGlzLmdldEdyb3VwRXJyb3JNZXNzYWdlKGdyb3VwUnVsZSk7XG4gIH1cbiAgc2V0R3JvdXBWYWxpZChrZXksIGdyb3VwUnVsZSkge1xuICAgIHRoaXMuZ3JvdXBGaWVsZHNba2V5XS5pc1ZhbGlkID0gdHJ1ZTtcbiAgICB0aGlzLmdyb3VwRmllbGRzW2tleV0uc3VjY2Vzc01lc3NhZ2UgPSB0aGlzLmdldEdyb3VwU3VjY2Vzc01lc3NhZ2UoZ3JvdXBSdWxlKTtcbiAgfVxuICBnZXRFbGVtVmFsdWUoZWxlbSkge1xuICAgIHN3aXRjaCAoZWxlbS50eXBlKSB7XG4gICAgICBjYXNlIFwiY2hlY2tib3hcIjpcbiAgICAgICAgcmV0dXJuIGVsZW0uY2hlY2tlZDtcbiAgICAgIGNhc2UgXCJmaWxlXCI6XG4gICAgICAgIHJldHVybiBlbGVtLmZpbGVzO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGVsZW0udmFsdWU7XG4gICAgfVxuICB9XG4gIHZhbGlkYXRlR3JvdXBSdWxlKGtleSwgZWxlbXMsIGdyb3VwUnVsZSkge1xuICAgIHN3aXRjaCAoZ3JvdXBSdWxlLnJ1bGUpIHtcbiAgICAgIGNhc2UgR3JvdXBSdWxlcy5SZXF1aXJlZDoge1xuICAgICAgICBpZiAoZWxlbXMuZXZlcnkoKGVsZW0pID0+ICFlbGVtLmNoZWNrZWQpKSB7XG4gICAgICAgICAgdGhpcy5zZXRHcm91cEludmFsaWQoa2V5LCBncm91cFJ1bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0R3JvdXBWYWxpZChrZXksIGdyb3VwUnVsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVGaWVsZFJ1bGUoa2V5LCBlbGVtLCBmaWVsZFJ1bGUsIGFmdGVySW5wdXRDaGFuZ2VkID0gZmFsc2UpIHtcbiAgICBjb25zdCBydWxlVmFsdWUgPSBmaWVsZFJ1bGUudmFsdWU7XG4gICAgY29uc3QgZWxlbVZhbHVlID0gdGhpcy5nZXRFbGVtVmFsdWUoZWxlbSk7XG4gICAgaWYgKGZpZWxkUnVsZS5wbHVnaW4pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZpZWxkUnVsZS5wbHVnaW4oXG4gICAgICAgIGVsZW1WYWx1ZSxcbiAgICAgICAgdGhpcy5nZXRDb21wYXRpYmxlRmllbGRzKClcbiAgICAgICk7XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAoZmllbGRSdWxlLnJ1bGUpIHtcbiAgICAgIGNhc2UgUnVsZXMuUmVxdWlyZWQ6IHtcbiAgICAgICAgaWYgKGlzRW1wdHkoZWxlbVZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgUnVsZXMuRW1haWw6IHtcbiAgICAgICAgaWYgKGlzSW52YWxpZE9yRW1wdHlTdHJpbmcoZWxlbVZhbHVlKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNFbWFpbChlbGVtVmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBSdWxlcy5NYXhMZW5ndGg6IHtcbiAgICAgICAgaWYgKHJ1bGVWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBWYWx1ZSBmb3IgJHtmaWVsZFJ1bGUucnVsZX0gcnVsZSBmb3IgWyR7a2V5fV0gZmllbGQgaXMgbm90IGRlZmluZWQuIFRoZSBmaWVsZCB3aWxsIGJlIGFsd2F5cyBpbnZhbGlkLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJ1bGVWYWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsdWUgZm9yICR7ZmllbGRSdWxlLnJ1bGV9IHJ1bGUgZm9yIFske2tleX1dIHNob3VsZCBiZSBhIG51bWJlci4gVGhlIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0ludmFsaWRPckVtcHR5U3RyaW5nKGVsZW1WYWx1ZSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNMZW5ndGhNb3JlVGhhbk1heChlbGVtVmFsdWUsIHJ1bGVWYWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFJ1bGVzLk1pbkxlbmd0aDoge1xuICAgICAgICBpZiAocnVsZVZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYFZhbHVlIGZvciAke2ZpZWxkUnVsZS5ydWxlfSBydWxlIGZvciBbJHtrZXl9XSBmaWVsZCBpcyBub3QgZGVmaW5lZC4gVGhlIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcnVsZVZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBWYWx1ZSBmb3IgJHtmaWVsZFJ1bGUucnVsZX0gcnVsZSBmb3IgWyR7a2V5fV0gc2hvdWxkIGJlIGEgbnVtYmVyLiBUaGUgZmllbGQgd2lsbCBiZSBhbHdheXMgaW52YWxpZC5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSW52YWxpZE9yRW1wdHlTdHJpbmcoZWxlbVZhbHVlKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0xlbmd0aExlc3NUaGFuTWluKGVsZW1WYWx1ZSwgcnVsZVZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgUnVsZXMuUGFzc3dvcmQ6IHtcbiAgICAgICAgaWYgKGlzSW52YWxpZE9yRW1wdHlTdHJpbmcoZWxlbVZhbHVlKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNQYXNzd29yZChlbGVtVmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBSdWxlcy5TdHJvbmdQYXNzd29yZDoge1xuICAgICAgICBpZiAoaXNJbnZhbGlkT3JFbXB0eVN0cmluZyhlbGVtVmFsdWUpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1N0cm9uZ1Bhc3N3b3JkKGVsZW1WYWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFJ1bGVzLk51bWJlcjoge1xuICAgICAgICBpZiAoaXNJbnZhbGlkT3JFbXB0eVN0cmluZyhlbGVtVmFsdWUpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc051bWJlcihlbGVtVmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBSdWxlcy5JbnRlZ2VyOiB7XG4gICAgICAgIGlmIChpc0ludmFsaWRPckVtcHR5U3RyaW5nKGVsZW1WYWx1ZSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzSW50ZWdlcihlbGVtVmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBSdWxlcy5NYXhOdW1iZXI6IHtcbiAgICAgICAgaWYgKHJ1bGVWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBWYWx1ZSBmb3IgJHtmaWVsZFJ1bGUucnVsZX0gcnVsZSBmb3IgWyR7a2V5fV0gZmllbGQgaXMgbm90IGRlZmluZWQuIFRoZSBmaWVsZCB3aWxsIGJlIGFsd2F5cyBpbnZhbGlkLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJ1bGVWYWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsdWUgZm9yICR7ZmllbGRSdWxlLnJ1bGV9IHJ1bGUgZm9yIFske2tleX1dIGZpZWxkIHNob3VsZCBiZSBhIG51bWJlci4gVGhlIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0ludmFsaWRPckVtcHR5U3RyaW5nKGVsZW1WYWx1ZSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBudW0gPSArZWxlbVZhbHVlO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKG51bSkgfHwgaXNOdW1iZXJNb3JlVGhhbk1heChudW0sIHJ1bGVWYWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFJ1bGVzLk1pbk51bWJlcjoge1xuICAgICAgICBpZiAocnVsZVZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYFZhbHVlIGZvciAke2ZpZWxkUnVsZS5ydWxlfSBydWxlIGZvciBbJHtrZXl9XSBmaWVsZCBpcyBub3QgZGVmaW5lZC4gVGhlIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcnVsZVZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBWYWx1ZSBmb3IgJHtmaWVsZFJ1bGUucnVsZX0gcnVsZSBmb3IgWyR7a2V5fV0gZmllbGQgc2hvdWxkIGJlIGEgbnVtYmVyLiBUaGUgZmllbGQgd2lsbCBiZSBhbHdheXMgaW52YWxpZC5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSW52YWxpZE9yRW1wdHlTdHJpbmcoZWxlbVZhbHVlKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG51bSA9ICtlbGVtVmFsdWU7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4obnVtKSB8fCBpc051bWJlckxlc3NUaGFuTWluKG51bSwgcnVsZVZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgUnVsZXMuQ3VzdG9tUmVnZXhwOiB7XG4gICAgICAgIGlmIChydWxlVmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsdWUgZm9yICR7ZmllbGRSdWxlLnJ1bGV9IHJ1bGUgZm9yIFske2tleX1dIGZpZWxkIGlzIG5vdCBkZWZpbmVkLiBUaGlzIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVnZXhwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZ2V4cCA9IG5ldyBSZWdFeHAocnVsZVZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsdWUgZm9yICR7ZmllbGRSdWxlLnJ1bGV9IHJ1bGUgZm9yIFske2tleX1dIHNob3VsZCBiZSBhIHZhbGlkIHJlZ2V4cC4gVGhpcyBmaWVsZCB3aWxsIGJlIGFsd2F5cyBpbnZhbGlkLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHIgPSBTdHJpbmcoZWxlbVZhbHVlKTtcbiAgICAgICAgaWYgKHN0ciAhPT0gXCJcIiAmJiAhcmVnZXhwLnRlc3Qoc3RyKSkge1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgUnVsZXMuTWluRmlsZXNDb3VudDoge1xuICAgICAgICBpZiAocnVsZVZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYFZhbHVlIGZvciAke2ZpZWxkUnVsZS5ydWxlfSBydWxlIGZvciBbJHtrZXl9XSBmaWVsZCBpcyBub3QgZGVmaW5lZC4gVGhpcyBmaWVsZCB3aWxsIGJlIGFsd2F5cyBpbnZhbGlkLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJ1bGVWYWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsdWUgZm9yICR7ZmllbGRSdWxlLnJ1bGV9IHJ1bGUgZm9yIFske2tleX1dIGZpZWxkIHNob3VsZCBiZSBhIG51bWJlci4gVGhlIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoZWxlbVZhbHVlID09IG51bGwgPyB2b2lkIDAgOiBlbGVtVmFsdWUubGVuZ3RoKSAmJiBlbGVtVmFsdWUubGVuZ3RoIDwgcnVsZVZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBSdWxlcy5NYXhGaWxlc0NvdW50OiB7XG4gICAgICAgIGlmIChydWxlVmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsdWUgZm9yICR7ZmllbGRSdWxlLnJ1bGV9IHJ1bGUgZm9yIFske2tleX1dIGZpZWxkIGlzIG5vdCBkZWZpbmVkLiBUaGlzIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcnVsZVZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBWYWx1ZSBmb3IgJHtmaWVsZFJ1bGUucnVsZX0gcnVsZSBmb3IgWyR7a2V5fV0gZmllbGQgc2hvdWxkIGJlIGEgbnVtYmVyLiBUaGUgZmllbGQgd2lsbCBiZSBhbHdheXMgaW52YWxpZC5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShlbGVtVmFsdWUgPT0gbnVsbCA/IHZvaWQgMCA6IGVsZW1WYWx1ZS5sZW5ndGgpICYmIGVsZW1WYWx1ZS5sZW5ndGggPiBydWxlVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFJ1bGVzLkZpbGVzOiB7XG4gICAgICAgIGlmIChydWxlVmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsdWUgZm9yICR7ZmllbGRSdWxlLnJ1bGV9IHJ1bGUgZm9yIFske2tleX1dIGZpZWxkIGlzIG5vdCBkZWZpbmVkLiBUaGlzIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJ1bGVWYWx1ZSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsdWUgZm9yICR7ZmllbGRSdWxlLnJ1bGV9IHJ1bGUgZm9yIFske2tleX1dIGZpZWxkIHNob3VsZCBiZSBhbiBvYmplY3QuIFRoaXMgZmllbGQgd2lsbCBiZSBhbHdheXMgaW52YWxpZC5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbGVzQ29uZmlnID0gcnVsZVZhbHVlLmZpbGVzO1xuICAgICAgICBpZiAodHlwZW9mIGZpbGVzQ29uZmlnICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBWYWx1ZSBmb3IgJHtmaWVsZFJ1bGUucnVsZX0gcnVsZSBmb3IgWyR7a2V5fV0gZmllbGQgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIGZpbGVzIGFycmF5LiBUaGlzIGZpZWxkIHdpbGwgYmUgYWx3YXlzIGludmFsaWQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc0ZpbGVQcm9wc0ludmFsaWQgPSAoZmlsZSwgZmlsZUNvbmZpZykgPT4ge1xuICAgICAgICAgIGNvbnN0IG1pblNpemVJbnZhbGlkID0gTnVtYmVyLmlzRmluaXRlKGZpbGVDb25maWcubWluU2l6ZSkgJiYgZmlsZS5zaXplIDwgZmlsZUNvbmZpZy5taW5TaXplO1xuICAgICAgICAgIGNvbnN0IG1heFNpemVJbnZhbGlkID0gTnVtYmVyLmlzRmluaXRlKGZpbGVDb25maWcubWF4U2l6ZSkgJiYgZmlsZS5zaXplID4gZmlsZUNvbmZpZy5tYXhTaXplO1xuICAgICAgICAgIGNvbnN0IG5hbWVJbnZhbGlkID0gQXJyYXkuaXNBcnJheShmaWxlQ29uZmlnLm5hbWVzKSAmJiAhZmlsZUNvbmZpZy5uYW1lcy5pbmNsdWRlcyhmaWxlLm5hbWUpO1xuICAgICAgICAgIGNvbnN0IGV4dEludmFsaWQgPSBBcnJheS5pc0FycmF5KGZpbGVDb25maWcuZXh0ZW5zaW9ucykgJiYgIWZpbGVDb25maWcuZXh0ZW5zaW9ucy5pbmNsdWRlcyhcbiAgICAgICAgICAgIGZpbGUubmFtZS5zcGxpdChcIi5cIilbZmlsZS5uYW1lLnNwbGl0KFwiLlwiKS5sZW5ndGggLSAxXVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgdHlwZUludmFsaWQgPSBBcnJheS5pc0FycmF5KGZpbGVDb25maWcudHlwZXMpICYmICFmaWxlQ29uZmlnLnR5cGVzLmluY2x1ZGVzKGZpbGUudHlwZSk7XG4gICAgICAgICAgcmV0dXJuIG1pblNpemVJbnZhbGlkIHx8IG1heFNpemVJbnZhbGlkIHx8IG5hbWVJbnZhbGlkIHx8IGV4dEludmFsaWQgfHwgdHlwZUludmFsaWQ7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgZWxlbVZhbHVlID09PSBcIm9iamVjdFwiICYmIGVsZW1WYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGZvciAobGV0IGZpbGVJZHggPSAwLCBsZW4gPSBlbGVtVmFsdWUubGVuZ3RoOyBmaWxlSWR4IDwgbGVuOyArK2ZpbGVJZHgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBlbGVtVmFsdWUuaXRlbShmaWxlSWR4KTtcbiAgICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmlsZXNJbnZhbGlkID0gaXNGaWxlUHJvcHNJbnZhbGlkKGZpbGUsIGZpbGVzQ29uZmlnKTtcbiAgICAgICAgICAgIGlmIChmaWxlc0ludmFsaWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRSdWxlLnZhbGlkYXRvciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBWYWxpZGF0b3IgZm9yIGN1c3RvbSBydWxlIGZvciBbJHtrZXl9XSBmaWVsZCBzaG91bGQgYmUgYSBmdW5jdGlvbi4gVGhpcyBmaWVsZCB3aWxsIGJlIGFsd2F5cyBpbnZhbGlkLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZmllbGRSdWxlLnZhbGlkYXRvcihcbiAgICAgICAgICBlbGVtVmFsdWUsXG4gICAgICAgICAgdGhpcy5nZXRDb21wYXRpYmxlRmllbGRzKClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgIT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiByZXN1bHQgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVmFsaWRhdG9yIHJldHVybiB2YWx1ZSBmb3IgWyR7a2V5fV0gZmllbGQgc2hvdWxkIGJlIGJvb2xlYW4gb3IgZnVuY3Rpb24uIEl0IHdpbGwgYmUgY2FzdCB0byBib29sZWFuLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpZiAoYWZ0ZXJJbnB1dENoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzW2tleV0uYXN5bmNDaGVja1BlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc1trZXldLmFzeW5jQ2hlY2tQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gcmVzdWx0KCk7XG4gICAgICAgICAgICBpZiAoIWlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgIGBWYWxpZGF0b3IgZnVuY3Rpb24gZm9yIGN1c3RvbSBydWxlIGZvciBbJHtrZXl9XSBmaWVsZCBzaG91bGQgcmV0dXJuIGEgUHJvbWlzZS4gVGhpcyBmaWVsZCB3aWxsIGJlIGFsd2F5cyBpbnZhbGlkLmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZEludmFsaWQoa2V5LCBmaWVsZFJ1bGUpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghcmVzcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRJbnZhbGlkKGtleSwgZmllbGRSdWxlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkSW52YWxpZChrZXksIGZpZWxkUnVsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaXNGb3JtVmFsaWQoKSB7XG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBPYmplY3QudmFsdWVzKHRoaXMuZmllbGRzKS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY29uc3QgaXRlbSA9IE9iamVjdC52YWx1ZXModGhpcy5maWVsZHMpW2ldO1xuICAgICAgaWYgKGl0ZW0uaXNWYWxpZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGlzVmFsaWQgPSB2b2lkIDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW0uaXNWYWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IE9iamVjdC52YWx1ZXModGhpcy5ncm91cEZpZWxkcykubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QudmFsdWVzKHRoaXMuZ3JvdXBGaWVsZHMpW2ldO1xuICAgICAgaWYgKGl0ZW0uaXNWYWxpZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGlzVmFsaWQgPSB2b2lkIDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW0uaXNWYWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzVmFsaWQ7XG4gIH1cbiAgdmFsaWRhdGVGaWVsZChrZXksIGFmdGVySW5wdXRDaGFuZ2VkID0gZmFsc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1trZXldO1xuICAgIGZpZWxkLmlzVmFsaWQgPSB0cnVlO1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgWy4uLmZpZWxkLnJ1bGVzXS5yZXZlcnNlKCkuZm9yRWFjaCgocnVsZSkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gdGhpcy52YWxpZGF0ZUZpZWxkUnVsZShcbiAgICAgICAga2V5LFxuICAgICAgICBmaWVsZC5lbGVtLFxuICAgICAgICBydWxlLFxuICAgICAgICBhZnRlcklucHV0Q2hhbmdlZFxuICAgICAgKTtcbiAgICAgIGlmIChpc1Byb21pc2UocmVzKSkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGZpZWxkLmlzVmFsaWQpIHtcbiAgICAgIHRoaXMuc2V0RmllbGRWYWxpZChrZXksIChfYSA9IGZpZWxkLmNvbmZpZykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLnN1Y2Nlc3NNZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UuYWxsU2V0dGxlZChwcm9taXNlcykuZmluYWxseSgoKSA9PiB7XG4gICAgICB2YXIgX2EyO1xuICAgICAgaWYgKGFmdGVySW5wdXRDaGFuZ2VkKSB7XG4gICAgICAgIChfYTIgPSB0aGlzLm9uVmFsaWRhdGVDYWxsYmFjaykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hMi5jYWxsKHRoaXMsIHtcbiAgICAgICAgICBpc1ZhbGlkOiB0aGlzLmlzRm9ybVZhbGlkKCksXG4gICAgICAgICAgaXNTdWJtaXR0ZWQ6IHRoaXMuaXNTdWJtaXR0ZWQsXG4gICAgICAgICAgZmllbGRzOiB0aGlzLmdldENvbXBhdGlibGVGaWVsZHMoKSxcbiAgICAgICAgICBncm91cHM6IHsgLi4udGhpcy5ncm91cEZpZWxkcyB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldmFsaWRhdGVGaWVsZChmaWVsZFNlbGVjdG9yKSB7XG4gICAgaWYgKHR5cGVvZiBmaWVsZFNlbGVjdG9yICE9PSBcInN0cmluZ1wiICYmICFpc0VsZW1lbnQoZmllbGRTZWxlY3RvcikpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgRmllbGQgc2VsZWN0b3IgaXMgbm90IHZhbGlkLiBQbGVhc2Ugc3BlY2lmeSBhIHN0cmluZyBzZWxlY3RvciBvciBhIHZhbGlkIERPTSBlbGVtZW50LmBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5QnlGaWVsZFNlbGVjdG9yKGZpZWxkU2VsZWN0b3IpO1xuICAgIGlmICgha2V5IHx8ICF0aGlzLmZpZWxkc1trZXldKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGaWVsZCBub3QgZm91bmQuIENoZWNrIHRoZSBmaWVsZCBzZWxlY3Rvci5gKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVGaWVsZChrZXksIHRydWUpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyRmllbGRTdHlsZShrZXkpO1xuICAgICAgICB0aGlzLmNsZWFyRmllbGRMYWJlbChrZXkpO1xuICAgICAgICB0aGlzLnJlbmRlckZpZWxkRXJyb3Ioa2V5LCB0cnVlKTtcbiAgICAgICAgcmVzb2x2ZSghIXRoaXMuZmllbGRzW2tleV0uaXNWYWxpZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXZhbGlkYXRlR3JvdXAoZ3JvdXBTZWxlY3Rvcikge1xuICAgIGlmICh0eXBlb2YgZ3JvdXBTZWxlY3RvciAhPT0gXCJzdHJpbmdcIiAmJiAhaXNFbGVtZW50KGdyb3VwU2VsZWN0b3IpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgYEdyb3VwIHNlbGVjdG9yIGlzIG5vdCB2YWxpZC4gUGxlYXNlIHNwZWNpZnkgYSBzdHJpbmcgc2VsZWN0b3Igb3IgYSB2YWxpZCBET00gZWxlbWVudC5gXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleUJ5RmllbGRTZWxlY3Rvcihncm91cFNlbGVjdG9yKTtcbiAgICBpZiAoIWtleSB8fCAhdGhpcy5ncm91cEZpZWxkc1trZXldKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBHcm91cCBub3QgZm91bmQuIENoZWNrIHRoZSBncm91cCBzZWxlY3Rvci5gKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVHcm91cChrZXkpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyRmllbGRMYWJlbChrZXkpO1xuICAgICAgICB0aGlzLnJlbmRlckdyb3VwRXJyb3Ioa2V5LCB0cnVlKTtcbiAgICAgICAgcmVzb2x2ZSghIXRoaXMuZ3JvdXBGaWVsZHNba2V5XS5pc1ZhbGlkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHZhbGlkYXRlR3JvdXAoa2V5LCBhZnRlcklucHV0Q2hhbmdlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdyb3VwRmllbGRzW2tleV07XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICBbLi4uZ3JvdXAucnVsZXNdLnJldmVyc2UoKS5mb3JFYWNoKChydWxlKSA9PiB7XG4gICAgICBjb25zdCByZXMgPSB0aGlzLnZhbGlkYXRlR3JvdXBSdWxlKGtleSwgZ3JvdXAuZWxlbXMsIHJ1bGUpO1xuICAgICAgaWYgKGlzUHJvbWlzZShyZXMpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGxTZXR0bGVkKHByb21pc2VzKS5maW5hbGx5KCgpID0+IHtcbiAgICAgIHZhciBfYTtcbiAgICAgIGlmIChhZnRlcklucHV0Q2hhbmdlZCkge1xuICAgICAgICAoX2EgPSB0aGlzLm9uVmFsaWRhdGVDYWxsYmFjaykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLmNhbGwodGhpcywge1xuICAgICAgICAgIGlzVmFsaWQ6IHRoaXMuaXNGb3JtVmFsaWQoKSxcbiAgICAgICAgICBpc1N1Ym1pdHRlZDogdGhpcy5pc1N1Ym1pdHRlZCxcbiAgICAgICAgICBmaWVsZHM6IHRoaXMuZ2V0Q29tcGF0aWJsZUZpZWxkcygpLFxuICAgICAgICAgIGdyb3VwczogeyAuLi50aGlzLmdyb3VwRmllbGRzIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZm9jdXNJbnZhbGlkRmllbGQoKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5maWVsZHMpIHtcbiAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNba2V5XTtcbiAgICAgIGlmICghZmllbGQuaXNWYWxpZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGZpZWxkLmVsZW0uZm9jdXMoKSwgMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhZnRlclN1Ym1pdFZhbGlkYXRpb24oZm9yY2VSZXZhbGlkYXRpb24gPSBmYWxzZSkge1xuICAgIHRoaXMucmVuZGVyRXJyb3JzKGZvcmNlUmV2YWxpZGF0aW9uKTtcbiAgICBpZiAodGhpcy5nbG9iYWxDb25maWcuZm9jdXNJbnZhbGlkRmllbGQpIHtcbiAgICAgIHRoaXMuZm9jdXNJbnZhbGlkRmllbGQoKTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGUoZm9yY2VSZXZhbGlkYXRpb24gPSBmYWxzZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMudmFsaWRhdGVGaWVsZChrZXkpO1xuICAgICAgICBpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmdyb3VwRmllbGRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMudmFsaWRhdGVHcm91cChrZXkpO1xuICAgICAgICBpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBQcm9taXNlLmFsbFNldHRsZWQocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMuYWZ0ZXJTdWJtaXRWYWxpZGF0aW9uKGZvcmNlUmV2YWxpZGF0aW9uKTtcbiAgICAgICAgKF9hID0gdGhpcy5vblZhbGlkYXRlQ2FsbGJhY2spID09IG51bGwgPyB2b2lkIDAgOiBfYS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICBpc1ZhbGlkOiB0aGlzLmlzRm9ybVZhbGlkKCksXG4gICAgICAgICAgaXNTdWJtaXR0ZWQ6IHRoaXMuaXNTdWJtaXR0ZWQsXG4gICAgICAgICAgZmllbGRzOiB0aGlzLmdldENvbXBhdGlibGVGaWVsZHMoKSxcbiAgICAgICAgICBncm91cHM6IHsgLi4udGhpcy5ncm91cEZpZWxkcyB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKCEhcHJvbWlzZXMubGVuZ3RoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldmFsaWRhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlSGFuZGxlcih2b2lkIDAsIHRydWUpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5nbG9iYWxDb25maWcuZm9jdXNJbnZhbGlkRmllbGQpIHtcbiAgICAgICAgICB0aGlzLmZvY3VzSW52YWxpZEZpZWxkKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmlzVmFsaWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgdmFsaWRhdGVIYW5kbGVyKGV2LCBmb3JjZVJldmFsaWRhdGlvbiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuZ2xvYmFsQ29uZmlnLmxvY2tGb3JtKSB7XG4gICAgICB0aGlzLmxvY2tGb3JtKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKGZvcmNlUmV2YWxpZGF0aW9uKS5maW5hbGx5KCgpID0+IHtcbiAgICAgIHZhciBfYSwgX2I7XG4gICAgICBpZiAodGhpcy5nbG9iYWxDb25maWcubG9ja0Zvcm0pIHtcbiAgICAgICAgdGhpcy51bmxvY2tGb3JtKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgIChfYSA9IHRoaXMub25TdWNjZXNzQ2FsbGJhY2spID09IG51bGwgPyB2b2lkIDAgOiBfYS5jYWxsKHRoaXMsIGV2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChfYiA9IHRoaXMub25GYWlsQ2FsbGJhY2spID09IG51bGwgPyB2b2lkIDAgOiBfYi5jYWxsKHRoaXMsIHRoaXMuZ2V0Q29tcGF0aWJsZUZpZWxkcygpLCB0aGlzLmdyb3VwRmllbGRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBzZXRGb3JtKGZvcm0pIHtcbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICAgIHRoaXMuZm9ybS5zZXRBdHRyaWJ1dGUoXCJub3ZhbGlkYXRlXCIsIFwibm92YWxpZGF0ZVwiKTtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuZm9ybSwgdGhpcy5mb3JtU3VibWl0SGFuZGxlcik7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmZvcm0sIHRoaXMuZm9ybVN1Ym1pdEhhbmRsZXIpO1xuICB9XG4gIGFkZExpc3RlbmVyKHR5cGUsIGVsZW0sIGhhbmRsZXIpIHtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG4gICAgdGhpcy5ldmVudExpc3RlbmVycy5wdXNoKHsgdHlwZSwgZWxlbSwgZnVuYzogaGFuZGxlciB9KTtcbiAgfVxuICByZW1vdmVMaXN0ZW5lcih0eXBlLCBlbGVtLCBoYW5kbGVyKSB7XG4gICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmZpbHRlcihcbiAgICAgIChpdGVtKSA9PiBpdGVtLnR5cGUgIT09IHR5cGUgfHwgaXRlbS5lbGVtICE9PSBlbGVtXG4gICAgKTtcbiAgfVxuICBhZGRGaWVsZChmaWVsZFNlbGVjdG9yLCBydWxlcywgY29uZmlnKSB7XG4gICAgaWYgKHR5cGVvZiBmaWVsZFNlbGVjdG9yICE9PSBcInN0cmluZ1wiICYmICFpc0VsZW1lbnQoZmllbGRTZWxlY3RvcikpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgRmllbGQgc2VsZWN0b3IgaXMgbm90IHZhbGlkLiBQbGVhc2Ugc3BlY2lmeSBhIHN0cmluZyBzZWxlY3RvciBvciBhIHZhbGlkIERPTSBlbGVtZW50LmBcbiAgICAgICk7XG4gICAgfVxuICAgIGxldCBlbGVtO1xuICAgIGlmICh0eXBlb2YgZmllbGRTZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgZWxlbSA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKGZpZWxkU2VsZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtID0gZmllbGRTZWxlY3RvcjtcbiAgICB9XG4gICAgaWYgKCFlbGVtKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgYEZpZWxkIGRvZXNuJ3QgZXhpc3QgaW4gdGhlIERPTSEgUGxlYXNlIGNoZWNrIHRoZSBmaWVsZCBzZWxlY3Rvci5gXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocnVsZXMpIHx8ICFydWxlcy5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgUnVsZXMgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5IGFuZCBzaG91bGQgY29udGFpbiBhdCBsZWFzdCAxIGVsZW1lbnQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKCEoXCJydWxlXCIgaW4gaXRlbSB8fCBcInZhbGlkYXRvclwiIGluIGl0ZW0gfHwgXCJwbHVnaW5cIiBpbiBpdGVtKSkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgUnVsZXMgYXJndW1lbnQgbXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBydWxlIG9yIHZhbGlkYXRvciBwcm9wZXJ0eS5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW0udmFsaWRhdG9yICYmICFpdGVtLnBsdWdpbiAmJiAoIWl0ZW0ucnVsZSB8fCAhT2JqZWN0LnZhbHVlcyhSdWxlcykuaW5jbHVkZXMoaXRlbS5ydWxlKSkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgYFJ1bGUgc2hvdWxkIGJlIG9uZSBvZiB0aGVzZSB0eXBlczogJHtPYmplY3QudmFsdWVzKFJ1bGVzKS5qb2luKFxuICAgICAgICAgICAgXCIsIFwiXG4gICAgICAgICAgKX0uIFByb3ZpZGVkIHZhbHVlOiAke2l0ZW0ucnVsZX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5zZXRLZXlCeUZpZWxkU2VsZWN0b3IoZmllbGRTZWxlY3Rvcik7XG4gICAgdGhpcy5maWVsZHNba2V5XSA9IHtcbiAgICAgIGVsZW0sXG4gICAgICBydWxlcyxcbiAgICAgIGlzVmFsaWQ6IHZvaWQgMCxcbiAgICAgIHRvdWNoZWQ6IGZhbHNlLFxuICAgICAgY29uZmlnXG4gICAgfTtcbiAgICB0aGlzLnNldExpc3RlbmVycyhlbGVtKTtcbiAgICBpZiAodGhpcy5pc1N1Ym1pdHRlZCB8fCB0aGlzLmdsb2JhbENvbmZpZy52YWxpZGF0ZUJlZm9yZVN1Ym1pdHRpbmcpIHtcbiAgICAgIHRoaXMudmFsaWRhdGVGaWVsZChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZW1vdmVGaWVsZChmaWVsZFNlbGVjdG9yKSB7XG4gICAgaWYgKHR5cGVvZiBmaWVsZFNlbGVjdG9yICE9PSBcInN0cmluZ1wiICYmICFpc0VsZW1lbnQoZmllbGRTZWxlY3RvcikpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgRmllbGQgc2VsZWN0b3IgaXMgbm90IHZhbGlkLiBQbGVhc2Ugc3BlY2lmeSBhIHN0cmluZyBzZWxlY3RvciBvciBhIHZhbGlkIERPTSBlbGVtZW50LmBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5QnlGaWVsZFNlbGVjdG9yKGZpZWxkU2VsZWN0b3IpO1xuICAgIGlmICgha2V5IHx8ICF0aGlzLmZpZWxkc1trZXldKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGaWVsZCBub3QgZm91bmQuIENoZWNrIHRoZSBmaWVsZCBzZWxlY3Rvci5gKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gdGhpcy5nZXRMaXN0ZW5lclR5cGUodGhpcy5maWVsZHNba2V5XS5lbGVtLnR5cGUpO1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgdGhpcy5maWVsZHNba2V5XS5lbGVtLCB0aGlzLmhhbmRsZXJDaGFuZ2UpO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICBkZWxldGUgdGhpcy5maWVsZHNba2V5XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZW1vdmVHcm91cChncm91cCkge1xuICAgIGlmICh0eXBlb2YgZ3JvdXAgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgR3JvdXAgc2VsZWN0b3IgaXMgbm90IHZhbGlkLiBQbGVhc2Ugc3BlY2lmeSBhIHN0cmluZyBzZWxlY3Rvci5gXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleUJ5RmllbGRTZWxlY3Rvcihncm91cCk7XG4gICAgaWYgKCFrZXkgfHwgIXRoaXMuZ3JvdXBGaWVsZHNba2V5XSkge1xuICAgICAgY29uc29sZS5lcnJvcihgR3JvdXAgbm90IGZvdW5kLiBDaGVjayB0aGUgZ3JvdXAgc2VsZWN0b3IuYCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhpcy5ncm91cEZpZWxkc1trZXldLmVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmdldExpc3RlbmVyVHlwZShlbGVtLnR5cGUpO1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBlbGVtLCB0aGlzLmhhbmRsZXJDaGFuZ2UpO1xuICAgIH0pO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICBkZWxldGUgdGhpcy5ncm91cEZpZWxkc1trZXldO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZFJlcXVpcmVkR3JvdXAoZ3JvdXBGaWVsZCwgZXJyb3JNZXNzYWdlLCBjb25maWcsIHN1Y2Nlc3NNZXNzYWdlKSB7XG4gICAgaWYgKHR5cGVvZiBncm91cEZpZWxkICE9PSBcInN0cmluZ1wiICYmICFpc0VsZW1lbnQoZ3JvdXBGaWVsZCkpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgR3JvdXAgc2VsZWN0b3IgaXMgbm90IHZhbGlkLiBQbGVhc2Ugc3BlY2lmeSBhIHN0cmluZyBzZWxlY3RvciBvciBhIHZhbGlkIERPTSBlbGVtZW50LmBcbiAgICAgICk7XG4gICAgfVxuICAgIGxldCBlbGVtO1xuICAgIGlmICh0eXBlb2YgZ3JvdXBGaWVsZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgZWxlbSA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKGdyb3VwRmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtID0gZ3JvdXBGaWVsZDtcbiAgICB9XG4gICAgaWYgKCFlbGVtKSB7XG4gICAgICB0aHJvdyBFcnJvcihgR3JvdXAgc2VsZWN0b3Igbm90IGZvdW5kISBQbGVhc2UgY2hlY2sgdGhlIGdyb3VwIHNlbGVjdG9yLmApO1xuICAgIH1cbiAgICBjb25zdCBpbnB1dHMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBjaGlsZHJlbklucHV0cyA9IEFycmF5LmZyb20oaW5wdXRzKS5maWx0ZXIoKGlucHV0KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnQgPSBnZXRDbG9zZXN0UGFyZW50KHRoaXMuZ3JvdXBGaWVsZHMsIGdldE5vZGVQYXJlbnRzKGlucHV0KSk7XG4gICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJlbnRbMV0uZWxlbXMuZmluZCgoZWxlbTIpID0+IGVsZW0yICE9PSBpbnB1dCk7XG4gICAgfSk7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5zZXRLZXlCeUZpZWxkU2VsZWN0b3IoZ3JvdXBGaWVsZCk7XG4gICAgdGhpcy5ncm91cEZpZWxkc1trZXldID0ge1xuICAgICAgcnVsZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHJ1bGU6IEdyb3VwUnVsZXMuUmVxdWlyZWQsXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBncm91cEVsZW06IGVsZW0sXG4gICAgICBlbGVtczogY2hpbGRyZW5JbnB1dHMsXG4gICAgICB0b3VjaGVkOiBmYWxzZSxcbiAgICAgIGlzVmFsaWQ6IHZvaWQgMCxcbiAgICAgIGNvbmZpZ1xuICAgIH07XG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICB0aGlzLnNldExpc3RlbmVycyhpbnB1dCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0TGlzdGVuZXJUeXBlKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJjaGVja2JveFwiOlxuICAgICAgY2FzZSBcInNlbGVjdC1vbmVcIjpcbiAgICAgIGNhc2UgXCJmaWxlXCI6XG4gICAgICBjYXNlIFwicmFkaW9cIjoge1xuICAgICAgICByZXR1cm4gXCJjaGFuZ2VcIjtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIFwiaW5wdXRcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0TGlzdGVuZXJzKGVsZW0pIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5nZXRMaXN0ZW5lclR5cGUoZWxlbS50eXBlKTtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGVsZW0sIHRoaXMuaGFuZGxlckNoYW5nZSk7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcih0eXBlLCBlbGVtLCB0aGlzLmhhbmRsZXJDaGFuZ2UpO1xuICB9XG4gIGNsZWFyRmllbGRMYWJlbChrZXkpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIChfYSA9IHRoaXMuZXJyb3JMYWJlbHNba2V5XSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xuICAgIChfYiA9IHRoaXMuc3VjY2Vzc0xhYmVsc1trZXldKSA9PSBudWxsID8gdm9pZCAwIDogX2IucmVtb3ZlKCk7XG4gIH1cbiAgY2xlYXJGaWVsZFN0eWxlKGtleSkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW2tleV07XG4gICAgY29uc3QgZXJyb3JTdHlsZSA9ICgoX2EgPSBmaWVsZC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfYS5lcnJvckZpZWxkU3R5bGUpIHx8IHRoaXMuZ2xvYmFsQ29uZmlnLmVycm9yRmllbGRTdHlsZTtcbiAgICBPYmplY3Qua2V5cyhlcnJvclN0eWxlKS5mb3JFYWNoKChrZXkyKSA9PiB7XG4gICAgICBmaWVsZC5lbGVtLnN0eWxlW2tleTJdID0gXCJcIjtcbiAgICB9KTtcbiAgICBjb25zdCBzdWNjZXNzU3R5bGUgPSAoKF9iID0gZmllbGQuY29uZmlnKSA9PSBudWxsID8gdm9pZCAwIDogX2Iuc3VjY2Vzc0ZpZWxkU3R5bGUpIHx8IHRoaXMuZ2xvYmFsQ29uZmlnLnN1Y2Nlc3NGaWVsZFN0eWxlIHx8IHt9O1xuICAgIE9iamVjdC5rZXlzKHN1Y2Nlc3NTdHlsZSkuZm9yRWFjaCgoa2V5MikgPT4ge1xuICAgICAgZmllbGQuZWxlbS5zdHlsZVtrZXkyXSA9IFwiXCI7XG4gICAgfSk7XG4gICAgZmllbGQuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgLi4uZ2V0Q2xhc3NMaXN0KFxuICAgICAgICAoKF9jID0gZmllbGQuY29uZmlnKSA9PSBudWxsID8gdm9pZCAwIDogX2MuZXJyb3JGaWVsZENzc0NsYXNzKSB8fCB0aGlzLmdsb2JhbENvbmZpZy5lcnJvckZpZWxkQ3NzQ2xhc3NcbiAgICAgICksXG4gICAgICAuLi5nZXRDbGFzc0xpc3QoXG4gICAgICAgICgoX2QgPSBmaWVsZC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfZC5zdWNjZXNzRmllbGRDc3NDbGFzcykgfHwgdGhpcy5nbG9iYWxDb25maWcuc3VjY2Vzc0ZpZWxkQ3NzQ2xhc3NcbiAgICAgIClcbiAgICApO1xuICB9XG4gIGNsZWFyRXJyb3JzKCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgT2JqZWN0LmtleXModGhpcy5lcnJvckxhYmVscykuZm9yRWFjaChcbiAgICAgIChrZXkpID0+IHRoaXMuZXJyb3JMYWJlbHNba2V5XS5yZW1vdmUoKVxuICAgICk7XG4gICAgT2JqZWN0LmtleXModGhpcy5zdWNjZXNzTGFiZWxzKS5mb3JFYWNoKFxuICAgICAgKGtleSkgPT4gdGhpcy5zdWNjZXNzTGFiZWxzW2tleV0ucmVtb3ZlKClcbiAgICApO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZmllbGRzKSB7XG4gICAgICB0aGlzLmNsZWFyRmllbGRTdHlsZShrZXkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmdyb3VwRmllbGRzKSB7XG4gICAgICBjb25zdCBncm91cCA9IHRoaXMuZ3JvdXBGaWVsZHNba2V5XTtcbiAgICAgIGNvbnN0IGVycm9yU3R5bGUgPSAoKF9hID0gZ3JvdXAuY29uZmlnKSA9PSBudWxsID8gdm9pZCAwIDogX2EuZXJyb3JGaWVsZFN0eWxlKSB8fCB0aGlzLmdsb2JhbENvbmZpZy5lcnJvckZpZWxkU3R5bGU7XG4gICAgICBPYmplY3Qua2V5cyhlcnJvclN0eWxlKS5mb3JFYWNoKChrZXkyKSA9PiB7XG4gICAgICAgIGdyb3VwLmVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICB2YXIgX2EyO1xuICAgICAgICAgIGVsZW0uc3R5bGVba2V5Ml0gPSBcIlwiO1xuICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgICAgIC4uLmdldENsYXNzTGlzdChcbiAgICAgICAgICAgICAgKChfYTIgPSBncm91cC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfYTIuZXJyb3JGaWVsZENzc0NsYXNzKSB8fCB0aGlzLmdsb2JhbENvbmZpZy5lcnJvckZpZWxkQ3NzQ2xhc3NcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgc3VjY2Vzc1N0eWxlID0gKChfYiA9IGdyb3VwLmNvbmZpZykgPT0gbnVsbCA/IHZvaWQgMCA6IF9iLnN1Y2Nlc3NGaWVsZFN0eWxlKSB8fCB0aGlzLmdsb2JhbENvbmZpZy5zdWNjZXNzRmllbGRTdHlsZSB8fCB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHN1Y2Nlc3NTdHlsZSkuZm9yRWFjaCgoa2V5MikgPT4ge1xuICAgICAgICBncm91cC5lbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgdmFyIF9hMjtcbiAgICAgICAgICBlbGVtLnN0eWxlW2tleTJdID0gXCJcIjtcbiAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgICAuLi5nZXRDbGFzc0xpc3QoXG4gICAgICAgICAgICAgICgoX2EyID0gZ3JvdXAuY29uZmlnKSA9PSBudWxsID8gdm9pZCAwIDogX2EyLnN1Y2Nlc3NGaWVsZENzc0NsYXNzKSB8fCB0aGlzLmdsb2JhbENvbmZpZy5zdWNjZXNzRmllbGRDc3NDbGFzc1xuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMudG9vbHRpcHMgPSBbXTtcbiAgfVxuICBpc1Rvb2x0aXAoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nbG9iYWxDb25maWcudG9vbHRpcDtcbiAgfVxuICBsb2NrRm9ybSgpIHtcbiAgICBjb25zdCBlbGVtcyA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgXCJpbnB1dCwgdGV4dGFyZWEsIGJ1dHRvbiwgc2VsZWN0XCJcbiAgICApO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgZWxlbXNbaV0uc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtanVzdC12YWxpZGF0ZS1mYWxsYmFjay1kaXNhYmxlZFwiLFxuICAgICAgICBlbGVtc1tpXS5kaXNhYmxlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiXG4gICAgICApO1xuICAgICAgZWxlbXNbaV0uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIGVsZW1zW2ldLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgIGVsZW1zW2ldLnN0eWxlLndlYmtpdEZpbHRlciA9IFwiZ3JheXNjYWxlKDEwMCUpXCI7XG4gICAgICBlbGVtc1tpXS5zdHlsZS5maWx0ZXIgPSBcImdyYXlzY2FsZSgxMDAlKVwiO1xuICAgIH1cbiAgfVxuICB1bmxvY2tGb3JtKCkge1xuICAgIGNvbnN0IGVsZW1zID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcImlucHV0LCB0ZXh0YXJlYSwgYnV0dG9uLCBzZWxlY3RcIlxuICAgICk7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGVsZW1zLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBpZiAoZWxlbXNbaV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1qdXN0LXZhbGlkYXRlLWZhbGxiYWNrLWRpc2FibGVkXCIpICE9PSBcInRydWVcIikge1xuICAgICAgICBlbGVtc1tpXS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cbiAgICAgIGVsZW1zW2ldLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIlwiO1xuICAgICAgZWxlbXNbaV0uc3R5bGUud2Via2l0RmlsdGVyID0gXCJcIjtcbiAgICAgIGVsZW1zW2ldLnN0eWxlLmZpbHRlciA9IFwiXCI7XG4gICAgfVxuICB9XG4gIHJlbmRlclRvb2x0aXAoZWxlbSwgZXJyb3JMYWJlbCwgcG9zaXRpb24pIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZXJyb3JMYWJlbFJlY3QgPSBlcnJvckxhYmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uIHx8ICgoX2EgPSB0aGlzLmdsb2JhbENvbmZpZy50b29sdGlwKSA9PSBudWxsID8gdm9pZCAwIDogX2EucG9zaXRpb24pO1xuICAgIHN3aXRjaCAocG9zKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOiB7XG4gICAgICAgIGVycm9yTGFiZWwuc3R5bGUudG9wID0gYCR7dG9wICsgaGVpZ2h0IC8gMiAtIGVycm9yTGFiZWxSZWN0LmhlaWdodCAvIDJ9cHhgO1xuICAgICAgICBlcnJvckxhYmVsLnN0eWxlLmxlZnQgPSBgJHtsZWZ0IC0gZXJyb3JMYWJlbFJlY3Qud2lkdGggLSBUT09MVElQX0FSUk9XX0hFSUdIVH1weGA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcInRvcFwiOiB7XG4gICAgICAgIGVycm9yTGFiZWwuc3R5bGUudG9wID0gYCR7dG9wIC0gZXJyb3JMYWJlbFJlY3QuaGVpZ2h0IC0gVE9PTFRJUF9BUlJPV19IRUlHSFR9cHhgO1xuICAgICAgICBlcnJvckxhYmVsLnN0eWxlLmxlZnQgPSBgJHtsZWZ0ICsgd2lkdGggLyAyIC0gZXJyb3JMYWJlbFJlY3Qud2lkdGggLyAyfXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwicmlnaHRcIjoge1xuICAgICAgICBlcnJvckxhYmVsLnN0eWxlLnRvcCA9IGAke3RvcCArIGhlaWdodCAvIDIgLSBlcnJvckxhYmVsUmVjdC5oZWlnaHQgLyAyfXB4YDtcbiAgICAgICAgZXJyb3JMYWJlbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdCArIHdpZHRoICsgVE9PTFRJUF9BUlJPV19IRUlHSFR9cHhgO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJib3R0b21cIjoge1xuICAgICAgICBlcnJvckxhYmVsLnN0eWxlLnRvcCA9IGAke3RvcCArIGhlaWdodCArIFRPT0xUSVBfQVJST1dfSEVJR0hUfXB4YDtcbiAgICAgICAgZXJyb3JMYWJlbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdCArIHdpZHRoIC8gMiAtIGVycm9yTGFiZWxSZWN0LndpZHRoIC8gMn1weGA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBlcnJvckxhYmVsLmRhdGFzZXQuZGlyZWN0aW9uID0gcG9zO1xuICAgIGNvbnN0IHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlclRvb2x0aXAoZWxlbSwgZXJyb3JMYWJlbCwgcG9zaXRpb24pO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZnJlc2hcbiAgICB9O1xuICB9XG4gIGNyZWF0ZUVycm9yTGFiZWxFbGVtKGtleSwgZXJyb3JNZXNzYWdlLCBjb25maWcpIHtcbiAgICBjb25zdCBlcnJvckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlcnJvckxhYmVsLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcbiAgICBjb25zdCBjdXN0b21FcnJvckxhYmVsU3R5bGUgPSB0aGlzLmlzVG9vbHRpcCgpID8gY29uZmlnID09IG51bGwgPyB2b2lkIDAgOiBjb25maWcuZXJyb3JMYWJlbFN0eWxlIDogKGNvbmZpZyA9PSBudWxsID8gdm9pZCAwIDogY29uZmlnLmVycm9yTGFiZWxTdHlsZSkgfHwgdGhpcy5nbG9iYWxDb25maWcuZXJyb3JMYWJlbFN0eWxlO1xuICAgIE9iamVjdC5hc3NpZ24oZXJyb3JMYWJlbC5zdHlsZSwgY3VzdG9tRXJyb3JMYWJlbFN0eWxlKTtcbiAgICBlcnJvckxhYmVsLmNsYXNzTGlzdC5hZGQoXG4gICAgICAuLi5nZXRDbGFzc0xpc3QoXG4gICAgICAgIChjb25maWcgPT0gbnVsbCA/IHZvaWQgMCA6IGNvbmZpZy5lcnJvckxhYmVsQ3NzQ2xhc3MpIHx8IHRoaXMuZ2xvYmFsQ29uZmlnLmVycm9yTGFiZWxDc3NDbGFzc1xuICAgICAgKSxcbiAgICAgIFwianVzdC12YWxpZGF0ZS1lcnJvci1sYWJlbFwiXG4gICAgKTtcbiAgICBpZiAodGhpcy5pc1Rvb2x0aXAoKSkge1xuICAgICAgZXJyb3JMYWJlbC5kYXRhc2V0LnRvb2x0aXAgPSBcInRydWVcIjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2xvYmFsQ29uZmlnLnRlc3RpbmdNb2RlKSB7XG4gICAgICBlcnJvckxhYmVsLmRhdGFzZXQudGVzdElkID0gYGVycm9yLWxhYmVsLSR7a2V5fWA7XG4gICAgfVxuICAgIHRoaXMuZXJyb3JMYWJlbHNba2V5XSA9IGVycm9yTGFiZWw7XG4gICAgcmV0dXJuIGVycm9yTGFiZWw7XG4gIH1cbiAgY3JlYXRlU3VjY2Vzc0xhYmVsRWxlbShrZXksIHN1Y2Nlc3NNZXNzYWdlLCBjb25maWcpIHtcbiAgICBpZiAoc3VjY2Vzc01lc3NhZ2UgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHN1Y2Nlc3NMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3VjY2Vzc0xhYmVsLmlubmVySFRNTCA9IHN1Y2Nlc3NNZXNzYWdlO1xuICAgIGNvbnN0IGN1c3RvbVN1Y2Nlc3NMYWJlbFN0eWxlID0gKGNvbmZpZyA9PSBudWxsID8gdm9pZCAwIDogY29uZmlnLnN1Y2Nlc3NMYWJlbFN0eWxlKSB8fCB0aGlzLmdsb2JhbENvbmZpZy5zdWNjZXNzTGFiZWxTdHlsZTtcbiAgICBPYmplY3QuYXNzaWduKHN1Y2Nlc3NMYWJlbC5zdHlsZSwgY3VzdG9tU3VjY2Vzc0xhYmVsU3R5bGUpO1xuICAgIHN1Y2Nlc3NMYWJlbC5jbGFzc0xpc3QuYWRkKFxuICAgICAgLi4uZ2V0Q2xhc3NMaXN0KFxuICAgICAgICAoY29uZmlnID09IG51bGwgPyB2b2lkIDAgOiBjb25maWcuc3VjY2Vzc0xhYmVsQ3NzQ2xhc3MpIHx8IHRoaXMuZ2xvYmFsQ29uZmlnLnN1Y2Nlc3NMYWJlbENzc0NsYXNzXG4gICAgICApLFxuICAgICAgXCJqdXN0LXZhbGlkYXRlLXN1Y2Nlc3MtbGFiZWxcIlxuICAgICk7XG4gICAgaWYgKHRoaXMuZ2xvYmFsQ29uZmlnLnRlc3RpbmdNb2RlKSB7XG4gICAgICBzdWNjZXNzTGFiZWwuZGF0YXNldC50ZXN0SWQgPSBgc3VjY2Vzcy1sYWJlbC0ke2tleX1gO1xuICAgIH1cbiAgICB0aGlzLnN1Y2Nlc3NMYWJlbHNba2V5XSA9IHN1Y2Nlc3NMYWJlbDtcbiAgICByZXR1cm4gc3VjY2Vzc0xhYmVsO1xuICB9XG4gIHJlbmRlckVycm9yc0NvbnRhaW5lcihsYWJlbCwgZXJyb3JzQ29udGFpbmVyKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZXJyb3JzQ29udGFpbmVyIHx8IHRoaXMuZ2xvYmFsQ29uZmlnLmVycm9yc0NvbnRhaW5lcjtcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcik7XG4gICAgICBpZiAoZWxlbSkge1xuICAgICAgICBlbGVtLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGBFcnJvciBjb250YWluZXIgd2l0aCAke2NvbnRhaW5lcn0gc2VsZWN0b3Igbm90IGZvdW5kLiBFcnJvcnMgd2lsbCBiZSByZW5kZXJlZCBhcyB1c3VhbGBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbnRhaW5lciAhPT0gdm9pZCAwKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgRXJyb3IgY29udGFpbmVyIG5vdCBmb3VuZC4gSXQgc2hvdWxkIGJlIGEgc3RyaW5nIG9yIGV4aXN0aW5nIEVsZW1lbnQuIEVycm9ycyB3aWxsIGJlIHJlbmRlcmVkIGFzIHVzdWFsYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJlbmRlckdyb3VwTGFiZWwoZWxlbSwgbGFiZWwsIGVycm9yc0NvbnRhaW5lciwgaXNTdWNjZXNzKSB7XG4gICAgaWYgKCFpc1N1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVkSW5FcnJvcnNDb250YWluZXIgPSB0aGlzLnJlbmRlckVycm9yc0NvbnRhaW5lcihcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGVycm9yc0NvbnRhaW5lclxuICAgICAgKTtcbiAgICAgIGlmIChyZW5kZXJlZEluRXJyb3JzQ29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gIH1cbiAgcmVuZGVyRmllbGRMYWJlbChlbGVtLCBsYWJlbCwgZXJyb3JzQ29udGFpbmVyLCBpc1N1Y2Nlc3MpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2c7XG4gICAgaWYgKCFpc1N1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVkSW5FcnJvcnNDb250YWluZXIgPSB0aGlzLnJlbmRlckVycm9yc0NvbnRhaW5lcihcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGVycm9yc0NvbnRhaW5lclxuICAgICAgKTtcbiAgICAgIGlmIChyZW5kZXJlZEluRXJyb3JzQ29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVsZW0udHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IGVsZW0udHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICBjb25zdCBsYWJlbEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgbGFiZWxbZm9yPVwiJHtlbGVtLmdldEF0dHJpYnV0ZShcImlkXCIpfVwiXWBcbiAgICAgICk7XG4gICAgICBpZiAoKChfYiA9IChfYSA9IGVsZW0ucGFyZW50RWxlbWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLnRhZ05hbWUpID09IG51bGwgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpKSA9PT0gXCJsYWJlbFwiKSB7XG4gICAgICAgIChfZCA9IChfYyA9IGVsZW0ucGFyZW50RWxlbWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9jLnBhcmVudEVsZW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZC5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICB9IGVsc2UgaWYgKGxhYmVsRWxlbSkge1xuICAgICAgICAoX2UgPSBsYWJlbEVsZW0ucGFyZW50RWxlbWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9lLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChfZiA9IGVsZW0ucGFyZW50RWxlbWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9mLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgKF9nID0gZWxlbS5wYXJlbnRFbGVtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2cuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIH1cbiAgfVxuICBzaG93TGFiZWxzKGZpZWxkcywgaXNFcnJvcikge1xuICAgIE9iamVjdC5rZXlzKGZpZWxkcykuZm9yRWFjaCgoZmllbGROYW1lLCBpKSA9PiB7XG4gICAgICBjb25zdCBlcnJvciA9IGZpZWxkc1tmaWVsZE5hbWVdO1xuICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXlCeUZpZWxkU2VsZWN0b3IoZmllbGROYW1lKTtcbiAgICAgIGlmICgha2V5IHx8ICF0aGlzLmZpZWxkc1trZXldKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZpZWxkIG5vdCBmb3VuZC4gQ2hlY2sgdGhlIGZpZWxkIHNlbGVjdG9yLmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW2tleV07XG4gICAgICBmaWVsZC5pc1ZhbGlkID0gIWlzRXJyb3I7XG4gICAgICB0aGlzLmNsZWFyRmllbGRTdHlsZShrZXkpO1xuICAgICAgdGhpcy5jbGVhckZpZWxkTGFiZWwoa2V5KTtcbiAgICAgIHRoaXMucmVuZGVyRmllbGRFcnJvcihrZXksIGZhbHNlLCBlcnJvcik7XG4gICAgICBpZiAoaSA9PT0gMCAmJiB0aGlzLmdsb2JhbENvbmZpZy5mb2N1c0ludmFsaWRGaWVsZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGZpZWxkLmVsZW0uZm9jdXMoKSwgMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgc2hvd0Vycm9ycyhmaWVsZHMpIHtcbiAgICBpZiAodHlwZW9mIGZpZWxkcyAhPT0gXCJvYmplY3RcIikge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIFwiW3Nob3dFcnJvcnNdOiBFcnJvcnMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIGtleTogdmFsdWUgZm9ybWF0XCJcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuc2hvd0xhYmVscyhmaWVsZHMsIHRydWUpO1xuICB9XG4gIHNob3dTdWNjZXNzTGFiZWxzKGZpZWxkcykge1xuICAgIGlmICh0eXBlb2YgZmllbGRzICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgXCJbc2hvd1N1Y2Nlc3NMYWJlbHNdOiBMYWJlbHMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIGtleTogdmFsdWUgZm9ybWF0XCJcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuc2hvd0xhYmVscyhmaWVsZHMsIGZhbHNlKTtcbiAgfVxuICByZW5kZXJGaWVsZEVycm9yKGtleSwgZm9yY2VkID0gZmFsc2UsIG1lc3NhZ2UpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW2tleV07XG4gICAgaWYgKGZpZWxkLmlzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGZpZWxkLmlzVmFsaWQgPT09IHZvaWQgMCB8fCAhZm9yY2VkICYmICF0aGlzLmlzU3VibWl0dGVkICYmICFmaWVsZC50b3VjaGVkICYmIG1lc3NhZ2UgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZmllbGQuaXNWYWxpZCkge1xuICAgICAgaWYgKCFmaWVsZC5hc3luY0NoZWNrUGVuZGluZykge1xuICAgICAgICBjb25zdCBzdWNjZXNzTGFiZWwgPSB0aGlzLmNyZWF0ZVN1Y2Nlc3NMYWJlbEVsZW0oXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIG1lc3NhZ2UgIT09IHZvaWQgMCA/IG1lc3NhZ2UgOiBmaWVsZC5zdWNjZXNzTWVzc2FnZSxcbiAgICAgICAgICBmaWVsZC5jb25maWdcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHN1Y2Nlc3NMYWJlbCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyRmllbGRMYWJlbChcbiAgICAgICAgICAgIGZpZWxkLmVsZW0sXG4gICAgICAgICAgICBzdWNjZXNzTGFiZWwsXG4gICAgICAgICAgICAoX2EgPSBmaWVsZC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfYS5lcnJvcnNDb250YWluZXIsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBmaWVsZC5lbGVtLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgLi4uZ2V0Q2xhc3NMaXN0KFxuICAgICAgICAgICAgKChfYiA9IGZpZWxkLmNvbmZpZykgPT0gbnVsbCA/IHZvaWQgMCA6IF9iLnN1Y2Nlc3NGaWVsZENzc0NsYXNzKSB8fCB0aGlzLmdsb2JhbENvbmZpZy5zdWNjZXNzRmllbGRDc3NDbGFzc1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZmllbGQuZWxlbS5jbGFzc0xpc3QuYWRkKFxuICAgICAgLi4uZ2V0Q2xhc3NMaXN0KFxuICAgICAgICAoKF9jID0gZmllbGQuY29uZmlnKSA9PSBudWxsID8gdm9pZCAwIDogX2MuZXJyb3JGaWVsZENzc0NsYXNzKSB8fCB0aGlzLmdsb2JhbENvbmZpZy5lcnJvckZpZWxkQ3NzQ2xhc3NcbiAgICAgIClcbiAgICApO1xuICAgIGNvbnN0IGVycm9yTGFiZWwgPSB0aGlzLmNyZWF0ZUVycm9yTGFiZWxFbGVtKFxuICAgICAga2V5LFxuICAgICAgbWVzc2FnZSAhPT0gdm9pZCAwID8gbWVzc2FnZSA6IGZpZWxkLmVycm9yTWVzc2FnZSxcbiAgICAgIGZpZWxkLmNvbmZpZ1xuICAgICk7XG4gICAgdGhpcy5yZW5kZXJGaWVsZExhYmVsKFxuICAgICAgZmllbGQuZWxlbSxcbiAgICAgIGVycm9yTGFiZWwsXG4gICAgICAoX2QgPSBmaWVsZC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfZC5lcnJvcnNDb250YWluZXJcbiAgICApO1xuICAgIGlmICh0aGlzLmlzVG9vbHRpcCgpKSB7XG4gICAgICB0aGlzLnRvb2x0aXBzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyVG9vbHRpcChcbiAgICAgICAgICBmaWVsZC5lbGVtLFxuICAgICAgICAgIGVycm9yTGFiZWwsXG4gICAgICAgICAgKF9mID0gKF9lID0gZmllbGQuY29uZmlnKSA9PSBudWxsID8gdm9pZCAwIDogX2UudG9vbHRpcCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9mLnBvc2l0aW9uXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJlbmRlckdyb3VwRXJyb3Ioa2V5LCBmb3JjZSA9IHRydWUpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdyb3VwRmllbGRzW2tleV07XG4gICAgaWYgKGdyb3VwLmlzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGdyb3VwLmlzVmFsaWQgPT09IHZvaWQgMCB8fCAhZm9yY2UgJiYgIXRoaXMuaXNTdWJtaXR0ZWQgJiYgIWdyb3VwLnRvdWNoZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGdyb3VwLmlzVmFsaWQpIHtcbiAgICAgIGdyb3VwLmVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgdmFyIF9hMiwgX2IyO1xuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIGVsZW0uc3R5bGUsXG4gICAgICAgICAgKChfYTIgPSBncm91cC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfYTIuc3VjY2Vzc0ZpZWxkU3R5bGUpIHx8IHRoaXMuZ2xvYmFsQ29uZmlnLnN1Y2Nlc3NGaWVsZFN0eWxlXG4gICAgICAgICk7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAuLi5nZXRDbGFzc0xpc3QoXG4gICAgICAgICAgICAoKF9iMiA9IGdyb3VwLmNvbmZpZykgPT0gbnVsbCA/IHZvaWQgMCA6IF9iMi5zdWNjZXNzRmllbGRDc3NDbGFzcykgfHwgdGhpcy5nbG9iYWxDb25maWcuc3VjY2Vzc0ZpZWxkQ3NzQ2xhc3NcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NMYWJlbCA9IHRoaXMuY3JlYXRlU3VjY2Vzc0xhYmVsRWxlbShcbiAgICAgICAga2V5LFxuICAgICAgICBncm91cC5zdWNjZXNzTWVzc2FnZSxcbiAgICAgICAgZ3JvdXAuY29uZmlnXG4gICAgICApO1xuICAgICAgaWYgKHN1Y2Nlc3NMYWJlbCkge1xuICAgICAgICB0aGlzLnJlbmRlckdyb3VwTGFiZWwoXG4gICAgICAgICAgZ3JvdXAuZ3JvdXBFbGVtLFxuICAgICAgICAgIHN1Y2Nlc3NMYWJlbCxcbiAgICAgICAgICAoX2EgPSBncm91cC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfYS5lcnJvcnNDb250YWluZXIsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICBncm91cC5lbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICB2YXIgX2EyLCBfYjI7XG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICBlbGVtLnN0eWxlLFxuICAgICAgICAoKF9hMiA9IGdyb3VwLmNvbmZpZykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hMi5lcnJvckZpZWxkU3R5bGUpIHx8IHRoaXMuZ2xvYmFsQ29uZmlnLmVycm9yRmllbGRTdHlsZVxuICAgICAgKTtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgLi4uZ2V0Q2xhc3NMaXN0KFxuICAgICAgICAgICgoX2IyID0gZ3JvdXAuY29uZmlnKSA9PSBudWxsID8gdm9pZCAwIDogX2IyLmVycm9yRmllbGRDc3NDbGFzcykgfHwgdGhpcy5nbG9iYWxDb25maWcuZXJyb3JGaWVsZENzc0NsYXNzXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gICAgY29uc3QgZXJyb3JMYWJlbCA9IHRoaXMuY3JlYXRlRXJyb3JMYWJlbEVsZW0oXG4gICAgICBrZXksXG4gICAgICBncm91cC5lcnJvck1lc3NhZ2UsXG4gICAgICBncm91cC5jb25maWdcbiAgICApO1xuICAgIHRoaXMucmVuZGVyR3JvdXBMYWJlbChcbiAgICAgIGdyb3VwLmdyb3VwRWxlbSxcbiAgICAgIGVycm9yTGFiZWwsXG4gICAgICAoX2IgPSBncm91cC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfYi5lcnJvcnNDb250YWluZXJcbiAgICApO1xuICAgIGlmICh0aGlzLmlzVG9vbHRpcCgpKSB7XG4gICAgICB0aGlzLnRvb2x0aXBzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyVG9vbHRpcChcbiAgICAgICAgICBncm91cC5ncm91cEVsZW0sXG4gICAgICAgICAgZXJyb3JMYWJlbCxcbiAgICAgICAgICAoX2QgPSAoX2MgPSBncm91cC5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfYy50b29sdGlwKSA9PSBudWxsID8gdm9pZCAwIDogX2QucG9zaXRpb25cbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyRXJyb3JzKGZvcmNlUmV2YWxpZGF0aW9uID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaXNTdWJtaXR0ZWQgJiYgIWZvcmNlUmV2YWxpZGF0aW9uICYmICF0aGlzLmdsb2JhbENvbmZpZy52YWxpZGF0ZUJlZm9yZVN1Ym1pdHRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5ncm91cEZpZWxkcykge1xuICAgICAgdGhpcy5yZW5kZXJHcm91cEVycm9yKGtleSk7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZmllbGRzKSB7XG4gICAgICB0aGlzLnJlbmRlckZpZWxkRXJyb3Ioa2V5KTtcbiAgICB9XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LnR5cGUsIGV2ZW50LmVsZW0sIGV2ZW50LmZ1bmMpO1xuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuY3VzdG9tU3R5bGVUYWdzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMuY3VzdG9tU3R5bGVUYWdzW2tleV0ucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIGlmICh0aGlzLmdsb2JhbENvbmZpZy5sb2NrRm9ybSkge1xuICAgICAgdGhpcy51bmxvY2tGb3JtKCk7XG4gICAgfVxuICB9XG4gIHJlZnJlc2goKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgaW5pdGlhbGl6ZSB0aGUgbGlicmFyeSEgRm9ybSBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsaXplKHRoaXMuZm9ybSwgdGhpcy5nbG9iYWxDb25maWcpO1xuICAgICAgT2JqZWN0LmtleXModGhpcy5maWVsZHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZFNlbGVjdG9yID0gdGhpcy5nZXRGaWVsZFNlbGVjdG9yQnlLZXkoa2V5KTtcbiAgICAgICAgaWYgKGZpZWxkU2VsZWN0b3IpIHtcbiAgICAgICAgICB0aGlzLmFkZEZpZWxkKFxuICAgICAgICAgICAgZmllbGRTZWxlY3RvcixcbiAgICAgICAgICAgIFsuLi50aGlzLmZpZWxkc1trZXldLnJ1bGVzXSxcbiAgICAgICAgICAgIHRoaXMuZmllbGRzW2tleV0uY29uZmlnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHNldEN1cnJlbnRMb2NhbGUobG9jYWxlKSB7XG4gICAgaWYgKHR5cGVvZiBsb2NhbGUgIT09IFwic3RyaW5nXCIgJiYgbG9jYWxlICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGxvY2FsZSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudExvY2FsZSA9IGxvY2FsZTtcbiAgICBpZiAodGhpcy5pc1N1Ym1pdHRlZCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBvblN1Y2Nlc3MoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uU3VjY2Vzc0NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb25GYWlsKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbkZhaWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9uVmFsaWRhdGUoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uVmFsaWRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5leHBvcnQge1xuICBDdXN0b21TdHlsZVRhZ0lkcyxcbiAgR3JvdXBSdWxlcyxcbiAgUnVsZXMsXG4gIEp1c3RWYWxpZGF0ZSBhcyBkZWZhdWx0XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbnVtYmVySXNOYU4gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXMoYSwgYikge1xuXHRpZiAoYSA9PT0gMCAmJiBiID09PSAwKSB7XG5cdFx0cmV0dXJuIDEgLyBhID09PSAxIC8gYjtcblx0fVxuXHRpZiAoYSA9PT0gYikge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChudW1iZXJJc05hTihhKSAmJiBudW1iZXJJc05hTihiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCdjYWxsLWJpbmQnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIHBvbHlmaWxsID0gY2FsbEJpbmQoZ2V0UG9seWZpbGwoKSwgT2JqZWN0KTtcblxuZGVmaW5lKHBvbHlmaWxsLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb2x5ZmlsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRyZXR1cm4gdHlwZW9mIE9iamVjdC5pcyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5pcyA6IGltcGxlbWVudGF0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbU9iamVjdElzKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoT2JqZWN0LCB7IGlzOiBwb2x5ZmlsbCB9LCB7XG5cdFx0aXM6IGZ1bmN0aW9uIHRlc3RPYmplY3RJcygpIHtcblx0XHRcdHJldHVybiBPYmplY3QuaXMgIT09IHBvbHlmaWxsO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzU2hpbTtcbmlmICghT2JqZWN0LmtleXMpIHtcblx0Ly8gbW9kaWZpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW1cblx0dmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cdHZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZ2xvYmFsLXJlcXVpcmVcblx0dmFyIGlzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cdHZhciBoYXNEb250RW51bUJ1ZyA9ICFpc0VudW1lcmFibGUuY2FsbCh7IHRvU3RyaW5nOiBudWxsIH0sICd0b1N0cmluZycpO1xuXHR2YXIgaGFzUHJvdG9FbnVtQnVnID0gaXNFbnVtZXJhYmxlLmNhbGwoZnVuY3Rpb24gKCkge30sICdwcm90b3R5cGUnKTtcblx0dmFyIGRvbnRFbnVtcyA9IFtcblx0XHQndG9TdHJpbmcnLFxuXHRcdCd0b0xvY2FsZVN0cmluZycsXG5cdFx0J3ZhbHVlT2YnLFxuXHRcdCdoYXNPd25Qcm9wZXJ0eScsXG5cdFx0J2lzUHJvdG90eXBlT2YnLFxuXHRcdCdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG5cdFx0J2NvbnN0cnVjdG9yJ1xuXHRdO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUgPSBmdW5jdGlvbiAobykge1xuXHRcdHZhciBjdG9yID0gby5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gY3RvciAmJiBjdG9yLnByb3RvdHlwZSA9PT0gbztcblx0fTtcblx0dmFyIGV4Y2x1ZGVkS2V5cyA9IHtcblx0XHQkYXBwbGljYXRpb25DYWNoZTogdHJ1ZSxcblx0XHQkY29uc29sZTogdHJ1ZSxcblx0XHQkZXh0ZXJuYWw6IHRydWUsXG5cdFx0JGZyYW1lOiB0cnVlLFxuXHRcdCRmcmFtZUVsZW1lbnQ6IHRydWUsXG5cdFx0JGZyYW1lczogdHJ1ZSxcblx0XHQkaW5uZXJIZWlnaHQ6IHRydWUsXG5cdFx0JGlubmVyV2lkdGg6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmNoYW5nZTogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuZXJyb3I6IHRydWUsXG5cdFx0JG91dGVySGVpZ2h0OiB0cnVlLFxuXHRcdCRvdXRlcldpZHRoOiB0cnVlLFxuXHRcdCRwYWdlWE9mZnNldDogdHJ1ZSxcblx0XHQkcGFnZVlPZmZzZXQ6IHRydWUsXG5cdFx0JHBhcmVudDogdHJ1ZSxcblx0XHQkc2Nyb2xsTGVmdDogdHJ1ZSxcblx0XHQkc2Nyb2xsVG9wOiB0cnVlLFxuXHRcdCRzY3JvbGxYOiB0cnVlLFxuXHRcdCRzY3JvbGxZOiB0cnVlLFxuXHRcdCRzZWxmOiB0cnVlLFxuXHRcdCR3ZWJraXRJbmRleGVkREI6IHRydWUsXG5cdFx0JHdlYmtpdFN0b3JhZ2VJbmZvOiB0cnVlLFxuXHRcdCR3aW5kb3c6IHRydWVcblx0fTtcblx0dmFyIGhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1ZyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKHZhciBrIGluIHdpbmRvdykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFleGNsdWRlZEtleXNbJyQnICsga10gJiYgaGFzLmNhbGwod2luZG93LCBrKSAmJiB3aW5kb3dba10gIT09IG51bGwgJiYgdHlwZW9mIHdpbmRvd1trXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0ZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUod2luZG93W2tdKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSgpKTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnKSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fTtcblxuXHRrZXlzU2hpbSA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG5cdFx0dmFyIGlzT2JqZWN0ID0gb2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnO1xuXHRcdHZhciBpc0Z1bmN0aW9uID0gdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHRcdHZhciBpc0FyZ3VtZW50cyA9IGlzQXJncyhvYmplY3QpO1xuXHRcdHZhciBpc1N0cmluZyA9IGlzT2JqZWN0ICYmIHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdFx0dmFyIHRoZUtleXMgPSBbXTtcblxuXHRcdGlmICghaXNPYmplY3QgJiYgIWlzRnVuY3Rpb24gJiYgIWlzQXJndW1lbnRzKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gYSBub24tb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0dmFyIHNraXBQcm90byA9IGhhc1Byb3RvRW51bUJ1ZyAmJiBpc0Z1bmN0aW9uO1xuXHRcdGlmIChpc1N0cmluZyAmJiBvYmplY3QubGVuZ3RoID4gMCAmJiAhaGFzLmNhbGwob2JqZWN0LCAwKSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzQXJndW1lbnRzICYmIG9iamVjdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG9iamVjdC5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGopKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcblx0XHRcdFx0aWYgKCEoc2tpcFByb3RvICYmIG5hbWUgPT09ICdwcm90b3R5cGUnKSAmJiBoYXMuY2FsbChvYmplY3QsIG5hbWUpKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhuYW1lKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaGFzRG9udEVudW1CdWcpIHtcblx0XHRcdHZhciBza2lwQ29uc3RydWN0b3IgPSBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kob2JqZWN0KTtcblxuXHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBkb250RW51bXMubGVuZ3RoOyArK2spIHtcblx0XHRcdFx0aWYgKCEoc2tpcENvbnN0cnVjdG9yICYmIGRvbnRFbnVtc1trXSA9PT0gJ2NvbnN0cnVjdG9yJykgJiYgaGFzLmNhbGwob2JqZWN0LCBkb250RW51bXNba10pKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKGRvbnRFbnVtc1trXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoZUtleXM7XG5cdH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpO1xuXG52YXIgb3JpZ0tleXMgPSBPYmplY3Qua2V5cztcbnZhciBrZXlzU2hpbSA9IG9yaWdLZXlzID8gZnVuY3Rpb24ga2V5cyhvKSB7IHJldHVybiBvcmlnS2V5cyhvKTsgfSA6IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIG9yaWdpbmFsS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5rZXlzU2hpbS5zaGltID0gZnVuY3Rpb24gc2hpbU9iamVjdEtleXMoKSB7XG5cdGlmIChPYmplY3Qua2V5cykge1xuXHRcdHZhciBrZXlzV29ya3NXaXRoQXJndW1lbnRzID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFNhZmFyaSA1LjAgYnVnXG5cdFx0XHR2YXIgYXJncyA9IE9iamVjdC5rZXlzKGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHR9KDEsIDIpKTtcblx0XHRpZiAoIWtleXNXb3Jrc1dpdGhBcmd1bWVudHMpIHtcblx0XHRcdE9iamVjdC5rZXlzID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcblx0XHRcdFx0aWYgKGlzQXJncyhvYmplY3QpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhzbGljZS5jYWxsKG9iamVjdCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMob2JqZWN0KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdE9iamVjdC5rZXlzID0ga2V5c1NoaW07XG5cdH1cblx0cmV0dXJuIE9iamVjdC5rZXlzIHx8IGtleXNTaGltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHR2YXIgc3RyID0gdG9TdHIuY2FsbCh2YWx1ZSk7XG5cdHZhciBpc0FyZ3MgPSBzdHIgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXHRpZiAoIWlzQXJncykge1xuXHRcdGlzQXJncyA9IHN0ciAhPT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuXHRcdFx0dmFsdWUgIT09IG51bGwgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInICYmXG5cdFx0XHR2YWx1ZS5sZW5ndGggPj0gMCAmJlxuXHRcdFx0dG9TdHIuY2FsbCh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHR9XG5cdHJldHVybiBpc0FyZ3M7XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL3V0aWwvdHlwZXMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMTEyY2M3YzI3NTUxMjU0YWEyYjE3MDk4ZmI3NzQ4NjdmMDVlZDBkOVxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc0FyZ3VtZW50c09iamVjdCA9IHJlcXVpcmUoJ2lzLWFyZ3VtZW50cycpO1xudmFyIGlzR2VuZXJhdG9yRnVuY3Rpb24gPSByZXF1aXJlKCdpcy1nZW5lcmF0b3ItZnVuY3Rpb24nKTtcbnZhciB3aGljaFR5cGVkQXJyYXkgPSByZXF1aXJlKCd3aGljaC10eXBlZC1hcnJheScpO1xudmFyIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2lzLXR5cGVkLWFycmF5Jyk7XG5cbmZ1bmN0aW9uIHVuY3VycnlUaGlzKGYpIHtcbiAgcmV0dXJuIGYuY2FsbC5iaW5kKGYpO1xufVxuXG52YXIgQmlnSW50U3VwcG9ydGVkID0gdHlwZW9mIEJpZ0ludCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgU3ltYm9sU3VwcG9ydGVkID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBPYmplY3RUb1N0cmluZyA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpO1xuXG52YXIgbnVtYmVyVmFsdWUgPSB1bmN1cnJ5VGhpcyhOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YpO1xudmFyIHN0cmluZ1ZhbHVlID0gdW5jdXJyeVRoaXMoU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mKTtcbnZhciBib29sZWFuVmFsdWUgPSB1bmN1cnJ5VGhpcyhCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mKTtcblxuaWYgKEJpZ0ludFN1cHBvcnRlZCkge1xuICB2YXIgYmlnSW50VmFsdWUgPSB1bmN1cnJ5VGhpcyhCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YpO1xufVxuXG5pZiAoU3ltYm9sU3VwcG9ydGVkKSB7XG4gIHZhciBzeW1ib2xWYWx1ZSA9IHVuY3VycnlUaGlzKFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZik7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHByb3RvdHlwZVZhbHVlT2YpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICBwcm90b3R5cGVWYWx1ZU9mKHZhbHVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydHMuaXNBcmd1bWVudHNPYmplY3QgPSBpc0FyZ3VtZW50c09iamVjdDtcbmV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGlzR2VuZXJhdG9yRnVuY3Rpb247XG5leHBvcnRzLmlzVHlwZWRBcnJheSA9IGlzVHlwZWRBcnJheTtcblxuLy8gVGFrZW4gZnJvbSBoZXJlIGFuZCBtb2RpZmllZCBmb3IgYmV0dGVyIGJyb3dzZXIgc3VwcG9ydFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9wLWlzLXByb21pc2UvYmxvYi9jZGEzNWE1MTNiZGEwM2Y5NzdhZDVjZGUzYTA3OWQyMzdlODJkN2VmL2luZGV4LmpzXG5mdW5jdGlvbiBpc1Byb21pc2UoaW5wdXQpIHtcblx0cmV0dXJuIChcblx0XHQoXG5cdFx0XHR0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdGlucHV0IGluc3RhbmNlb2YgUHJvbWlzZVxuXHRcdCkgfHxcblx0XHQoXG5cdFx0XHRpbnB1dCAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIGlucHV0LnRoZW4gPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdHR5cGVvZiBpbnB1dC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdClcblx0KTtcbn1cbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgaXNUeXBlZEFycmF5KHZhbHVlKSB8fFxuICAgIGlzRGF0YVZpZXcodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXJWaWV3ID0gaXNBcnJheUJ1ZmZlclZpZXc7XG5cblxuZnVuY3Rpb24gaXNVaW50OEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDhBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDhBcnJheSA9IGlzVWludDhBcnJheTtcblxuZnVuY3Rpb24gaXNVaW50OENsYW1wZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ1VpbnQ4Q2xhbXBlZEFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50OENsYW1wZWRBcnJheSA9IGlzVWludDhDbGFtcGVkQXJyYXk7XG5cbmZ1bmN0aW9uIGlzVWludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50MTZBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDE2QXJyYXkgPSBpc1VpbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc1VpbnQzMkFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDMyQXJyYXknO1xufVxuZXhwb3J0cy5pc1VpbnQzMkFycmF5ID0gaXNVaW50MzJBcnJheTtcblxuZnVuY3Rpb24gaXNJbnQ4QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQ4QXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDhBcnJheSA9IGlzSW50OEFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQxNkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQxNkFycmF5ID0gaXNJbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDMyQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQzMkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQzMkFycmF5ID0gaXNJbnQzMkFycmF5O1xuXG5mdW5jdGlvbiBpc0Zsb2F0MzJBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0Zsb2F0MzJBcnJheSc7XG59XG5leHBvcnRzLmlzRmxvYXQzMkFycmF5ID0gaXNGbG9hdDMyQXJyYXk7XG5cbmZ1bmN0aW9uIGlzRmxvYXQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnRmxvYXQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNGbG9hdDY0QXJyYXkgPSBpc0Zsb2F0NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdJbnQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnQmlnSW50NjRBcnJheSc7XG59XG5leHBvcnRzLmlzQmlnSW50NjRBcnJheSA9IGlzQmlnSW50NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdVaW50NjRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0JpZ1VpbnQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNCaWdVaW50NjRBcnJheSA9IGlzQmlnVWludDY0QXJyYXk7XG5cbmZ1bmN0aW9uIGlzTWFwVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgTWFwXSc7XG59XG5pc01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzTWFwVG9TdHJpbmcobmV3IE1hcCgpKVxuKTtcblxuZnVuY3Rpb24gaXNNYXAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzTWFwVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNNYXBUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgTWFwO1xufVxuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xuXG5mdW5jdGlvbiBpc1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNldF0nO1xufVxuaXNTZXRUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1NldFRvU3RyaW5nKG5ldyBTZXQoKSlcbik7XG5mdW5jdGlvbiBpc1NldCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNTZXRUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NldFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBTZXQ7XG59XG5leHBvcnRzLmlzU2V0ID0gaXNTZXQ7XG5cbmZ1bmN0aW9uIGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtNYXBdJztcbn1cbmlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtNYXBUb1N0cmluZyhuZXcgV2Vha01hcCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha01hcCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBXZWFrTWFwO1xufVxuZXhwb3J0cy5pc1dlYWtNYXAgPSBpc1dlYWtNYXA7XG5cbmZ1bmN0aW9uIGlzV2Vha1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtTZXRdJztcbn1cbmlzV2Vha1NldFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtTZXRUb1N0cmluZyhuZXcgV2Vha1NldCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha1NldCh2YWx1ZSkge1xuICByZXR1cm4gaXNXZWFrU2V0VG9TdHJpbmcodmFsdWUpO1xufVxuZXhwb3J0cy5pc1dlYWtTZXQgPSBpc1dlYWtTZXQ7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNBcnJheUJ1ZmZlclRvU3RyaW5nKG5ldyBBcnJheUJ1ZmZlcigpKVxuKTtcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXIgPSBpc0FycmF5QnVmZmVyO1xuXG5mdW5jdGlvbiBpc0RhdGFWaWV3VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0YVZpZXddJztcbn1cbmlzRGF0YVZpZXdUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBEYXRhVmlldyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNEYXRhVmlld1RvU3RyaW5nKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSksIDAsIDEpKVxuKTtcbmZ1bmN0aW9uIGlzRGF0YVZpZXcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNEYXRhVmlld1RvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzRGF0YVZpZXdUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgRGF0YVZpZXc7XG59XG5leHBvcnRzLmlzRGF0YVZpZXcgPSBpc0RhdGFWaWV3O1xuXG4vLyBTdG9yZSBhIGNvcHkgb2YgU2hhcmVkQXJyYXlCdWZmZXIgaW4gY2FzZSBpdCdzIGRlbGV0ZWQgZWxzZXdoZXJlXG52YXIgU2hhcmVkQXJyYXlCdWZmZXJDb3B5ID0gdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyA/IFNoYXJlZEFycmF5QnVmZmVyIDogdW5kZWZpbmVkO1xuZnVuY3Rpb24gaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNoYXJlZEFycmF5QnVmZmVyXSc7XG59XG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXJDb3B5ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPSBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcobmV3IFNoYXJlZEFycmF5QnVmZmVyQ29weSgpKTtcbiAgfVxuXG4gIHJldHVybiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlckNvcHk7XG59XG5leHBvcnRzLmlzU2hhcmVkQXJyYXlCdWZmZXIgPSBpc1NoYXJlZEFycmF5QnVmZmVyO1xuXG5mdW5jdGlvbiBpc0FzeW5jRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nO1xufVxuZXhwb3J0cy5pc0FzeW5jRnVuY3Rpb24gPSBpc0FzeW5jRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzTWFwSXRlcmF0b3IodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgTWFwIEl0ZXJhdG9yXSc7XG59XG5leHBvcnRzLmlzTWFwSXRlcmF0b3IgPSBpc01hcEl0ZXJhdG9yO1xuXG5mdW5jdGlvbiBpc1NldEl0ZXJhdG9yKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNldCBJdGVyYXRvcl0nO1xufVxuZXhwb3J0cy5pc1NldEl0ZXJhdG9yID0gaXNTZXRJdGVyYXRvcjtcblxuZnVuY3Rpb24gaXNHZW5lcmF0b3JPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgR2VuZXJhdG9yXSc7XG59XG5leHBvcnRzLmlzR2VuZXJhdG9yT2JqZWN0ID0gaXNHZW5lcmF0b3JPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzV2ViQXNzZW1ibHlDb21waWxlZE1vZHVsZSh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBXZWJBc3NlbWJseS5Nb2R1bGVdJztcbn1cbmV4cG9ydHMuaXNXZWJBc3NlbWJseUNvbXBpbGVkTW9kdWxlID0gaXNXZWJBc3NlbWJseUNvbXBpbGVkTW9kdWxlO1xuXG5mdW5jdGlvbiBpc051bWJlck9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgbnVtYmVyVmFsdWUpO1xufVxuZXhwb3J0cy5pc051bWJlck9iamVjdCA9IGlzTnVtYmVyT2JqZWN0O1xuXG5mdW5jdGlvbiBpc1N0cmluZ09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgc3RyaW5nVmFsdWUpO1xufVxuZXhwb3J0cy5pc1N0cmluZ09iamVjdCA9IGlzU3RyaW5nT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIGJvb2xlYW5WYWx1ZSk7XG59XG5leHBvcnRzLmlzQm9vbGVhbk9iamVjdCA9IGlzQm9vbGVhbk9iamVjdDtcblxuZnVuY3Rpb24gaXNCaWdJbnRPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIEJpZ0ludFN1cHBvcnRlZCAmJiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBiaWdJbnRWYWx1ZSk7XG59XG5leHBvcnRzLmlzQmlnSW50T2JqZWN0ID0gaXNCaWdJbnRPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBTeW1ib2xTdXBwb3J0ZWQgJiYgY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgc3ltYm9sVmFsdWUpO1xufVxuZXhwb3J0cy5pc1N5bWJvbE9iamVjdCA9IGlzU3ltYm9sT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0JveGVkUHJpbWl0aXZlKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgaXNOdW1iZXJPYmplY3QodmFsdWUpIHx8XG4gICAgaXNTdHJpbmdPYmplY3QodmFsdWUpIHx8XG4gICAgaXNCb29sZWFuT2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzQmlnSW50T2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzU3ltYm9sT2JqZWN0KHZhbHVlKVxuICApO1xufVxuZXhwb3J0cy5pc0JveGVkUHJpbWl0aXZlID0gaXNCb3hlZFByaW1pdGl2ZTtcblxuZnVuY3Rpb24gaXNBbnlBcnJheUJ1ZmZlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIChcbiAgICBpc0FycmF5QnVmZmVyKHZhbHVlKSB8fFxuICAgIGlzU2hhcmVkQXJyYXlCdWZmZXIodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQW55QXJyYXlCdWZmZXIgPSBpc0FueUFycmF5QnVmZmVyO1xuXG5bJ2lzUHJveHknLCAnaXNFeHRlcm5hbCcsICdpc01vZHVsZU5hbWVzcGFjZU9iamVjdCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBtZXRob2QsIHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWV0aG9kICsgJyBpcyBub3Qgc3VwcG9ydGVkIGluIHVzZXJsYW5kJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgfHxcbiAgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgdmFyIGRlc2NyaXB0b3JzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXNjcmlwdG9yc1trZXlzW2ldXSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXlzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xuICB9O1xuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0VudlJlZ2V4ID0gL14kLztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfREVCVUcpIHtcbiAgdmFyIGRlYnVnRW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRztcbiAgZGVidWdFbnYgPSBkZWJ1Z0Vudi5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKz8uXS9nLCAnXFxcXCQmJylcbiAgICAucmVwbGFjZSgvXFwqL2csICcuKicpXG4gICAgLnJlcGxhY2UoLywvZywgJyR8XicpXG4gICAgLnRvVXBwZXJDYXNlKCk7XG4gIGRlYnVnRW52UmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIGRlYnVnRW52ICsgJyQnLCAnaScpO1xufVxuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChkZWJ1Z0VudlJlZ2V4LnRlc3Qoc2V0KSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zbGljZSgyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDEsIC0xKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5leHBvcnRzLnR5cGVzID0gcmVxdWlyZSgnLi9zdXBwb3J0L3R5cGVzJyk7XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5leHBvcnRzLnR5cGVzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuZXhwb3J0cy50eXBlcy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcbmV4cG9ydHMudHlwZXMuaXNOYXRpdmVFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbnZhciBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbCgndXRpbC5wcm9taXNpZnkuY3VzdG9tJykgOiB1bmRlZmluZWQ7XG5cbmV4cG9ydHMucHJvbWlzaWZ5ID0gZnVuY3Rpb24gcHJvbWlzaWZ5KG9yaWdpbmFsKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWwgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sICYmIG9yaWdpbmFsW2tDdXN0b21Qcm9taXNpZmllZFN5bWJvbF0pIHtcbiAgICB2YXIgZm4gPSBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdO1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInV0aWwucHJvbWlzaWZ5LmN1c3RvbVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgICAgdmFsdWU6IGZuLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICBmdW5jdGlvbiBmbigpIHtcbiAgICB2YXIgcHJvbWlzZVJlc29sdmUsIHByb21pc2VSZWplY3Q7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBwcm9taXNlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICBwcm9taXNlUmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuXG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuICAgIGFyZ3MucHVzaChmdW5jdGlvbiAoZXJyLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBwcm9taXNlUmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBwcm9taXNlUmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZm4sIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuXG4gIGlmIChrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sLCB7XG4gICAgdmFsdWU6IGZuLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcbiAgICBmbixcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKVxuICApO1xufVxuXG5leHBvcnRzLnByb21pc2lmeS5jdXN0b20gPSBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xcblxuZnVuY3Rpb24gY2FsbGJhY2tpZnlPblJlamVjdGVkKHJlYXNvbiwgY2IpIHtcbiAgLy8gYCFyZWFzb25gIGd1YXJkIGluc3BpcmVkIGJ5IGJsdWViaXJkIChSZWY6IGh0dHBzOi8vZ29vLmdsL3Q1SVM2TSkuXG4gIC8vIEJlY2F1c2UgYG51bGxgIGlzIGEgc3BlY2lhbCBlcnJvciB2YWx1ZSBpbiBjYWxsYmFja3Mgd2hpY2ggbWVhbnMgXCJubyBlcnJvclxuICAvLyBvY2N1cnJlZFwiLCB3ZSBlcnJvci13cmFwIHNvIHRoZSBjYWxsYmFjayBjb25zdW1lciBjYW4gZGlzdGluZ3Vpc2ggYmV0d2VlblxuICAvLyBcInRoZSBwcm9taXNlIHJlamVjdGVkIHdpdGggbnVsbFwiIG9yIFwidGhlIHByb21pc2UgZnVsZmlsbGVkIHdpdGggdW5kZWZpbmVkXCIuXG4gIGlmICghcmVhc29uKSB7XG4gICAgdmFyIG5ld1JlYXNvbiA9IG5ldyBFcnJvcignUHJvbWlzZSB3YXMgcmVqZWN0ZWQgd2l0aCBhIGZhbHN5IHZhbHVlJyk7XG4gICAgbmV3UmVhc29uLnJlYXNvbiA9IHJlYXNvbjtcbiAgICByZWFzb24gPSBuZXdSZWFzb247XG4gIH1cbiAgcmV0dXJuIGNiKHJlYXNvbik7XG59XG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5KG9yaWdpbmFsKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcmlnaW5hbFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICB9XG5cbiAgLy8gV2UgRE8gTk9UIHJldHVybiB0aGUgcHJvbWlzZSBhcyBpdCBnaXZlcyB0aGUgdXNlciBhIGZhbHNlIHNlbnNlIHRoYXRcbiAgLy8gdGhlIHByb21pc2UgaXMgYWN0dWFsbHkgc29tZWhvdyByZWxhdGVkIHRvIHRoZSBjYWxsYmFjaydzIGV4ZWN1dGlvblxuICAvLyBhbmQgdGhhdCB0aGUgY2FsbGJhY2sgdGhyb3dpbmcgd2lsbCByZWplY3QgdGhlIHByb21pc2UuXG4gIGZ1bmN0aW9uIGNhbGxiYWNraWZpZWQoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG1heWJlQ2IgPSBhcmdzLnBvcCgpO1xuICAgIGlmICh0eXBlb2YgbWF5YmVDYiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGxhc3QgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY2IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtYXliZUNiLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICAvLyBJbiB0cnVlIG5vZGUgc3R5bGUgd2UgcHJvY2VzcyB0aGUgY2FsbGJhY2sgb24gYG5leHRUaWNrYCB3aXRoIGFsbCB0aGVcbiAgICAvLyBpbXBsaWNhdGlvbnMgKHN0YWNrLCBgdW5jYXVnaHRFeGNlcHRpb25gLCBgYXN5bmNfaG9va3NgKVxuICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXQpIHsgcHJvY2Vzcy5uZXh0VGljayhjYi5iaW5kKG51bGwsIG51bGwsIHJldCkpIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihyZWopIHsgcHJvY2Vzcy5uZXh0VGljayhjYWxsYmFja2lmeU9uUmVqZWN0ZWQuYmluZChudWxsLCByZWosIGNiKSkgfSk7XG4gIH1cblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY2FsbGJhY2tpZmllZCwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNhbGxiYWNraWZpZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3JpZ2luYWwpKTtcbiAgcmV0dXJuIGNhbGxiYWNraWZpZWQ7XG59XG5leHBvcnRzLmNhbGxiYWNraWZ5ID0gY2FsbGJhY2tpZnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbnZhciBhdmFpbGFibGVUeXBlZEFycmF5cyA9IHJlcXVpcmUoJ2F2YWlsYWJsZS10eXBlZC1hcnJheXMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG52YXIgZ09QRCA9IHJlcXVpcmUoJ2dvcGQnKTtcblxudmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gcmVxdWlyZSgnaGFzLXRvc3RyaW5ndGFnL3NoYW1zJykoKTtcblxudmFyIGcgPSB0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiBnbG9iYWxUaGlzO1xudmFyIHR5cGVkQXJyYXlzID0gYXZhaWxhYmxlVHlwZWRBcnJheXMoKTtcblxudmFyICRzbGljZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5zbGljZScpO1xudmFyIHRvU3RyVGFncyA9IHt9O1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mOyAvLyByZXF1aXJlKCdnZXRwcm90b3R5cGVvZicpO1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG90eXBlT2YpIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHRpZiAodHlwZW9mIGdbdHlwZWRBcnJheV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhciBhcnIgPSBuZXcgZ1t0eXBlZEFycmF5XSgpO1xuXHRcdFx0aWYgKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBhcnIpIHtcblx0XHRcdFx0dmFyIHByb3RvID0gZ2V0UHJvdG90eXBlT2YoYXJyKTtcblx0XHRcdFx0dmFyIGRlc2NyaXB0b3IgPSBnT1BEKHByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdFx0XHRpZiAoIWRlc2NyaXB0b3IpIHtcblx0XHRcdFx0XHR2YXIgc3VwZXJQcm90byA9IGdldFByb3RvdHlwZU9mKHByb3RvKTtcblx0XHRcdFx0XHRkZXNjcmlwdG9yID0gZ09QRChzdXBlclByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRvU3RyVGFnc1t0eXBlZEFycmF5XSA9IGRlc2NyaXB0b3IuZ2V0O1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbnZhciB0cnlUeXBlZEFycmF5cyA9IGZ1bmN0aW9uIHRyeUFsbFR5cGVkQXJyYXlzKHZhbHVlKSB7XG5cdHZhciBmb3VuZE5hbWUgPSBmYWxzZTtcblx0Zm9yRWFjaCh0b1N0clRhZ3MsIGZ1bmN0aW9uIChnZXR0ZXIsIHR5cGVkQXJyYXkpIHtcblx0XHRpZiAoIWZvdW5kTmFtZSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIG5hbWUgPSBnZXR0ZXIuY2FsbCh2YWx1ZSk7XG5cdFx0XHRcdGlmIChuYW1lID09PSB0eXBlZEFycmF5KSB7XG5cdFx0XHRcdFx0Zm91bmROYW1lID0gbmFtZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZm91bmROYW1lO1xufTtcblxudmFyIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2lzLXR5cGVkLWFycmF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSB7XG5cdGlmICghaXNUeXBlZEFycmF5KHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKCFoYXNUb1N0cmluZ1RhZyB8fCAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWx1ZSkpIHsgcmV0dXJuICRzbGljZSgkdG9TdHJpbmcodmFsdWUpLCA4LCAtMSk7IH1cblx0cmV0dXJuIHRyeVR5cGVkQXJyYXlzKHZhbHVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBwb3NzaWJsZU5hbWVzID0gW1xuXHQnQmlnSW50NjRBcnJheScsXG5cdCdCaWdVaW50NjRBcnJheScsXG5cdCdGbG9hdDMyQXJyYXknLFxuXHQnRmxvYXQ2NEFycmF5Jyxcblx0J0ludDE2QXJyYXknLFxuXHQnSW50MzJBcnJheScsXG5cdCdJbnQ4QXJyYXknLFxuXHQnVWludDE2QXJyYXknLFxuXHQnVWludDMyQXJyYXknLFxuXHQnVWludDhBcnJheScsXG5cdCdVaW50OENsYW1wZWRBcnJheSdcbl07XG5cbnZhciBnID0gdHlwZW9mIGdsb2JhbFRoaXMgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogZ2xvYmFsVGhpcztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhdmFpbGFibGVUeXBlZEFycmF5cygpIHtcblx0dmFyIG91dCA9IFtdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHBvc3NpYmxlTmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAodHlwZW9mIGdbcG9zc2libGVOYW1lc1tpXV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdG91dFtvdXQubGVuZ3RoXSA9IHBvc3NpYmxlTmFtZXNbaV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvdXQ7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9wdWcvc3RhdGljL2hlYWRlci9idXJnZXIvYnVyZ2VyJ1xyXG5pbXBvcnQgJy4uL3B1Zy9jb21wb25lbnRzL2Zvcm0vZm9ybSdcclxuaW1wb3J0ICcuLi9wdWcvY29tcG9uZW50cy9jb250YWN0L2NvbnRhY3QnXHJcblxyXG5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcblx0Y29uc3Qgd2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gMTY3O1xyXG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wb3NpdGlvbicsIHdpbmRvd0lubmVyV2lkdGggKyAncHgnKVxyXG59KVxyXG4iXSwibmFtZXMiOlsiSnVzdFZhbGlkYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJ2YWxpZGF0aW9uVHdvIiwiZXJyb3JGaWVsZENzc0NsYXNzIiwiZXJyb3JMYWJlbENzc0NsYXNzIiwic3VjY2Vzc0ZpZWxkQ3NzQ2xhc3MiLCJmb2N1c0ludmFsaWRGaWVsZCIsImxvY2tGb3JtIiwiYWRkRmllbGQiLCJydWxlIiwidmFsdWUiLCJlcnJvck1lc3NhZ2UiLCJvblN1Y2Nlc3MiLCJldmVudCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJ0YXJnZXQiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwib3BlbiIsInNlbmQiLCJyZXNldCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZSIsInJlbW92ZSIsImZvcm0iLCJ0ZWxTZWxlY3RvciIsImlucHV0TWFzayIsIklucHV0bWFzayIsIm1hc2siLCJ2YWxpZGF0aW9uIiwidmFsaWRhdG9yIiwicGhvbmUiLCJpbnB1dG1hc2siLCJ1bm1hc2tlZHZhbHVlIiwibGVuZ3RoIiwidW5sb2NrIiwiYm9keV9sb2NrIiwiZGVsYXkiLCJib2R5IiwiYm9keV9sb2NrX3JlbW92ZSIsImJvZHlfbG9ja19hZGQiLCJsb2NrX3BhZGRpbmciLCJzZXRUaW1lb3V0IiwiaW5kZXgiLCJlbCIsInN0eWxlIiwicGFkZGluZ1JpZ2h0Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIm9mZnNldFdpZHRoIiwiYWRkIiwiYm9keUxvY2tTdGF0dXMiLCJib2R5TG9ja1RvZ2dsZSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImRvY3VtZW50RWxlbWVudCIsImJvZHlVbmxvY2siLCJib2R5TG9jayIsImljb25NZW51IiwibWVudUJvZHkiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlIiwibWVudUxpbmtzIiwib25NZW51TGlua0NsaWNrIiwibWVudUxpbmsiLCJkYXRhc2V0IiwibGluayIsImxpbmtCbG9jayIsImxpbmtCbG9ja1ZhbHVlIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwicGFnZVlPZmZzZXQiLCJvZmZzZXRIZWlnaHQiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwicHJldmVudERlZmF1bHQiLCJzcG9pbGVyc0FycmF5IiwiaW5pdFNwb2lsZXJzIiwibWF0Y2hNZWRpYSIsInNwb2lsZXJzQmxvY2siLCJpdGVtIiwibWF0Y2hlcyIsImluaXRTcG9pbGVyQm9keSIsInNldFNwb2lsZXJBY3Rpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGlkZVNwb2lsZXJCb2R5Iiwic3BvaWxlclRpdGxlcyIsInNwb2lsZXJUaXRsZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm5leHRFbGVtZW50U2libGluZyIsImhpZGRlbiIsInNldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImNsb3Nlc3QiLCJvbmVTcG9pbGVyIiwiaGlkZVNwb2lsZXJzQm9keSIsIl9zbGlkZVRvZ2dsZSIsInNwb2lsZXJBY3RpdmVUaXRsZSIsIl9zbGlkZVVwIiwic3BvaWxlcnNSZWd1bGFyIiwiQXJyYXkiLCJmcm9tIiwiZmlsdGVyIiwic2VsZiIsInNwb2lsZXJzIiwic3BsaXQiLCJzcG9pbGVyc01lZGlhIiwiYnJlYWtwb2ludHNBcnJheSIsInBhcmFtcyIsImJyZWFrcG9pbnQiLCJwYXJhbXNBcnJheSIsInR5cGUiLCJ0cmltIiwicHVzaCIsIm1lZGlhUXVlcmllcyIsIm1hcCIsImluZGV4T2YiLCJtZWRpYUJyZWFrcG9pbnQiLCJtZWRpYVR5cGUiLCJhZGRMaXN0ZW5lciIsImR1cmF0aW9uIiwidHJhbnNpdGlvblByb3BlcnR5IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInJlbW92ZVByb3BlcnR5IiwiX3NsaWRlRG93biIsIndpbmRvd0lubmVyV2lkdGgiLCJzZXRQcm9wZXJ0eSJdLCJzb3VyY2VSb290IjoiIn0=