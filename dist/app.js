'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _RoutesConfig = require('./src/routes/RoutesConfig');

var _RoutesConfig2 = _interopRequireDefault(_RoutesConfig);

var _config = require('./src/dbconfig/config');

var _config2 = require('./src/middleware/config');

var _config3 = _interopRequireDefault(_config2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 3001;

(0, _config.dbConfigure)(app);
(0, _config3.default)(app);
(0, _RoutesConfig2.default)(app);

app.get('/', function (req, res) {
    res.end(JSON.stringify(app.settings));
});

app.listen(PORT, function () {
    console.log('server running @ port ' + PORT);
});

// export for supertest
exports.default = app;
//# sourceMappingURL=app.js.map