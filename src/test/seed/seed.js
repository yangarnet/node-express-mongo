import { ObjectID } from 'mongodb';
import { todoModel } from '../../models/TodoModel';
import { userModel } from '../../models/UserModel';
import jwt from 'jsonwebtoken'; 
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

export const users = [
    {
        _id: userOneId,
        email: '123@gmail.com',
        password: 'passw0rd',
        tokens:[{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, 'private-key').toString()
        }]
    },
    {
        _id: userTwoId,
        email: '456@gmail.com',
        password: '123456789',
        tokens:[{
            access: 'auth',
            token: jwt.sign({_id: userTwoId, access: 'auth'}, 'private-key').toString()
        }]
    }
];
// this is hitting the dev database, not good! 
// setup a test db instead
export const todos = [
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

export const prepareTodos = (done) => {
        todoModel.remove()
                 .then(() => {
                     return todoModel.insertMany(todos)
                                     .then(() => done());
                });
};

export const prepareUsers = done => {
    userModel.remove({})
             .then(()=>{
                 let userOne = new userModel(users[0]).save();
                 let userTwo = new userModel(users[1]).save();

                 return Promise.all([userOne, userTwo]);
             })
             .then(()=>done());
};
