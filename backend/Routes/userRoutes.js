const express = require('express');
const router_user = express.Router();
const userController = require('../Controllers/userController');
const Middleware = require('../Middleware/Middleware');
router_user.get('/:username', Middleware, userController.getUserInfo);

module.exports = router_user;