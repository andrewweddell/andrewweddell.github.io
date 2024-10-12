import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [clothingRecommendation, setClothingRecommendation] = useState('');

  const API_KEY = 'a5705087624892d6a318bbd822abe8ec';

  // Function to fetch weather data
  const fetchWeatherData = useCallback((lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
        generateClothingRecommendation(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch weather data');
      });
  }, [API_KEY]);

  // Function to get current location
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          setError('Location access denied. Please enter your location manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, [fetchWeatherData]);

  // Function to generate clothing recommendation based on weather
  const generateClothingRecommendation = (data) => {
    const temp = data.main.temp;

    // Retrieve user preferences from local storage
    const coldThreshold = localStorage.getItem('coldThreshold') ? Number(localStorage.getItem('coldThreshold')) : 10;
    const warmThreshold = localStorage.getItem('warmThreshold') ? Number(localStorage.getItem('warmThreshold')) : 20;

    let recommendation = '';

    if (temp >= warmThreshold) {
      recommendation = 'Shorts and short-sleeve jersey.';
    } else if (temp >= coldThreshold) {
      recommendation = 'Shorts and long-sleeve jersey or thin undershirt.';
    } else if (temp >= 7) {
      recommendation = 'Tights or leg warmers, long-sleeve undershirt, jacket, full-finger gloves, headband, wool socks, shoe covers.';
    } else if (temp >= 4.4) {
      recommendation = 'Heavy tights, turtleneck, jacket, medium gloves, headband, winter shoes, wool socks, shoe covers.';
    } else if (temp >= 1.7) {
      recommendation = 'Heavy tights, turtleneck, jacket, heavy gloves, headband, winter shoes, wool socks, toe warmers.';
    } else if (temp >= -1) {
      recommendation = 'Heavy tights, heavy undershirt, jacket, heavy gloves, skullcap, winter shoes, wool socks, toe warmers.';
    } else if (temp >= -3.9) {
      recommendation = 'Winter tights, heavy undershirt, jersey, jacket, mittens or lobster gloves, balaclava, winter shoes, plastic bag for feet, wool socks, toe warmers.';
    } else if (temp >= -6.7) {
      recommendation = 'Winter tights, turtleneck, jersey, jacket, mittens or lobster gloves, balaclava, winter shoes, wool socks, toe warmers, plastic bag over entire foot.';
    }

    setClothingRecommendation(recommendation);
  };

  useEffect(() => {
    // Optional: Automatically get weather for current location on component mount
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div>
      <header>
        <h1>🚴‍♂️ Cycling Weather</h1>
      </header>
      <section>
        <h2>Enter Your Location</h2>
        <input
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={getCurrentLocation}>Use Current Location 📍</button>
      </section>
      <section>
        <h2>Weather Summary</h2>
        <div className="weather-summary">
          {weatherData ? (
            <>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Feels Like: {weatherData.main.feels_like}°C</p>
              <p>Wind Speed: {weatherData.wind.speed} km/h</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
            </>
          ) : (
            <p>{error || 'Weather data will appear here...'}</p>
          )}
        </div>
      </section>
      <section>
        <h2>Clothing Recommendations</h2>
        <div className="clothing-recommendations">
          {clothingRecommendation ? (
            <p>{clothingRecommendation}</p>
          ) : (
            <p>Enter a location to see recommendations.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;