/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const currencies = {
  GHS: { symbol: '₵', name: 'Ghana Cedis' },
  TZS: { symbol: 'TSh', name: 'Tanzanian Shilling' },
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  KES: { symbol: 'KSh', name: 'Kenyan Shilling' },
  ZAR: { symbol: 'R', name: 'South African Rand' },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('GHS');
  const [rates, setRates] = useState({
    GHS: 13.5,
    TZS: 2500,
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    KES: 150,
    ZAR: 18.5,
  });
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch live exchange rates on component mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        if (data.rates) {
          const newRates = {
            USD: 1,
            EUR: data.rates.EUR || 0.92,
            GBP: data.rates.GBP || 0.79,
            TZS: data.rates.TZS || 2500,
            GHS: data.rates.GHS || 13.5,
            KES: data.rates.KES || 150,
            ZAR: data.rates.ZAR || 18.5,
          };
          setRates(newRates);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (error) {
        console.warn('Failed to fetch live exchange rates, using default rates:', error);
        // Keep default rates if API fails
      }
    };

    fetchRates();
    
    // Refresh rates every hour
    const intervalId = setInterval(fetchRates, 3600000);
    
    return () => clearInterval(intervalId);
  }, []);

  const convert = (amountInUSD) => {
    const rate = rates[currency] || 1;
    const converted = amountInUSD * rate;
    return Math.round(converted * 100) / 100;
  };

  const format = (amountInUSD) => {
    const { symbol } = currencies[currency];
    const converted = convert(amountInUSD);
    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies, format, convert, rates, lastUpdated }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
