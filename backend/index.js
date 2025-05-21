process.loadEnvFile();

import express from 'express';
import { connectDB } from './Config/db.js';
//routes
import { authRouter } from './Routes/authRoutes.js';
// const postRouter = require('./Routes/postRoutes');
import { userRouter } from'./Routes/userRoutes.js';
//middleware
import cors from 'cors';
import { postRouter } from './Routes/postsRoutes.js';

const app = express();
const PORT = 3000;

connectDB();

//middleware
app.use(cors());  
app.use(express.json());

//routes
app.use('/auth', authRouter);
app.use('/users', userRouter);

//post routes
app.use('/forum/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})