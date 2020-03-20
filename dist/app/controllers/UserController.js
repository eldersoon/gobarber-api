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

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserController = function () {
  function UserController() {
    (0, _classCallCheck3.default)(this, UserController);
  }

  (0, _createClass3.default)(UserController, [{
    key: 'store',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var schema, userExists, _ref2, id, name, email, provider;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                schema = Yup.object().shape({
                  name: Yup.string().required(),
                  email: Yup.string().email().required(),
                  password: Yup.string().required().min(6)
                });
                _context.next = 3;
                return schema.isValid(req.body);

              case 3:
                if (_context.sent) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({ error: 'Fail to validation!' }));

              case 5:
                _context.next = 7;
                return _User2.default.findOne({
                  where: { email: req.body.email }
                });

              case 7:
                userExists = _context.sent;

                if (!userExists) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({ error: 'Email alredy exists!' }));

              case 10:
                _context.next = 12;
                return _User2.default.create(req.body);

              case 12:
                _ref2 = _context.sent;
                id = _ref2.id;
                name = _ref2.name;
                email = _ref2.email;
                provider = _ref2.provider;
                return _context.abrupt('return', res.json({ id: id, name: name, email: email, provider: provider }));

              case 18:
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
  }, {
    key: 'index',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var users;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _User2.default.findAll();

              case 2:
                users = _context2.sent;

                if (users) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', res.status(404).json({ erros: 'No one user found!' }));

              case 5:
                return _context2.abrupt('return', res.json({ users: users }));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function index(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: 'show',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function show(_x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return show;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var schema, _req$body, email, oldPassword, user, userExists, _ref6, id, name, provider;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                schema = Yup.object().shape({

                  name: Yup.string(),
                  email: Yup.string().email(),
                  oldPassword: Yup.string().min(6),
                  password: Yup.string().min(6).when('oldPassword', function (oldPassword, field) {
                    return oldPassword ? field.required() : field;
                  }),
                  passwordConfirmation: Yup.string().when('password', function (password, field) {
                    return password ? field.required().oneOf([Yup.ref('password')]) : field;
                  })

                });
                _context4.next = 3;
                return schema.isValid(req.body);

              case 3:
                if (_context4.sent) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return', res.status(400).json({ error: 'Fail to validation!' }));

              case 5:
                _req$body = req.body, email = _req$body.email, oldPassword = _req$body.oldPassword;
                _context4.next = 8;
                return _User2.default.findByPk(req.userId);

              case 8:
                user = _context4.sent;

                if (!(email != user.email)) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 12;
                return _User2.default.findOne({
                  where: { email: email }
                });

              case 12:
                userExists = _context4.sent;

                if (!userExists) {
                  _context4.next = 15;
                  break;
                }

                return _context4.abrupt('return', res.status(400).json({ error: 'Email alredy exists!' }));

              case 15:
                _context4.t0 = oldPassword;

                if (!_context4.t0) {
                  _context4.next = 20;
                  break;
                }

                _context4.next = 19;
                return user.checkPassword(oldPassword);

              case 19:
                _context4.t0 = !_context4.sent;

              case 20:
                if (!_context4.t0) {
                  _context4.next = 22;
                  break;
                }

                return _context4.abrupt('return', res.status(401).json({ error: 'Incorrect current password' }));

              case 22:
                _context4.next = 24;
                return user.update(req.body);

              case 24:
                _ref6 = _context4.sent;
                id = _ref6.id;
                name = _ref6.name;
                provider = _ref6.provider;
                return _context4.abrupt('return', res.json({
                  id: id,
                  name: name,
                  email: email,
                  provider: provider
                }));

              case 29:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x7, _x8) {
        return _ref5.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x9, _x10) {
        return _ref7.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return UserController;
}();

exports.default = new UserController();
//# sourceMappingURL=UserController.js.map