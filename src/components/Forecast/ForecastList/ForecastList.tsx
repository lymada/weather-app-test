import React, { useMemo } from 'react';
import './ForecastList.css';
import { formatDate } from 'src/utils/helpers';
import { ForecastData, GroupedForecast } from 'src/types';
import ForecastItem from '../ForecastItem';

interface ForecastListProps {
  forecast: ForecastData;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const groupedForecast: GroupedForecast = useMemo(() => {
    const grouped: GroupedForecast = {};
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      if (!grouped[day]) {
        grouped[day] = [];
      }
      
      grouped[day].push(item);
    });
    
    return grouped;
  }, [forecast]);

  return (
    <div className="forecast-list">
      <h2>5-Day Forecast</h2>
      
      {Object.entries(groupedForecast).map(([day, items]) => (
        <div key={day} className="forecast-day">
          <h3>{formatDate(items[0]?.dt)}</h3>
          <div className="forecast-items">
            {items.map(item => (
              <ForecastItem key={item.dt} data={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;