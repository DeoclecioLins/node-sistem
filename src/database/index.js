const Sequelize = require('sequelize');
const dbcfg = require('../config/database');
const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');

const connection = new Sequelize(dbcfg);

User.init(connection);
Address.init(connection);
Tech.init(connection);

User.associate(connection.models)
Tech.associate(connection.models)
Address.associate(connection.models)

module.exports = connection;