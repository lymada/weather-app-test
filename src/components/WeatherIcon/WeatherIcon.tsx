import React from 'react';
import './WeatherIcon.css';

interface WeatherIconProps {
  iconCode: string;
  size?: 'small' | 'medium' | 'large';
  alt?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  iconCode, 
  size = 'medium',
  alt = 'Weather icon'
}) => {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
  return (
    <img 
      src={iconUrl} 
      alt={alt} 
      className={`weather-icon weather-icon-${size}`}
    />
  );
};

export default WeatherIcon;