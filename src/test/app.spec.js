
import app from '../../app';
import chai from 'chai';
import request from 'supertest';
import { todoModel } from '../models/TodoModel';
import sinon from 'sinon';
import { ObjectID } from 'mongodb';

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

// this is hitting the dev database, not good! 
// setup a test db instead
const todos = [
    {
        _id: new ObjectID(),
        content: 'first todo',
        completed: true
    },
    {
        _id: new ObjectID(),
        content: 'sencond todo',
        completed: false
    }
];
// insert two todos by default.
beforeEach(done => {
    todoModel.remove()
             .then(() => {
                 return todoModel.insertMany(todos)
                                 .then(() => done());
            });
});

describe('test express app with todo controller', () => {
    'use strict';

    describe('NEW todo', () => {
        it('should create a new todo', (done) => {
            const content = 'learn writing test for nodejs';
            const completed = true;

            console.log(app.settings);
            
            request(app)
                .post('/to-do')
                .send({content, completed})
                .expect(200)
                .expect(res => {
                    expect(res.body.content).to.be.a('string');
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    // find the given todo
                    todoModel.find({content}).then(todos => {
                        expect(todos.length).to.be.equal(1);
                        todos[0].should.have.property('content');
                        expect(todos[0].content).to.equal(content.toUpperCase());
                        expect(todos[0].completed).to.be.equal(completed);
                        done();
                    }).catch(e => done(e));
                });
        }).timeout(5000);
    
        it('should NOT create a new todo with invalid data', (done) => {
            const content = 'learn write express test';
            request(app).post('/to-do')
                        .send({content})
                        .expect(400)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }
                            todoModel.find()
                                     .then(todos => {
                                         expect(todos.length).to.be.eq(2);
                                         done();
                                     })
                                     .catch(e=>done(e));
                        });
        });
    });
 
    describe('GET todo', () => {
        it('should get ALL todos : get("/to-do")', (done) => {
            request(app).get('/to-do')
                        .expect(200)
                        .expect(res => {
                            expect(res.body.todos).not.null;
                            expect(res.body.todos.length).to.be.eq(2);
                        }).end(done);
        }).timeout(5000);
    
        it('should get todo by ID', (done) => {
            request(app).get(`/to-do/${todos[0]._id.toHexString()}`)
                        .expect(200)
                        .expect(response => {
                            expect(response.body.todo).not.null;
                            expect(response.body.todo).to.be.a('object');
                            expect(response.body.todo.content).to.be.eq(todos[0].content);
                        })
                        .end(done);
        });
    
        it('GET:/to-do/:todoId - should return 404 when todo not found by id', (done) => {
            request(app).get(`/to-do/${(new ObjectID()).toHexString}`)
                        .expect(404)
                        .end(done);
        });
    
        it('GET:/to-do/:todoId - should return 404 for non-object ids', (done) => {
            request(app).get(`/to-do/asdfw45634563}`)
            .expect(404)
            .end(done);
        });
    
    });

    describe('DELETE todo', () => {
        it('DELETE:/to-do/:todoId - should delete todo by correct id', (done) => {
            const hexId = todos[0]._id.toHexString();
            request(app).delete(`/to-do/${hexId}`)
                        .expect(200)
                        .expect(res => {
                            expect(res.status).to.be.eq(200);
                            expect(res.body.todo).to.be.a('object');
                            expect(res.body.todo).to.have.property('content').with.eq(todos[0].content);
                        })
                        .end(done);
        });
    });
   
    describe('PUT - PATCH todo', () => {
        it('put - should update to do properly with right id', (done) => {
            const id = todos[0]._id.toHexString();
            const update = {
                content: 'this is the new todo content',
                completed: true
            };
            request(app).put(`/to-do/${id}`)
                        .send(update)
                        .expect(200)
                        .expect(res => {
                            expect(res.body.todo).to.be.not.null;
                            expect(res.body.todo).to.be.a('object');
                            expect(res.body.todo).to.have.property('content').with.eq(update.content);
                            expect(res.body.todo).to.have.property('completed').to.be.eq(true);
                        })
                        .end(done);
        });

        it('patch - should update the todo properly with id', (done) => {
            const id = todos[1]._id.toHexString();
            const toUpdate = {
                content: 'learning nodejs and react',
                completed: true
            };
            request(app).patch(`/to-do/${id}`)
                        .send(toUpdate)
                        .expect(200)
                        .expect(res => {
                            expect(res.body.todo).to.be.not.null;
                            expect(res.body.todo).to.be.an('object');
                            assert.equal(res.body.todo.content, toUpdate.content, 'new content should be: learning nodejs and react');
                            assert.isTrue(res.body.todo.completed, 'completed should be tru');
                        })
                        .end(done);
        });
    });
});