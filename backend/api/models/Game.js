// src/models/Game.js
import mongoose from 'mongoose';

const PlayerChip = new mongoose.Schema({
  name:    { type: String, required: true },
  buyIn:   { type: Number, required: true },
  cashOut: { type: Number, required: true },
});

const Settlement = new mongoose.Schema({
  from:   { type: String, required: true },  // debtor
  to:     { type: String, required: true },  // creditor
  amount: { type: Number, required: true },
});

const GameSchema = new mongoose.Schema({
  players:     [ PlayerChip ],
  settlements: [ Settlement ],              // ← new field
  settledAt:   { type: Date, default: Date.now },
});

export default mongoose.model('Game', GameSchema);

