
// schema definition, then you can add methods to schema, finally compile model.
/*
  support types: String, Boolean, Number, Date, Array, Mixed, ObjectId
*/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contact = {
    firstName: {
        type: String,
        required: 'Ok, Enter a first Name',
        minlength: 2
    },
    lastName: {
        type: String,
        required: 'Ok, Enter a last Name',
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: 'OK, Enter a email addres'
    },
    company: {
        type: String,
        trim: true
    },
    phone: {
        type: Number
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
};

const ContactSchema = new Schema(contact);

export default ContactSchema;
