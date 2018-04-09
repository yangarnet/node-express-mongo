'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteContactById = exports.updateContactById = exports.getContactById = exports.getContacts = exports.addNewContact = undefined;

var _ContactModel = require('../models/ContactModel');

var _ContactModel2 = _interopRequireDefault(_ContactModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addNewContact = exports.addNewContact = function addNewContact(req, res) {

    // create a new document from the model by passing req.body
    var newContact = new _ContactModel2.default(req.body);

    newContact.print();
    // call instance save method
    // newContact.save((err, contact) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     // response the newly added contact
    //     res.json(contact);
    // });
    newContact.save().then(function (resoponse) {
        res.json(resoponse);
    }, function (error) {
        res.send(error);
    });
};

var getContacts = exports.getContacts = function getContacts(req, res) {
    // using Model to findout all documents.
    // you can search the model with schema keywords.
    // ContactModel.find({ firstName: 'sdfgsdfgsdfg' },(err, contacts) =>{});

    _ContactModel2.default.find(function (err, contacts) {
        if (err) {
            res.send(err);
        }
        res.json(contacts);
    });
};

var getContactById = exports.getContactById = function getContactById(req, res) {
    _ContactModel2.default.findById(req.params.contactId, function (err, contact) {
        if (err) {
            res.send(err);
        }
        contact.print();
        contact.findContactWithSameFirstName(function (err, list) {
            if (err) {
                console.log('error in finding.....');
            }
            console.log('find conacts with same firstname:', list);
        });
        res.json(contact);
    });
};

var updateContactById = exports.updateContactById = function updateContactById(req, res) {
    _ContactModel2.default.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json(contact ? contact : { status: '[ERROR]:no such entity with id ' + req.params.contactId });
    });
};

var deleteContactById = exports.deleteContactById = function deleteContactById(req, res) {
    _ContactModel2.default.deleteOne({ _id: req.params.contactId }, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json({ status: 'Successful delete entry with id ' + req.params.contactId });
    });
};
//# sourceMappingURL=crmController.js.map