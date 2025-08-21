
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    TOKEN_SECRET,
    TOKEN_TIME
} = require('../config/variables');
const LoginModel = require('../models/loginModel');
const { addToBlacklist } = require('../utils/blacklistToken');
const {
    StoreCode,
    SendForEmail,
    IsCodeValid
} = require('../utils/resetCode');

/**
 * É um controlador para o modelo do login.
 */
class LoginController {
    /**
     * Esta função assíncrona registra o usuário no
     * banco de dados. Verifica se os dados foram
     * digitados, se alguns dos dados já não foi
     * cadastrado, e por fim, cadastra.
     * 
     * @param {Object} req body: {name, username, date_birth, email, password}
     * @param {Object} res status(), json()
     * @returns 
     */
    async RegisterUser(req, res) {
        try {
            const data = {
                name: req.body.name,
                username: req.body.username,
                date_birth: req.body.date_birth,
                email: req.body.email,
                password: req.body.password
            };
            // Se o valor de name é nulo
            if(!data.name) return res.status(400).json({ message: 'Insira um nome válido' });
            // Se o valor de username é nulo
            if(!data.username) return res.status(400).json({ message: 'Insira um username válido' });
            // Se o valor de date_birth é nulo
            if(!data.date_birth) return res.status(400).json({ message: 'Insira uma data de nascimento válida' });
            // Se o valor de email é nulo
            if(!data.email) return res.status(400).json({ message: 'Insira um email válido' });
            // Se o valor de password é nulo
            if(!data.password) return res.status(400).json({ message: 'Insira uma senha válida' });

            const existedEmail =  await LoginModel.GetByEmail(data.email);
            const existedUsername =  await LoginModel.GetByUsername(data.username);
            // Se está cadastrado o email inserido
            if (existedEmail !== null) return res.status(401).json({ message: 'O email já está em uso' });
            // Se está cadastrado o username inserido
            if (existedUsername !== null) return res.status(401).json({ message: 'O username já está em uso' });

            const newUser = await LoginModel.Register(data);
            return res.status(201).json(newUser);
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }
    }
    
    /**
     * Esta função assíncrona realiza o login de
     * um usuário, através dos dados fornecidos.
     * 
     * @param {Object} req body: {email, password}
     * @param {Object} res status(), json()
     * @returns 
     */
    async LoginUser(req, res) {
        try {
            const user = await LoginModel.Login(req.body.email);
            // Se não está cadastrado uma conta
            if(!user) return res.status(404).json({ message: 'Login não foi efetuado' });
            
            const isPasswordValid = await bcrypt.compare(req.body.password, user['password_hash']);
            if (isPasswordValid) { // Se é a senha correta
                const token = jwt.sign({
                        id_user: user['id_user'],
                        username: user['username']
                    },
                    TOKEN_SECRET,
                    { expiresIn: TOKEN_TIME }
                );
                return res.status(200).json({
                    message: 'Login efetuado com sucesso',
                    token: token
                });
            }
            else {
                return res.status(401).json({ message: 'Login não foi efetuado' });
            }
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao logar usuário' });
        }
    }
    
    /**
     * Esta função assíncrona realiza o logout de
     * um usuário, através do token fornecido pelo
     * header.
     * 
     * @param {Object} req header: authorization
     * @param {Object} res status(), json()
     * @returns 
     */
    async LogoutUser(req, res) {
        try {
            const token = req.headers['authorization'];
            // Se o usuário não está logado
            if(!token) return res.status(401).json({ message: 'Não foi possível deslogar' });
    
            addToBlacklist(token);
            return res.status(204).json({ message: 'Logout efetuado com sucesso' });
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao deslogar usuário' });
        }
    }

    /**
     * Esta função assíncrona gera um código de autenticação
     * e o envia ao email fornecido. Só será chamada caso
     * o usuário tenha esquecido a sua senha.
     * 
     * @param {Object} req body.email
     * @param {Object} res status(), json()
     * @returns 
     */
    async SendCodeForEmail(req, res) {
        try {
            const { email } = req.body;
            const user = await LoginModel.GetByEmail(email);
            // Se não está cadastrado uma conta
            if(!user) return res.status(404).json({ message: 'Email não encontrado' });
            // Gerando código de autenticação
            const code = Math.floor(100000 + Math.random() * 900000);

            await SendForEmail(email, code);
            StoreCode(email, code);
            return res.status(200).json({ message: 'Código enviado com sucesso' });
        }
        catch(error) {
            console.error(error);
            
            return res.status(500).json({ message: 'Erro ao enviar código de redefinição de senha' });
        }
    }

    /**
     * Esta função assíncrona altera a senha do usuário
     * com base no email fornecido. Mas para que seja
     * realizado essa função, é necessário do código
     * gerado e verificá-lo.
     * 
     * @param {Object} req body: {email, code, password}
     * @param {Object} res status(), json()
     * @returns 
     */
    async ResetPassword(req, res) {
        try {
            const { email, code, password } = req.body;
            // Se o valor de email é nulo
            if(!code) return res.status(401).json({ message: 'Insira o código de autenticação' });
            // Se o valor de password é nulo
            if(!password) return res.status(400).json({ message: 'Insira uma senha válida' });
            const { isValid, message } = IsCodeValid(email, code);
            // Se não é possível mudar senha (nunca gerado, inválido ou já expirado)
            if(isValid === false) return res.status(401).json({ message: message });
            
            const newPassword = await LoginModel.AlterPassword(email, password);
            return res.status(200).json({ message: message, newPassword });
        }
        catch(error) {
            return res.status(500).json({ message: 'Erro ao redefinir senha' });
        }
    }
}

module.exports = new LoginController();
