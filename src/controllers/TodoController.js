import todoModel from '../models/TodoModel';

// all the db related work will be around todoModel .
class todoController {

    constructor() {}

    getTodo(req, res) {
        todoModel.find({}, (err, todos) => {
            if (err) {
                throw new Error(err);
            } else {
                res.json(todos);
            }
        });
    }

    addTodo(req, res) {
        // new a document, each document is an instance of the Model
        const newTodo = new todoModel(req.body);

        newTodo.save().then(todo => {
            res.json(todo);
        }, err => {
            throw new Error(err);
        });
    }

    getTodoById(req, res) {
        // this todoId is the as the routes written
        const id = req.params.todoId;
        todoModel.findById(id, (err, result) => {
            if (err) {
                throw new Error(err);
            }
            res.json(result);
        });
    }

    updateTodoById(req, res) {
        const id = req.params.todoId;

        // see the following two about how to get documents
        todoModel.findByIdAndUpdate(id, 
            { completed: true }, // bit to update
            (err, result) => {
                if (err) {
                    throw new Error(err);
                }
            });

        todoModel.findOneAndUpdate(
            { _id: req.params.todoId }, 
            { content: 'set by findOneAndUpdate' },  // bit to update
            (err, updateResult) => {
                if (err) {
                    throw new Error(err);
                }
                res.json(updateResult)
            });
    }

    deleteTodoById(req, res) {
        const id = req.params.todoId;

        todoModel.findByIdAndRemove(id, (err, result) => {
            if (err) {
                throw new Error(err);
            }
            res.json(result);
        });
    }
}

export default todoController;
