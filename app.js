'use strict';

import express from 'express';
import routes from './src/routes/RoutesConfig';
import { dbConfigure } from './src/dbconfig/config';
import middleWare from './src/middleware/config';

const app = express();
const PORT = process.env.PORT || 3001;

dbConfigure(app);
middleWare(app);
routes(app);

app.get('/', (req, res) => {
    res.end(JSON.stringify(process.env));
});

app.listen(PORT, () => {
     console.log(`server running @ port ${PORT}`);
});

// export for supertest
export default app;
