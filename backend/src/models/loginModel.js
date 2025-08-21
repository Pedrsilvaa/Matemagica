
require('dotenv').config();
const { SALT } = require('../config/variables');
const bcrypt = require('bcrypt');
const connection = require('../config/connection');

/**
 * É um modelo para os dados trocados para
 * login, registro, logout, etc.
 */
class LoginModel {
    /**
     * Esta função assíncrona retorna o ID do usuário
     * através do email fornecido. Se for retornado
     * algum ID, o email inserido já fora cadastrado.
     * 
     * @param {string} email
     * @returns 
     */
    async GetByEmail(email) {
        const [rows] = await connection.query('SELECT `id_user` FROM `users_tb` WHERE `email` = ?', [email]);
        if(rows.length === 0) return null;
        return rows[0];
    }

    /**
     * Esta função assíncrona retorna o ID do usuário
     * através do username fornecido. Se for retornado
     * algum ID, o username inserido já fora cadastrado.
     * 
     * @param {string} username
     * @returns 
     */
    async GetByUsername(username) {
        const [rows] = await connection.query('SELECT `id_user` FROM `users_tb` WHERE `username` = ?', [username]);
        if(rows.length === 0) return null;
        return rows[0];
    }

    /**
     * Esta função assíncrona retorna o ID do usuário
     * através do telefone fornecido. Se for retornado
     * algum ID, o telefone inserido já fora cadastrado.
     * 
     * @param {string} phone
     * @returns 
     */
    async GetByPhone(phone) {
        const [rows] = await connection.query('SELECT `id_user` FROM `users_tb` WHERE `phone` = ?', [phone]);
        if(rows.length === 0) return null;
        return rows[0];
    }

    /**
     * Esta função assíncrona cadastra os dados enviados
     * pelo usuário no banco de dados. É o registro da conta.
     * Além disso, a senha digitada pelo cliente é
     * codificada, guardando na base de dados a senha
     * codificada.
     * 
     * @param {Object} data name, username, date_birth, email, password
     * @returns 
     */
    async Register(data) {
        const { name, username, date_birth, email, password } = data;
        const salt = await bcrypt.genSalt(SALT);
        const password_hash = await bcrypt.hash(password, salt);
        const [result] = await connection.query(
            'INSERT INTO `users_tb` (`name`, `username`, `date_birth`, `email`, `password_hash`) VALUES (?, ?, ?, ?, ?)',
            [name, username, date_birth, email, password_hash]
        );
        return { id_user: result.insertId, ...data }
    }

    /**
     * Esta função assíncrona retorna dados do banco
     * através do email inserido. Se nada for retornado,
     * Significa que nenhuma conta foi registrada com
     * o email fornecido.
     * 
     * @param {string} email
     * @returns 
     */
    async Login(email) {
        const [rows] = await connection.query('SELECT `id_user`, `username`, `password_hash` FROM `users_tb` WHERE `email` = ?', [email]);
        if(rows.length === 0) return null;
        return rows[0];
    }

    /**
     * Esta função assíncrona atualiza no banco
     * a senha de um usuário através do email
     * inserido. Só será chamada caso o cliente
     * tenha esquecido da sua senha anterior.
     * 
     * @param {string} email
     * @param {string} password
     * @returns 
     */
    async AlterPassword(email, password) {
        const salt = await bcrypt.genSalt(SALT);
        const password_hash = await bcrypt.hash(password, salt);
        await connection.query(
            'UPDATE `users_tb` SET `password_hash` = ? WHERE `email` = ?',
            [password_hash, email]
        );
        return { email, password };
    }
}

module.exports = new LoginModel();
