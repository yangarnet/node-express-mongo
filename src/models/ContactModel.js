import mongoose from 'mongoose';
import contact from '../schemas/contact';

const Schema = mongoose.Schema;
const ContactSchema = new Schema(contact);

// now you can add new methods to you schema.
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// add instance method
ContactSchema.methods.print = function() {
    return `firstName: ${this.firstName}, lastName: ${this.lastname}, email:${this.email}`;
  };

ContactSchema.methods.findContactWithSameFirstName = function(cb) {
    return this.model('contact').find({firstName: this.firstName}, cb);
};

ContactSchema.methods.findByEmail = function(cb) {
    return this.model('contact').findOne({ email: this.email }, cb);
};
// now, compiling the schema into the model used by ctrl, herre 'contact' will be
// the collection name in mongodb, will use ContactModel to interact in controllers.

// "mongoose.models.contact ||" is key to avoid error: 
// OverwriteModelError: Cannot overwrite `todo` model once compiled.
export const contactModel = mongoose.models.contact || mongoose.model('contact', ContactSchema);