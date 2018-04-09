'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _ContactsController = require('../controllers/ContactsController');

var contacts = _interopRequireWildcard(_ContactsController);

var _TodoController = require('../controllers/TodoController');

var _TodoController2 = _interopRequireDefault(_TodoController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var routes = function routes(app) {
   // just use the app.route('path').method().......
   app.route('/contacts').get(function (req, res, next) {
      // see how to use middleware
      console.log('Request from:' + req.originalUrl);
      console.log('Request type:' + req.method);
      next();
   }, contacts.getContacts)
   //add new contact
   .post(contacts.addNewContact);

   app.route('/contacts/:contactId').get(contacts.getContactById).put(contacts.updateContactById).delete(contacts.deleteContactById);

   // add a new controller and use it methods
   var todoCtrl = new _TodoController2.default();

   // chaining all types of request to this route
   // app.get('/to-do', (req, res, next) => {
   //     console.log('GET request to-do');
   //     next();
   // });

   app.route('/to-do').get(todoCtrl.getTodo).post(todoCtrl.addTodo);

   app.route('/to-do/:todoId').get(todoCtrl.getTodoById).put(todoCtrl.updateTodoById).delete(todoCtrl.deleteTodoById);
};

exports.default = routes;
//# sourceMappingURL=RoutesConfig.js.map