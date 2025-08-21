
const connection = require('../config/connection');

/**
 * É um modelo para os dados de jogo.
 */
class GameModel {
    /**
     * Esta função assíncrona retorna os dados de jogo do usuário
     * através do ID fornecido pelo JWT.
     * 
     * @param {number} id_user
     * @returns 
     */
    async GetGameData(id_user) {
        const [rows] = await connection.query(
            'SELECT `level`, `lifes`, `last_lifes_zeroed` FROM `users_tb` WHERE `id_user` = ?', [id_user]
        );
        return rows[0];
    }

    /**
     * Esta função assíncrona atualiza o nível de jogo do usuário
     * através do ID fornecido pelo JWT.
     * 
     * @param {number} id_user
     * @param {number} level
     * @returns 
     */
    async UpdateLevel(id_user, level) {
        await connection.query(
            'UPDATE `users_tb` SET `level` = ? WHERE `id_user` = ?',
            [level, id_user]
        );
        return { id_user, ...level };
    }

    /**
     * Esta função assíncrona atualiza a quantidade de vidas do
     * usuário através do ID fornecido pelo JWT.
     * Se todas as vidas estiverem zeradas, é adicionado o último
     * momento que as vidas zeraram.
     * 
     * @param {number} id_user
     * @param {number} lifes
     * @returns 
     */
    async UpdateLifes(id_user, lifes) {
        const now = new Date();
        let lastLifesZeroed = null;
        if(lifes === 0) {
            lastLifesZeroed = now;
        }
        await connection.query(
            'UPDATE `users_tb` SET `lifes` = ?, `last_lifes_zeroed` = ? WHERE `id_user` = ?',
            [lifes, lastLifesZeroed, id_user]
        );
        return { id_user, ...lifes };
    }
}

module.exports = new GameModel();
