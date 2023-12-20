// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '8128c6fed4fc6803ebf0bed319208fab';

  const fetchWeather = async () => {
    try {
      // Geocoding API to get latitude and longitude
      const geocodingResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
      
      // Check if the geocoding response has valid data
      if (geocodingResponse.data.length > 0) {
        const { lat, lon } = geocodingResponse.data[0];

        // Weather API to get weather based on latitude and longitude
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        setWeather(weatherResponse.data);
        setError('');
      } else {
        setError('City not found. Please enter a valid city name.');
        setWeather(null);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
