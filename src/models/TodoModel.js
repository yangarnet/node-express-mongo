import todoSchema from '../schemas/todo';
import mongoose from 'mongoose';

const todoModel = mongoose.model('todo', todoSchema);

// export the todoModle
export default todoModel;
