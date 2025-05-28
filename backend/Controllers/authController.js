import bcrypt from "bcryptjs";
import { User } from "../Models/User.js";
import { sendEmailVerifyCode } from "../Utils/sendEmailVerifyCode.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { createToken } from "../Utils/createToken.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const codeToVerify = Math.floor(100000 + Math.random() * 900000).toString(); // codigo de 6 digitos
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

  try {
    //verificar user existente
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    user = new User({
      username,
      email,
      password,
      isEmailVerified: false,
      emailVerificationToken: codeToVerify,
      times: {
        lastResendCodeEmailV: new Date(),
        expiresCode: expirationTime,
      },
    });

    user.password = await bcrypt.hash(password, 10);

    await sendEmailVerifyCode(email, codeToVerify);
    await user.save(); //user with emailverified = false

    return res
      .status(200)
      .json({ message: "Token enviado, activá tu cuenta!" });
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
      return res
        .status(400)
        .json({ message: "Username y password son requeridos." });
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (!user.isEmailVerified) {
      return res
        .status(403)
        .json({
          errorType: "not verified",
          message: "Debes verificar tu correo electrónico.",
          email: user.email,
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = await createToken(username);

    const data = user;

    // sending cookies with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // http por ahora
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: "Inicio de sesión exitoso.", data });
  } catch (e) {
    res.status(500).json({ message: "Error en el inicio de sesión." });
  }
};

//EMAIL TOKEN VERIFY
export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Usuario no encontrado." });
    }

    if (user.emailVerificationToken.trim() !== code.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Código incorrecto." });
    }

    if (Number(user.times?.expiresCode) < Number(new Date())) {
      return res
        .status(410)
        .json({ success: false, message: "Codigo expirado." });
    }

    user.set({
      isEmailVerified: true,
      emailVerificationToken: null,
      expiresCode: null,
    });
    await user.save();

    res.json({ success: true, message: "Email verificado correctamente." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al verificar el código." });
  }
};

//LOGIN TOKEN desde cookie
export const verifyTokenFC = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const validateToken = await verifyToken(token);
    return res
      .status(200)
      .json({ message: "Token válido.", user: validateToken.user });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

export const emailResend = async (req, res) => {
  const { email } = req.body;
  const codeToVerify = Math.floor(100000 + Math.random() * 900000).toString(); // pin 6 digitos
  const expiresIn = new Date(Date.now() + 10 * 60 * 1000);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const dateNow = new Date();
    const lastResendTime = user.times?.lastResendCodeEmailV;
    if (lastResendTime) {
      const timeDif = (dateNow - lastResendTime) / 1000;
      if (timeDif < 60) {
        return res
          .status(429)
          .json({
            message:
              "Debes esperar al menos 60 segundos antes de volver a enviar el código.",
          });
      }
    }
    user.set({
      emailVerificationToken: codeToVerify,
      times: {
        lastResendCodeEmailV: dateNow,
        expiresCode: expiresIn,
      },
    });
    user.save();

    const response = await sendEmailVerifyCode(email, codeToVerify);
    return res
      .status(200)
      .json({ message: "Éxito. Nuevo código enviado.", response });
  } catch (error) {
    console.error("Error al reenviar el correo:", error);
    return res.status(500).json({ message: error, status: response.status });
  }
};
