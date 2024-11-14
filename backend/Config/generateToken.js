const jwt = require('jsonwebtoken');

exports.generateToken = (username) => {
  const payload = { user: { username: username } };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};