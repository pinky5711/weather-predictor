import { showError } from "../error/error.js";
import { getHourlyForecastData, getWeatherData } from "../weather/api.js";
import { displayHourlyForecastData, showWeatherData } from "../weather/weather.js";
import { updateTopFiveCitiesWeather } from "../weather/weather-data-5-city.js";
import { showUVIndex } from "../uv-index/UvIndex.js";
import "../header-footer/import-header-footer.js"



document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = document.getElementById("search-input").value;
    try {
      const weatherData = await getWeatherData(city);
      showWeatherData(weatherData);
      showUVIndex(city);
      const hourlyForecastData = await getHourlyForecastData(city);
     displayHourlyForecastData(hourlyForecastData);
    } catch (error) {
      showError(error.message);
    }
  });
  

navigator.geolocation.getCurrentPosition(
  (position) => {
    getWeatherData(null, position.coords.latitude, position.coords.longitude)
      .then((data) => {
        showWeatherData(data);
      })
      .catch((error) => {
        showError(error.message);
      });
  },
  (error) => {
    showError(error.message);
  }
);

window.addEventListener("load", () => {
    updateTopFiveCitiesWeather();
  });

  function logout() {
    // Perform any necessary logout actions here
    alert("Logged out successfully");
    window.location.href = "./login/index.html";
  }
  