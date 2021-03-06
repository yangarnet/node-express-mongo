
import express from 'express';
import moment from 'moment';
import bodyParser from 'body-parser';
import UserController from '../controllers/UserController';
import helmet from 'helmet';
import morgan from 'morgan';

// how to use customised middleware
const myLogger = (req, res, next) => {
    console.log(`middleWare: request time: ${moment.unix(Date.now()/1000).format('DD-MM-YYYY HH:mm:ss')}`);
    next();
};


const middleWare = (app, admin) => {

    // setup http header for security
    app.use(helmet());
    if (app.get('env') === 'development') {
        // add the http request logger middleware
        app.use(morgan('tiny'));
    }
    // setup body parser middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // get static resources from the plublic folder and display
    // Express looks up the files relative to the static directory, 
    // so the name of the static directory is not part of the URL.

    // access localhost:3000/img/sky.jpeg
    app.use(express.static('public'));
    // add virtual path, access  with localhost:3000/static/img/sky.jpeg
    app.use('/static', express.static('public'));

    // application level middleware
    app.use('/', myLogger);

    // response to any type of request to path /to-do
    app.use('/to-do', (req, res, next) => {
        //console.log('request to path /to-do');
        next();
    });
    // response to any type of request to path /to-do/:todoId
    app.use('/to-do/:todoId', (req, res, next) => {
        //console.log('request to path /to-do/:todoId');
        next();
    });

    // user auth middleware
    app.use('/find-me', UserController.authenticate);

    app.use('/admin', admin);
};

export default middleWare;
