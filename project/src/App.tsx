import React, { useState, useEffect, useCallback } from 'react';
import { Stock, StockData } from './types/stock';
import { StockChart } from './components/StockChart';
import { StockList } from './components/StockList';
import { SentimentIndicator } from './components/SentimentIndicator';
import { TechnicalIndicators } from './components/TechnicalIndicators';
import { TradingSignals } from './components/TradingSignals';
import { TradingModeSelector } from './components/TradingModeSelector';
import { mockStocks, generateMockStockData, generateMockSentiment } from './data/mockData';
import { calculateRSI, calculateMACD, calculateBollingerBands } from './utils/technicalAnalysis';

function App() {
  const [selectedStock, setSelectedStock] = useState<Stock>(mockStocks[0]);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [sentiment, setSentiment] = useState(generateMockSentiment());
  const [viewMode, setViewMode] = useState<'intraday' | 'swing'>('intraday');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const days = viewMode === 'intraday' ? 75 : 180;
    const newData = generateMockStockData(days, viewMode);
    setStockData(newData);
    setSentiment(generateMockSentiment());
    setLoading(false);
  }, [viewMode, selectedStock.symbol]);

  useEffect(() => {
    fetchData();
    
    // Simulate real-time updates less frequently for swing trading
    const interval = setInterval(() => {
      const lastData = stockData[stockData.length - 1];
      if (lastData) {
        const volatility = viewMode === 'intraday' ? 0.002 : 0.001;
        const newPrice = lastData.close * (1 + (Math.random() - 0.5) * volatility);
        const newData = [...stockData.slice(1), {
          ...lastData,
          timestamp: Date.now(),
          close: newPrice,
          high: Math.max(lastData.high, newPrice),
          low: Math.min(lastData.low, newPrice),
        }];
        setStockData(newData);
      }
    }, viewMode === 'intraday' ? 30000 : 60000);

    return () => clearInterval(interval);
  }, [fetchData, viewMode]);

  // Calculate technical indicators
  const rsiData = calculateRSI(stockData);
  const macdData = calculateMACD(stockData);
  const bbData = calculateBollingerBands(stockData);

  const lastPrice = stockData[stockData.length - 1]?.close || 0;
  const lastRsi = rsiData[rsiData.length - 1] || 50;
  const lastMacd = {
    macdLine: macdData.macdLine[macdData.macdLine.length - 1] || 0,
    signalLine: macdData.signalLine[macdData.signalLine.length - 1] || 0,
  };
  const lastBB = {
    upper: bbData.upper[bbData.upper.length - 1] || 0,
    lower: bbData.lower[bbData.lower.length - 1] || 0,
  };

  const handleModeChange = (newMode: 'intraday' | 'swing') => {
    if (newMode !== viewMode) {
      setViewMode(newMode);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Stock Analysis - {selectedStock.name} ({selectedStock.symbol})
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <TradingModeSelector mode={viewMode} onModeChange={handleModeChange} />
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <StockList
              stocks={mockStocks}
              onSelect={(stock) => {
                setSelectedStock(stock);
                fetchData();
              }}
              selectedSymbol={selectedStock.symbol}
            />
          </div>
          
          <div className="col-span-9 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <StockChart data={stockData} showSignals={true} />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <TradingSignals
                    rsi={lastRsi}
                    macd={lastMacd}
                    price={lastPrice}
                    bollingerBands={lastBB}
                    mode={viewMode}
                  />
                  <SentimentIndicator sentiment={sentiment} />
                  <TechnicalIndicators
                    data={stockData.map((d, i) => ({
                      timestamp: d.timestamp,
                      rsi: rsiData[i],
                      macd: macdData.macdLine[i],
                      signal: macdData.signalLine[i],
                      histogram: macdData.histogram[i],
                    }))}
                    type="RSI"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;