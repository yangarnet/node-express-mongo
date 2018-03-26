"use strict";
import express from 'express';
import routes from './routes/crmRoutes';
import bodyParser from 'body-parser';
import { dbConfig } from './dbconfig/config';

const app = express();
const PORT = process.env.PORT || 3000;
console.log ('process.env.PORT', process.env.PORT);

dbConfig();

// setup body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// get static resources from the plublic folder and display
app.use(express.static('../public'));

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
