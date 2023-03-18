import { API_KEY } from "../config/config.js";
const cities = [
  { name: "Delhi", id: 1261481 },
  { name: "Hyderabad", id: 1269843 },
  { name: "Chennai", id: 1264527 },
  { name: "Bangalore", id: 1277333 },
  { name: "Mumbai", id: 1275339 }
];

const updateCityWeather = (city, id) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const card = document.getElementById(city);
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      card.innerHTML = `
        <h2>${city}</h2>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="${desc}">
        <p>${desc}</p>
        <p>Temperature: ${temp}&deg;C</p>
      `;
    })
    .catch(error => console.log(error));
};

export const updateTopFiveCitiesWeather = () => {
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i].name;
    const id = cities[i].id;
    updateCityWeather(city, id);
  }
};

