import React, { useState, useEffect } from 'react';
import ForecastList from './components/Forecast';
import Search from './components/Search';
import { fetchCurrentWeather, fetchForecast } from './services/weatherService';
import { WeatherData, ForecastData } from './types';
import './App.css';
import CurrentWeather from './components/CurrentWeather';

const App: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    
    // Initial weather fetch (default city or geolocation)
    const fetchDefaultWeather = async () => {
      try {
        const defaultCity = 'London';
        await fetchWeatherData(defaultCity);
      } catch (error) {
        setError('Failed to load default weather data');
      }
    };
    
    fetchDefaultWeather();
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherData = await fetchCurrentWeather(city);
      const forecastData = await fetchForecast(city);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      
      // Add to search history if not already there
      if (!searchHistory.includes(city)) {
        setSearchHistory(prev => [city, ...prev.slice(0, 9)]);
      }
    } catch (error) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const handleHistoryClick = (city: string) => {
    fetchWeatherData(city);
  };

  const handleDeleteHistory = (cityToDelete: string) => {
    setSearchHistory(prev => prev.filter(city => city !== cityToDelete));
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">Weather App</h1>
        
        <div className="search-section">
          <Search 
            onSearch={handleSearch} 
            error={error}
            searchHistory={searchHistory}
            onHistoryClick={handleHistoryClick}
            onDeleteHistory={handleDeleteHistory}
            onClearHistory={handleClearHistory}
          />
        </div>
        
        <div className="weather-content">
          {loading ? (
            <div className="loading">Loading weather data...</div>
          ) : currentWeather ? (
            <>
              <CurrentWeather data={currentWeather} />
              {forecast && <ForecastList forecast={forecast} />}
            </>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;