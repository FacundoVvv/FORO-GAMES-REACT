const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../Controllers/authController');
const { validateFields } = require('../Middleware/validateFields');

// reglas de validacion para el registro
const registerValidationRules = [
  check('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
  check('email').isEmail().withMessage('El correo electrónico no es válido.'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];

// reglas de validacion para el login
const loginValidationRules = [
  check('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
  check('password').notEmpty().withMessage('La contraseña es requerida.')
];

//verification code (Confirm Email)
const verifyCodeValidationRules = [
  check('code').notEmpty().withMessage('El código de verificación es requerido.')
];
router.post('/register', registerValidationRules, validateFields, authController.register);
router.post('/login', loginValidationRules, validateFields, authController.login);
router.post('/verify-code', verifyCodeValidationRules, validateFields, authController.verifyCode);
module.exports = router;
