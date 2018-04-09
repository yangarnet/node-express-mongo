'use strict';

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _TodoModel = require('../model/TodoModel');

var _TodoModel2 = _interopRequireDefault(_TodoModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;
var assert = _chai2.default.assert;
// should be using sinon
beforeEach(function (done) {
    _TodoModel2.default.remove().then(function () {
        return done();
    });
});

describe('POST: add new todo', function () {

    it('should create a new todo', function (done) {
        var content = 'learn writing test for nodejs';
        var completed = true;

        (0, _supertest2.default)(_app2.default).post('/to-do').send({ content: content, completed: completed }).expect(200).expect(function (res) {
            expect(res.body.content).to.be.a('string');
        }).end(function (err, res) {
            if (err) {
                return done(err);
            }
            _TodoModel2.default.find().then(function (todos) {
                expect(todos.length).to.be.equal(1);
                todos[0].should.have.property('content');
                expect(todos[0].content).to.equal(content.toUpperCase());
                expect(todos[0].completed).to.be.equal(completed);
                done();
            }).catch(function (e) {
                return done(e);
            });
        });
    }).timeout(5000);
});
//# sourceMappingURL=app.spec.js.map