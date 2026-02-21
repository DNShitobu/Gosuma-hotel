import { useLanguage } from '../../context/LanguageContext';
import './LanguageSelector.css';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇭' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-selector">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select language"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
