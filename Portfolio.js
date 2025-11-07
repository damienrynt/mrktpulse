import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, PieChart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const portfolioItems = [
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
  ];

  const calculateTotalValue = () => {
    return portfolioItems.reduce((total, item) => {
      return total + (item.shares * item.currentPrice);
    }, 0);
  };

  const calculateTotalGainLoss = () => {
    return portfolioItems.reduce((total, item) => {
      const costBasis = item.shares * item.avgPrice;
      const currentValue = item.shares * item.currentPrice;
      return total + (currentValue - costBasis);
    }, 0);
  };

  const getAssetBadgeColor = (type) => {
    switch(type) {
      case "stock": return "bg-blue-100 text-blue-800 border-blue-200";
      case "etf": return "bg-purple-100 text-purple-800 border-purple-200";
      case "crypto": return "bg-orange-100 text-orange-800 border-orange-200";
      case "index": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalValue = calculateTotalValue();
  const totalGainLoss = calculateTotalGainLoss();
  const gainLossPercentage = ((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Portfolio</h1>
          <p className="text-slate-600">
            Track your investments and performance
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Holding
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-slate-200 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalValue)}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center">
                <PieChart className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatCurrency(totalGainLoss)}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                totalGainLoss >= 0 ? 'bg-emerald-100' : 'bg-red-100'
              }`}>
                <TrendingUp className={`w-6 h-6 ${
                  totalGainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Return</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {gainLossPercentage}%
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <span className={`text-sm font-bold ${totalGainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {totalGainLoss >= 0 ? '↑' : '↓'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {portfolioItems.length === 0 ? (
        <Alert className="border-blue-200 bg-blue-50">
          <PieChart className="h-5 w-5 text-blue-900" />
          <AlertDescription className="text-slate-700">
            <p className="font-semibold mb-2">Your portfolio is empty</p>
            <p>Start by adding your stock holdings to track your investments and performance.</p>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6">
          {portfolioItems.map((item, index) => {
            const currentValue = item.shares * item.currentPrice;
            const costBasis = item.shares * item.avgPrice;
            const gainLoss = currentValue - costBasis;
            const gainLossPercentage = ((gainLoss / costBasis) * 100).toFixed(2);

            return (
              <Card key={index} className="border-slate-200 bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-slate-900">{item.ticker}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getAssetBadgeColor(item.asset_type)}`}
                          >
                            {item.asset_type}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{item.company_name}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-slate-600">{item.shares} shares</span>
                          <span className="text-slate-600">Avg: {formatCurrency(item.avgPrice)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">{formatCurrency(currentValue)}</p>
                      <p className={`text-sm font-semibold ${gainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {formatCurrency(gainLoss)} ({gainLossPercentage}%)
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Current: {formatCurrency(item.currentPrice)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
