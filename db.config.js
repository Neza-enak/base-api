module.exports = {
  HOST: "database-2.cg1fic9jbuvo.us-east-1.rds.amazonaws.com",
  USER: "postgres",
  PASSWORD: "lopetkai",
  DB: "tkai",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
