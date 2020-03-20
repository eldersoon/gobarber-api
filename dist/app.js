'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('dotenv/config');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _youch = require('youch');

var _youch2 = _interopRequireDefault(_youch);

var _node = require('@sentry/node');

var Sentry = _interopRequireWildcard(_node);

require('express-async-errors');

var _routes2 = require('./routes');

var _routes3 = _interopRequireDefault(_routes2);

var _sentry = require('./config/sentry');

var _sentry2 = _interopRequireDefault(_sentry);

require('./database');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  function App() {
    (0, _classCallCheck3.default)(this, App);

    this.server = (0, _express2.default)();

    Sentry.init(_sentry2.default);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  (0, _createClass3.default)(App, [{
    key: 'middlewares',
    value: function middlewares() {
      this.server.use(Sentry.Handlers.errorHandler());
      this.server.use(_express2.default.json());
      this.server.use('/files', _express2.default.static(_path2.default.resolve(__dirname, '..', 'tmp', 'uploads')));
    }
  }, {
    key: 'routes',
    value: function routes() {
      this.server.use(_routes3.default);
      this.server.use(Sentry.Handlers.errorHandler());
    }
  }, {
    key: 'exceptionHandler',
    value: function exceptionHandler() {
      var _this = this;

      this.server.use(function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, req, res, next) {
          var errors;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(process.env.NODE_ENV === 'development')) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 3;
                  return new _youch2.default(err, req).toJSON();

                case 3:
                  errors = _context.sent;
                  return _context.abrupt('return', res.status(500).json(errors));

                case 5:
                  return _context.abrupt('return', res.status(500).json({ error: 'Internal server error' }));

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return App;
}();

exports.default = new App().server;
//# sourceMappingURL=app.js.map