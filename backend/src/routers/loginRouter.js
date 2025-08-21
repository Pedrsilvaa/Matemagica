
const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/loginController');
const requiredLogin = require('../middleware/authToken');

router.post('/register', LoginController.RegisterUser.bind(LoginController));
router.post('/login', LoginController.LoginUser.bind(LoginController));
router.post('/logout', requiredLogin, LoginController.LogoutUser.bind(LoginController));
router.post('/forgot-password', LoginController.SendCodeForEmail.bind(LoginController));
router.patch('/alter-password', LoginController.ResetPassword.bind(LoginController));

module.exports = router;
