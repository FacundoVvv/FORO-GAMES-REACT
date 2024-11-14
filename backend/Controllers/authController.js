const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { generateToken } = require('../Config/generateToken');
const sendEmailVerifyCode = require('../Utils/sendEmailVerifyCode');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    const codeToVerify = crypto.randomBytes(32).toString('hex');
    const token = await generateToken(username);
    user = new User({
      username,
      email,
      password,
      token: token,
      isEmailVerified: false,
      emailVerificationToken: codeToVerify
    });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    await sendEmailVerifyCode(email, codeToVerify);

    res.json({ user: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error en el registro.' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    const token = user.token;
    console.log(user)
    res.status(200).json({ success: 'Inicio de sesión exitoso.', token });
  } catch (e) {
    console.log('Error al procesar la solicitud.', e);
    res.status(500).json({ message: 'Error en el inicio de sesión.' });
  }
};

exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Usuario no encontrado.' });
    }

    if (user.emailVerificationToken !== code) {
      return res.status(400).json({ success: false, message: 'Código incorrecto.' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verificado correctamente.' });
  } catch (error) {
    console.error('Error al verificar el código:', error);
    res.status(500).json({ success: false, message: 'Error al verificar el código.' });
  }
};
