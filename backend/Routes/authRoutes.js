import express from 'express';
import { check } from 'express-validator';
import { validateFields } from '../Middleware/validateFields.js';
import { register, login, verifyCode, verifyTokenFC, emailResend } from '../Controllers/authController.js';

const authRouter = express.Router();

// Reglas de validación para el registro
const registerValidationRules = [
  check('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
  check('email').isEmail().withMessage('El correo electrónico no es válido.'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];

// Reglas de validación para el login
const loginValidationRules = [
  check('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
  check('password').notEmpty().withMessage('La contraseña es requerida.')
];

// Código de validación de verificación (Confirmar Email)
const verifyCodeValidationRules = [
  check('code').notEmpty().withMessage('El código de verificación es requerido.')
];

authRouter.post('/register', registerValidationRules, validateFields, register);
authRouter.post('/login', loginValidationRules, validateFields, login);
authRouter.post('/verify-code', verifyCodeValidationRules, validateFields, verifyCode); // Verificar email
authRouter.post('/verifyToken', verifyTokenFC); // Verificar token de inicio de sesión
authRouter.post('/email-resend', emailResend); // Reenviar email

export { authRouter };
