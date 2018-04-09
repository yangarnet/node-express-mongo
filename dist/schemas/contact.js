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
var ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first Name',
        minlength: 2
    },
    lastName: {
        type: String,
        required: 'Enter a last Name',
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: 'Enter a email addres'
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
});

// now you can add new methods to you schema.
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// add instance method
ContactSchema.methods.print = function () {
    console.log('ContactSchema.methods : firstName: ' + this.firstName + ' + email:' + this.email);
};
ContactSchema.methods.findContactWithSameFirstName = function (cb) {
    return this.model('myContact').find({ firstName: this.firstName }, cb);
};

exports.default = ContactSchema;
//# sourceMappingURL=contact.js.map