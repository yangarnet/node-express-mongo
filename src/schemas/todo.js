import mongoose from 'mongoose';

const todo = {
    content: {
        type: String,
        required: true,
        unique: true,
        get: value => value.toUpperCase(),
        set: value => value.toLowerCase(),
        minlength: 2,
        trim: true,
        default: ''
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

export default todo;
