const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const user = sequelize.define("Users", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
});

module.exports = user;