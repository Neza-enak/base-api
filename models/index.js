const DBConfig = require('../db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DBConfig.DB, DBConfig.USER, DBConfig.PASSWORD, {
  host: DBConfig.HOST,
  dialect: DBConfig.dialect,
  pool: DBConfig.pool,
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Transaction = require("./transaction.js")(sequelize, Sequelize);

module.exports = db;