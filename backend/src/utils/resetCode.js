
const mailer = require('nodemailer');
const {
    ACCOUNT_EMAIL,
    ACCOUNT_PASSWORD
} = require('../config/variables');

/**
 * Objeto que armazena o código gerado e
 * o tempo que foi gerado
 */
const codes = {};

/**
 * Esta função armazena no objeto codes
 * o código e o timestamp
 * 
 * @param {string} email 
 * @param {number} code 
 */
function StoreCode(email, code) {
    const timestamp = Date.now();
    codes[email] = { code, timestamp };
}

/**
 * Esta função assíncrona cria uma mensagem e o
 * envia ao email fornecido pelu usuário. Nesta
 * mensagem há o código de autenticação
 * 
 * @param {string} email 
 * @param {number} code 
 */
async function SendForEmail(email, code) {
    // Configurando conta que enviará a mensagem
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: ACCOUNT_EMAIL,
            pass: ACCOUNT_PASSWORD
        }
    });
    // Envio da mensagem com o código
    await transporter.sendMail({
        from: ACCOUNT_EMAIL,
        to: email,
        subject: 'Código de Redefinição de Senha',
        text: `Seu código de redefinição é ${code}. Ele expira em 2 minutos.`
    });
}

/**
 * Esta função verificará se o código fornecido
 * é válido. Verá se foi realmente criado um
 * código, se o código inserido é válido e se
 * não foi expirado.
 * 
 * @param {string} email 
 * @param {number} code 
 * @returns 
 */
function IsCodeValid(email, code) {
    const storedCode = codes[email];
    if(!storedCode) {
        delete codes[email];
        return {
            isValid: false,
            message: 'Nenhum código foi gerado'
        };
    }
    else if(storedCode.code !== code) {
        delete codes[email];
        return {
            isValid: false,
            message: 'Código inválido'
        };
    }
    else if((Date.now() - storedCode.timestamp) > 120000) {
        delete codes[email];
        return {
            isValid: false,
            message: 'Código expirado. Peça novamente'
        };
    }
    else {
        delete codes[email];
        return {
            isValid: true,
            message: 'Alteração realizada com sucesso'
        };
    }
}

module.exports = {
    StoreCode,
    SendForEmail,
    IsCodeValid
};
