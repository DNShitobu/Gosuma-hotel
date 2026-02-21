/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const currencies = {
  TZS: { symbol: 'TSh', rate: 2500, name: 'Tanzanian Shilling' },
  USD: { symbol: '$', rate: 1, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.79, name: 'British Pound' },
  KES: { symbol: 'KSh', rate: 150, name: 'Kenyan Shilling' },
  ZAR: { symbol: 'R', rate: 18.5, name: 'South African Rand' },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('TZS');

  const convert = (amountInUSD) => {
    const converted = amountInUSD * currencies[currency].rate;
    return Math.round(converted * 100) / 100;
  };

  const format = (amountInUSD) => {
    const { symbol } = currencies[currency];
    const converted = convert(amountInUSD);
    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies, format, convert }}>
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
