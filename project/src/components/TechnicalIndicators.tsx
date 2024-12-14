import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TechnicalIndicators as TechnicalIndicatorsType } from '../types/stock';

interface TechnicalIndicatorsProps {
  data: {
    timestamp: number;
    rsi?: number;
    macd?: number;
    signal?: number;
    histogram?: number;
    upper?: number;
    middle?: number;
    lower?: number;
  }[];
  type: 'RSI' | 'MACD' | 'BB';
}

export const TechnicalIndicators: React.FC<TechnicalIndicatorsProps> = ({ data, type }) => {
  const renderChart = () => {
    switch (type) {
      case 'RSI':
        return (
          <>
            <Line type="monotone" dataKey="rsi" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="overbought" stroke="#ff0000" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="oversold" stroke="#00ff00" strokeDasharray="3 3" />
          </>
        );
      case 'MACD':
        return (
          <>
            <Line type="monotone" dataKey="macd" stroke="#2196f3" dot={false} />
            <Line type="monotone" dataKey="signal" stroke="#ff9800" dot={false} />
            <Line type="monotone" dataKey="histogram" stroke="#4caf50" dot={false} />
          </>
        );
      case 'BB':
        return (
          <>
            <Line type="monotone" dataKey="upper" stroke="#ff0000" dot={false} />
            <Line type="monotone" dataKey="middle" stroke="#2196f3" dot={false} />
            <Line type="monotone" dataKey="lower" stroke="#00ff00" dot={false} />
          </>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{type}</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            />
            <YAxis domain={type === 'RSI' ? [0, 100] : ['auto', 'auto']} />
            <Tooltip
              labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            />
            <Legend />
            {renderChart()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};