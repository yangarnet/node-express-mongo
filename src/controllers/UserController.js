import { userModel } from '../models/UserModel';
import { ObjectID } from 'mongodb';
import _ from 'lodash';
import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';

class UserController {
    constructor() {}

    addNewUser(req, res) {
        // using lodash to return our payload.
        const payload = _.pick(req.body, ['email', 'password']);
        const user = new userModel(payload);

        user.save()
            .then(user => user.genAuthToken())
            .then(token => { 
                res.header('x-auth',token).send(user); 
            })
            .catch(err => res.status(400).send);
    }

    // auth middleware
    static authenticate(req, res, next) {
        let token = req.header('x-auth');
        userModel.findByToken(token)
                 .then(user => {
                    if (!user) {
                        return Promise.reject();
                    }
                    req.user = user;
                    req.token = token;
                    next();
                })
                .catch(e => { 
                    res.status(401).send();
                });
    }

    logIn(req, res) {
        const body = _.pick(req.body, ['email', 'password']);
        
        userModel.findByCredentials(body.email, body.password)
                 .then(user => {
                     return user.genAuthToken()
                                .then(token=> {
                                    res.header('x-auth', token).send(user);
                                });
                 })
                 .catch(err => {
                     res.status(400).send();
                 });
    }

    removeToken(req, res) {
        req.user.removeToken(req.token)
                .then(() => {
                    res.status(200).send();
                }, () => {
                    res.status(401).send();
                });
    }

}

export default UserController;
