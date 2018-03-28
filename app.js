"use strict";
// exports = {abc: 123456};
// module.exports = {we: function() {}};

// console.log('exports', arguments[0]);
// console.log('module.exports', arguments[2]);
// console.log('__filename', arguments[3]);
// console.log('__dirname', arguments[4]);

import express from 'express';
import routes from './src/routes/crmRoutes';
import bodyParser from 'body-parser';
import { dbConfig } from './src/dbconfig/config';

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

app.use('/', (req, res, next) => {
    next();
});

app.get('/', (req, res) => {
    res.send('you are sending data back , thx');
});

app.listen(PORT, () => {
    console.log(`server running @ port ${PORT}`);
});
