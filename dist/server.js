'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.listen(3000);
_app2.default.use((0, _cors2.default)());
//# sourceMappingURL=server.js.map