import loadWebsite from  "./TypeWrite.js"
import getAPIData from "./GetAPIData.js";
import { weatherIndex } from "./WeatherFunc.js";
import getNewsData from "./GetNewsData.js";

// Create a function to format time
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Create a function to update the clock
function updateClock() {
  const date = new Date();
  const hour = formatTime(date.getHours());
  const min = formatTime(date.getMinutes());
  const sec = formatTime(date.getSeconds());
  const clockElement = document.querySelector(".clock"); // Use querySelector for better selection

  clockElement.innerHTML = `${hour} : ${min} : ${sec}`;

  setTimeout(updateClock, 1000); // Recursively call the function after 1 second
}

// Initialize the clock
updateClock();


getAPIData()
  .then(data => {
    return weatherIndex(data);
  })
  .then(data => {
    loadWebsite();
  })
  .catch(error => {
    console.error("Error: ", error);
  });
getNewsData()
  .then(data => {
    const hasAttentat = data.articles.some(article => article.title.includes("attentat"));

    if (hasAttentat) {
      $('#news').text("Terrorist Attack reported.");
    } else {
      $('#news').text("No terrorist attack.");
    }
  })
  .then(data => {
    loadWebsite();
  })
  .catch(error => {
    console.error("Error: ", error);
  });