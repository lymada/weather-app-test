import React from 'react';
import WeatherIcon from '../WeatherIcon';
import { formatDate, getWindDirection, metersToKilometers } from '../../utils/helpers';
import { WeatherData } from '../../types';
import './CurrentWeather.css';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const {
    name,
    main,
    weather,
    wind,
    visibility,
    dt,
    sys
  } = data;

  const weatherDescription = weather[0].description;
  const weatherIconCode = weather[0].icon;
  const windDirection = getWindDirection(wind.deg);
  const visibilityInKm = metersToKilometers(visibility);
  
  return (
    <div className="current-weather">
      <div className="weather-header">
        <h2>{name}, {sys.country}</h2>
        <p>{formatDate(dt)}</p>
      </div>
      
      <div className="weather-details">
        <div className="weather-primary">
          <WeatherIcon iconCode={weatherIconCode} size="large" />
          <div className="temperature-container">
            <h1>{Math.round(main.temp)}°C</h1>
            <p className="description">{weatherDescription}</p>
          </div>
        </div>
        
        <div className="weather-secondary">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{main.humidity}%</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">
              {wind.speed} m/s 
              <span className="wind-direction" style={{ transform: `rotate(${wind.deg}deg)` }}>↑</span>
              {windDirection}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{visibilityInKm} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;