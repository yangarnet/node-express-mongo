'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _todo = require('../schemas/todo');

var _todo2 = _interopRequireDefault(_todo);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoModel = _mongoose2.default.model('todo', _todo2.default);

exports.default = todoModel;
//# sourceMappingURL=TodoModel.js.map