'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _ContactModel = require('../ContactModel');

var _ContactModel2 = _interopRequireDefault(_ContactModel);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();

describe('validate contact model', function () {
    'use strict';

    it('should be invalid model if firstname is missing', function (done) {
        var contact = new _ContactModel2.default({
            lastName: 'Kelly',
            email: '12345@gmail.com'
        });

        contact.validate(function (err) {
            (0, _chai.expect)(err.errors.firstName).to.exist;
            _chai.assert.equal(err.errors.firstName, 'Ok, Enter a first Name');
            done();
        });
    });

    it('should be invalid model if lastname/email is missing', function (done) {
        var contact = new _ContactModel2.default({
            firstName: 'firstname'
        });

        contact.validate(function (err) {
            (0, _chai.expect)(err.errors.lastName).to.exist;
            (0, _chai.expect)(err.errors.email).to.exist;
            (0, _chai.expect)(err.errors.company).not.to.exist;

            err.errors.email.message.should.be.equal('OK, Enter a email addres');

            done();
        });
    });

    it('should be valid model if fullname and email presents, and ', function (done) {
        var contact = new _ContactModel2.default({
            firstName: 'abc',
            lastName: 'efg',
            email: '123@gmail.com'
        });

        contact.validate(function (err) {
            (0, _chai.expect)(err).to.be.null;

            done();
        });
    });

    // it('test model instance method: findByEmail()', sinon.test(function(){

    //     let contact = new contactModel({
    //         firstName: 'abc',
    //         lastName: 'efg',
    //         email: '123@gmail.com'
    //     });
    //     // stub , do not do any db calls
    //     this.stub(contactModel, 'findOne').yields(null,contact);

    //     contact.findByEmail(()=>{});

    //     sinon.assert.calledWith(contactModel.findByEmail, {email: contact.email});

    // }));
});
//# sourceMappingURL=contact.spec.js.map