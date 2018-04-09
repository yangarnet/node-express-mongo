"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crmRoutes = require('./src/routes/crmRoutes');

var _crmRoutes2 = _interopRequireDefault(_crmRoutes);

var _config = require('./src/dbconfig/config');

var _config2 = require('./src/middleware/config');

var _config3 = _interopRequireDefault(_config2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create the app with express()
var app = (0, _express2.default)();
var PORT = process.env.PORT || 3000;
console.log('process.env.PORT', process.env.PORT);

(0, _config.dbConfig)();
(0, _config3.default)(app);
(0, _crmRoutes2.default)(app);

app.get('/', function (req, res) {
    res.send('this app is running on Nodejs');
});

app.listen(PORT, function () {
    console.log('server running @ port ' + PORT);
});

console.log('app.settings.env', app.settings.env);

exports.default = app;
//# sourceMappingURL=app.js.map