// Mock data
let portfolio = [
  {
    id: 1,
    ticker: 'AAPL',
    company_name: 'Apple Inc.',
    shares: 50,
    avg_price: 150.25,
    current_price: 185.30,
    asset_type: 'stock'
  },
  {
    id: 2,
    ticker: 'TSLA',
    company_name: 'Tesla Inc.',
    shares: 25,
    avg_price: 210.50,
    current_price: 245.75,
    asset_type: 'stock'
  }
];

export const getPortfolio = async (req, res) => {
  try {
    res.json({
      success: true,
      data: portfolio,
      count: portfolio.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio'
    });
  }
};

export const getPortfolioSummary = async (req, res) => {
  try {
    const totalValue = portfolio.reduce((sum, holding) => {
      return sum + (holding.shares * holding.current_price);
    }, 0);
    
    const totalCost = portfolio.reduce((sum, holding) => {
      return sum + (holding.shares * holding.avg_price);
    }, 0);
    
    const totalGainLoss = totalValue - totalCost;
    const gainLossPercentage = ((totalGainLoss / totalCost) * 100).toFixed(2);
    
    res.json({
      success: true,
      data: {
        total_value: totalValue,
        total_cost: totalCost,
        total_gain_loss: totalGainLoss,
        gain_loss_percentage: gainLossPercentage,
        holdings_count: portfolio.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio summary'
    });
  }
};

export const addHolding = async (req, res) => {
  try {
    const { ticker, company_name, shares, avg_price, asset_type = 'stock' } = req.body;
    
    if (!ticker || !company_name || !shares || !avg_price) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }
    
    const newHolding = {
      id: portfolio.length + 1,
      ticker: ticker.toUpperCase(),
      company_name,
      shares: parseInt(shares),
      avg_price: parseFloat(avg_price),
      current_price: Math.random() * 500 + 10,
      asset_type
    };
    
    portfolio.push(newHolding);
    
    res.status(201).json({
      success: true,
      data: newHolding,
      message: 'Holding added to portfolio'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add holding'
    });
  }
};

export const updateHolding = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const holdingIndex = portfolio.findIndex(h => h.id === parseInt(id));
    
    if (holdingIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Holding not found'
      });
    }
    
    portfolio[holdingIndex] = { ...portfolio[holdingIndex], ...updates };
    
    res.json({
      success: true,
      data: portfolio[holdingIndex],
      message: 'Holding updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update holding'
    });
  }
};

export const removeHolding = async (req, res) => {
  try {
    const { id } = req.params;
    const holdingIndex = portfolio.findIndex(h => h.id === parseInt(id));
    
    if (holdingIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Holding not found'
      });
    }
    
    portfolio.splice(holdingIndex, 1);
    
    res.json({
      success: true,
      message: 'Holding removed from portfolio'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove holding'
    });
  }
};
