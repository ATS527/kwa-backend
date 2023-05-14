const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const complaint = sequelize.define("Complaints", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    complaint: {
        type: Sequelize.TEXT,
    },
    consumer_id: {
        type: Sequelize.STRING,
    },
    consumer_number: {
        type: Sequelize.BIGINT(20),
    },
    mobile_number: {
        type: Sequelize.BIGINT(10),
    },
    attachment_path: {
        type: Sequelize.TEXT,
    },
    current_progress: {
        type: Sequelize.STRING,
    },
    remarks: {
        type: Sequelize.TEXT,
    }
}, {
    freezeTableName: true,
});

module.exports = complaint;