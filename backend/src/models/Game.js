// src/models/Game.js
import mongoose from 'mongoose';

const PlayerChip = new mongoose.Schema({
  name:   { type: String, required: true },
  buyIn:  { type: Number, required: true },
  cashOut:{ type: Number, required: true },
});

const GameSchema = new mongoose.Schema({
  players:   [ PlayerChip ],
  settledAt: { type: Date, default: Date.now },
});

export default mongoose.model('Game', GameSchema);
