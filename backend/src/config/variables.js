
require('dotenv').config();

// Porta da API
const API_PORT = Number(process.env.API_PORT);
// Configurações do banco de dados
const MYSQL_HOST = String(process.env.MYSQL_HOST);
const MYSQL_USER = String(process.env.MYSQL_USER);
const MYSQL_PASSWORD = String(process.env.MYSQL_PASSWORD);
const MYSQL_DATABASE = String(process.env.MYSQL_DATABASE);
const MYSQL_PORT = Number(process.env.MYSQL_PORT);
// Configurações do token
const TOKEN_SECRET = String(process.env.TOKEN_SECRET);
const TOKEN_TIME = String(process.env.TOKEN_TIME);
// Salt
const SALT = Number(process.env.SALT);
// Configurações do email
const ACCOUNT_EMAIL = String(process.env.ACCOUNT_EMAIL);
const ACCOUNT_PASSWORD = String(process.env.ACCOUNT_PASSWORD);

module.exports = {
    API_PORT,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT,
    TOKEN_SECRET,
    TOKEN_TIME,
    SALT,
    ACCOUNT_EMAIL,
    ACCOUNT_PASSWORD
}
