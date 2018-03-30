"use strict";

import express from 'express';
import routes from './src/routes/crmRoutes';
import bodyParser from 'body-parser';
import { dbConfig } from './src/dbconfig/config';
import moment from 'moment';

// create the app with express()
const app = express();
const PORT = process.env.PORT || 3000;
console.log ('process.env.PORT', process.env.PORT);
dbConfig();

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

// in the following, will expose all the urls available
routes(app);

// how to use customised middleware
const myLogger = (req, res, next) => {
    console.log(`middleWare: request time: ${moment.unix(Date.now()/1000).format('DD-MM-YYYY HH:mm:ss')}`);
    next();
};


// application level middleware
app.use('/', myLogger);

// response to any type of request to path /to-do
app.use('/to-do', (req, res, next) => {
    console.log('request to path /to-do');
    next();
});
// response to any type of request to path /to-do/:todoId
app.use('/to-do/:todoId', (req, res, next) => {
    console.log('request to path /to-do/:todoId');
    next();
});


app.get('/', (req, res) => {
    res.send('you are sending data back , thx');
});

app.listen(PORT, () => {
    console.log(`server running @ port ${PORT}`);
});
