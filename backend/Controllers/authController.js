const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmailVerifyCode = require('../Utils/sendEmailVerifyCode');
const verifyToken = require('../Utils/verifyToken');
const createToken = require('../Utils/createToken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // user exist? validation
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

      // verify email pet
      await sendEmailVerifyCode(email, codeToVerify);
      //save inactive acc user
      await user.save();

      return res.status(200).json({ message: "Token enviado, activá tu cuenta!" });
  } catch (error) {
    
      return res.status(500).json({
          message: "Error al intentar registrar el usuario.",
          error: error.message || "Error desconocido",
      });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

        
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son requeridos.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if(!user.isEmailVerified){
      return res.status(403).json({ errorType: 'not verified', message: 'Debes verificar tu correo electrónico.', email: user.email });
    }
    
      const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    const token = await createToken(username);
    const data = {
      user,
      token
    }

    res.status(200).json({ success: 'Inicio de sesión exitoso.', data });
  } catch (e) {
    console.log('Error al procesar la solicitud.', e);
    res.status(500).json({ message: 'Error en el inicio de sesión.' });
  }
};

//email code verify
exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Usuario no encontrado.' });
    }

    if (user.emailVerificationToken.trim() !== code.trim())  {
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


//verify tokens
exports.verifyToken = async (req, res) => {
  const { token } = req.body;
  try{
    const validateToken = await verifyToken(token);
    return res.status(200).json( { message: 'Token válido.', user: validateToken.user } );
    //devolver 200 y user
  }catch( error ){
    //devolver error
    return res.status(500).json( { message: 'token inválido.'} );
  }
}

//EMAIL RESEND

exports.emailResend = async (req, res) => {
  const { email } = req.body;
  const codeToVerify = crypto.randomBytes(32).toString("hex");

  try {
    const response = await sendEmailVerifyCode(email, codeToVerify);
    return res.status(200).json({ message: 'exito', response });
  } catch (error) {
    return res.status(500).json({ message: error, status: response.status });
  }


}