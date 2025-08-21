
const express = require('express');
const router = express.Router();
const GameController = require('../controllers/gameController');
const requiredLogin = require('../middleware/authToken');

router.patch('/user/level', requiredLogin, GameController.UpdateUserLevel.bind(GameController));
router.patch('/user/lifes', requiredLogin, GameController.UpdateUserLifes.bind(GameController));

module.exports = router;
