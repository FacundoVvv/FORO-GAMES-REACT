const express = require('express');
const router_user = express.Router();
const userController = require('../Controllers/userController');
const Middleware = require('../Middleware/Middleware');
//get routes
router_user.get('/:username', Middleware, userController.getUserInfo);
// router_user.get('/getLastResendTime, userController.getLastResendTime');
//post routes
router_user.post('/updateUserLRT', Middleware, userController.updateUserLastResendTime);
module.exports = router_user;