'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _beeQueue = require('bee-queue');

var _beeQueue2 = _interopRequireDefault(_beeQueue);

var _CancellationMail = require('../app/jobs/CancellationMail');

var _CancellationMail2 = _interopRequireDefault(_CancellationMail);

var _redis = require('../config/redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jobs = [_CancellationMail2.default];

var Queue = function () {
  function Queue() {
    (0, _classCallCheck3.default)(this, Queue);

    this.queues = {};

    this.init();
  }

  (0, _createClass3.default)(Queue, [{
    key: 'init',
    value: function init() {
      var _this = this;

      jobs.forEach(function (_ref) {
        var key = _ref.key,
            handle = _ref.handle;

        _this.queues[key] = {
          bee: new _beeQueue2.default(key, {
            redis: _redis2.default
          }),
          handle: handle
        };
      });
    }
  }, {
    key: 'add',
    value: function add(queue, job) {
      return this.queues[queue].bee.createJob(job).save();
    }
  }, {
    key: 'processQueue',
    value: function processQueue() {
      var _this2 = this;

      jobs.forEach(function (job) {
        var _queues$job$key = _this2.queues[job.key],
            bee = _queues$job$key.bee,
            handle = _queues$job$key.handle;

        bee.on('failed', _this2.handleFailure).process(handle);
      });
    }
  }, {
    key: 'handleFailure',
    value: function handleFailure(job, err) {
      console.log('Queue ' + job.queue.name + ': FAILED', err);
    }
  }]);
  return Queue;
}();

exports.default = new Queue();
//# sourceMappingURL=Queue.js.map