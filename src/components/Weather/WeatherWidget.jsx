import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Eye } from 'lucide-react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('London');

  // Mock weather data for demonstration
  const mockWeatherData = {
    city: searchCity,
    country: 'GB',
    temperature: 22,
    description: 'Partly cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    icon: 'partly-cloudy'
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, return mock data
      setWeather({
        ...mockWeatherData,
        city: cityName,
        temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35
        humidity: Math.floor(Math.random() * 40) + 40, // Random humidity 40-80%
        windSpeed: Math.floor(Math.random() * 20) + 5 // Random wind 5-25 km/h
      });
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(searchCity);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchCity(city.trim());
      fetchWeather(city.trim());
    }
  };

  const getWeatherIcon = (iconType) => {
    switch (iconType) {
      case 'sunny':
        return <Sun size={48} color="#FFA500" />;
      case 'cloudy':
        return <Cloud size={48} color="#87CEEB" />;
      case 'rainy':
        return <CloudRain size={48} color="#4682B4" />;
      case 'snowy':
        return <CloudSnow size={48} color="#B0C4DE" />;
      default:
        return <Cloud size={48} color="#87CEEB" />;
    }
  };

  return (
    <div className="weather-widget fade-in">
      <div className="weather-header">
        <h1 className="page-title">Weather Information</h1>
        <p className="page-subtitle">Check current weather conditions for your destinations</p>
      </div>

      <div className="weather-search">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {weather && !loading && (
        <div className="weather-card">
          <div className="weather-main">
            <div className="weather-icon">
              {getWeatherIcon(weather.icon)}
            </div>
            <div className="weather-info">
              <h2 className="city-name">{weather.city}</h2>
              <div className="temperature">{weather.temperature}°C</div>
              <div className="description">{weather.description}</div>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <Thermometer size={20} />
              <div>
                <span className="detail-label">Temperature</span>
                <span className="detail-value">{weather.temperature}°C</span>
              </div>
            </div>

            <div className="detail-item">
              <Droplets size={20} />
              <div>
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.humidity}%</span>
              </div>
            </div>

            <div className="detail-item">
              <Wind size={20} />
              <div>
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weather.windSpeed} km/h</span>
              </div>
            </div>

            <div className="detail-item">
              <Eye size={20} />
              <div>
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{weather.visibility} km</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      <div className="weather-tips">
        <h3>Weather Planning Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Check Before You Pack</h4>
            <p>Always check the weather forecast for your destination before packing to ensure you bring appropriate clothing.</p>
          </div>
          <div className="tip-card">
            <h4>Layer Your Clothing</h4>
            <p>Layering allows you to adjust to changing weather conditions throughout the day.</p>
          </div>
          <div className="tip-card">
            <h4>Plan Indoor Alternatives</h4>
            <p>Have backup indoor activities planned in case of unexpected weather changes.</p>
          </div>
          <div className="tip-card">
            <h4>Stay Hydrated</h4>
            <p>Weather conditions can affect hydration needs - drink plenty of water regardless of temperature.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;