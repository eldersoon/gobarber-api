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

var _File = require('../models/File');

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileController = function () {
  function FileController() {
    (0, _classCallCheck3.default)(this, FileController);
  }

  (0, _createClass3.default)(FileController, [{
    key: 'store',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$file, name, path, file;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$file = req.file, name = _req$file.originalname, path = _req$file.filename;
                _context.next = 3;
                return _File2.default.create({
                  name: name,
                  path: path
                });

              case 3:
                file = _context.sent;
                return _context.abrupt('return', res.json(file));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function store(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return store;
    }()
  }]);
  return FileController;
}();

exports.default = new FileController();
//# sourceMappingURL=FileController.js.map