'use strict';

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _TodoModel = require('../models/TodoModel');

var _TodoModel2 = _interopRequireDefault(_TodoModel);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;
var assert = _chai2.default.assert;

// this is hitting the database, not good! 
var todos = [{
    _id: new _mongodb.ObjectID(),
    content: 'first todo',
    completed: true
}, {
    _id: new _mongodb.ObjectID(),
    content: 'sencond todo',
    completed: false
}];
// insert two todos by default.
beforeEach(function (done) {
    _TodoModel2.default.remove().then(function () {
        return _TodoModel2.default.insertMany(todos).then(function () {
            return done();
        });
    });
});

describe('test express app with todo controller', function () {
    'use strict';

    it('should create a new todo', function (done) {
        var content = 'learn writing test for nodejs';
        var completed = true;

        // let todoModelMock = sinon.mock(todoModel);

        // todoModelMock.expects('save').yields(null, { status: true });
        // todoModelMock.expects('find').yields(null, { content, completed});
        (0, _supertest2.default)(_app2.default).post('/to-do').send({ content: content, completed: completed }).expect(200).expect(function (res) {
            expect(res.body.content).to.be.a('string');
        }).end(function (err, res) {
            if (err) {
                return done(err);
            }
            // find the given todo
            _TodoModel2.default.find({ content: content }).then(function (todos) {
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

    it('should NOT create a new todo with invalid data', function (done) {
        var content = 'learn write express test';
        (0, _supertest2.default)(_app2.default).post('/to-do').send({ content: content }).expect(400).end(function (err, res) {
            if (err) {
                return done(err);
            }
            _TodoModel2.default.find().then(function (todos) {
                expect(todos.length).to.be.eq(2);
                done();
            }).catch(function (e) {
                return done(e);
            });
        });
    });

    it('should get ALL todos : get("/to-do")', function (done) {
        (0, _supertest2.default)(_app2.default).get('/to-do').expect(200).expect(function (res) {
            expect(res.body.todos).not.null;
            expect(res.body.todos.length).to.be.eq(2);
        }).end(done);
    }).timeout(5000);

    it('should get todo by ID', function (done) {
        (0, _supertest2.default)(_app2.default).get('/to-do/' + todos[0]._id.toHexString()).expect(200).expect(function (response) {
            expect(response.body.todo).not.null;
            expect(response.body.todo).to.be.a('object');
            expect(response.body.todo.content).to.be.eq(todos[0].content);
        }).end(done);
    });

    it('should return 404 when todo not found by id', function (done) {
        (0, _supertest2.default)(_app2.default).get('/to-do/' + new _mongodb.ObjectID().toHexString).expect(404).end(done);
    });

    it('should return 404 for non-object ids', function (done) {
        (0, _supertest2.default)(_app2.default).get('/to-do/asdfw45634563}').expect(404).end(done);
    });
});
//# sourceMappingURL=app.spec.js.map