import mongoose from 'mongoose';
import ContactSchema from '../schemas/contact';

// now, compiling the schema into the model used by ctrl, herre 'contact' will be
// the collection name in mongodb, will use ContactModel to interact in controllers.
const contactModel = mongoose.model('contact', ContactSchema);

export default contactModel;
