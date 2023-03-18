// Earthquake Tab
const earthquakeTab = document.querySelector('.tablinks[href="#earthquake"]');
const earthquakeSection = document.querySelector('#earthquake-page');
const weatherSection = document.querySelector('#weather-page');
const airQualitySection = document.querySelector('#air-quality-page');

earthquakeTab.addEventListener('click', () => {
  // Show Earthquake section and hide other sections
  earthquakeSection.style.display = 'block';
  weatherSection.style.display = 'none';
  airQualitySection.style.display = 'none';

  // Set Earthquake tab as active and other tabs as inactive
  earthquakeTab.classList.add('active');
  weatherTab.classList.remove('active');
  airQualityTab.classList.remove('active');
});

// Earthquake Variables
const earthquakeSearchInput = document.querySelector('#earthquake-input');
const earthquakeSearchBtn = document.querySelector('#search-button');
const earthquakeDetails = document.querySelector('#earthquake-details');
const earthquakePrediction = document.querySelector('#earthquake-prediction');

// Get the most recent earthquake details for a given location
async function getEarthquakeDetails(location) {
    try {
        
        const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1&orderby=time&starttime=1900-01-01&endtime=${new Date().toISOString()}&place=${location}`);
        const data = await response.json();
    } catch (error) {
        console.error(error);
    }


  if (data.features.length === 0) {
    earthquakeDetails.innerHTML = '<p>No recent earthquake found for the given location.</p>';
    earthquakePrediction.innerHTML = '';
    return;
  }

  const earthquake = data.features[0];
  const magnitude = earthquake.properties.mag;
  const depth = earthquake.geometry.coordinates[2];
  let magnitudeType;

  if (magnitude < 2.5) {
    magnitudeType = 'Micro';
  } else if (magnitude < 4.5) {
    magnitudeType = 'Minor';
  } else if (magnitude < 6.0) {
    magnitudeType = 'Light';
  } else if (magnitude < 6.9) {
    magnitudeType = 'Moderate';
  } else if (magnitude < 7.9) {
    magnitudeType = 'Strong';
  } else {
    magnitudeType = 'Major';
  }

  earthquakeDetails.innerHTML = `
    <h2>Most Recent Earthquake Details</h2>
    <p>Location: ${earthquake.properties.place}</p>
    <p>Date and Time: ${new Date(earthquake.properties.time).toLocaleString()}</p>
    <p>Magnitude: ${magnitude} (${magnitudeType})</p>
    <p>Depth: ${depth} km</p>
  `;

  // Get the earthquake prediction for the given location
  const predictionResponse = await fetch(`https://api.predicthq.com/v1/events/?q=earthquake&limit=1&country=India&place=${location}`, {
    headers: {
      'Authorization': 'Bearer l1FJO8lwvIl0o9XAKXNCZQO2OdT0e2s623OywZRK'
    }
  });
  const predictionData = await predictionResponse.json();

  if (predictionData.count === 0) {
    earthquakePrediction.innerHTML = '<p>No earthquake prediction available for the given location.</p>';
    return;
  }

  const prediction = predictionData.results[0];
  const predictionMagnitude = prediction.rank;
  earthquakePrediction.innerHTML = `
    <h2>Earthquake Prediction</h2>
    <p>Date and Time: ${new Date(prediction.start).toLocaleString()}</p>
    <p>Magnitude: ${predictionMagnitude}</p>
  `;
}


earthquakeSearchBtn.addEventListener('click', () => {
    const location = earthquakeSearchInput.value;
    getEarthquakeDetails(location);
    });