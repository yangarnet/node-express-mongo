import todoModel from '../model/TodoModel';

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
        const newTodo = new todoModel(req.body);

        newTodo.save().then(todo => {
            res.json(todo);
        }, err => {
            throw new Error(err);
        });
    }
}

export default todoController;
