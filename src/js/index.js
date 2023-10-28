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
    let randomIndex = Math.floor(Math.random() * data.articles.length);
    let article = data.articles[randomIndex];
    
    // Set the text of #news to the article title
    $('#news').text(article.title);
    
    // Create an anchor element and set its href and text properties
    let link = $('<a>')
        .attr('href', article.url)
        .text('Link to article');
    
    // Append the anchor element to #news
    $('.newslinks').append(link);
    
  })
  .then(data => {
    loadWebsite();
  })
  .catch(error => {
    console.error("Error: ", error);
  });