
import app from '../../app';
import chai from 'chai';
import request from 'supertest';
import todoModel from '../model/TodoModel';

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
// should be using sinon
beforeEach(done => {
    todoModel.remove().then(() => done());
});

describe('POST: add new todo', () => {

    it('should create a new todo', (done) => {
        const content = 'learn writing test for nodejs';
        const completed = true;

        request(app)
            .post('/to-do')
            .send({content, completed})
            .expect(200)
            .expect(res => {
                expect(res.body.content).to.be.a('string')
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                todoModel.find().then(todos => {
                    expect(todos.length).to.be.equal(1);
                    todos[0].should.have.property('content');
                    expect(todos[0].content).to.equal(content.toUpperCase())
                    expect(todos[0].completed).to.be.equal(completed);
                    done();
                }).catch(e => done(e));
            });
    }).timeout(5000);
});