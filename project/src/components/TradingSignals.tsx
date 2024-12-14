import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface TradingSignalsProps {
  rsi: number;
  macd: {
    macdLine: number;
    signalLine: number;
  };
  price: number;
  bollingerBands: {
    upper: number;
    lower: number;
  };
  mode: 'intraday' | 'swing';
}

export const TradingSignals: React.FC<TradingSignalsProps> = ({
  rsi,
  macd,
  price,
  bollingerBands,
  mode,
}) => {
  const getSignal = () => {
    let buySignals = 0;
    let sellSignals = 0;

    // RSI Signals
    if (rsi < 30) buySignals++;
    if (rsi > 70) sellSignals++;

    // MACD Signals
    if (macd.macdLine > macd.signalLine) buySignals++;
    if (macd.macdLine < macd.signalLine) sellSignals++;

    // Bollinger Bands Signals
    if (price <= bollingerBands.lower) buySignals++;
    if (price >= bollingerBands.upper) sellSignals++;

    if (buySignals > sellSignals && buySignals >= 2) return 'buy';
    if (sellSignals > buySignals && sellSignals >= 2) return 'sell';
    return 'neutral';
  };

  const signal = getSignal();
  const timeframe = mode === 'intraday' ? 'short-term' : 'medium-term';

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Trading Signals ({timeframe})</h3>
      
      <div className={`p-4 rounded-lg ${
        signal === 'buy' ? 'bg-green-100' :
        signal === 'sell' ? 'bg-red-100' :
        'bg-yellow-100'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Signal:</span>
          <div className="flex items-center">
            {signal === 'buy' && <TrendingUp className="w-5 h-5 text-green-600 mr-1" />}
            {signal === 'sell' && <TrendingDown className="w-5 h-5 text-red-600 mr-1" />}
            {signal === 'neutral' && <AlertTriangle className="w-5 h-5 text-yellow-600 mr-1" />}
            <span className={`font-bold ${
              signal === 'buy' ? 'text-green-600' :
              signal === 'sell' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              {signal.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>RSI:</span>
            <span className={`font-medium ${
              rsi < 30 ? 'text-green-600' :
              rsi > 70 ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {rsi.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>MACD Signal:</span>
            <span className={`font-medium ${
              macd.macdLine > macd.signalLine ? 'text-green-600' : 'text-red-600'
            }`}>
              {(macd.macdLine - macd.signalLine).toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>BB Position:</span>
            <span className={`font-medium ${
              price <= bollingerBands.lower ? 'text-green-600' :
              price >= bollingerBands.upper ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {price <= bollingerBands.lower ? 'Oversold' :
               price >= bollingerBands.upper ? 'Overbought' :
               'Neutral'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};