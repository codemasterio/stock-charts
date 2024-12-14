import React from 'react';
import { Stock } from '../types/stock';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockListProps {
  stocks: Stock[];
  onSelect: (stock: Stock) => void;
  selectedSymbol?: string;
}

export const StockList: React.FC<StockListProps> = ({ stocks, onSelect, selectedSymbol }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Stocks</h3>
      </div>
      <div className="divide-y">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedSymbol === stock.symbol ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelect(stock)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-sm text-gray-500">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">₹{stock.price.toFixed(2)}</div>
                <div className={`text-sm flex items-center ${
                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};