const express = require('express');
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');
const users = express.Router();
const routes = express.Router();
const app = express();

const authMiddlewares = require('./middlewares/auth');
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