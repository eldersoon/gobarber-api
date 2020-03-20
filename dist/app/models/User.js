'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = function (_Model) {
  (0, _inherits3.default)(User, _Model);

  function User() {
    (0, _classCallCheck3.default)(this, User);
    return (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).apply(this, arguments));
  }

  (0, _createClass3.default)(User, [{
    key: 'checkPassword',
    value: function checkPassword(password) {
      return _bcryptjs2.default.compare(password, this.password_hash);
    }
  }], [{
    key: 'init',
    value: function init(sequelize) {
      var _this2 = this;

      (0, _get3.default)(User.__proto__ || (0, _getPrototypeOf2.default)(User), 'init', this).call(this, {
        name: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL, // VIRTUAL FIELD DOESN'T EXIST IN DB
        password_hash: _sequelize2.default.STRING,
        provider: _sequelize2.default.BOOLEAN
      }, {
        sequelize: sequelize,
        underscored: true
      });

      /**
       * Before save information in database, addHook will be
       * executed.
       */
      this.addHook('beforeSave', function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!user.password) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return _bcryptjs2.default.hash(user.password, 8);

                case 3:
                  user.password_hash = _context.sent;

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      return this;
    }

    /**
     * Relation Model
     */

  }, {
    key: 'associate',
    value: function associate(models) {
      this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }
  }]);
  return User;
}(_sequelize.Model);

exports.default = User;
//# sourceMappingURL=User.js.map