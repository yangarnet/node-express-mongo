"use strict";
import express from 'express';
import routes from './routes/crmRoutes';
import bodyParser from 'body-parser';
import { dbConfig } from './dbconfig/config';

const app = express();
const PORT = 3000;
dbConfig();

// setup body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// get static resources from the plublic folder and display
app.use(express.static('../public'));
routes(app);

app.get('/', (req, res) => {
    res.send('you are sending data back , thx');
});

app.listen(PORT, () => {
    console.log(`server running @ port ${PORT}`);
});
