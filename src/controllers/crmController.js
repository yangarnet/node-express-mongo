import ContactModel from '../model/crmModel';

export const addNewContact = (req, res) => {
    
    // create a new document from the model by passing req.body
    let newContact = new ContactModel(req.body);

    newContact.print();
    // call instance save method
    // newContact.save((err, contact) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     // response the newly added contact
    //     res.json(contact);
    // });
    newContact.save().then(resoponse => {
        res.json(resoponse);
    }, error => {
        res.send(error);
    });
};

export const getContacts = (req, res) => {
    // using Model to findout all documents.
    // you can search the model with schema keywords.
    // ContactModel.find({ firstName: 'sdfgsdfgsdfg' },(err, contacts) =>{});

    ContactModel.find((err, contacts) => {
        if (err) {
            res.send(err);
        }
        res.json(contacts);
    });
};

export const getContactById = (req, res) => {
    ContactModel.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        contact.print();
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
    ContactModel.findOneAndUpdate(
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
    ContactModel.deleteOne({_id:req.params.contactId}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ status : `Successful delete entry with id ${req.params.contactId}`});
    });
};
