'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _dateFns = require('date-fns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Appointment = function (_Model) {
  (0, _inherits3.default)(Appointment, _Model);

  function Appointment() {
    (0, _classCallCheck3.default)(this, Appointment);
    return (0, _possibleConstructorReturn3.default)(this, (Appointment.__proto__ || (0, _getPrototypeOf2.default)(Appointment)).apply(this, arguments));
  }

  (0, _createClass3.default)(Appointment, null, [{
    key: 'init',
    value: function init(sequelize) {
      (0, _get3.default)(Appointment.__proto__ || (0, _getPrototypeOf2.default)(Appointment), 'init', this).call(this, {
        date: _sequelize2.default.DATE,
        canceled_at: _sequelize2.default.DATE,
        past: {
          type: _sequelize2.default.VIRTUAL,
          get: function get() {
            return (0, _dateFns.isBefore)(this.date, new Date());
          }
        },
        cancelable: {
          type: _sequelize2.default.VIRTUAL,
          get: function get() {
            return (0, _dateFns.isBefore)(new Date(), (0, _dateFns.subHours)(this.date, 2));
          }
        }
      }, {
        sequelize: sequelize,
        underscored: true
      });

      return this;
    }
  }, {
    key: 'associate',
    value: function associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
    }
  }]);
  return Appointment;
}(_sequelize.Model);

exports.default = Appointment;
//# sourceMappingURL=Appointment.js.map