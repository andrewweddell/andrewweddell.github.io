import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { ThresholdContext } from '../context/ThresholdContext';
import Settings from './Settings';
import styles from './Home.module.scss';
 

Modal.setAppElement('#root'); // To prevent accessibility-related warnings

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [clothingRecommendation, setClothingRecommendation] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { coldThreshold, warmThreshold } = useContext(ThresholdContext);

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

    let recommendation = '';
    let icon = '';

    if (temp >= warmThreshold) {
      recommendation = 'Shorts and short-sleeve jersey.';
      icon = '🩳👕';
    } else if (temp >= coldThreshold) {
      recommendation = 'Shorts and long-sleeve jersey or thin undershirt.';
      icon = '🩳👕🧥';
    } else if (temp >= 7) {
      recommendation = 'Tights or leg warmers, long-sleeve undershirt, jacket, full-finger gloves, headband, wool socks, shoe covers.';
      icon = '🧦🧤🧥';
    } else if (temp >= 4.4) {
      recommendation = 'Heavy tights, turtleneck, jacket, medium gloves, headband, winter shoes, wool socks, shoe covers.';
      icon = '🧦🧤🧥🧣';
    } else if (temp >= 1.7) {
      recommendation = 'Heavy tights, turtleneck, jacket, heavy gloves, headband, winter shoes, wool socks, toe warmers.';
      icon = '🧦🧤🧥🧣🥾';
    } else if (temp >= -1) {
      recommendation = 'Heavy tights, heavy undershirt, jacket, heavy gloves, skullcap, winter shoes, wool socks, toe warmers.';
      icon = '🧦🧤🧥🧣🥾🧢';
    } else if (temp >= -3.9) {
      recommendation = 'Winter tights, heavy undershirt, jersey, jacket, mittens or lobster gloves, balaclava, winter shoes, plastic bag for feet, wool socks, toe warmers.';
      icon = '🧦🧤🧥🧣🥾🧢🧳';
    } else if (temp >= -6.7) {
      recommendation = 'Winter tights, turtleneck, jersey, jacket, mittens or lobster gloves, balaclava, winter shoes, wool socks, toe warmers, plastic bag over entire foot.';
      icon = '🧦🧤🧥🧣🥾🧢🧳❄️';
    }

    setClothingRecommendation({ text: recommendation, icon: icon });
  };

  useEffect(() => {
    // Optional: Automatically get weather for current location on component mount
    getCurrentLocation();
  }, [getCurrentLocation]);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  const getCyclingCondition = (weatherData) => {
    const temp = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;

    if (temp < 0) return 'Too cold for cycling!';
    if (temp > 35) return 'Too hot for cycling!';
    if (windSpeed > 20) return 'Strong winds, be cautious!';
    if (weatherData.weather[0].main === 'Rain') return 'Rainy, consider indoor cycling';
    return 'Good conditions for cycling!';
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>🚴‍♂️ Cycling Weather</h1>
      </header>
      <button className={styles.settingsButton} onClick={() => setIsSettingsOpen(true)}>⚙️ Settings</button>
      <section className={styles.section}>
        <h2>Enter Your Location</h2>
        <input
          className={styles.locationInput}
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className={styles.locationButton} onClick={getCurrentLocation}>📍 Use Current Location</button>
      </section>
      <section className={styles.section}>
        <h2>Weather Summary</h2>
        <div className={styles.weatherDetails}>
          {weatherData ? (
            <>
              <div className={styles.weatherIcon}>
                {getWeatherIcon(weatherData.weather[0].main)}
              </div>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Feels Like: {weatherData.main.feels_like}°C</p>
              <p>Wind Speed: {weatherData.wind.speed} km/h</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <div className={styles.cyclingCondition}>
                {getCyclingCondition(weatherData)}
              </div>
            </>
          ) : (
            <p>{error || 'Weather data will appear here...'}</p>
          )}
        </div>
      </section>
      <section className={styles.section}>
        <h2>Clothing Recommendations</h2>
        <div className={styles.clothingRecommendations}>
          {clothingRecommendation ? (
            <>
              <div className={styles.clothingIcon}>{clothingRecommendation.icon}</div>
              <p>{clothingRecommendation.text}</p>
            </>
          ) : (
            <p>Enter a location to see recommendations.</p>
          )}
        </div>
      </section>
      <section className={styles.section}>
        <h2>Your Settings Summary</h2>
        <div className={styles.settingsSummary}>
          <p>Your Cold Threshold: {coldThreshold}°C</p>
          <p>Your Warm Threshold: {warmThreshold}°C</p>
          {weatherData && weatherData.main.temp < coldThreshold && (
            <p>Current temperature is below your cold threshold.</p>
          )}
          {weatherData && weatherData.main.temp > warmThreshold && (
            <p>Current temperature is above your warm threshold.</p>
          )}
        </div>
      </section>
      <Modal
        isOpen={isSettingsOpen}
        onRequestClose={() => setIsSettingsOpen(false)}
        contentLabel="Settings Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <Settings closeModal={() => setIsSettingsOpen(false)} />
      </Modal>
    </div>
  );
};

export default Home;