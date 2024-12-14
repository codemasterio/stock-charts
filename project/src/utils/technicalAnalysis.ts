import { StockData, TechnicalIndicators } from '../types/stock';

export const calculateRSI = (data: StockData[], periods: number = 14): number[] => {
  const gains: number[] = [];
  const losses: number[] = [];
  
  // Calculate price changes
  for (let i = 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    gains.push(Math.max(0, change));
    losses.push(Math.max(0, -change));
  }
  
  // Calculate RSI
  const rsiValues: number[] = [];
  let avgGain = gains.slice(0, periods).reduce((a, b) => a + b, 0) / periods;
  let avgLoss = losses.slice(0, periods).reduce((a, b) => a + b, 0) / periods;
  
  for (let i = periods; i < data.length; i++) {
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    rsiValues.push(rsi);
    
    avgGain = (avgGain * (periods - 1) + gains[i]) / periods;
    avgLoss = (avgLoss * (periods - 1) + losses[i]) / periods;
  }
  
  return rsiValues;
};

export const calculateMACD = (data: StockData[]): { macdLine: number[]; signalLine: number[]; histogram: number[] } => {
  const closePrices = data.map(d => d.close);
  const ema12 = calculateEMA(closePrices, 12);
  const ema26 = calculateEMA(closePrices, 26);
  
  const macdLine = ema12.map((v, i) => v - ema26[i]);
  const signalLine = calculateEMA(macdLine, 9);
  const histogram = macdLine.map((v, i) => v - signalLine[i]);
  
  return { macdLine, signalLine, histogram };
};

export const calculateBollingerBands = (data: StockData[], periods: number = 20): {
  upper: number[];
  middle: number[];
  lower: number[];
} => {
  const closePrices = data.map(d => d.close);
  const sma = calculateSMA(closePrices, periods);
  const stdDev = calculateStandardDeviation(closePrices, sma, periods);
  
  const upper = sma.map((v, i) => v + (2 * stdDev[i]));
  const lower = sma.map((v, i) => v - (2 * stdDev[i]));
  
  return { upper, middle: sma, lower };
};

// Helper functions
const calculateEMA = (data: number[], periods: number): number[] => {
  const k = 2 / (periods + 1);
  const ema: number[] = [data[0]];
  
  for (let i = 1; i < data.length; i++) {
    ema.push(data[i] * k + ema[i - 1] * (1 - k));
  }
  
  return ema;
};

const calculateSMA = (data: number[], periods: number): number[] => {
  const sma: number[] = [];
  for (let i = periods - 1; i < data.length; i++) {
    const sum = data.slice(i - periods + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / periods);
  }
  return sma;
};

const calculateStandardDeviation = (data: number[], sma: number[], periods: number): number[] => {
  const stdDev: number[] = [];
  for (let i = periods - 1; i < data.length; i++) {
    const variance = data
      .slice(i - periods + 1, i + 1)
      .reduce((sum, val) => sum + Math.pow(val - sma[i - periods + 1], 2), 0) / periods;
    stdDev.push(Math.sqrt(variance));
  }
  return stdDev;
};