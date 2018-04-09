'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var todo = {
    content: {
        type: String,
        required: true,
        index: true,
        unique: true,
        get: function get(value) {
            return value.toUpperCase();
        },
        set: function set(value) {
            return value.toLowerCase();
        },
        minlength: 2,
        trim: true,
        default: '',
        alias: 'todo'
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
};

var todoSchema = new Schema(todo);

exports.default = todoSchema;
//# sourceMappingURL=todo.js.map