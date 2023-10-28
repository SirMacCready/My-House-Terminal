export function weatherIndex(data) {
    let maxTemp0  = data["daily"]["temperature_2m_max"][0]
    let minTemp0  = data["daily"]["temperature_2m_min"][0]
    let willRain0 = data["daily"]["precipitation_probability_max"][0]
    let maxtemp = "🌡 Max temp : " + maxTemp0
    let willRain
    let mintemp = "❄ Min temp : " + minTemp0
    if (willRain0 >= 75) 
      willRain = "🌧 : will rain today"
    else 
      willRain = "will not rain today"
    $('#MaxTemp').text(maxtemp);
    $('#MinTemp').text(mintemp);
    $('#IsRaining').text(willRain);
  }
export default function fullWeather(data) {
  try {
    const dailyMaxTemp = data["daily"]["temperature_2m_max"];
    const dailyMinTemp = data["daily"]["temperature_2m_min"];
    const dailyRain = data["daily"]["precipitation_probability_max"];

    const updateWeatherInfo = (day, maxTemp, minTemp, rain) => {
      document.getElementById(day).innerHTML = `${day} : <br> Max temp : ${maxTemp} <br> Min temp : ${minTemp} <br> Rain : ${rain} %`;
    };

    document.getElementById("today").innerHTML = `Today: <br> temp : ${data["current"]["temperature_2m"]} <br> Rain : ${dailyRain[0]} % <br> cloud: ${data["current"]["cloudcover"]}%`;

    for (let day = 2; day <= 7; day++) {
      updateWeatherInfo(`Day${day}`, dailyMaxTemp[day - 1], dailyMinTemp[day - 1], dailyRain[day - 1]);
    }
  } catch (error) {
    console.log("ERROR");
  }
}
