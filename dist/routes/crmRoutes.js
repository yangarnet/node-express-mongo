'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _crmController = require('../controllers/crmController');

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
};

exports.default = routes;
//# sourceMappingURL=crmRoutes.js.map