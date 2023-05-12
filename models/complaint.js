const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const complaint = sequelize.define("Complaints", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    
}, {
    freezeTableName: true,
});

module.exports = complaint;