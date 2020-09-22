const Sequelize = require('sequelize');
const dbcfg = require('../config/database');
const User = require('../app/models/User');
const Address = require('../app/models/Address');
const Tech = require('../app/models/Tech');

const connection = new Sequelize(dbcfg);

User.init(connection);
Address.init(connection);
Tech.init(connection);

User.associate(connection.models)
Tech.associate(connection.models)
Address.associate(connection.models)

module.exports = connection;