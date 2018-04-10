'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TodoModel = require('../models/TodoModel');

var _TodoModel2 = _interopRequireDefault(_TodoModel);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// all the db related work will be around todoModel .
var todoController = function () {
    function todoController() {
        _classCallCheck(this, todoController);
    }

    _createClass(todoController, [{
        key: 'getTodo',
        value: function getTodo(req, res) {
            _TodoModel2.default.find({}, function (err, todos) {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.json({ todos: todos });
                }
            });
        }
    }, {
        key: 'addTodo',
        value: function addTodo(req, res) {
            // new a document, each document is an instance of the Model
            var newTodo = new _TodoModel2.default(req.body);

            newTodo.save().then(function (todo) {
                res.json(todo);
            }, function (err) {
                res.status(400).send(err);
            });
        }
    }, {
        key: 'getTodoById',
        value: function getTodoById(req, res) {
            // this todoId is the as the routes written
            var id = req.params.todoId;
            if (_mongodb.ObjectID.isValid(id)) {
                _TodoModel2.default.findById(id).then(function (todo) {
                    if (!todo) {
                        res.status(403).send();
                    }
                    // return an object is better
                    res.json({ todo: todo });
                }, function (err) {
                    res.status(400).send(err);
                });
            } else {
                res.status(404).send('ObjectID is invalid for query');
            }
        }
    }, {
        key: 'getTodoByName',
        value: function getTodoByName(req, res) {
            var todo = req.params.todo;
            _TodoModel2.default.findOne({ _id: '', content: todo }).then(function (response) {
                res.json(response);
            }, function (err) {
                throw new Error(err);
            });
        }
    }, {
        key: 'updateTodoById',
        value: function updateTodoById(req, res) {
            var id = req.params.todoId;

            // see the following two about how to get documents
            _TodoModel2.default.findByIdAndUpdate(id, { completed: true }, // bit to update
            function (err, result) {
                if (err) {
                    throw new Error(err);
                }
            });

            _TodoModel2.default.findOneAndUpdate({ _id: req.params.todoId }, { content: 'set by findOneAndUpdate' }, // bit to update
            function (err, updateResult) {
                if (err) {
                    throw new Error(err);
                }
                res.json(updateResult);
            });
        }
    }, {
        key: 'deleteTodoById',
        value: function deleteTodoById(req, res) {
            var id = req.params.todoId;
            if (_mongodb.ObjectID.isValid(id)) {
                _TodoModel2.default.findByIdAndRemove(id).then(function (todo) {
                    if (!todo) {
                        res.status(404).send();
                    }
                    res.send({ todo: todo });
                }, function (err) {
                    res.status(400).send(err);
                }).catch(function (e) {
                    res.status(400).send(e);
                });
            } else {
                res.status(400).send();
            }
        }
    }]);

    return todoController;
}();

exports.default = todoController;
//# sourceMappingURL=TodoController.js.map