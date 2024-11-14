const nodemailer = require('nodemailer');
const { emailConfig } = require('../Config/emailConfig');

const sendEmailVerifyCode = async (email, codeToVerify) => {
    // usar emailconfig para el transporter
    const transporter = nodemailer.createTransport(emailConfig);

    // correo options
    const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: "Verifica tu correo electrónico",
        text: `Tu código de verificación es: ${codeToVerify}`,
        html: `
            <h1>Verifica tu correo electrónico</h1>
            <p>Tu código de verificación es:</p>
            <h2>${codeToVerify}</h2>
            <p>Ingresa este código en la aplicación para completar tu registro.</p>
        `
    };

    try {
        // Enviar el correo
        const info = await transporter.sendMail(mailOptions);
        // console.log('Correo enviado: %s', info.messageId);
        return {message: 'correo enviado.'};
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};

module.exports = sendEmailVerifyCode;
