import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import NewsCard from "../components/news/NewsCard";

export default function Home() {
  const isLoadingNews = false;
  const error = null;
  const stocks = [
    { ticker: "AAPL", company_name: "Apple Inc." },
    { ticker: "TSLA", company_name: "Tesla Inc." },
    { ticker: "GOOGL", company_name: "Alphabet Inc." }
  ];

  const news = [
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
  ];

  const fetchNews = () => {
    console.log("Refresh news clicked");
  };

  const handleArticleClick = (article) => {
    console.log("Article clicked:", article);
  };

  if (stocks.length === 0) {
    return (
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Market News Feed</h1>
        <Alert className="border-blue-200 bg-blue-50">
          <TrendingUp className="h-5 w-5 text-blue-900" />
          <AlertDescription className="text-slate-700">
            <p className="font-semibold mb-2">Welcome to MarketPulse!</p>
            <p>Add stocks to your watchlist to start receiving real-time news updates.</p>
            <Button 
              className="mt-4 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Add Your First Stock
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Market News Feed</h1>
          <p className="text-slate-600">
            Real-time updates for {stocks.length} stock{stocks.length !== 1 ? 's' : ''} in your watchlist
          </p>
        </div>
        <Button
          onClick={fetchNews}
          disabled={isLoadingNews}
          className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingNews ? 'animate-spin' : ''}`} />
          Refresh News
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {news.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            onClick={() => handleArticleClick(article)}
          />
        ))}
      </div>
    </div>
  );
}
