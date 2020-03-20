'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('util');

var _auth = require('../../config/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var authHeader, _authHeader$split, _authHeader$split2, token, decoded;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authHeader = req.headers.authorization;

            if (authHeader) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', res.status(401).json({ error: 'Token not provided!' }));

          case 3:
            _authHeader$split = authHeader.split(' '), _authHeader$split2 = (0, _slicedToArray3.default)(_authHeader$split, 2), token = _authHeader$split2[1];
            _context.prev = 4;
            _context.next = 7;
            return (0, _util.promisify)(_jsonwebtoken2.default.verify)(token, _auth2.default.secret);

          case 7:
            decoded = _context.sent;


            req.userId = decoded.id;

            return _context.abrupt('return', next());

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](4);
            return _context.abrupt('return', res.status(401).json({ error: 'Invalid token!' }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=auth.js.map