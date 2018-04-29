import * as contacts from '../controllers/ContactsController';
import todoController from '../controllers/TodoController';
import userController from '../controllers/UserController';

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
    
    // put on the authentication here for get/post todo
    app.route('/to-do')
       .get(userController.authenticate, todoCtrl.getTodo)
       .post([userController.authenticate, todoController.preSaveMiddleware], todoCtrl.addTodo);

    app.route('/to-do/:todoId')
       .get(userController.authenticate, todoCtrl.getTodoById)
       .put(userController.authenticate, todoCtrl.updateTodoById)
       .delete(userController.authenticate, todoCtrl.deleteTodoById)
       .patch(userController.authenticate, todoCtrl.patchTodoById);
    
    app.route('/to-do/:todo')
       .get(userController.authenticate, todoCtrl.getTodoByName);
    
    const userCtrl = new userController();

    app.route('/add-user')
       .post(userCtrl.addNewUser);
    
    // will invoke the middleware for find-me
    app.get('/find-me', (req,res) => {
        res.send(req.user);
    });

    // a new route for user login
    app.post('/user/login', userCtrl.logIn);
    // delete user token after logout
    app.delete('/user/me/token', userController.authenticate, userCtrl.removeToken);
};

export default routes;
