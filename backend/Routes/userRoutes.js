const express = require('express');
const router_user = express.Router();
const userController = require('../Controllers/userController');
const Middleware = require('../Middleware/Middleware');
//get routes
router_user.get('/:username', Middleware, userController.getUserInfo);
//post routes
router_user.post('/updateUser', Middleware, userController.updateUser);
module.exports = router_user;