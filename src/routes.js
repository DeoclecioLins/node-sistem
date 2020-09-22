const express = require('express');
const UserController = require('./app/controllers/UserController');
const AddressController = require('./app/controllers/AddressController');
const TechController = require('./app/controllers/TechController');
const ReportController = require('./app/controllers/ReportController');
const users = express.Router();
const routes = express.Router();
const app = express();

const authMiddlewares = require('./app/middlewares/auth');
//users.use(authMiddlewares);


users.get('/', UserController.index );
users.get('/:user_id/address', AddressController.index );
users.post('/:user_id/address', AddressController.store );
users.get('/:user_id/techs', TechController.index );
users.post('/:user_id/techs', TechController.store );
users.delete('/:user_id/techs', TechController.delete );
users.use('/users', users);
routes.get('/report', ReportController.show);

module.exports = app.use(authMiddlewares,[users,routes]);