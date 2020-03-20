'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

var _User = require('../app/models/User');

var _User2 = _interopRequireDefault(_User);

var _File = require('../app/models/File');

var _File2 = _interopRequireDefault(_File);

var _Appointment = require('../app/models/Appointment');

var _Appointment2 = _interopRequireDefault(_Appointment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = [_User2.default, _File2.default, _Appointment2.default];

var Database = function () {
  function Database() {
    (0, _classCallCheck3.default)(this, Database);

    this.init();
    this.mongo();
  }

  (0, _createClass3.default)(Database, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.connection = new _sequelize2.default(_database2.default);

      models.map(function (model) {
        return model.init(_this.connection);
      }).map(function (model) {
        return model.associate && model.associate(_this.connection.models);
      });
    }
  }, {
    key: 'mongo',
    value: function mongo() {
      _mongoose2.default.connection = _mongoose2.default.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
      });
    }
  }]);
  return Database;
}();

exports.default = new Database();
//# sourceMappingURL=index.js.map