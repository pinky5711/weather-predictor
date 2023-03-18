import { formatDate } from "../utils/utility.js";


let forecastTable = null;

function showForecastData(data) {
  forecastTable = displayForecastData(data);
  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast-container");
  forecastContainer.appendChild(forecastTable);
  const container = document.querySelector(".container");
  const cardElement = document.querySelector(".card");
  if (cardElement.parentNode === container && cardElement.nextSibling !== null) {
    container.insertBefore(forecastContainer, cardElement.nextSibling);
  } else {
    container.appendChild(forecastContainer);
  }
  displayForecastData(data);
}

function showWeatherData(data) {
  document.getElementById("name").innerText = data.cityName;
  document.getElementById("weather-icon").src =
    "http://openweathermap.org/img/w/" + data.icon + ".png";
  document.getElementById("temperature").innerText =
    "Temperature: " + data.temperature + "°C";
  document.getElementById("description").innerText =
    "Description: " + data.description;
  document.getElementById("humidity").innerText =
    "Humidity: " + data.humidity + "%";
  document.getElementById("pressure").innerText =
    "Pressure: " + data.pressure + " hPa";

  if (forecastTable) {
    forecastTable.remove();
  }

}
function displayForecastData(forecastData) {
  let forecastTable = document.getElementById("forecast-table");

  // create table header if it doesn't exist
  if (!forecastTable) {
    forecastTable = document.createElement("table");
    forecastTable.setAttribute("id", "forecast-table");

    const headerRow = forecastTable.insertRow(0);
    headerRow.style.backgroundColor = "grey";
    const headerCell1 = headerRow.insertCell(0);
    headerCell1.innerHTML = "Date";
    const headerCell2 = headerRow.insertCell(1);
    headerCell2.innerHTML = "Temperature";
    const headerCell3 = headerRow.insertCell(2);
    headerCell3.innerHTML = "Humidity";
    const headerCell4 = headerRow.insertCell(3);
    headerCell4.innerHTML = "Pressure";
    const headerCell5 = headerRow.insertCell(4);
    headerCell5.innerHTML = "Weather";
  }

  // update table rows
  const rows = forecastTable.rows;
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const data = forecastData[i - 1];
      if (data) {
        const cells = row.cells;
        cells[0].innerHTML = formatDate(data.date);
        cells[1].innerHTML = data.temperature + "°C";
        cells[2].innerHTML = data.humidity + "%";
        cells[3].innerHTML = data.pressure + " hPa";
        cells[4].querySelector("img").src =
          "http://openweathermap.org/img/w/" + data.icon + ".png";
        cells[4].querySelector("img").alt = data.description;
      }
    }
  }

  // add new rows if necessary
  if (forecastData.length > rows.length - 1) {
    for (let i = rows.length - 1; i < forecastData.length; i++) {
      const data = forecastData[i];
      const row = forecastTable.insertRow(-1);
      const cell1 = row.insertCell(0);
      cell1.innerHTML = formatDate(data.date);
      const cell2 = row.insertCell(1);
      cell2.innerHTML = data.temperature + "°C";
      const cell3 = row.insertCell(2);
      cell3.innerHTML = data.humidity + "%";
      const cell4 = row.insertCell(3);
      cell4.innerHTML = data.pressure + " hPa";
      const cell5 = row.insertCell(4);
      const weatherIcon = document.createElement("img");
      weatherIcon.src = "http://openweathermap.org/img/w/" + data.icon + ".png";
      weatherIcon.alt = data.description;
      const iconContainer = document.createElement("div");
      iconContainer.appendChild(weatherIcon);
      cell5.appendChild(iconContainer);
    }
  }

  const forecastDiv = document.createElement("div");
  forecastDiv.setAttribute("id", "forecast-data");
  forecastDiv.appendChild(forecastTable);

  // clear previous forecast data
  const previousForecastDiv = document.getElementById("forecast-data");
  if (previousForecastDiv) {
    previousForecastDiv.remove();
  }

  const mainContainer = document.querySelector(".container");
  mainContainer.appendChild(forecastDiv);

  return forecastTable;
}


// 

let hourlyChart = {};
let hourlyLabels = [];
 let hourlyTemps = [];
 let hourlyWeatherIcons = [];

function displayHourlyForecastData(data) {
  
  if (data && data.list) {

    
// Group hourly data by date
const hourlyDataByDate = data.list.reduce((acc, hour) => {
  const date = hour.dt_txt.split(" ")[0];
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(hour);
  return acc;
}, {});


const now = new Date();
const next24Hours = Array.from({ length: 24 }, (_, i) => {
  const nextHour = new Date(now);
  nextHour.setUTCHours(nextHour.getUTCHours() + i + 1);
  return nextHour.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" });
});


const filteredData = data.list.filter(hour => {
  const hourDateUTC = new Date(hour.dt * 1000);
  const hourDateIST = new Date(hourDateUTC.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hourDateISTString = hourDateIST.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" });
  return next24Hours.includes(hourDateISTString);
});




function getWeatherIcon(weatherCode) {
  if (weatherCode >= 200 && weatherCode <= 232) {
    return 'wi-thunderstorm';
  } else if (weatherCode >= 300 && weatherCode <= 321) {
    return 'wi-sprinkle';
  } else if (weatherCode >= 500 && weatherCode <= 531) {
    return 'wi-rain';
  } else if (weatherCode >= 600 && weatherCode <= 622) {
    return 'wi-snow';
  } else if (weatherCode >= 701 && weatherCode <= 781) {
    return 'wi-fog';
  } else if (weatherCode === 800) {
    return 'wi-day-sunny';
  } else if (weatherCode >= 801 && weatherCode <= 804) {
    return 'wi-cloudy';
  } else {
    return 'wi-day-cloudy';
  }
}


// updateHourlyChart(filteredData);

hourlyLabels = filteredData.map(hour => hour.dt_txt);
hourlyTemps = filteredData.map(hour => hour.main.temp);
hourlyWeatherIcons = filteredData.map(hour => getWeatherIcon(hour.weather[0].id));

// Update the chart with new data
function updateHourlyChart() {
  if (Chart.getChart("0") !== undefined) {
    Chart.getChart("0").destroy();
  }

  hourlyChart.data.labels = hourlyLabels;
  hourlyChart.data.datasets[0].data = hourlyTemps;
  hourlyChart.update();
}


  }
  
// Create the chart
const hourlyChart = new Chart(document.querySelector('#hourly-chart'), {
  type: 'line',
  data: {
    labels: hourlyLabels,
    datasets: [
      {
        label: 'Temperature',
        data: hourlyTemps,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'temperature-y-axis'
      },
      {
        label: 'Weather',
        data: hourlyTemps.map((temp, index) => {
          return {x: hourlyLabels[index], y: temp, icon: hourlyWeatherIcons[index]};
        }),
        pointStyle: 'weather-icon',
        pointRadius: 30,
        yAxisID: 'weather-y-axis'
      }
    ]
  },
  options: {
    scales: {
      'temperature-y-axis': {
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Temperature (°C)'
        }
      },
      'weather-y-axis': {
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === 'Weather') {
              return context.raw.icon;
            }
            return `${context.dataset.label}: ${context.formattedValue} °C`;
          }
        }
      }
    }
  }
});}

// Add CSS classes to the weather icons
const weatherIcons = document.querySelectorAll('.weather-icon');
weatherIcons.forEach(icon => {
  const iconData = hourlyWeatherIcons.find(data => data.id === icon.getAttribute('data-id'));
  if (iconData) {
    icon.classList.add(iconData.class);
  }
});





export {showForecastData , showWeatherData,displayHourlyForecastData}