// Mock data - in real app, this would come from a news API
const mockNews = [
  {
    id: 1,
    ticker: 'AAPL',
    headline: 'Apple Announces New AI Features for iOS 18',
    summary: 'Apple unveiled groundbreaking AI capabilities coming to iOS 18...',
    content: 'Full article content here...',
    timestamp: new Date().toISOString(),
    sentiment: 'positive',
    source: 'Market News'
  },
  {
    id: 2,
    ticker: 'TSLA',
    headline: 'Tesla Q4 Delivery Numbers Exceed Expectations',
    summary: 'Tesla reported better-than-expected delivery numbers for Q4...',
    content: 'Full article content here...',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sentiment: 'positive',
    source: 'Financial Times'
  }
];

export const getNews = async (req, res) => {
  try {
    const { ticker, limit = 10 } = req.query;
    
    let news = mockNews;
    
    if (ticker) {
      news = mockNews.filter(article => 
        article.ticker === ticker.toUpperCase()
      );
    }
    
    res.json({
      success: true,
      data: news.slice(0, limit),
      count: news.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news'
    });
  }
};

export const getNewsByTicker = async (req, res) => {
  try {
    const { ticker } = req.params;
    const news = mockNews.filter(article => 
      article.ticker === ticker.toUpperCase()
    );
    
    res.json({
      success: true,
      data: news,
      count: news.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news for ticker'
    });
  }
};

export const refreshNews = async (req, res) => {
  try {
    // In real app, this would fetch fresh news from API
    // For now, we'll just return the mock data
    
    res.json({
      success: true,
      message: 'News refreshed successfully',
      data: mockNews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to refresh news'
    });
  }
};
