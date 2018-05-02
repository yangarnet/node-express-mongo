import { todoModel } from '../models/TodoModel';
import { ObjectID } from 'mongodb';
import _ from 'lodash';

class todoController {

    constructor() {}

    async getTodo(req, res) {
        try {
            const todos = await todoModel.find({_creator: req.user._id});
            res.send({todos});
        } catch(err) {
            res.status(404).send();
        }
    }

    async addTodo(req, res) {
        // new a document, each document is an instance of the Model
        const payload = _.pick(req.body, ['content', 'completed']);
        const newTodo = new todoModel({
            content: payload.content,
            completed: payload.completed,
            // the req.user is set in static authenticate() in UserController
            _creator: req.user._id
        });

        try {
            const todo = await newTodo.save();
            res.json(todo);
        } catch(err) {
            res.status(400).send(err);
        }       
    }

    static async preSaveMiddleware(req, res, next) {
        const payload = _.pick(req.body, ['content']);
        try {
            const todo = await todoModel.findOne({ content: payload.content, _creator: req.user._id});
            if (todo) {
                res.status(400).send({msg: 'cannot create duplciate todos for same user'});
            }
            next();
        } catch(e) {
            res.status(401).send(err);
            next();
        }
    }

    async getTodoById(req, res) {
        // this todoId is the as the routes written
        const id = req.params.todoId;
        if (ObjectID.isValid(id)) {
            try {
                const todo = await todoModel.findOne({ _id: id , _creator: req.user._id });
                if (!todo) {
                    return res.status(404).end();
                }
                res.json({todo});
            } catch(err) {
                res.status(400).send(err);
            }
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

    async updateTodoById(req, res) {
        const id = req.params.todoId;
        const body = _.pick(req.body, ['content', 'completed']);
        if (!ObjectID.isValid(id)) {
            return res.status(404).end();
        }
        try {
            const todo = await todoModel.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, {new: true});
            if (!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        } catch(err) {
            res.status(400).send(err);
        }
    }

    async patchTodoById(req, res) {
        const id = req.params.todoId;
        const body = _.pick(req.body, ['content', 'completed']);
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        try {
            const todo = await todoModel.findOneAndUpdate({ _id: id , _creator: req.user._id }, { $set: body }, {new: true});
            if (!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        } catch(err) {
            res.status(400).send()
        }
    }

    async deleteTodoById(req, res) {
        const id = req.params.todoId;
        if (ObjectID.isValid(id)) {
            try {
                const todo = await todoModel.findByIdAndRemove(id);
                if (!todo) {
                    res.status(404).send();
                }
                res.send({todo});
            } catch(err) {
                res.status(400).send(err);
            }
        }
        else {
            res.status(400).send();
        }
    }
}

export default todoController;
