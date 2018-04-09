"use strict";

import express from 'express';
import routes from './src/routes/crmRoutes';
import { dbConfig } from './src/dbconfig/config';
import middleWare from './src/middleware/config';

// create the app with express()
const app = express();
const PORT = process.env.PORT || 3000;
console.log ('process.env.PORT', process.env.PORT);

dbConfig();
middleWare(app);
routes(app);

app.get('/', (req, res) => {
    //res.send('this app is running on Nodejs');
    res.end(app.settings);
});

app.listen(PORT, () => {
    console.log(`server running @ port ${PORT}`);
});

console.log('app', app.settings);

export default app;