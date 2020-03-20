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

var _Notification = require('../schemas/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationController = function () {
  function NotificationController() {
    (0, _classCallCheck3.default)(this, NotificationController);
  }

  (0, _createClass3.default)(NotificationController, [{
    key: 'index',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var checkProvider, notifications;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _User2.default.findOne({
                  where: {
                    id: req.userId,
                    provider: true
                  }
                });

              case 2:
                checkProvider = _context.sent;

                if (checkProvider) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({ error: "You're not a provider!" }));

              case 5:
                _context.next = 7;
                return _Notification2.default.find({
                  user: req.userId
                }).sort({ createdAt: 'desc' }).limit(20);

              case 7:
                notifications = _context.sent;
                return _context.abrupt('return', res.json(notifications));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function index(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var notification;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Notification2.default.findByIdAndUpdate(req.params.id, { read: true }, { new: true });

              case 2:
                notification = _context2.sent;

                if (notification) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({ error: 'Notification already read' }));

              case 5:
                return _context2.abrupt('return', res.json(notification));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return NotificationController;
}();

exports.default = new NotificationController();
//# sourceMappingURL=NotificationController.js.map