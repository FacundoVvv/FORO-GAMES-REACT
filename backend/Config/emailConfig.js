require('dotenv').config();
exports.emailConfig = {
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
    }
};
