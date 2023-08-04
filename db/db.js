const sequelize = require("sequelize");

const connection = new sequelize('guiaperguntas', 'root', 'masterkey', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;