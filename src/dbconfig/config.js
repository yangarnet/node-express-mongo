
import mongoose from 'mongoose';
import configValue  from './user.json';

// cannot do this in prod
const user = configValue.user;
const password = configValue.pwd;

const mongoDb = {
    development:    'mongodb://localhost:27017/myDevMongodb',
    test:           'mongodb://localhost:27017/myTestMongodb',
    production:     `mongodb://${user}:${password}@ds261429.mlab.com:61429/mymongodb`
};

export const dbConfigure = (/*app*/env) => {
    // get the app settings env object
    // app.set('mongDbUrl', mongoDb[app.settings.env]);
    mongoose.connect(/*app.get('mongDbUrl')*/ mongoDb[env])
            .then(() => {
                console.log('you are connected!');
            }, (err) => {
                console.log('[Sorry] - mongodb connection error');
            });
};
