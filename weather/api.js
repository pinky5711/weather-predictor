// api.js

import { showError } from "../error/error.js";
import {showForecastData} from "./weather.js"

import { API_KEY } from "../config/config.js";

function getForecastData(city) {
    if (!city) {
      throw new Error("Please enter a city name");
    }
  
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to fetch forecast data");
        }
        return res.json();
      })
      .then((data) => {
        return data.list
          .map((item) => {
            return {
              date: new Date(item.dt_txt).toLocaleDateString(),
              temperature: item.main.temp,
              description: item.weather[0].description,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              icon: item.weather[0].icon,
            };
          })
          .filter((item, index) => index % 8 === 0);
      });
  }

  function getWeatherData(city, latitude, longitude) {
    const url = city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("The city you entered does not exist");
        }
        return res.json();
      })
      .then((data) => {
        const forecastBtn = document.getElementById("forecast-btn");
        if (city) {
          forecastBtn.disabled = false;
          forecastBtn.addEventListener("click", () => {
            getForecastData(city)
              .then((data) => {

                showForecastData(data);
               
              })
              .catch((error) => {
                showError(error.message);
              });
          });
        } else {
          forecastBtn.disabled = true;
        }
  
        return {
          cityName: data.name,
          icon: data.weather[0].icon,
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
        };
      });
  }

  const fetchWeatherData = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${API_KEY}&units=metric`;
  
    return fetch(url)
      .then(response => response.json())
      .then(data => ({
        city: city.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      }))
      .catch(error => console.log(error));
  }
  

 

  async function getHourlyForecastData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (data && data.list) {
        return data;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch hourly forecast data');
    }
  }
  
 
  function updateClockChart(aqi) {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hour = Math.floor(aqi / 50);
    const minute = Math.floor((aqi % 50) / 5);
    hourHand.style.transform = `rotate(${hour * 30}deg)`;
    minuteHand.style.transform = `rotate(${minute * 30}deg)`;
  }

  function showWeatherData(data) {
    // ...
    document.getElementById('temperature').textContent = `${data.temperature}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
    document.getElementById('pressure').textContent = `Pressure: ${data.pressure}hPa`;
  
    // Update clock chart
    updateClockChart(data.aqi);
  }
  
  
  

export { API_KEY, getForecastData, getWeatherData ,fetchWeatherData ,getHourlyForecastData};
