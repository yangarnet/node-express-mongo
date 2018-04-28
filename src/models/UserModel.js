import mongoose from 'mongoose';
import user from '../schemas/user';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import { resolve } from 'path';

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

// do NOT declare static method with arrow function, 'this' will not be binding properly.
UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;
    try {
        // verify the token and 
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

UserSchema.statics.findByCredentials = function(email, password) {
    let user = this;
    return user.findOne({email})
               .then(user => {
                   if (!user) {
                       return new Promise.reject();
                   }
                   return new Promise((resolve, reject) => {
                       // with brcypt to compate hash string and original password string
                       bcrypt.compare(password, user.password, (err, res) => {
                           if (res) {
                               resolve(user);
                           } else {
                               reject()
                           }
                       })
                   });
               })
};

UserSchema.methods.removeToken = function(token) {
    let user = this;
    return user.update({
        $pull: {
            tokens: {
                tokens: {token}
            }
        }
    });
};


export const userModel =  mongoose.model('users', UserSchema); 
