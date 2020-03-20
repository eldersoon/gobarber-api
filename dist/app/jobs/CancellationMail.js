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

var _dateFns = require('date-fns');

var _pt = require('date-fns/locale/pt');

var _pt2 = _interopRequireDefault(_pt);

var _Mail = require('../../lib/Mail');

var _Mail2 = _interopRequireDefault(_Mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CancellationMail = function () {
  function CancellationMail() {
    (0, _classCallCheck3.default)(this, CancellationMail);
  }

  (0, _createClass3.default)(CancellationMail, [{
    key: 'handle',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
        var data = _ref.data;
        var appointment;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                appointment = data.appointment;
                _context.next = 3;
                return _Mail2.default.sendMail({
                  to: appointment.provider.name + ' <' + appointment.provider.email + '>',
                  subject: 'Agendamento cancelado',
                  template: 'cancellation',
                  context: {
                    provider: appointment.provider.name,
                    user: appointment.user.name,
                    date: (0, _dateFns.format)((0, _dateFns.parseISO)(appointment.date), "dd 'de' MMMM', às' H:mm'h'", {
                      locale: _pt2.default
                    })
                  }
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handle(_x) {
        return _ref2.apply(this, arguments);
      }

      return handle;
    }()
  }, {
    key: 'key',
    get: function get() {
      return 'CancellationMail';
    }
  }]);
  return CancellationMail;
}();

exports.default = new CancellationMail();
//# sourceMappingURL=CancellationMail.js.map