'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _contact = require('../schemas/contact');

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// now you can add new methods to you schema.
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// add instance method
_contact2.default.methods.print = function () {
    return 'firstName: ' + this.firstName + ', lastName: ' + this.lastname + ', email:' + this.email;
};

_contact2.default.methods.findContactWithSameFirstName = function (cb) {
    return this.model('contact').find({ firstName: this.firstName }, cb);
};

_contact2.default.methods.findByEmail = function (cb) {
    return this.model('contact').findOne({ email: this.email }, cb);
};
// now, compiling the schema into the model used by ctrl, herre 'contact' will be
// the collection name in mongodb, will use ContactModel to interact in controllers.
var contactModel = _mongoose2.default.model('contact', _contact2.default);

exports.default = contactModel;
//# sourceMappingURL=ContactModel.js.map