'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dbConfig = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user.json');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbConfig = exports.dbConfig = function dbConfig() {
    // setup mongo connection
    _mongoose2.default.Promise = global.Promise;

    // // connect to local mongodb : the 'myTestMongodb' will become the db name
    _mongoose2.default.connect('mongodb://localhost:27017/myTestMongodb', { autoIndex: false }).then(function () {
        console.log('you are connected!');
    }, function (err) {
        console.log('[Sorry] - mongodb connection error');
    });

    // const user = configValue.user;
    // const password = configValue.pwd;
    // const dbConnectString = `mongodb://${user}:${password}@ds163418.mlab.com:63418/mycontact`;

    // mongoose.connect(dbConnectString, {autoIndex: false})
    //         .then(() => {
    //             console.log('connected to mongodb')
    //         }, (err) => {
    //             console.log(`Sorry - mongodb connection erro ${err}`);
    //         });
};
//# sourceMappingURL=config.js.map