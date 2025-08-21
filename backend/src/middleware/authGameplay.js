
const GameModel = require('../models/gameModel');

/**
 * Esta arrow function serve como um middleware para
 * os jogos. Esse método verifica se o usuário poderá
 * jogar novamente após o tempo de três horas com as
 * vidas zeradas.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns 
 */
const verifyAuthorization = async (req, res, next) => {
    const now = new Date();
    const threeHours = 3 * 60 * 60 * 1000;

    if (user.last_life_zeroed) { // Se tem registro da última vez que zerou as vidas
        const lastLifeZeroed = new Date(user.last_life_zeroed);
        
        if (now - lastLifeZeroed >= threeHours) { // Se já ultrapassou as três horas
            const updatedLifes = await GameModel.UpdateLifes(user.id_user, 5);
            next();
            return res.status(200).json(updatedLifes);
        }
        else {
            return res.status(403).json({ message: 'Você deve esperar antes de jogar novamente.' });
        }
    }
    else {
        next();
    }
};

module.exports = verifyAuthorization;
