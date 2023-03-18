

import { LOCATION_API_KEY, WEATHER_BIT_API_KEY } from  "../config/config.js";
import "../header-footer/import-header-footer.js"

document.addEventListener('DOMContentLoaded', () => {
// Select the form and result container elements
const form = document.querySelector('#travel-form');
const resultContainer = document.querySelector('#result-container');

// Add an event listener to the form
form.addEventListener('submit', async event => {
// Prevent the form from submitting
event.preventDefault();

// Get the form data
const formData = new FormData(form);
const destination = formData.get('destination');
const date = formData.get('date');
try {
    // Get location coordinates
    const locationUrl = `https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=${LOCATION_API_KEY}`;
    const locationResponse = await fetch(locationUrl);
    const locationData = await locationResponse.json();
    
    // Get weather information
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationData.results[0].geometry.lat}&lon=${locationData.results[0].geometry.lng}&key=${WEATHER_BIT_API_KEY}`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
  
    // Display the results in a card
    const resultCard = document.createElement('div');
    resultCard.classList.add('card');
  
    // Add the destination name to the card
    const destinationName = document.createElement('h2');
    destinationName.textContent = destination;
    resultCard.appendChild(destinationName);
  
    // Add the weather information to the card
    const weatherInfo = document.createElement('p');
    weatherInfo.innerHTML = `Temperature: <span class="temp">${weatherData.data[0].temp}°C${getWeatherIcon(weatherData.data[0].temp)}</span><br>
    Weather: <span class="weather-description">${weatherData.data[0].weather.description}</span>`;
    resultCard.appendChild(weatherInfo);
  
    // Add the suggestion for packing clothes to the card
    const clothingSuggestion = document.createElement('p');
    if (weatherData.data[0].temp >= 20) {
      clothingSuggestion.textContent = "It's going to be warm, so remember to pack light clothes.";
    } else {
      clothingSuggestion.textContent = "It might be chilly, so consider packing a sweater or jacket.";
    }
    resultCard.appendChild(clothingSuggestion);
  
    // Add the suggestion for bringing a raincoat to the card
    const raincoatSuggestion = document.createElement('p');
    if (weatherData.data[0].weather.description.includes('rain')) {
      raincoatSuggestion.textContent = "It looks like it might rain, so consider bringing a raincoat or umbrella.";
    } else {
      raincoatSuggestion.textContent = "No rain is in the forecast, so you can leave your raincoat at home.";
    }
    resultCard.appendChild(raincoatSuggestion);
  
    // Add the card to the result container
    resultContainer.innerHTML = '';
    resultContainer.appendChild(resultCard);
    // Add weather icon to the button
  const weatherIcon = document.createElement('i');
  weatherIcon.classList.add('fas', `fa-${getWeatherIcon(weatherData.data[0].temp)}`);
  checkWeatherButton.appendChild(weatherIcon);
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  }});
});

function getWeatherIcon(temp) {
    if (temp < 0) {
      return "❄️";
    } else if (temp >= 0 && temp < 10) {
      return "🌡️";
    } else if (temp >= 10 && temp < 20) {
      return "🌤️";
    } else if (temp >= 20 && temp < 30) {
      return "☀️";
    } else if (temp >= 30 && temp < 40) {
      return "🔥";
    } else if (temp >= 40) {
      return "🌡️";
    } else {
      return "";
    }
  }
  