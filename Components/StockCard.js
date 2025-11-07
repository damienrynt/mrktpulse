import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function StockCard({ stock, onRemove }) {
  const getAssetBadgeColor = (type) => {
    switch(type) {
      case "stock": return "bg-blue-100 text-blue-800 border-blue-200";
      case "etf": return "bg-purple-100 text-purple-800 border-purple-200";
      case "crypto": return "bg-orange-100 text-orange-800 border-orange-200";
      case "index": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Card className="border-slate-200 bg-white hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-slate-900">{stock.ticker}</h3>
                  {stock.asset_type && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getAssetBadgeColor(stock.asset_type)}`}
                    >
                      {stock.asset_type}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600 truncate">{stock.company_name || "Loading..."}</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(stock.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
