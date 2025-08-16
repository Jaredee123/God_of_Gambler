import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import gamesRouter from './routes/games.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/games', gamesRouter);

// Error handler…
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Connect to Mongo
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
  console.log('MongoDB connected');
});

// Export the express app as a serverless function
export default (req, res) => app(req, res);
