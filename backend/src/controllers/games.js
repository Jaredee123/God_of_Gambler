// src/controllers/games.js
import Game from '../models/Game.js';
import { computeSettlements } from '../services/settlement.js';

// POST /games
export async function createGame(req, res) {
  try {
    const players = req.body.players;  
    if (!Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ error: 'Must provide a non-empty players array' });
    }

    // 1) Validate total buy-in vs total cash-out
    const totalBuyIn   = players.reduce((sum, p) => sum + p.buyIn, 0);
    const totalCashOut = players.reduce((sum, p) => sum + p.cashOut, 0);
    if (totalBuyIn !== totalCashOut) {
      return res
        .status(400)
        .json({ 
          error: `Totals mismatch: buy-in = ${totalBuyIn}, cash-out = ${totalCashOut}` 
        });
    }

    // 2) Compute and persist
    const settlements = computeSettlements(players);
    const game = await Game.create({ players, settlements });
    return res.status(201).json({ gameId: game._id, settlements });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

// GET /games?player=Alice&player=Bob
export async function listGames(req, res) {
  const playerName = req.query.player;           // e.g. /games?player=Alice
  if (!playerName) {
    return res
      .status(400)
      .json({ error: 'Please provide a player name, e.g. /games?player=Alice' });
  }

  // Find every game where at least one player has this name
  const games = await Game.find({
    'players.name': playerName
  })
  .sort({ settledAt: -1 });

  return res.json(games);
}
