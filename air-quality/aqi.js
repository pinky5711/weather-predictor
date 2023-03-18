
import { showError } from "../error/error.js";
const API_KEY ='b39f9cb8-a225-4244-ac73-4647cec70751';
const cityList = document.querySelector('#city-list');
const aqiContainer = document.getElementById('aqi-container');

const errorCard = document.getElementById('error-card');
const errorMsg = document.getElementById('error-msg');

const aqiValue = document.querySelector('.aqi-value'); // uncommented this line
const aqiStatus = document.querySelector('.aqi-status .aqi-level-text'); // uncommented this line
const aqiIndex = document.querySelector('.aqi-index'); // uncommented this line
const aqiOverview = document.querySelector('.aqi-overview'); // uncommented this line
const aqiPollutants = document.querySelector('.aqi-pollutants'); // uncommented this line

// Function to get AQI status
function getAQIStatus(aqi) {
    if (aqi <= 50) {
      return 'Good';
    } else if (aqi <= 100) {
      return 'Moderate';
    } else if (aqi <= 150) {
      return 'Unhealthy for Sensitive Groups';
    } else if (aqi <= 200) {
      return 'Unhealthy';
    } else if (aqi <= 300) {
      return 'Very Unhealthy';
    } else {
      return 'Hazardous';
    }
  }
  
  // Function to get AQI index
  function getAQIIndex(aqi) {
    if (aqi <= 50) {
      return 'Good';
    } else if (aqi <= 100) {
      return 'Moderate';
    } else if (aqi <= 150) {
      return 'Unhealthy for Sensitive Groups';
    } else if (aqi <= 200) {
      return 'Unhealthy';
    } else if (aqi <= 300) {
      return 'Very Unhealthy';
    } else {
      return 'Hazardous';
    }
  }
  


function showAQI(data) {
    const { city, state, country } = data;
    const { aqicn, aqius, maincn, mainus } = data.current.pollution;
  
    aqiValue.textContent = aqicn;
    aqiStatus.textContent = getAQIStatus(aqicn);
    aqiIndex.textContent = `LIVE AQI INDEX - ${getAQIIndex(aqicn)}`;
    aqiOverview.textContent = `What is the current air quality in ${city}, ${state}, ${country}?`;
    aqiPollutants.innerHTML = '';
  
    const pollutants = ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co'];
    pollutants.forEach(p => {
      const pollutantContainer = document.createElement('div');
      pollutantContainer.classList.add('aqi-pollutant');
  
      const pollutantName = document.createElement('div');
      pollutantName.classList.add('aqi-pollutant-name');
      pollutantName.textContent = POLLUTANT_LABELS[p];
  
      const pollutantValue = document.createElement('div');
      pollutantValue.classList.add('aqi-pollutant-value');
      pollutantValue.textContent = data.current[p] ? data.current[p].toFixed(1) : '-';
  
      pollutantContainer.appendChild(pollutantName);
      pollutantContainer.appendChild(pollutantValue);
      aqiPollutants.appendChild(pollutantContainer);
    });
  
    aqiContainer.style.display = 'block';
    errorCard.style.display = 'none';
  }
  
  const POLLUTANT_LABELS = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    o3: 'Ozone',
    no2: 'Nitrogen dioxide',
    so2: 'Sulphur dioxide',
    co: 'Carbon monoxide'
  };


  

  const searchForm = document.getElementById('search-form');
  const cityInput = document.getElementById('city-input');
  const suggestionList = document.getElementById('suggestion-list');
  
  cityInput.addEventListener('input', (e) => {
    const searchText = e.target.value.trim();
    if (searchText === '') {
      suggestionList.innerHTML = '';
      return;
    }

    fetchCitySuggestions(searchText)
      .then(suggestions => showCitySuggestions(suggestions))
      .catch(error => {
        console.error(error);
        showError('Unable to fetch data. Please try again later.');
      });
  });
  
  cityInput.addEventListener('focus', (e) => {
    if (suggestionList.children.length > 0) {
      suggestionList.style.display = 'block';
    }
  });
  
  cityInput.addEventListener('blur', (e) => {
    setTimeout(() => suggestionList.style.display = 'none', 200);
  });
  
  suggestionList.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'LI') {
      const selectedCity = e.target.textContent;
      cityInput.value = selectedCity;
      suggestionList.innerHTML = '';
      suggestionList.style.display = 'none';
    }
  });
  
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city === '') {
      showError('Please enter a valid city name.');
      return;
    }

    fetchAQIData(city)
      .then(data => {
        if (data.status === 'success') {
          showAQI(data.data);
        } else {
          showError('Unable to fetch data. Please try again later.');
        }
      })
      .catch(error => {
        console.error(error);
        showError('Unable to fetch data. Please try again later.');
      });
  });
  
  function fetchCitySuggestions(searchText) {
    const apiKey = '8310d069de4641deaee9f1012b5ac552';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${searchText}&key=${apiKey}&pretty=1&countrycode=in&limit=5&no_annotations=1`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const suggestions = data.results.map(result => result.formatted);
        return suggestions;
      });
  }
  
  function showCitySuggestions(suggestions) {
    let html = '';
    suggestions.forEach(suggestion => {
      html += `<li>${suggestion}</li>`;
    });
    suggestionList.innerHTML = html;
    suggestionList.style.display = 'block';
  }
  

  async function fetchAQIData(city) {
    const url = `https://api.airvisual.com/v2/city?city=${city}&state=Delhi&country=India&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
  
    if (response.ok) {
      return { status: 'success', data };
    } else {
      throw new Error(data.message);
    }
  }

  const aqiColors = [
    { range: [0, 50], color: "#3d9e3d", level: "Good" },
    { range: [51, 100], color: "#e6d83f", level: "Moderate" },
    { range: [101, 150], color: "#ff9c00", level: "Unhealthy for Sensitive Groups" },
    { range: [151, 200], color: "#ff4d4d", level: "Unhealthy" },
    { range: [201, 300], color: "#99004c", level: "Very Unhealthy" },
    { range: [301, 500], color: "#660000", level: "Hazardous" }
  ];
  
  const chartContainer = document.getElementById("chart-container");
  const chartSvg = document.getElementById("chart-svg");
  const chartRadius = chartSvg.clientWidth / 2;
  const aqiLabelContainer = document.getElementById("aqi-label-container");
  
  function createArcPath(startAngle, endAngle, radius) {
    const startRadians = (startAngle - 90) * Math.PI / 180;
    const endRadians = (endAngle - 90) * Math.PI / 180;
    const startX = chartRadius + radius * Math.cos(startRadians);
    const startY = chartRadius + radius * Math.sin(startRadians);
    const endX = chartRadius + radius * Math.cos(endRadians);
    const endY = chartRadius + radius * Math.sin(endRadians);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    


    const pathData = [
   `M ${startX} ${startY}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    ];
    
    return pathData.join(" ");
    }
    
    function createChart() {
    let startAngle = 0;
    let endAngle = 0;
    
    aqiColors.forEach((color) => {
    const arcPath = createArcPath(startAngle, endAngle, chartRadius * 0.8);
    const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
arc.setAttribute("d", arcPath);
arc.setAttribute("fill", color.color);

chartSvg.appendChild(arc);

const aqiLabel = document.createElement("div");
aqiLabel.className = "aqi-label";
aqiLabel.style.color = color.color;
aqiLabel.textContent = color.level;
aqiLabelContainer.appendChild(aqiLabel);

startAngle = endAngle;
endAngle += 360 * ((color.range[1] - color.range[0]) / 500);
});
}

createChart();