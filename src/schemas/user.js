import validator from 'validator';
import mongoose from 'mongoose';

const user = {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
};

export default user;
