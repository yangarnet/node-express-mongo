"use strict";

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crmRoutes = require('./routes/crmRoutes');

var _crmRoutes2 = _interopRequireDefault(_crmRoutes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./dbconfig/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 3000;
(0, _config.dbConfig)();

// setup body parser middleware
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