import { contactModel } from '../models/ContactModel';

export const addNewContact =  async (req, res) => {
    
    // create a new document from the model by passing req.body
    let newContact = new contactModel(req.body);

    try {
        const resoponse = await newContact.save();
        res.json(resoponse);
    } catch(err) {
        res.status(400).send(err);
    }
};

export const getContacts = (req, res) => {

    contactModel.find({}, (err, contacts) => {
        if (err) {
            res.send(err);
        }
        res.json({contacts});
    });
};

export const getContactById = (req, res) => {
    contactModel.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        contact.findContactWithSameFirstName((err, list)=>{
          if(err) {
            console.log('error in finding.....');
          }
          console.log('find conacts with same firstname:', list);
        });
        res.json(contact);
    });
};

export const updateContactById = (req, res) => {
    contactModel.findOneAndUpdate(
        { _id: req.params.contactId }, req.body, {new: true},
        (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact ? contact : {status : `[ERROR]:no such entity with id ${req.params.contactId}`});
        }
    );
};

export const deleteContactById = (req, res) => {
    contactModel.deleteOne({_id:req.params.contactId}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ status : `Successful delete entry with id ${req.params.contactId}`});
    });
};
