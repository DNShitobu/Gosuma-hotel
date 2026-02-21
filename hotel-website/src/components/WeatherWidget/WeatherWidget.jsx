import { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setWeather({
        temp: 28,
        condition: 'Partly Cloudy',
        humidity: 75,
        wind: 12,
        icon: '⛅',
        forecast: [
          { day: 'Sun', high: 29, low: 24, icon: '☀️' },
          { day: 'Mon', high: 30, low: 25, icon: '⛅' },
          { day: 'Tue', high: 28, low: 23, icon: '🌧️' },
          { day: 'Wed', high: 27, low: 22, icon: '🌧️' },
          { day: 'Thu', high: 29, low: 24, icon: '☀️' }
        ]
      });
      setLoading(false);
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="weather-widget loading">
        <span>Loading weather...</span>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-current">
        <div className="weather-main">
          <span className="weather-icon">{weather.icon}</span>
          <div className="temp-display">
            <span className="temp">{weather.temp}°C</span>
            <span className="condition">{weather.condition}</span>
          </div>
        </div>
        <div className="weather-details">
          <div className="detail">
            <span className="label">Humidity</span>
            <span className="value">{weather.humidity}%</span>
          </div>
          <div className="detail">
            <span className="label">Wind</span>
            <span className="value">{weather.wind} km/h</span>
          </div>
        </div>
      </div>
      <div className="weather-location">
        📍 Accra, Ghana
      </div>
      <div className="weather-forecast">
        <h4>5-Day Forecast</h4>
        <div className="forecast-grid">
          {weather.forecast.map((day, i) => (
            <div key={i} className="forecast-day">
              <span className="day">{day.day}</span>
              <span className="icon">{day.icon}</span>
              <span className="temps">{day.high}° / {day.low}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
