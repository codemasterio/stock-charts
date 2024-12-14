import { Stock, StockData, TechnicalIndicators, SentimentScore } from '../types/stock';

export const mockStocks: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    sector: 'Energy',
    price: 2456.75,
    change: 23.45,
    changePercent: 0.96,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Technology',
    price: 3567.80,
    change: -12.30,
    changePercent: -0.34,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    sector: 'Banking',
    price: 1678.45,
    change: 15.20,
    changePercent: 0.91,
  },
  {
    symbol: 'INFY',
    name: 'Infosys',
    sector: 'Technology',
    price: 1456.30,
    change: -8.75,
    changePercent: -0.60,
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank',
    sector: 'Banking',
    price: 945.60,
    change: 5.80,
    changePercent: 0.62,
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel',
    sector: 'Telecom',
    price: 876.25,
    change: -3.45,
    changePercent: -0.39,
  },
  {
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever',
    sector: 'FMCG',
    price: 2567.90,
    change: 18.65,
    changePercent: 0.73,
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    sector: 'Banking',
    price: 567.85,
    change: 7.90,
    changePercent: 1.41,
  }
];

const generateTrendedData = (basePrice: number, days: number, trend: 'up' | 'down' | 'sideways'): number[] => {
  const prices: number[] = [basePrice];
  const trendFactor = trend === 'up' ? 1.001 : trend === 'down' ? 0.999 : 1;
  
  for (let i = 1; i < days; i++) {
    const randomFactor = 0.995 + Math.random() * 0.01;
    prices.push(prices[i - 1] * trendFactor * randomFactor);
  }
  
  return prices;
};

export const generateMockStockData = (days: number, mode: 'intraday' | 'swing'): StockData[] => {
  const data: StockData[] = [];
  const trend = Math.random() > 0.5 ? 'up' : 'down';
  const basePrice = 1000;
  const prices = generateTrendedData(basePrice, days, trend);
  
  const timeInterval = mode === 'intraday' ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000;
  
  for (let i = 0; i < days; i++) {
    const volatility = mode === 'intraday' ? 2 : 5;
    const price = prices[i];
    
    data.push({
      timestamp: Date.now() - (days - i) * timeInterval,
      open: price * (1 + (Math.random() - 0.5) * 0.002 * volatility),
      high: price * (1 + Math.random() * 0.004 * volatility),
      low: price * (1 - Math.random() * 0.004 * volatility),
      close: price,
      volume: Math.floor(Math.random() * 1000000) * (mode === 'intraday' ? 0.2 : 1),
    });
  }
  
  return data;
};

export const generateMockSentiment = (): SentimentScore => {
  // Generate random sentiment scores
  const newsScore = 30 + Math.random() * 70; // Range: 30-100
  const socialScore = 30 + Math.random() * 70; // Range: 30-100
  
  // Calculate overall sentiment score (weighted average)
  const overallScore = (newsScore * 0.6 + socialScore * 0.4);
  
  // Determine sentiment label based on overall score
  let label: 'Positive' | 'Neutral' | 'Negative';
  if (overallScore >= 60) {
    label = 'Positive';
  } else if (overallScore <= 40) {
    label = 'Negative';
  } else {
    label = 'Neutral';
  }
  
  return {
    score: overallScore,
    label,
    sources: {
      news: newsScore,
      social: socialScore,
    }
  };
};