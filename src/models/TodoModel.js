import mongoose from 'mongoose';
import todo from '../schemas/todo';

const Schema = mongoose.Schema;
const todoSchema = new Schema(todo);

// "mongoose.models.contact ||" is key to avoid error: 
// OverwriteModelError: Cannot overwrite `todo` model once compiled.
export const todoModel =  mongoose.model('todo', todoSchema);