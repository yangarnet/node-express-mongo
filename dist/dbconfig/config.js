'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.dbConfig = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbConfig = exports.dbConfig = function dbConfig() {
        // setup mongo connection
        _mongoose2.default.Promise = global.Promise;
        // the 'myTestMongodb' will become the db name
        _mongoose2.default.connect('mongodb://localhost:27017/myTestMongodb', { autoIndex: false }).then(function () {
                console.log('you are connected!');
        }, function (err) {
                console.log('[Sorry] - mongodb connection error');
        });
};
//# sourceMappingURL=config.js.map