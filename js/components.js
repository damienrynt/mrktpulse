// Component templates
const Components = {
    // Sample data
    newsData: [
        {
            ticker: "AAPL",
            headline: "Apple Announces New AI Features for iOS 18",
            summary: "Apple unveiled groundbreaking AI capabilities coming to iOS 18, including enhanced Siri functionality and on-device machine learning features that could revolutionize user experience.",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            sentiment: "positive"
        },
        {
            ticker: "TSLA",
            headline: "Tesla Q4 Delivery Numbers Exceed Expectations",
            summary: "Tesla reported better-than-expected delivery numbers for Q4, driven by strong demand for Model Y and successful production ramp at new factories.",
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            sentiment: "positive"
        },
        {
            ticker: "GOOGL",
            headline: "Google Faces New Antitrust Challenges in Europe",
            summary: "European regulators are preparing new antitrust charges against Google's advertising business, potentially leading to significant fines and business practice changes.",
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            sentiment: "negative"
        }
    ],

    portfolioData: {
        totalValue: 25847.50,
        totalGainLoss: 2847.50,
        gainLossPercentage: 12.4,
        holdings: [
            {
                ticker: "AAPL",
                company_name: "Apple Inc.",
                shares: 50,
                avgPrice: 150.25,
                currentPrice: 185.30,
                asset_type: "stock"
            },
            {
                ticker: "TSLA",
                company_name: "Tesla Inc.",
                shares: 25,
                avgPrice: 210.50,
                currentPrice: 245.75,
                asset_type: "stock"
            },
            {
                ticker: "VOO",
                company_name: "Vanguard S&P 500 ETF",
                shares: 10,
                avgPrice: 385.20,
                currentPrice: 420.15,
                asset_type: "etf"
            }
        ]
    },

    watchlistData: [
        {
            id: 1,
            ticker: "AAPL",
            company_name: "Apple Inc.",
            asset_type: "stock"
        },
        {
            id: 2,
            ticker: "TSLA",
            company_name: "Tesla Inc.",
            asset_type: "stock"
        },
        {
            id: 3,
            ticker: "GOOGL",
            company_name: "Alphabet Inc.",
            asset_type: "stock"
        },
        {
            id: 4,
            ticker: "VOO",
            company_name: "Vanguard S&P 500 ETF",
            asset_type: "etf"
        }
    ],

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Get time ago
    getTimeAgo(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));
        
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return "Just now";
    },

    // News cards component
    newsCards() {
        return this.newsData.map(article => `
            <div class="news-card">
                <div class="p-6">
                    <div class="flex items-start justify-between gap-4 mb-3">
                        <span class="badge badge-primary">${article.ticker}</span>
                        <div class="flex items-center gap-1 text-slate-500 text-xs">
                            <i data-lucide="clock" class="w-3 h-3"></i>
                            <span>${this.getTimeAgo(article.timestamp)}</span>
                        </div>
                    </div>
                    
                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-tight">
                        ${article.headline}
                    </h3>
                    
                    <p class="text-slate-600 text-sm line-clamp-2 mb-4">
                        ${article.summary}
                    </p>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            ${article.sentiment === "positive" ? 
                                '<span class="badge badge-success">Bullish</span>' :
                                article.sentiment === "negative" ?
                                '<span class="badge badge-warning">Bearish</span>' :
                                '<span class="badge badge-neutral">Neutral</span>'
                            }
                        </div>
                        
                        <i data-lucide="arrow-up-right" class="w-5 h-5 text-blue-900"></i>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Portfolio summary component
    portfolioSummary() {
        const { totalValue, totalGainLoss, gainLossPercentage } = this.portfolioData;
        const isPositive = totalGainLoss >= 0;

        return `
            <div class="portfolio-card p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-slate-600 mb-1">Total Value</p>
                        <p class="text-2xl font-bold text-slate-900">${this.formatCurrency(totalValue)}</p>
                    </div>
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center">
                        <i data-lucide="pie-chart" class="w-6 h-6 text-amber-400"></i>
                    </div>
                </div>
            </div>

            <div class="portfolio-card p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-slate-600 mb-1">Total Gain/Loss</p>
                        <p class="text-2xl font-bold ${isPositive ? 'text-profit' : 'text-loss'}">
                            ${this.formatCurrency(totalGainLoss)}
                        </p>
                    </div>
                    <div class="w-12 h-12 ${isPositive ? 'bg-green-100' : 'bg-red-100'} rounded-xl flex items-center justify-center">
                        <i data-lucide="trending-up" class="w-6 h-6 ${isPositive ? 'text-green-600' : 'text-red-600'}"></i>
                    </div>
                </div>
            </div>

            <div class="portfolio-card p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-slate-600 mb-1">Return</p>
                        <p class="text-2xl font-bold ${isPositive ? 'text-profit' : 'text-loss'}">
                            ${isPositive ? '+' : ''}${gainLossPercentage}%
                        </p>
                    </div>
                    <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                        <span class="text-sm font-bold ${isPositive ? 'text-profit' : 'text-loss'}">
                            ${isPositive ? '↑' : '↓'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    },

    // Portfolio holdings component
    portfolioHoldings() {
        return this.portfolioData.holdings.map(holding => {
            const currentValue = holding.shares * holding.currentPrice;
            const costBasis = holding.shares * holding.avgPrice;
            const gainLoss = currentValue - costBasis;
            const gainLossPercentage = ((gainLoss / costBasis) * 100).toFixed(2);
            const isPositive = gainLoss >= 0;

            return `
                <div class="stock-card p-6">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center gap-4 flex-1 min-w-0">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i data-lucide="trending-up" class="w-6 h-6 text-amber-400"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-1">
                                    <h3 class="text-xl font-bold text-slate-900">${holding.ticker}</h3>
                                    <span class="badge badge-${holding.asset_type}">${holding.asset_type}</span>
                                </div>
                                <p class="text-sm text-slate-600">${holding.company_name}</p>
                                <div class="flex items-center gap-4 mt-2 text-sm">
                                    <span class="text-slate-600">${holding.shares} shares</span>
                                    <span class="text-slate-600">Avg: ${this.formatCurrency(holding.avgPrice)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-right">
                            <p class="text-lg font-bold text-slate-900">${this.formatCurrency(currentValue)}</p>
                            <p class="text-sm font-semibold ${isPositive ? 'text-profit' : 'text-loss'}">
                                ${isPositive ? '+' : ''}${this.formatCurrency(gainLoss)} (${isPositive ? '+' : ''}${gainLossPercentage}%)
                            </p>
                            <p class="text-xs text-slate-500 mt-1">Current: ${this.formatCurrency(holding.currentPrice)}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Watchlist cards component
    watchlistCards() {
        return this.watchlistData.map(stock => `
            <div class="stock-card p-6">
                <div class="flex items-start justify-between">
                    <div class="flex items-center gap-4 flex-1 min-w-0">
                        <div class="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i data-lucide="trending-up" class="w-6 h-6 text-amber-400"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <h3 class="text-xl font-bold text-slate-900">${stock.ticker}</h3>
                                <span class="badge badge-${stock.asset_type}">${stock.asset_type}</span>
                            </div>
                            <p class="text-sm text-slate-600 truncate">${stock.company_name}</p>
                        </div>
                    </div>
                    
                    <button class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    // Settings content component
    settingsContent() {
        return `
            <div class="space-y-6">
                <div class="portfolio-card">
                    <div class="border-b border-slate-100 p-6">
                        <h3 class="flex items-center gap-2 text-slate-900 text-lg font-bold">
                            <i data-lucide="user" class="w-5 h-5"></i>
                            Profile Information
                        </h3>
                    </div>
                    <div class="p-6 space-y-4">
                        <div>
                            <label class="text-slate-700">Full Name</label>
                            <p class="mt-1 text-lg font-semibold text-slate-900">John Doe</p>
                        </div>
                        <div>
                            <label class="text-slate-700">Email</label>
                            <p class="mt-1 text-lg font-semibold text-slate-900">john.doe@example.com</p>
                        </div>
                        <div>
                            <label class="text-slate-700">Role</label>
                            <p class="mt-1 text-lg font-semibold text-slate-900 capitalize">User</p>
                        </div>
                    </div>
                </div>

                <div class="portfolio-card">
                    <div class="border-b border-slate-100 p-6">
                        <h3 class="flex items-center gap-2 text-slate-900 text-lg font-bold">
                            <i data-lucide="bell" class="w-5 h-5"></i>
                            Notification Preferences
                        </h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-3">
                            <label class="text-slate-700">News Update Frequency</label>
                            <select class="w-full p-2 border border-slate-300 rounded-md">
                                <option>Real-time (as news breaks)</option>
                                <option>Hourly</option>
                                <option selected>Daily Digest</option>
                                <option>Weekly Summary</option>
                            </select>
                            <p class="text-sm text-slate-500">
                                Choose how often you'd like to receive news updates for your watchlist stocks
                            </p>
                        </div>

                        <div class="pt-4 border-t border-slate-200 mt-4">
                            <button class="btn-primary">
                                <i data-lucide="save" class="w-4 h-4 mr-2"></i>
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
