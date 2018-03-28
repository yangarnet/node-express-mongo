'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _crmController = require('../controllers/crmController');

var _TodoController = require('../controllers/TodoController');

var _TodoController2 = _interopRequireDefault(_TodoController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(app) {
   app.route('/contacts').get(function (req, res, next) {
      // see how to use middleware
      console.log('Request from:' + req.originalUrl);
      console.log('Request type:' + req.method);
      next();
   }, _crmController.getContacts)
   //add new contact
   .post(_crmController.addNewContact);

   app.route('/contacts/:contactId').get(_crmController.getContactById).put(_crmController.updateContactById).delete(_crmController.deleteContactById);

   // add a new controller and use it methods
   var todoCtrl = new _TodoController2.default();
   app.route('/to-do').get(todoCtrl.getTodo).post(todoCtrl.addTodo);

   app.route('/to-do/:todoId').get(todoCtrl.getTodoById).put(todoCtrl.updateTodoById).delete(todoCtrl.deleteTodoById);
};

exports.default = routes;
//# sourceMappingURL=crmRoutes.js.map