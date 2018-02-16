"use strict";

import express from 'express';
import routes from './src/routes/crmRoutes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

let app = express();
const PORT = 3000;

// setup mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myTestMongodb', { autoIndex: false})
        .then(() => {
           console.log('you are connected!');
        }, (err) => {
          console.log('[Sorry] - mongodb connection error');
        });
// let db = mongoose.connection;
// db.on('error', () => {
//
// }).once('open', () => {
//
// });

// setup body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// get static resources from the plublic folder and display
app.use(express.static('./public'));
routes(app);

app.get('/', (req, res) => {
    res.send('you are sending data back , thx');
});

app.listen(PORT, () => {
    console.log(`server running @ port ${PORT}`);
});