'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// how to use customised middleware
var myLogger = function myLogger(req, res, next) {
    console.log('middleWare: request time: ' + _moment2.default.unix(Date.now() / 1000).format('DD-MM-YYYY HH:mm:ss'));
    next();
};

var middleWare = function middleWare(app) {

    // setup body parser middleware
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use(_bodyParser2.default.json());

    // get static resources from the plublic folder and display
    // Express looks up the files relative to the static directory, 
    // so the name of the static directory is not part of the URL.

    // access localhost:3000/img/sky.jpeg
    app.use(_express2.default.static('public'));
    // add virtual path, access  with localhost:3000/static/img/sky.jpeg
    app.use('/static', _express2.default.static('public'));

    // application level middleware
    app.use('/', myLogger);

    // response to any type of request to path /to-do
    app.use('/to-do', function (req, res, next) {
        console.log('request to path /to-do');
        next();
    });
    // response to any type of request to path /to-do/:todoId
    app.use('/to-do/:todoId', function (req, res, next) {
        console.log('request to path /to-do/:todoId');
        next();
    });
};

exports.default = middleWare;
//# sourceMappingURL=config.js.map