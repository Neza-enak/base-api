const DBConfig = require('../db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DBConfig.DB, null, null, {
  replication: {
    read: { host: DBConfig.HOST_REPLICA, username: DBConfig.USER, password: DBConfig.PASSWORD },
    write: { host: DBConfig.HOST_MAIN, username: DBConfig.USER, password: DBConfig.PASSWORD },
  },
  dialect: DBConfig.dialect,
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Transaction = require("./transaction.js")(sequelize, Sequelize);

module.exports = db;