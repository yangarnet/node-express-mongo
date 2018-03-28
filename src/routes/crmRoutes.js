import { addNewContact, getContacts, getContactById, updateContactById, deleteContactById } from '../controllers/crmController';
import todoController from '../controllers/TodoController';

const routes = (app) => {
    // just use the app.route('path').method().......
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
    
    // chaining all types of request to this route
    app.route('/to-do')
       .get(todoCtrl.getTodo)
       .post(todoCtrl.addTodo);

    app.route('/to-do/:todoId')
       .get(todoCtrl.getTodoById)
       .put(todoCtrl.updateTodoById)
       .delete(todoCtrl.deleteTodoById);
};

export default routes;
