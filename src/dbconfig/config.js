
import mongoose from 'mongoose';

export const dbConfig = () => {
    // setup mongo connection
    mongoose.Promise = global.Promise;
    // the 'myTestMongodb' will become the db name
    mongoose.connect('mongodb://localhost:27017/myTestMongodb', { autoIndex: false})
            .then(() => {
            console.log('you are connected!');
            }, (err) => {
            console.log('[Sorry] - mongodb connection error');
            });
};
