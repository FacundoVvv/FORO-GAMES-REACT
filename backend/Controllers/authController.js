import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../Models/User.js';
import { sendEmailVerifyCode } from '../Utils/sendEmailVerifyCode.js';
import { verifyToken } from '../Utils/verifyToken.js';
import { createToken } from '../Utils/createToken.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //verificar user existente
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    const codeToVerify = crypto.randomBytes(32).toString("hex");
    user = new User({
      username,
      email,
      password,
      isEmailVerified: false,
      emailVerificationToken: codeToVerify,
    });
    user.password = await bcrypt.hash(password, 10);
    await sendEmailVerifyCode(email, codeToVerify);
    await user.save(); //user with emailverified = false

    return res.status(200).json({ message: "Token enviado, activá tu cuenta!" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al intentar registrar el usuario.",
      error: error.message || "Error desconocido",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son requeridos.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ errorType: 'not verified', message: 'Debes verificar tu correo electrónico.', email: user.email });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    const token = await createToken(username);
    const data = { user, token };

    res.status(200).json({ success: 'Inicio de sesión exitoso.', data });
  } catch (e) {
    res.status(500).json({ message: 'Error en el inicio de sesión.' });
  }
};

//EMAIL TOKEN VERIFY
export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Usuario no encontrado.' });
    }

    if (user.emailVerificationToken.trim() !== code.trim()) {
      return res.status(400).json({ success: false, message: 'Código incorrecto.' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verificado correctamente.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al verificar el código.' });
  }
};

//LOGIN TOKEN
export const verifyTokenFC = async (req, res) => {
  const { token } = req.body;

  try {
    const validateToken = await verifyToken(token);
    return res.status(200).json({ message: 'Token válido.', user: validateToken.user });
  } catch (error) {
    return res.status(500).json({ message: 'Token inválido.' });
  }
};

export const emailResend = async (req, res) => {
  const { email } = req.body;
  const codeToVerify = crypto.randomBytes(32).toString("hex");

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const dateNow = new Date();
    const lastResendTime = user.times?.lastResendCodeEmailV;
    if (lastResendTime) {
      const timeDif = (dateNow - lastResendTime) / 1000;
      if (timeDif < 60) {
        return res.status(429).json({ message: 'Debes esperar al menos 60 segundos antes de volver a enviar el código.' });
      }
    }

    user.emailVerificationToken = codeToVerify;
    user.times.lastResendCodeEmailV = dateNow;
    await user.save();

    const response = await sendEmailVerifyCode(email, codeToVerify);
    return res.status(200).json({ message: 'Éxito. Nuevo código enviado.', response });
  } catch (error) {
      console.error('Error al reenviar el correo:', error);
      return res.status(500).json({ message: error, status: response.status });
  }
};
