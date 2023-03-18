// UV Index Variables
const uvIndexContainer = document.querySelector('#uv-index .uv-index-container');
const uvIndexValue = document.querySelector('#uv-index .uv-index-value');


async function getLatLong(city) {
    const apiKey = '8310d069de4641deaee9f1012b5ac552';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length === 0) {
        throw new Error('No results found');
      }
      const { lat, lng } = data.results[0].geometry;
      getUVIndex(lat, lng);
      return { lat, lng };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  


// Get the UV index for a given location
async function getUVIndex(lat, lon) {
  try {
    const apiKey = '586acc6c65de0c26c004bd1b2f58d914';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await response.json();

    uvIndexValue.textContent = data.value.toFixed(1);
    uvIndexContainer.style.display = 'block';
  } catch (error) {
    uvIndexValue.textContent = 'Error';
    uvIndexContainer.style.display = 'block';
    console.error(error);
  }
}

// Call the getUVIndex function with latitude and longitude values
//getUVIndex(37.7749, -122.4194); // example location: San Francisco, CA



  

// Call the getUVIndex function with latitude and longitude values
// getUVIndex(37.7749, -122.4194); // example location: San Francisco, CA


export function showUVIndex(city) {
    getLatLong(city);
  }
  