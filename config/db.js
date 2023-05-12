const Sequelize = require("sequelize");

const db = new Sequelize("kwa", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;