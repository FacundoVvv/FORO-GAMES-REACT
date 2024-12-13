
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try{
        const decoded = jwt.verify(token, process.env.SALT);
        return decoded;
    }
    catch (error)
    {
        throw error;
    }  
};
module.exports = verifyToken;