import mongoose from 'mongoose';
import ContactSchema from '../schemas/contact';

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
const contactModel = mongoose.model('contact', ContactSchema);

export default contactModel;
