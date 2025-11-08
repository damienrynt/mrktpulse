// Mock data
let watchlist = [
  {
    id: 1,
    ticker: 'AAPL',
    company_name: 'Apple Inc.',
    asset_type: 'stock',
    current_price: 185.30,
    change: 2.5,
    change_percent: 1.37
  },
  {
    id: 2,
    ticker: 'TSLA',
    company_name: 'Tesla Inc.',
    asset_type: 'stock',
    current_price: 245.75,
    change: -3.25,
    change_percent: -1.31
  }
];

export const getStocks = async (req, res) => {
  try {
    res.json({
      success: true,
      data: watchlist,
      count: watchlist.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stocks'
    });
  }
};

export const getStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = watchlist.find(s => s.id === parseInt(id));
    
    if (!stock) {
      return res.status(404).json({
        success: false,
        error: 'Stock not found'
      });
    }
    
    res.json({
      success: true,
      data: stock
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock'
    });
  }
};

export const searchStocks = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    // Mock search results
    const searchResults = [
      {
        ticker: q.toUpperCase(),
        company_name: `${q} Company Inc.`,
        asset_type: 'stock'
      }
    ];
    
    res.json({
      success: true,
      data: searchResults,
      count: searchResults.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
};

export const addStock = async (req, res) => {
  try {
    const { ticker, company_name, asset_type = 'stock' } = req.body;
    
    if (!ticker || !company_name) {
      return res.status(400).json({
        success: false,
        error: 'Ticker and company name are required'
      });
    }
    
    const newStock = {
      id: watchlist.length + 1,
      ticker: ticker.toUpperCase(),
      company_name,
      asset_type,
      current_price: Math.random() * 500 + 10,
      change: (Math.random() - 0.5) * 10,
      change_percent: (Math.random() - 0.5) * 5
    };
    
    watchlist.push(newStock);
    
    res.status(201).json({
      success: true,
      data: newStock,
      message: 'Stock added to watchlist'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add stock'
    });
  }
};

export const removeStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stockIndex = watchlist.findIndex(s => s.id === parseInt(id));
    
    if (stockIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Stock not found'
      });
    }
    
    watchlist.splice(stockIndex, 1);
    
    res.json({
      success: true,
      message: 'Stock removed from watchlist'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove stock'
    });
  }
};
