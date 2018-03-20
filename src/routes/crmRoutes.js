import { addNewContact, getContacts, getContactById, updateContactById, deleteContactById } from '../controllers/crmController';
import todoController from '../controllers/TodoController';

const routes = (app) => {
    app.route('/contacts')
       .get((req, res, next) => {
           // see how to use middleware
           console.log(`Request from:${req.originalUrl}`);
           console.log(`Request type:${req.method}`);
           next(); 
        }, getContacts)
       //add new contact
       .post(addNewContact);
    
    app.route('/contacts/:contactId')
       .get(getContactById)
       .put(updateContactById)
       .delete(deleteContactById);
    
    // add a new controller and use it methods
    const todoCtrl = new todoController();
    app.route('/to-do')
       .get(todoCtrl.getTodo)
       .post(todoCtrl.addTodo);
};

export default routes;
