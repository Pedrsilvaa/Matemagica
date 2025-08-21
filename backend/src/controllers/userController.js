
const UserModel = require('../models/userModel');
const { addToBlacklist } = require('../utils/blacklistToken');

/**
 * É um controlador para o modelo do usuário
 */
class UserController {
    /**
     * Esta função assíncrona captura os dados de
     * um usuário através do ID fornecido.
     * 
     * @param {Object} req id_user
     * @param {Object} res status(), json()
     * @returns 
     */
    async GetUserById(req, res) {
        try {
            const user = await UserModel.GetById(req.id_user);
            // Se não foi encontrado uma conta armazenada no banco
            if(!user) return res.status(404).json({ message: 'Usuário não foi encontrado' });
            return res.status(200).json(user);
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao capturar dados do usuário' });
        }
    }
    
    /**
     * Esta função assíncrona atualiza o name e
     * username do usuário através do ID fornecido.
     * 
     * @param {Object} req body: {name, username}
     * @param {Object} res status(), json()
     * @returns 
     */
    async UpdateUserData(req, res) {
        try {
            const data = {
                name: req.body.name,
                username: req.body.username
            };
            // Se o valor de name é nulo
            if(!data.name) return res.status(400).json({ message: 'Insira um nome válido' });
            // Se o valor de username é nulo
            if(!data.username) return res.status(400).json({ message: 'Insira um username válido' });
            const updatedUser = await UserModel.UpdateData(req.id_user, data);
            return res.status(204).json(updatedUser);
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao atualizar dados' });
        }
    }
    
    /**
     * Esta função assíncrona atualiza o email do
     * usuário através do ID fornecido.
     * 
     * @param {Object} req body.phone
     * @param {Object} res status(), json()
     * @returns 
     */
    async UpdateUserEmail(req, res) {
        try {
            // Se o valor de email é nulo
            if(!req.body.email) return res.status(400).json({ message: 'Insira um email válido' });
            const updatedEmail = await UserModel.UpdateEmail(req.id_user, req.body.email);
            return res.status(200).json(updatedEmail);
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao atualizar email' });
        }
    }
    
    /**
     * Esta função assíncrona atualiza a senha do
     * usuário através do ID fornecido.
     * 
     * @param {Object} req body.password
     * @param {Object} res status(), json()
     * @returns 
     */
    async UpdateUserPassword(req, res) {
        try {
            const password = new String(req.body.password);
            // Se o valor de password é nulo
            if(!req.body.password) return res.status(400).json({ message: 'Insira uma senha válida' });
            // Se a password digitada é menor que seis caracteres
            if(password.length < 6) return res.status(400).json({ message: 'A senha precisa conter mais que seis caracteres' });
            const updatedPassword = await UserModel.UpdatePassword(req.id_user, password);
            return res.status(200).json(updatedPassword);
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao atualizar senha' });
        }
    }
    
    /**
     * Esta função assíncrona altera o modo de
     * jogo do usuário através doID fornecido.
     * 
     * @param {Object} req id_user, body.mode
     * @param {Object} res status(), json()
     * @returns 
     */
    async AlterUserGameMode(req, res) {
        try {
            const alteredGameMode = await UserModel.AlterGameMode(req.id_user, req.body.mode)
            return res.status(204).json(alteredGameMode);
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao mudar modo de jogo' });
        }
    }
    
    /**
     * Esta função assíncrona deleta a conta de
     * usuário através do ID fornecido.
     * 
     * @param {Object} req header: authorization
     * @param {Object} res status(), json()
     * @returns 
     */
    async DeleteUser(req, res) {
        try {
            const token = req.headers['authorization'];
            // Se o usuário não está logado
            if(!token) return res.status(401).json({ message: 'Não é possível deletar conta' });
            addToBlacklist(token);
            const message = await UserModel.Delete(req.id_user);
            return res.status(200).json(message);
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao deletar conta' });
        }
    }
}

module.exports = new UserController();
