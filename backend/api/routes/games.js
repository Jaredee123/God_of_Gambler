// src/routes/games.js
import { Router } from 'express';
import { createGame, listGames } from '../controllers/games.js';
const router = new Router();

router.post('/', createGame);
router.get('/', listGames);

export default router;
