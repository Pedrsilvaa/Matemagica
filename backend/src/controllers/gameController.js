
const GameModel = require('../models/gameModel');

/**
 * É um controlador para o modelo do jogo.
 */
class GameController {
    /**
     * Esta função assíncrona altera o nível que o
     * jogador está. É alterado cada vez que o usuário
     * cumpra uma fase.
     * 
     * @param {Object} req id_user
     * @param {Object} res status(), json()
     * @returns 
     */
    async UpdateUserLevel(req, res) {
        try {
            const data = await GameModel.GetGameData(req.id_user);
            const newLevel = data.level + 1;
            const updatedLevel = await GameModel.UpdateLevel(req.id_user, newLevel);
            return res.status(200).json(updatedLevel);
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao tentar subir de nível' });
        }
    }

    /**
     * Esta função assíncrona atualiza a quantidade de
     * vidas que o usuário possui. Esse método também
     * verifica se o usuário perdeu todas as suas vidas e
     * se assistiu a um anúncio para ganhar mais uma vida.
     * 
     * @param {Object} req id_user, statusAd, statusLevel
     * @param {Object} res status(), json()
     * @returns 
     */
    async UpdateUserLifes(req, res) {
        try {
            const data = await GameModel.GetGameData(req.id_user);
            const watchedAd = req.statusAd;
            const missedLevel = req.statusLevel;
            
            if(data.lifes !== 0) { // Se o usuário possui vidas
                if(missedLevel) { // Se ele perdeu um nível
                    const newLifes = data.lifes - 1;
                    const updatedLifes = await GameModel.UpdateLifes(req.id_user, newLifes);
                    return res.status(200).json(updatedLifes);
                }
                if(watchedAd === true) { // Se assistiu a um anúncio
                    if(data.lifes < 5) { // Se é possível ganhar uma vida
                        const newLifes = data.lifes + 1;
                        const updatedLifes = await GameModel.UpdateLifes(req.id_user, newLifes);
                        return res.status(200).json(updatedLifes);
                    }
                    else {
                        return res.status(403).json({ message: 'Não é possível recuperar vidas' });
                    }
                }
            }
            else {
                if(watchedAd === true) { // Se assistiu a um anúncio
                    const newLifes = data.lifes + 1;
                    const updatedLifes = await GameModel.UpdateLifes(req.id_user, newLifes);
                    return res.status(200).json(updatedLifes);
                }
            }
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao atualizar as vidas' });
        }
    }
}

module.exports = new GameController();
