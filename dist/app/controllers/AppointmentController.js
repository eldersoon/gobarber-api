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

var _dateFns = require('date-fns');

var _pt = require('date-fns/locale/pt');

var _pt2 = _interopRequireDefault(_pt);

var _Appointment = require('../models/Appointment');

var _Appointment2 = _interopRequireDefault(_Appointment);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _File = require('../models/File');

var _File2 = _interopRequireDefault(_File);

var _Notification = require('../schemas/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _CancellationMail = require('../jobs/CancellationMail');

var _CancellationMail2 = _interopRequireDefault(_CancellationMail);

var _Queue = require('../../lib/Queue');

var _Queue2 = _interopRequireDefault(_Queue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppointmentController = function () {
  function AppointmentController() {
    (0, _classCallCheck3.default)(this, AppointmentController);
  }

  (0, _createClass3.default)(AppointmentController, [{
    key: 'index',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$query$page, page, appointments, data;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$query$page = req.query.page, page = _req$query$page === undefined ? 1 : _req$query$page;
                _context.next = 3;
                return _Appointment2.default.findAll({
                  where: {
                    user_id: req.userId,
                    canceled_at: null
                  },
                  attributes: ['id', 'date', 'past', 'cancelable'],
                  limit: 20,
                  offset: (page - 1) * 20,
                  order: ['date'],
                  include: [{
                    model: _User2.default,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [{
                      model: _File2.default,
                      as: 'avatar',
                      attributes: ['id', 'path', 'url']
                    }]
                  }]
                });

              case 3:
                appointments = _context.sent;
                data = appointments;

                if (!(0, _dateFns.isBefore)(data.date, new Date())) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({ error: 'User does not have appointment!' }));

              case 7:
                return _context.abrupt('return', res.json(appointments));

              case 8:
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
    key: 'store',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var schema, _req$body, provider_id, date, checkIsProvider, hourStart, checkApointment, appointment, user, aptmtDate;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                schema = Yup.object().shape({
                  provider_id: Yup.number().required(),
                  date: Yup.date().required()
                });
                _context2.next = 3;
                return schema.isValid(req.body);

              case 3:
                if (_context2.sent) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({ error: 'Fail to validation' }));

              case 5:
                /**
                 * get providers only
                 */
                _req$body = req.body, provider_id = _req$body.provider_id, date = _req$body.date;
                _context2.next = 8;
                return _User2.default.findOne({
                  where: {
                    id: provider_id,
                    provider: true
                  }
                });

              case 8:
                checkIsProvider = _context2.sent;

                if (checkIsProvider) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({ error: 'Invalid provider, choose another one!' }));

              case 11:
                if (!(checkIsProvider.id == req.userId)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt('return', res.status(401).json({ error: 'You cant schedules yourself' }));

              case 13:
                hourStart = (0, _dateFns.startOfHour)((0, _dateFns.parseISO)(date));

                if (!(0, _dateFns.isBefore)(hourStart, new Date())) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({ error: "It's late to makes an appointment, try current hour!" }));

              case 16:
                _context2.next = 18;
                return _Appointment2.default.findOne({
                  where: {
                    provider_id: provider_id,
                    canceled_at: null,
                    date: hourStart
                  }
                });

              case 18:
                checkApointment = _context2.sent;

                if (!checkApointment) {
                  _context2.next = 21;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({ error: 'Appointment date is not available!' }));

              case 21:
                _context2.next = 23;
                return _Appointment2.default.create({
                  user_id: req.userId,
                  provider_id: provider_id,
                  date: hourStart
                });

              case 23:
                appointment = _context2.sent;
                _context2.next = 26;
                return _User2.default.findByPk(req.userId);

              case 26:
                user = _context2.sent;
                aptmtDate = (0, _dateFns.format)(hourStart, "'dia' dd 'de' MMMM 'às' H:mm'h' ", { locale: _pt2.default });
                _context2.next = 30;
                return _Notification2.default.create({
                  content: 'Novo agendamento de ' + user.name + ' para o ' + aptmtDate,
                  user: provider_id
                });

              case 30:
                return _context2.abrupt('return', res.json(appointment));

              case 31:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function store(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return store;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var appointment, limitHour;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Appointment2.default.findByPk(req.params.id, {
                  include: [{
                    model: _User2.default,
                    as: 'provider',
                    attributes: ['name', 'email']
                  }, {
                    model: _User2.default,
                    as: 'user',
                    attributes: ['id', 'name']
                  }]
                });

              case 2:
                appointment = _context3.sent;

                if (!(appointment.user_id !== req.userId)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt('return', res.status(401).json({
                  error: "You dont have perssion to cancel this appointment!"
                }));

              case 5:
                if (!(appointment.canceled_at != null)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', res.status(400).json({
                  error: 'Appointment already canceled!'
                }));

              case 7:
                limitHour = (0, _dateFns.subHours)(appointment.date, 2);

                if (!(0, _dateFns.isBefore)(limitHour, new Date())) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt('return', res.status(401).json({ error: 'You cant cancel your appointment!' }));

              case 10:

                appointment.canceled_at = new Date();

                _context3.next = 13;
                return appointment.save();

              case 13:
                _context3.next = 15;
                return _Queue2.default.add(_CancellationMail2.default.key, {
                  appointment: appointment
                });

              case 15:
                return _context3.abrupt('return', res.json(appointment));

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return AppointmentController;
}();

exports.default = new AppointmentController();
//# sourceMappingURL=AppointmentController.js.map