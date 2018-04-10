import * as contacts from '../controllers/ContactsController';
import todoController from '../controllers/TodoController';

const routes = (app) => {
    // just use the app.route('path').method().......
    app.route('/contacts')
       .get((req, res, next) => {
           // see how to use middleware
           console.log(`Request from:${req.originalUrl}`);
           console.log(`Request type:${req.method}`);
           next();
        }, contacts.getContacts)
       //add new contact
       .post(contacts.addNewContact);

    app.route('/contacts/:contactId')
       .get(contacts.getContactById)
       .put(contacts.updateContactById)
       .delete(contacts.deleteContactById);

    // add a new controller and use it methods
    const todoCtrl = new todoController();
    
    // chaining all types of request to this route
    // app.get('/to-do', (req, res, next) => {
    //     console.log('GET request to-do');
    //     next();
    // });

    app.route('/to-do')
       .get(todoCtrl.getTodo)
       .post(todoCtrl.addTodo);

    app.route('/to-do/:todoId')
       .get(todoCtrl.getTodoById)
       .put(todoCtrl.updateTodoById)
       .delete(todoCtrl.deleteTodoById);
    
    app.route('/to-do/:todo')
       .get(todoCtrl.getTodoByName);
};

export default routes;
