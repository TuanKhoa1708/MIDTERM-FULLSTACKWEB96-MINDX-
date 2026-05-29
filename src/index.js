import express from 'express';

import dotenv from 'dotenv';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});