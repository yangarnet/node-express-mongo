import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// schema definition, then you can add methods to schema, finally compile model.
/*
  support types: String, Boolean, Number, Date, Array, Mixed, ObjectId
*/
const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first Name'
    },
    lastName: {
        type: String,
        required: 'Enter a last Name'
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: 'Enter a email addres'
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});
// now you can add new methods to you schema.
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// add instance method
ContactSchema.methods.print = function() {
  console.log(`ContactSchema.methods : firstName: ${this.firstName} + email:${this.email}`);
};
ContactSchema.methods.findContactWithSameFirstName = function(cb) {
  return this.model('myContact').find({firstName: this.firstName}, cb)
};


// now, compiling the schema into the model used by ctrl, herre 'contact' will be
// the collection name in mongodb, will use ContactModel to interact in controllers.
const ContactModel = mongoose.model('contact', ContactSchema);

export default ContactModel;
