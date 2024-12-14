import React from 'react';
import { SentimentScore } from '../types/stock';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentIndicatorProps {
  sentiment: SentimentScore;
}

export const SentimentIndicator: React.FC<SentimentIndicatorProps> = ({ sentiment }) => {
  const getColor = () => {
    if (sentiment.label === 'Positive') return 'text-green-600';
    if (sentiment.label === 'Negative') return 'text-red-600';
    return 'text-yellow-600';
  };

  const getIcon = () => {
    if (sentiment.label === 'Positive') return <TrendingUp className="w-6 h-6" />;
    if (sentiment.label === 'Negative') return <TrendingDown className="w-6 h-6" />;
    return <Minus className="w-6 h-6" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
      <div className="flex items-center space-x-4">
        <div className={`${getColor()} flex items-center`}>
          {getIcon()}
          <span className="ml-2 font-medium">{sentiment.label}</span>
        </div>
        <div className="text-2xl font-bold">{sentiment.score.toFixed(1)}</div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">News Sentiment:</span>
          <span className="font-medium">{sentiment.sources.news.toFixed(1)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Social Sentiment:</span>
          <span className="font-medium">{sentiment.sources.social.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};