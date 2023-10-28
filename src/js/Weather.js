import getAPIData from "./GetAPIData.js"
import fullWeather from "./WeatherFunc.js"
getAPIData().then(data => {
    fullWeather(data)
  })
  .catch(error => {
    console.error("Error: ", error);
  })