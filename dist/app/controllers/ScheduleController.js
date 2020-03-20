'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Appointment = require('../models/Appointment');

var _Appointment2 = _interopRequireDefault(_Appointment);

var _dateFns = require('date-fns');

var _sequelize = require('sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScheduleController = function () {
  function ScheduleController() {
    (0, _classCallCheck3.default)(this, ScheduleController);
  }

  (0, _createClass3.default)(ScheduleController, [{
    key: 'index',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$query$page, page, checkUserProvider, date, parseDate, appointments;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$query$page = req.query.page, page = _req$query$page === undefined ? 1 : _req$query$page;
                _context.next = 3;
                return _User2.default.findOne({
                  where: { id: req.userId, provider: true }
                });

              case 3:
                checkUserProvider = _context.sent;

                if (checkUserProvider) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(401).json({ error: 'You are not a provider! ' }));

              case 6:
                date = req.query.date;
                parseDate = (0, _dateFns.parseISO)(date);
                _context.next = 10;
                return _Appointment2.default.findAll({
                  where: {
                    provider_id: req.userId,
                    canceled_at: null,
                    date: (0, _defineProperty3.default)({}, _sequelize.Op.between, [(0, _dateFns.startOfDay)(parseDate), (0, _dateFns.endOfDay)(parseDate)])
                  },
                  limit: 10,
                  offset: (page - 1) * 10,
                  include: [{
                    model: _User2.default,
                    as: 'user',
                    attributes: ['name']
                  }],
                  order: ['date']
                });

              case 10:
                appointments = _context.sent;
                return _context.abrupt('return', res.json(appointments));

              case 12:
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
  }]);
  return ScheduleController;
}();

exports.default = new ScheduleController();
//# sourceMappingURL=ScheduleController.js.map