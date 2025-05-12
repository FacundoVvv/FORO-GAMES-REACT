import express from 'express';
import { getUserInfo, updateUserLastResendTime, changePassword } from '../Controllers/userController.js';
import Middleware from '../Middleware/Middleware.js';

const userRouter = express.Router();

// GET routes
userRouter.get('/:username', Middleware, getUserInfo);
// userRouter.get('/getLastResendTime', getLastResendTime); // 

// POST routes
userRouter.post('/updateUserLRT', Middleware, updateUserLastResendTime);

//PUT routes
userRouter.put('/change-password', Middleware, changePassword);
export { userRouter };
