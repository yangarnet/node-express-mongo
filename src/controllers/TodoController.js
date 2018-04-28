import { todoModel } from '../models/TodoModel';
import { ObjectID } from 'mongodb';
import _ from 'lodash';

// all the db related work will be around todoModel .
class todoController {

    constructor() {}

    getTodo(req, res) {
        todoModel.find({_creator: req.user._id})
                 .then(todos => {
                     res.send({todos});
                 })
                 .catch(err => {
                     res.status(404).send();
                 });
    }

    addTodo(req, res) {
        // new a document, each document is an instance of the Model
        const payload = _.pick(req.body, ['content', 'completed']);
        const newTodo = new todoModel({
            content: payload.content,
            completed: payload.completed,
            // the req.user is set in static authenticate() in UserController
            _creator: req.user._id
        });

        newTodo.save()
               .then(todo => {
                    res.json(todo);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
    }

    getTodoById(req, res) {
        // this todoId is the as the routes written
        const id = req.params.todoId;
        if (ObjectID.isValid(id)) {
        todoModel.findOne({ _id: id , _creator: req.user._id })
                 .then(todo => {
                    if (!todo) {
                        return res.status(404).end();
                    }
                    res.json({todo});
                 })
                 .catch(err => {
                    res.status(400).send(err);
                 });
        } else {
            res.status(404).send('ObjectID is invalid for query');
        }
    }

    getTodoByName(req, res) {
        const todo = req.params.todo;
        todoModel.findOne({_id: '', content: todo})
                 .then(response => {
                     res.json(response);
                 }, err => {
                     throw new Error(err);
                 });
    }

    updateTodoById(req, res) {
        const id = req.params.todoId;

        // choose what you want to update
        const body = _.pick(req.body, ['content', 'completed']);
        // see the following two about how to get documents
        if (!ObjectID.isValid(id)) {
            return res.status(404).end();
        }

        todoModel.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, {new: true})
                .then(todo => {
                    if (!todo) {
                        return res.status(404).send();
                    }
                    res.send({todo});
                })
                .catch(e => {
                    res.status(400).send();
                });
    }

    // this is a better version to update the todo
    patchTodoById(req, res) {
        const id = req.params.todoId;
        // now with lodash to pick whatever properties you want from the req body, nice
        const body = _.pick(req.body, ['content', 'completed']);

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        todoModel.findOneAndUpdate({ _id: id , _creator: req.user._id }, { $set: body }, {new: true})
                 .then(todo => {
                     if (!todo) {
                         return res.status(404).send();
                     }
                     res.send({todo});
                 })
                 .catch(e => res.status(400).send());
    }

    deleteTodoById(req, res) {
        const id = req.params.todoId;
        if (ObjectID.isValid(id)) {
            todoModel.findByIdAndRemove(id)
            .then(todo => {
                if (!todo) {
                    res.status(404).send();
                }
                res.send({todo});
            }, err => {
                res.status(400).send(err);
            })
            .catch(e => {
                res.status(400).send(e);
            });
        }
        else {
            res.status(400).send();
        }
    }
}

export default todoController;
