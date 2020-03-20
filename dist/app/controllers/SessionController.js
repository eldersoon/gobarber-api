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

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _auth = require('../../config/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SessionController = function () {
  function SessionController() {
    (0, _classCallCheck3.default)(this, SessionController);
  }

  (0, _createClass3.default)(SessionController, [{
    key: 'store',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var schema, _req$body, email, password, user, id, name;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                schema = Yup.object().shape({

                  email: Yup.string().email(),
                  password: Yup.string().required()

                });
                _context.next = 3;
                return schema.isValid(req.body);

              case 3:
                if (_context.sent) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({ error: 'Email and password is required!' }));

              case 5:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context.next = 8;
                return _User2.default.findOne({
                  where: { email: email }
                });

              case 8:
                user = _context.sent;

                if (user) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt('return', res.status(401).json({ error: "User doesn't exists" }));

              case 11:
                _context.next = 13;
                return user.checkPassword(password);

              case 13:
                if (_context.sent) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('return', res.status(401).json({ error: "Incorrect email or password!" }));

              case 15:
                id = user.id, name = user.name;
                return _context.abrupt('return', res.json({
                  user: {
                    id: id,
                    name: name,
                    email: email
                  },
                  token: _jsonwebtoken2.default.sign({ id: id }, _auth2.default.secret, {
                    expiresIn: _auth2.default.expiresIn
                  })
                }));

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function store(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return store;
    }()
  }]);
  return SessionController;
}();

exports.default = new SessionController();
//# sourceMappingURL=SessionController.js.map