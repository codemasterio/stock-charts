import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StockData } from '../types/stock';

interface StockChartProps {
  data: StockData[];
  showSignals?: boolean;
}

export const StockChart: React.FC<StockChartProps> = ({ data, showSignals }) => {
  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
          />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={(value: number) => [value.toFixed(2), 'Price']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#2563eb" 
            dot={false}
            name="Stock Price"
          />
          {showSignals && (
            <>
              <Line 
                type="monotone" 
                dataKey="high" 
                stroke="#16a34a" 
                dot={false} 
                name="High"
              />
              <Line 
                type="monotone" 
                dataKey="low" 
                stroke="#dc2626" 
                dot={false}
                name="Low"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};