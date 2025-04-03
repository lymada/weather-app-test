import React from 'react';
import WeatherIcon from '../../WeatherIcon';
import { formatTime } from '../../../utils/helpers';
import { ForecastItem as ForecastItemType } from '../../../types';
import './ForecastItem.css';

interface ForecastItemProps {
  data: ForecastItemType;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => {
  const {
    dt,
    main,
    weather
  } = data;
  
  const time = formatTime(dt);
  const iconCode = weather[0].icon;
  const description = weather[0].description;

  return (
    <div className="forecast-item">
      <div className="forecast-time">{time}</div>
      <WeatherIcon iconCode={iconCode} size="medium" />
      <div className="forecast-temp">
        <span className="max-temp">{Math.round(main.temp_max)}°</span>
        <span className="min-temp">{Math.round(main.temp_min)}°</span>
      </div>
      <div className="forecast-desc">{description}</div>
    </div>
  );
};

export default ForecastItem;