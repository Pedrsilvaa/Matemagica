
const { TOKEN_SECRET } = require('../config/variables');
const jwt = require('jsonwebtoken');
const { blacklist } = require('../utils/blacklistToken');

/**
 * Esta arrow function serve como um middleware para
 * regastar um token enviado pelo header, verificar
 * se o token é válido e verificar, também, se o token
 * não está na lista negra.
 * Se nenhum dos requisitos der problema, o request
 * recebe o ID e o username do usuário, e assim,
 * dá prosseguimento com a rota.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns 
 */
const requiredLogin = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) { // Se o token estiver vázio
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if(err) { // Se o token for inválido
            return res.status(500).json({
                auth: false,
                message: 'Failed to authenticate token'
            });
        }
        if(blacklist.has(token)) { // Se o token estiver na lista negra
            return res.status(403).json({
                auth: false,
                message: 'Token is blacklisted'
            });
        }
        req.id_user = decoded.id_user;
        req.username = decoded.username;
        next(); // Prosseguir
    });
}

module.exports = requiredLogin;
