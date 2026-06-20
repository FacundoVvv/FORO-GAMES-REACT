import express from 'express';
import { connectDB } from './Config/db.js';
//routes
import { authRouter } from './Routes/authRoutes.js';
// const postRouter = require('./Routes/postRoutes');
import { userRouter } from'./Routes/userRoutes.js';
//middleware
import cors from 'cors';
import { postRouter } from './Routes/postsRoutes.js';

//sockets
import http from 'http';
import { socketsConfig } from './Config/sockets.js';
//cookies
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;

//sockets connection + config
const server = http.createServer(app);
socketsConfig(server);

connectDB();

//middleware
app.use(cors({
  origin: 'http://localhost:5173', //frontend
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/auth', authRouter);
app.use('/users', userRouter);

//post routes
app.use('/forum/posts', postRouter);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})