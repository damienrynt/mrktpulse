import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StockCard from "../components/watchlist/StockCard";

export default function Watchlist() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const stocks = [
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
  ];

  const handleRemoveStock = (id) => {
    console.log("Remove stock:", id);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Watchlist</h1>
          <p className="text-slate-600">
            {stocks.length} stock{stocks.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stock
        </Button>
      </div>

      {stocks.length === 0 ? (
        <Alert className="border-blue-200 bg-blue-50">
          <TrendingUp className="h-5 w-5 text-blue-900" />
          <AlertDescription className="text-slate-700">
            <p className="font-semibold mb-2">Your watchlist is empty</p>
            <p>Start by adding stocks you want to track. Popular choices include AAPL, TSLA, GOOGL, MSFT, and AMZN.</p>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock) => (
            <StockCard
              key={stock.id}
              stock={stock}
              onRemove={handleRemoveStock}
            />
          ))}
        </div>
      )}
    </div>
  );
}
