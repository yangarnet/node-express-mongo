import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todo = {
    content: {
        type: String,
        required: true,
        get: value => value.toUpperCase(),
        set: value => value.toLowerCase(),
        minlength: 2,
        trim: true,
        default: '',
        alias: 'todo'
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
};

const todoSchema = new Schema(todo);

const todoModel = mongoose.model('todo', todoSchema);

export default todoModel;
