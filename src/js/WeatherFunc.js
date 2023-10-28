// Function to display weather information for the current day
export function weatherIndex(data) {
  let maxTemp0  = data["daily"]["temperature_2m_max"][0];
  let minTemp0  = data["daily"]["temperature_2m_min"][0];
  let willRain0 = data["daily"]["precipitation_probability_max"][0];
  let maxtemp = "🌡 Max temp : " + maxTemp0;
  let willRain;
  let mintemp = "❄ Min temp : " + minTemp0;
  
  // Determine if it will rain based on the precipitation probability
  if (willRain0 >= 75) 
    willRain = "🌧 : will rain today";
  else 
    willRain = "will not rain today";
    
  // Display the weather information in specific HTML elements
  $('#MaxTemp').text(maxtemp);
  $('#MinTemp').text(mintemp);
  $('#IsRaining').text(willRain);
}

// Function to display full weekly weather information
export default function fullWeather(data) {
  try {
    const dailyMaxTemp = data["daily"]["temperature_2m_max"];
    const dailyMinTemp = data["daily"]["temperature_2m_min"];
    const dailyRain = data["daily"]["precipitation_probability_max"];

    // Function to update weather information for a specific day
    const updateWeatherInfo = (day, maxTemp, minTemp, rain) => {
      document.getElementById(day).innerHTML = `${day} : <br> Max temp : ${maxTemp} <br> Min temp : ${minTemp} <br> Rain : ${rain} %`;
    };

    // Display weather information for the current day
    document.getElementById("today").innerHTML = `Today: <br> temp : ${data["current"]["temperature_2m"]} <br> Rain : ${dailyRain[0]} % <br> cloud: ${data["current"]["cloudcover"]}%`;

    // Loop through the next 6 days to display their weather information
    for (let day = 2; day <= 7; day++) {
      updateWeatherInfo(`Day${day}`, dailyMaxTemp[day - 1], dailyMinTemp[day - 1], dailyRain[day - 1]);
    }
  } catch (error) {
    console.log("ERROR");
  }
}
