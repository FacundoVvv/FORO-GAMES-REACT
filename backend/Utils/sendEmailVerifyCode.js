process.loadEnvFile();
import nodemailer from 'nodemailer';

export const sendEmailVerifyCode = async (email, codeToVerify) => {
   const currentYear = new Date().getFullYear();

   const transporter = nodemailer.createTransport({
       host: "in-v3.mailjet.com",
       port: 587,
       secure: false,
       auth: {
           user: process.env.SENDM_USER,
           pass: process.env.SENDM_PASS
       }
   });

   try {
       await transporter.sendMail({
           from: {
               name: process.env.SITE_NAME,
               address: process.env.SENDER_MAIL_ADDRESS
           },
           to: email,
           subject: `Verificación de cuenta - ${process.env.SITE_NAME}`,
           text: `
               Hola,
               
               Gracias por registrarte en ${process.env.SITE_NAME}.
               Tu código de verificación es: ${codeToVerify}
               
               Este código expirará en 10 minutos por seguridad.
               
               Si no solicitaste este código, puedes ignorar este mensaje.
               
               Atentamente,
               El equipo de ${process.env.SITE_NAME}
               
               ---
               Este es un mensaje automático, por favor no respondas a este email.
               Para soporte: ${process.env.SENDM_USER}
           `,
           html: `
               <div style="background-color: #f6f6f6; padding: 20px; font-family: Arial, sans-serif;">
                   <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                       <!-- Header -->
                       <h1 style="color: #333; text-align: center;">${process.env.SITE_NAME}</h1>
                       <h2 style="color: #666; text-align: center;">Verificación de Cuenta</h2>
                       
                       <!-- Main Content -->
                       <p style="color: #444; font-size: 16px; line-height: 1.5;">
                           ¡Hola! Gracias por registrarte en nuestra plataforma.
                       </p>
                       
                       <!-- Verification Code -->
                       <div style="text-align: center; margin: 30px 0;">
                           <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; display: inline-block;">
                               <span style="font-size: 24px; font-weight: bold; color: #333; letter-spacing: 3px;">
                                   ${codeToVerify}
                               </span>
                           </div>
                       </div>
                       
                       <!-- Security Notice -->
                       <p style="color: #666; font-size: 14px; text-align: center;">
                           Este código expirará en 10 minutos por seguridad.
                       </p>
                       
                       <hr style="border: 1px solid #eee; margin: 20px 0;">
                       
                       <!-- Footer -->
                       <div style="color: #999; font-size: 12px; text-align: center;">
                           <p>
                               Si no solicitaste este código, puedes ignorar este mensaje.
                           </p>
                           <p>
                               Este es un mensaje automático, por favor no respondas a este email.<br>
                               
                           </p>
                           <p>
                               &copy; ${currentYear} ${process.env.SITE_NAME}. Todos los derechos reservados.
                           </p>
                       </div>
                   </div>
               </div>
           `,
           headers: {
               'X-Priority': '1',
               'Precedence': 'Bulk'
           }
       });
   } catch (error) {
       console.error('Error al enviar email:', error);
       throw error;
   }
};
