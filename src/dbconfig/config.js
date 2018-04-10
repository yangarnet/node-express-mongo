
import mongoose from 'mongoose';
import configValue  from './user.json';

const user = configValue.user;
const password = configValue.pwd;

const mongoDb = {
    development: 'mongodb://localhost:27017/myTestMongodb',
    test: '',
    production: `mongodb://${user}:${password}@ds139929.mlab.com:39929/mymongodb`
};

export const dbConfigure = (app) => {
    // get the app settings env object
    app.set('mongDbUrl', mongoDb[app.settings.env]);

    mongoose.connect(app.get('mongDbUrl'), { autoIndex: false})
            .then(() => {
                //console.log('you are connected!');
            }, (err) => {
                console.log('[Sorry] - mongodb connection error');
            });
};
