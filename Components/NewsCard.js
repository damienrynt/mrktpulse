import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsCard({ article, onClick }) {
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-xl transition-all duration-300 border-slate-200 bg-white overflow-hidden group"
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <Badge className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-none">
              {article.ticker}
            </Badge>
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Clock className="w-3 h-3" />
              <span>{getTimeAgo(article.timestamp)}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors leading-tight">
            {article.headline}
          </h3>
          
          <p className="text-slate-600 text-sm line-clamp-2 mb-4">
            {article.summary}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {article.sentiment === "positive" && (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Bullish
                </Badge>
              )}
              {article.sentiment === "negative" && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Bearish
                </Badge>
              )}
              {article.sentiment === "neutral" && (
                <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                  Neutral
                </Badge>
              )}
            </div>
            
            <ArrowUpRight className="w-5 h-5 text-blue-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
