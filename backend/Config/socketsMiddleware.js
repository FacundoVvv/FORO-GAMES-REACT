import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
export const socketAuthMiddleware = (socket, next) => {
  const cookieHeader = socket.handshake.headers?.cookie;
  if (!cookieHeader) return next(new Error('No cookies sent'));

  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) return next(new Error('No token in cookies'));

  try {
    const payload = jwt.verify(token, process.env.SALT);
    socket.user = payload;
    next();
  } catch (err) {
    return next(new Error('Invalid token'));
  }
};