process.loadEnvFile();

import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    try{
        const decoded = jwt.verify(token, process.env.SALT);
        return decoded;
    }
    catch (error)
    {
        throw error;
    }  
};
