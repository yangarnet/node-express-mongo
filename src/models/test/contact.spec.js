import { expect, assert } from 'chai';
import chai from 'chai';
import contactModel from '../ContactModel';
import sinon from 'sinon';

const should = chai.should();

describe('validate contact model', () => {
    'use strict';

    it('should be invalid model if firstname is missing', (done) => {
        let contact = new contactModel({
            lastName: 'Kelly',
            email:'12345@gmail.com'
        });

        contact.validate((err) => {
            expect(err.errors.firstName).to.exist;
            assert.equal(err.errors.firstName, 'Ok, Enter a first Name');
            done();
        });
    });

    it('should be invalid model if lastname/email is missing', (done) => {
        let contact = new contactModel({
            firstName: 'firstname'
        });

        contact.validate((err) => {
            expect(err.errors.lastName).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.company).not.to.exist;
            
            err.errors.email.message.should.be.equal('OK, Enter a email addres');

            done();
        });
    });

    it('should be valid model if fullname and email presents, and ', (done) => {
        let contact = new contactModel({
            firstName: 'abc',
            lastName: 'efg',
            email: '123@gmail.com'
        });

        contact.validate((err) => {
            expect(err).to.be.null;

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