
import mongoose from 'mongoose';
import configValue  from './user.json';

export const dbConfig = () => {
    // setup mongo connection
    mongoose.Promise = global.Promise;
    
    // // connect to local mongodb : the 'myTestMongodb' will become the db name
    // mongoose.connect('mongodb://localhost:27017/myTestMongodb', { autoIndex: false})
    //         .then(() => {
    //         console.log('you are connected!');
    //         }, (err) => {
    //         console.log('[Sorry] - mongodb connection error');
    //         });
    
    const user = configValue.user;
    const password = configValue.pwd;
    const dbConnectString = `mongodb://${user}:${password}@ds163418.mlab.com:63418/mycontact`;

    mongoose.connect(dbConnectString, {autoIndex: false})
            .then(() => {
                console.log('connected to mongodb')
            }, (err) => {
                console.log(`Sorry - mongodb connection erro ${err}`);
            });
};
