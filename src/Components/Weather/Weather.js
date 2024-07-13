import React, { useEffect, useState } from "react";
import sunny from "../../assets/sunny.png";
import cloudy from "../../assets/cloudy.gif";
import rainy from "../../assets/rainy.gif";
import defaultImage from "../../assets/normal.png";
import clear from "../../assets/clear.png";
import fog from "../../assets/fog.png";
import haze from "../../assets/haze.png";

import mist from "../../assets/mist.png";
import strom from "../../assets/strom.png";

import styles from "./Weather.module.css";

function Weather() {
  const [city, setCity] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "bcda10ba323e88e96cb486015a104d1d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      if (!data.weather || data.weather.length < 1) {
        throw new Error("Weather data not available");
      }
      setWeatherData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setWeatherData(null); // Clear previous weather data
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return cloudy;
      case "Rain":
        return rainy;
      case "Sunny":
        return sunny;
      case "Mist":
        return mist;
      case "Fog":
        return fog;
      case "Haze":
        return haze;
      case "Clear":
        return clear;
      case "Strom":
        return "strom";

      default:
        return defaultImage;
    }
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      {weatherData && (
        <>
          <h1 className={styles.container_date}>{formattedDate}</h1>
          <div className={styles.weather_data}>
            <h2 className={styles.container_city}>{weatherData.name}</h2>
            <img
              className={styles.container_img}
              src={getWeatherIconUrl(weatherData.weather[0].main)}
              width="180px"
              alt="Weather Icon"
            />
            <h2 className={styles.container_degree}>
              {weatherData.main.temp}°C
            </h2>
            <h2 className={styles.country_per}>
              {weatherData.weather[0].main}
            </h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter city name"
                onChange={handleInputChange}
              />
              <button type="submit">Get</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
