import mongoose from 'mongoose';

const todo = {
    content: {
        type: String,
        required: true,
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
    },
    // associate the todo with a user
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // the name of the user model.
        required: true
    }
};

export default todo;
