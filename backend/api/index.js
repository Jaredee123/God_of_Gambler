import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import gamesRouter from './routes/games.js';

const app = express();

// Allow requests from your frontend domain (localhost:3000 during development)
const allowedOrigins = ['http://localhost:3000', 'https://god-of-gambling.web.app'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
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
