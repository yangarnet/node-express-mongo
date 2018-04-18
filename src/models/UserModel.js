import mongoose from 'mongoose';
import user from '../schemas/user';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
const UserSchema = new Schema(user);

// override method, filter result, only return what we need.
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.genAuthToken = function() {
    let user = this;
    let access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'private-key').toString();

    user.tokens.push({access, token});
    return user.save().then(() => token).catch(e => console.log(e));
};

UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, 'private-key');
    } catch(e) {
       return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

// user schema middleware, NOTE: have to passing next in function(next){}, arrow function not work
UserSchema.pre('save', function(next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});

export const userModel = mongoose.models.users || mongoose.model('users', UserSchema); 