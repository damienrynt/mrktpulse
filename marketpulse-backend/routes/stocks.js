import express from 'express';
import { 
  getStocks, 
  getStock, 
  addStock, 
  removeStock,
  searchStocks 
} from '../controllers/stocksController.js';

const router = express.Router();

// GET /api/stocks - Get all stocks in watchlist
router.get('/', getStocks);

// GET /api/stocks/search?q=apple - Search stocks
router.get('/search', searchStocks);

// GET /api/stocks/:id - Get specific stock
router.get('/:id', getStock);

// POST /api/stocks - Add stock to watchlist
router.post('/', addStock);

// DELETE /api/stocks/:id - Remove stock from watchlist
router.delete('/:id', removeStock);

export default router;
