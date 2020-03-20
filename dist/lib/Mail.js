'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _path = require('path');

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _nodemailerExpressHandlebars = require('nodemailer-express-handlebars');

var _nodemailerExpressHandlebars2 = _interopRequireDefault(_nodemailerExpressHandlebars);

var _mail = require('../config/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mail = function () {
  function Mail() {
    (0, _classCallCheck3.default)(this, Mail);
    var host = _mail2.default.host,
        port = _mail2.default.port,
        secure = _mail2.default.secure,
        auth = _mail2.default.auth;


    this.transporter = _nodemailer2.default.createTransport({
      host: host,
      port: port,
      secure: secure,
      auth: auth.user ? auth : null
    });

    this.configureTemplates();
  }

  (0, _createClass3.default)(Mail, [{
    key: 'configureTemplates',
    value: function configureTemplates() {
      var viewPath = (0, _path.resolve)(__dirname, '..', 'app', 'views', 'mails');

      this.transporter.use('compile', (0, _nodemailerExpressHandlebars2.default)({
        viewEngine: _expressHandlebars2.default.create({
          layoutsDir: (0, _path.resolve)(viewPath, 'layouts'),
          partialsDir: (0, _path.resolve)(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs'
        }),
        viewPath: viewPath,
        extName: '.hbs'
      }));
    }
  }, {
    key: 'sendMail',
    value: function sendMail(message) {
      return this.transporter.sendMail((0, _extends3.default)({}, _mail2.default.default, message));
    }
  }]);
  return Mail;
}();

exports.default = new Mail();
//# sourceMappingURL=Mail.js.map