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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var File = function (_Model) {
  (0, _inherits3.default)(File, _Model);

  function File() {
    (0, _classCallCheck3.default)(this, File);
    return (0, _possibleConstructorReturn3.default)(this, (File.__proto__ || (0, _getPrototypeOf2.default)(File)).apply(this, arguments));
  }

  (0, _createClass3.default)(File, null, [{
    key: 'init',
    value: function init(sequelize) {
      (0, _get3.default)(File.__proto__ || (0, _getPrototypeOf2.default)(File), 'init', this).call(this, {
        name: _sequelize2.default.STRING,
        path: _sequelize2.default.STRING,
        url: {
          type: _sequelize2.default.VIRTUAL,
          get: function get() {
            return process.env.APP_URL + '/files/' + this.path;
          }
        }
      }, {
        sequelize: sequelize,
        underscored: true
      });

      return this;
    }
  }]);
  return File;
}(_sequelize.Model);

exports.default = File;
//# sourceMappingURL=File.js.map