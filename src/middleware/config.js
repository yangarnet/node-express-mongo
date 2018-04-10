
import express from 'express';
import moment from 'moment';
import bodyParser from 'body-parser';

// how to use customised middleware
const myLogger = (req, res, next) => {
    //console.log(`middleWare: request time: ${moment.unix(Date.now()/1000).format('DD-MM-YYYY HH:mm:ss')}`);
    next();
};


const middleWare = (app) => {

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
        console.log('request to path /to-do/:todoId');
        next();
    });

};

export default middleWare;
