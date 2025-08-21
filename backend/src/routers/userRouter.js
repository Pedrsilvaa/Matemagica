
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const requiredLogin = require('../middleware/authToken');

router.get('/user', requiredLogin, UserController.GetUserById.bind(UserController));
router.put('/user', requiredLogin, UserController.UpdateUserData.bind(UserController));
router.patch('/user/email', requiredLogin, UserController.UpdateUserEmail.bind(UserController));
router.patch('/user/password', requiredLogin, UserController.UpdateUserPassword.bind(UserController));
router.patch('/user/mode', requiredLogin, UserController.AlterUserGameMode.bind(UserController));
router.delete('/user', requiredLogin, UserController.DeleteUser.bind(UserController));

module.exports = router;
