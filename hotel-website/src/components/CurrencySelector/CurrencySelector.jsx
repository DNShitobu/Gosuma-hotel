import { useCurrency, currencies } from '../../context/CurrencyContext';
import './CurrencySelector.css';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="currency-selector">
      <select 
        value={currency} 
        onChange={(e) => setCurrency(e.target.value)}
        aria-label="Select currency"
      >
        {Object.entries(currencies).map(([code, { name }]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
