import express from 'express';
import { 
  getPortfolio,
  getPortfolioSummary,
  addHolding,
  updateHolding,
  removeHolding 
} from '../controllers/portfolioController.js';

const router = express.Router();

// GET /api/portfolio - Get portfolio
router.get('/', getPortfolio);

// GET /api/portfolio/summary - Get portfolio summary
router.get('/summary', getPortfolioSummary);

// POST /api/portfolio - Add holding
router.post('/', addHolding);

// PUT /api/portfolio/:id - Update holding
router.put('/:id', updateHolding);

// DELETE /api/portfolio/:id - Remove holding
router.delete('/:id', removeHolding);

export default router;
