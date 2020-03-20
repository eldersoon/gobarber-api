'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  storage: _multer2.default.diskStorage({
    destination: (0, _path.resolve)(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: function filename(req, file, cb) {
      _crypto2.default.randomBytes(16, function (err, res) {
        if (err) return cb;
        return cb(null, res.toString('hex') + (0, _path.extname)(file.originalname));
      });
    }
  })
};
//# sourceMappingURL=multer.js.map