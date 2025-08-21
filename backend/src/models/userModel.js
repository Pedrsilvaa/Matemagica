
const bcrypt = require('bcrypt');
const connection = require('../config/connection');

/**
 * É um modelo para os dados do usuário.
 */
class UserModel {
    /**
     * Esta função assíncrona retorna os dados de um
     * usuário através do ID fornecido.
     * 
     * @param {number} id_user 
     * @returns 
     */
    async GetById(id_user) {
        const [rows] = await connection.query('SELECT `id_user`, `name`, `username`, `date_birth`, `email`, `mode`, `level`, `lifes`, `last_lifes_zeroed` FROM `users_tb` WHERE `id_user` = ?', [id_user]);
        return rows[0];
    }

    /**
     * Esta função assíncrona atualiza os dados do
     * usuário através do ID fornecido. Este dados
     * são o nome e username.
     * 
     * @param {number} id_user 
     * @param {Object} data name, username
     * @returns 
     */
    async UpdateData(id_user, data) {
        const { name, username } = data;
        await connection.query(
            'UPDATE `users_tb` SET `name` = ?, `username` = ? WHERE `id_user` = ?',
            [name, username, id_user]
        );
        return { id_user, ...data };
    }

    /**
     * Esta função assíncrona atualiza o email do
     * usuário através do ID fornecido.
     * 
     * @param {number} id_user 
     * @param {string} email 
     * @returns 
     */
    async UpdateEmail(id_user, email) {
        await connection.query(
            'UPDATE `users_tb` SET `email` = ? WHERE `id_user` = ?',
            [email, id_user]
        );
        return { id_user, ...email };
    }

    /**
     * Esta função assíncrona atualiza a senha do
     * usuário através do ID fornecido.
     * 
     * @param {number} id_user 
     * @param {string} password 
     * @returns 
     */
    async UpdatePassword(id_user, password) {
        const salt = await bcrypt.genSalt(12);
        const password_hash = await bcrypt.hash(password, salt);
        await connection.query(
            'UPDATE `users_tb` SET `password_hash` = ? WHERE `id_user` = ?',
            [password_hash, id_user]
        );
        return { id_user, ...password };
    }

    /**
     * Esta função assíncrona altera o modo de
     * jogo do usuário, através do ID fornecido.
     * 
     * @param {number} id_user 
     * @param {string} mode 
     * @returns 
     */
    async AlterGameMode(id_user, mode) {
        await connection.query(
            'UPDATE `users_tb` SET `mode` = ? WHERE `id_user` = ?',
            [mode, id_user]
        );
        return { id_user, ...mode };
    }
    
    /**
     * Esta função assíncrona deleta a conta do
     * usuário através do ID fornecido.
     * 
     * @param {number} id_user 
     * @returns 
     */
    async Delete(id_user) {
        await connection.query('DELETE FROM `users_tb` WHERE `id_user` = ?', [id_user]);
        return { message: 'User deleted' };
    }
}

module.exports = new UserModel();
