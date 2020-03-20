'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dateFns = require('date-fns');

var _Appointment = require('../models/Appointment');

var _Appointment2 = _interopRequireDefault(_Appointment);

var _sequelize = require('sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AvailableController = function () {
  function AvailableController() {
    (0, _classCallCheck3.default)(this, AvailableController);
  }

  (0, _createClass3.default)(AvailableController, [{
    key: 'index',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var date, searchDate, appointments, schedule, available;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = req.query.date;

                if (date) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({ error: 'Date not defined!' }));

              case 3:
                searchDate = Number(date);
                _context.next = 6;
                return _Appointment2.default.findAll({
                  where: {
                    provider_id: req.params.providerId,
                    canceled_at: null,
                    date: (0, _defineProperty3.default)({}, _sequelize.Op.between, [(0, _dateFns.startOfDay)(searchDate), (0, _dateFns.endOfDay)(searchDate)])
                  }
                });

              case 6:
                appointments = _context.sent;
                schedule = ['08:00', '09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];
                available = schedule.map(function (time) {
                  var _time$split = time.split(':'),
                      _time$split2 = (0, _slicedToArray3.default)(_time$split, 2),
                      hour = _time$split2[0],
                      minute = _time$split2[1];

                  var value = (0, _dateFns.setSeconds)((0, _dateFns.setMinutes)((0, _dateFns.setHours)(searchDate, hour), minute), 0);

                  return {
                    time: time,
                    value: (0, _dateFns.format)(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                    available: (0, _dateFns.isAfter)(value, new Date()) && !appointments.find(function (a) {
                      return (0, _dateFns.format)(a.date, 'HH:mm') == time;
                    })
                  };
                });
                return _context.abrupt('return', res.json(available));

              case 10:
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
  return AvailableController;
}();

exports.default = new AvailableController();
//# sourceMappingURL=AvailableController.js.map