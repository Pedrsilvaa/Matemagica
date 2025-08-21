
const mysql = require('mysql2');
const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT
} = require('../config/variables');

/**
 * Esta constante cria uma conexão com o banco de dados.
 * Qualquer query realizada será através dela.
 */
const connection = mysql.createPool ({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT
});

module.exports = connection.promise();
