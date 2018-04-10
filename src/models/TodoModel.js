import todoSchema from '../schemas/todo';
import mongoose from 'mongoose';

const todoModel = mongoose.model('todo', todoSchema);

export default todoModel;
