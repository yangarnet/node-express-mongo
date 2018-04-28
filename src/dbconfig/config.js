
import mongoose from 'mongoose';
import configValue  from './user.json';

// cannot do this in prod
const user = configValue.user;
const password = configValue.pwd;

const mongoDb = {
    production: `mongodb://${user}:${password}@ds261429.mlab.com:61429/mymongodb`
};

export const dbConfigure = (/*app*/) => {
    // get the app settings env object
    // app.set('mongDbUrl', mongoDb[app.settings.env]);
    // do NOT do this if you are building real production APP
    mongoose.connect(process.env.MONGODB_URL || mongoDb.production)
            .then(() => {
                console.log('you are connected!');
            }, (err) => {
                console.log('[Sorry] - mongodb connection error');
            });
};
