import express from 'express';
import { getNews, getNewsByTicker, refreshNews } from '../controllers/newsController.js';

const router = express.Router();

// GET /api/news - Get all news
router.get('/', getNews);

// GET /api/news/:ticker - Get news for specific ticker
router.get('/:ticker', getNewsByTicker);

// POST /api/news/refresh - Refresh news
router.post('/refresh', refreshNews);

export default router;
