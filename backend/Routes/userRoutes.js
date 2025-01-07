import express from 'express';
import { getUserInfo, updateUserLastResendTime } from '../Controllers/userController.js';
import Middleware from '../Middleware/Middleware.js';

const userRouter = express.Router();

// GET routes
userRouter.get('/:username', Middleware, getUserInfo);
// userRouter.get('/getLastResendTime', getLastResendTime); // (Si esta ruta la necesitas más adelante)

// POST routes
userRouter.post('/updateUserLRT', Middleware, updateUserLastResendTime);

export { userRouter };
