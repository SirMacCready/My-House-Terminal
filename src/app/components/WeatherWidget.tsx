import React, { useState, useEffect } from "react";

export function WeatherWidget() {
  const [currentWeather, setCurrentWeather] = useState({
    temp: null,
    condition: "",
    icon: "",
  });
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);

  // Load saved API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("weatherApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiInput(true);
    }
  }, []);

  // Fetch weather data
  useEffect(() => {
    if (apiKey) {
      fetchWeather();
    }
  }, [apiKey]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get user location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;

      // Fetch current weather
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
      );
      const currentWeatherData = await currentWeatherResponse.json();
      setCurrentWeather({
        temp: Math.round(currentWeatherData.main.temp),
        condition: currentWeatherData.weather[0].main,
        icon: getWeatherIcon(currentWeatherData.weather[0].main),
      });

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
      );
      const forecastData = await forecastResponse.json();
      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0,
      ); // One forecast per day
      setForecast(
        dailyForecast.map((item) => ({
          day: new Date(item.dt * 1000)
            .toLocaleDateString("en-US", { weekday: "short" })
            .toUpperCase(),
          temp: Math.round(item.main.temp),
          icon: getWeatherIcon(item.weather[0].main),
        })),
      );
    } catch (err) {
      setError(
        "Failed to fetch weather data. Check your API key and location access.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save API key to localStorage
  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("weatherApiKey", apiKey);
    setShowApiInput(false);
    fetchWeather();
  };

  // Helper function to map weather conditions to icons
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "☀";
      case "clouds":
        return "☁";
      case "rain":
        return "🌧";
      case "snow":
        return "❄";
      case "thunderstorm":
        return "⛈";
      default:
        return "🌦";
    }
  };

  if (showApiInput) {
    return (
      <div className="widget-border p-4 h-full flex flex-col items-center justify-center">
        <h2 className="terminal-header text-xl mb-4">Enter API Key</h2>
        <form
          onSubmit={handleApiKeySubmit}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="OpenWeatherMap API Key"
            className="p-2 mb-4 text-[var(--pipboy-green)] rounded border-2 border-green-500 border-solid"
          />
          <button
            type="submit"
            className="bg-[var(--pipboy-green-dark)] text-white p-2 rounded"
          >
            Save API Key
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="widget-border p-4 h-full flex items-center justify-center">
        Loading weather data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="widget-border p-4 h-full flex flex-col items-center justify-center">
        <div>{error}</div>
        <button
          onClick={() => setShowApiInput(true)}
          className="mt-4 bg-gray-500 text-white p-2 rounded"
        >
          Change API Key
        </button>
      </div>
    );
  }

  return (
    <div className="widget-border p-4 h-full flex flex-col">
      <h2 className="terminal-header text-xl mb-4">
        WEATHER_STATUS<span className="cursor-blink">_</span>
      </h2>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="ascii-icon text-6xl mb-4">{currentWeather.icon}</div>
        <div className="terminal-text text-5xl mb-2">
          {currentWeather.temp}°C
        </div>
        <div className="terminal-text text-lg mb-6">
          {currentWeather.condition}
        </div>

        <div className="terminal-divider w-full"></div>

        <div className="grid grid-cols-3 gap-4 mt-6 w-full">
          {forecast.map((day, index) => (
            <div key={index} className="text-center">
              <div className="terminal-text text-sm mb-2">{day.day}</div>
              <div className="ascii-icon text-2xl mb-2">{day.icon}</div>
              <div className="terminal-text text-lg">{day.temp}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
