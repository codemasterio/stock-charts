import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface TradingModeSelectorProps {
  mode: 'intraday' | 'swing';
  onModeChange: (mode: 'intraday' | 'swing') => void;
}

export const TradingModeSelector: React.FC<TradingModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onModeChange('intraday')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          mode === 'intraday'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } shadow-sm transition-colors duration-200`}
      >
        <BarChart3 className="w-5 h-5 mr-2" />
        <span className="font-medium">Intraday</span>
      </button>
      
      <button
        onClick={() => onModeChange('swing')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          mode === 'swing'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } shadow-sm transition-colors duration-200`}
      >
        <TrendingUp className="w-5 h-5 mr-2" />
        <span className="font-medium">Swing</span>
      </button>
    </div>
  );
};