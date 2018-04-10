'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
// schema definition, then you can add methods to schema, finally compile model.
/*
  support types: String, Boolean, Number, Date, Array, Mixed, ObjectId
*/


var contact = {
    firstName: {
        type: String,
        required: 'Ok, Enter a first Name',
        minlength: 2
    },
    lastName: {
        type: String,
        required: 'Ok, Enter a last Name',
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: 'OK, Enter a email addres'
    },
    company: {
        type: String,
        trim: true
    },
    phone: {
        type: Number
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
};

var ContactSchema = new Schema(contact);

exports.default = ContactSchema;
//# sourceMappingURL=contact.js.map