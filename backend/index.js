require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/db');
const authRoutes = require('./Routes/authRoutes');
const postRoutes = require('./Routes/postRoutes');
const app = express();
const PORT = 3000;
const cors = require('cors');

connectDB();

app.use(cors());  
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})