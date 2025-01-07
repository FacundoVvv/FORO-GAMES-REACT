import jwt from 'jsonwebtoken';

export const createToken = (username) => {
    if (!process.env.SALT) {
        throw new Error("Falta la clave SALT en las variables de entorno.");
    }

    const payload = {
        user: username,
    };

    const options = {
        expiresIn: '1h',
    };

    // create and return token
    return jwt.sign(payload, process.env.SALT, options);
};