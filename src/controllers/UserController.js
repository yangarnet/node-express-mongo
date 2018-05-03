import { userModel } from '../models/UserModel';
import { ObjectID } from 'mongodb';
import _ from 'lodash';
import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';

class UserController {
    constructor() {}

    async addNewUser(req, res) {
        // using lodash to return our payload.
        const payload = _.pick(req.body, ['email', 'password']);
        const user = new userModel(payload);
        try {
            await user.save();
            const token = await user.genAuthToken(); // call the instance method
            res.header(process.env.AUTH_TYPE, token).send(user); 
        } catch(err) {
            res.status(400).send(err);
        }
    }

    // auth middleware
    static async authenticate(req, res, next) {
        let token = req.header(process.env.AUTH_TYPE);
        try {
            const user = await userModel.findByToken(token);
            if (!user) {
                throw new Error('cannot find the user by token');
            }
            req.user = user;
            req.token = token;
            next();
        } catch(err) {
            res.status(401).send(err);
        }
    }

    async logIn(req, res) {
        const body = _.pick(req.body, ['email', 'password']);
        try {
            const user = await userModel.findByCredentials(body.email, body.password);
            const token = await user.genAuthToken();
            if (token) {
                res.header(process.env.AUTH_TYPE, token).send(user);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async removeToken(req, res) {
        try {
            await req.user.removeToken(req.token);
            res.status(200).send();
        } catch (err) {
            res.status(401).send();
        }
    }

}

export default UserController;
