import express from 'express';
import { getUserInfo, updateUserLastResendTime, changePassword } from '../Controllers/userController.js';
import { Middleware } from '../Middleware/Middleware.js';
import { validateFields } from '../Middleware/validateFields.js';
const userRouter = express.Router();

// GET routes
userRouter.get('/:username', Middleware, getUserInfo);
// userRouter.get('/getLastResendTime', getLastResendTime); // 

// POST routes
userRouter.post('/updateUserLRT', Middleware, updateUserLastResendTime);

//PUT routes
userRouter.put('/change-password', Middleware, validateFields, changePassword);
export { userRouter };
