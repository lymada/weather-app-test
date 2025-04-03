import { WeatherData, ForecastData } from '../types';

const API_KEY = 'f5531d2b07f300c9e49e8b10dcab2f77'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('City not found');
  }
  
  return await response.json();
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Forecast data not available');
  }
  
  return await response.json();
};