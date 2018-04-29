
import mongoose from 'mongoose';
import configValue  from './user.json';

// cannot do this in prod
const user = configValue.user;
const password = configValue.pwd;

const mongoDb = {
    production: `mongodb://${user}:${password}@ds161539.mlab.com:61539/mymongodb`
};

export const dbConfigure = (/*app*/env) => {
    // get the app settings env object
    // app.set('mongDbUrl', mongoDb[app.settings.env]);
    // do NOT do this if you are building real production APP
    mongoose.connect(mongoDb[env] || process.env.MONGODB_URL)
            .then(() => {
                console.log('you are connected!');
            }, (err) => {
                console.log('[Sorry] - mongodb connection error');
            });
};
