// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // <-- add this line
import gamesRouter from './routes/games.js';

const app = express();
app.use(cors()); // <-- add this line
app.use(express.json());
app.use('/games', gamesRouter);

// Error handler…
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Connect to Mongo & export app
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
  console.log('MongoDB connected');
});
export default app;
