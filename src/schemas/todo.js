import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todo = {
    content: {
        type: String,
        required: true,
        index: true,
        unique: true,
        get: value => value.toUpperCase(),
        set: value => value.toLowerCase(),
        minlength: 2,
        trim: true,
        default: '',
        alias: 'todo'
    },
    completed: {
        type: Boolean,
        required: true
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
};

const todoSchema = new Schema(todo);

export default todoSchema;
