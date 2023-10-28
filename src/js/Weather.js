// Import the getAPIData function from the GetAPIData.js file
import getAPIData from "./GetAPIData.js";

// Import the fullWeather function from the WeatherFunc.js file
import fullWeather from "./WeatherFunc.js";

// Call getAPIData to fetch data and then perform the fullWeather function
getAPIData()
  .then(data => {
    fullWeather(data); // Call the fullWeather function with the retrieved data
  })
  .catch(error => {
    console.error("Error: ", error);
  });
