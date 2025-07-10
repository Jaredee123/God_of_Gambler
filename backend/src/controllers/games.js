// src/controllers/games.js
import Game from '../models/Game.js';
import { computeSettlements } from '../services/settlement.js';

// POST /games
export async function createGame(req, res) {
  const players = req.body.players; // [{name, buyIn, cashOut},…]
  const payments = computeSettlements(players);
  // Persist the raw game
  const game = await Game.create({ players });
  return res.status(201).json({ gameId: game._id, payments });
}

// GET /games?player=Alice&player=Bob
export async function listGames(req, res) {
  const names = [].concat(req.query.player||[]);
  // find games where any player name matches all requested names
  const games = await Game.find({
    'players.name': { $all: names }
  }).sort({ settledAt: -1 });
  return res.json(games);
}
