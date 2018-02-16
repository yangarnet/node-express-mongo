"use strict";

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crmRoutes = require('./routes/crmRoutes');

var _crmRoutes2 = _interopRequireDefault(_crmRoutes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 3000;
// setup mongo connection
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost:27017/myTestMongodb', { autoIndex: false }).then(function () {
    console.log('you are connected!');
}, function (err) {
    console.log('[Sorry] - mongodb connection error');
});

// setup body parser
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
// get static resources from the plublic folder and display
app.use(_express2.default.static('../public'));
(0, _crmRoutes2.default)(app);

app.get('/', function (req, res) {
    res.send('you are sending data back , thx');
});

app.listen(PORT, function () {
    console.log('server running @ port ' + PORT);
});
//# sourceMappingURL=app.js.map