'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dbConfigure = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user.json');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = _user2.default.user;
var password = _user2.default.pwd;

var mongoDb = {
    development: 'mongodb://localhost:27017/myTestMongodb',
    test: '',
    production: 'mongodb://' + user + ':' + password + '@ds139929.mlab.com:39929/mymongodb'
};

var dbConfigure = exports.dbConfigure = function dbConfigure(app) {
    // get the app settings env object
    app.set('mongDbUrl', mongoDb[app.settings.env]);

    _mongoose2.default.connect(app.get('mongDbUrl'), { autoIndex: false }).then(function () {
        //console.log('you are connected!');
    }, function (err) {
        console.log('[Sorry] - mongodb connection error');
    });
};
//# sourceMappingURL=config.js.map