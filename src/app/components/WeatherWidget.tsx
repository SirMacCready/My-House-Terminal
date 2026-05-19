import { useState, useEffect } from "react";

type CurrentWeather = {
  temp: number | null;
  condition: string;
  icon: string;
};

type ForecastDay = {
  day: string;
  temp: number;
  icon: string;
};

type OpenWeatherCurrentResponse = {
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
};

type OpenWeatherForecastResponse = {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      main: string;
    }[];
  }[];
};

export function WeatherWidget() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>({
    temp: null,
    condition: "",
    icon: "",
  });
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiInput, setShowApiInput] = useState<boolean>(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("weatherApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiInput(true);
    }
  }, []);

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
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );
      const { latitude, longitude } = position.coords;

      // Fetch current weather
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
      );
      const currentWeatherData: OpenWeatherCurrentResponse =
        await currentWeatherResponse.json();

      if (currentWeatherResponse.ok) {
        setCurrentWeather({
          temp: Math.round(currentWeatherData.main.temp),
          condition: currentWeatherData.weather[0].main,
          icon: getWeatherIcon(currentWeatherData.weather[0].main),
        });
      } else {
        throw new Error(
          currentWeatherData.weather?.[0]?.main || "Unknown error",
        );
      }

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
      );
      const forecastData: OpenWeatherForecastResponse =
        await forecastResponse.json();

      if (forecastResponse.ok) {
        const dailyForecast = forecastData.list.filter(
          (_, index) => index % 8 === 0,
        );
        setForecast(
          dailyForecast.map((item) => ({
            day: new Date(item.dt * 1000)
              .toLocaleDateString("en-US", { weekday: "short" })
              .toUpperCase(),
            temp: Math.round(item.main.temp),
            icon: getWeatherIcon(item.weather[0].main),
          })),
        );
      } else {
        throw new Error("Failed to fetch forecast");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch weather data. Check your API key and location access.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("weatherApiKey", apiKey);
    setShowApiInput(false);
    fetchWeather();
  };

  const getWeatherIcon = (condition: string): string => {
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
      <div className="widget-border p-3 sm:p-4 h-full flex flex-col items-center justify-center">
        <h2 className="terminal-header text-lg sm:text-xl mb-3 sm:mb-4">
          ENTER_API_KEY<span className="cursor-blink">_</span>
        </h2>
        <form
          onSubmit={handleApiKeySubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="text"
            value={apiKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setApiKey(e.target.value)
            }
            placeholder="OpenWeatherMap API Key"
            className="p-2 mb-3 sm:mb-4 text-[var(--pipboy-green)] rounded border-2 border-green-500 border-solid w-full text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="bg-[var(--pipboy-green-dark)] text-white p-2 rounded w-full text-xs sm:text-sm"
          >
            SAVE_API_KEY
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="widget-border p-3 sm:p-4 h-full flex items-center justify-center">
        <div className="terminal-text text-xs sm:text-sm">
          LOADING_WEATHER...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="widget-border p-3 sm:p-4 h-full flex flex-col items-center justify-center">
        <div className="terminal-text mb-3 sm:mb-4 text-xs sm:text-sm text-center">
          {error}
        </div>
        <button
          onClick={() => setShowApiInput(true)}
          className="bg-gray-500 text-white p-2 rounded text-xs sm:text-sm"
        >
          CHANGE_API_KEY
        </button>
      </div>
    );
  }

  return (
    <div className="widget-border p-3 sm:p-4 h-full flex flex-col">
      <h2 className="terminal-header text-lg sm:text-xl mb-3 sm:mb-4">
        WEATHER_STATUS<span className="cursor-blink">_</span>
      </h2>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Weather Icon - Responsive sizing */}
        <div className="ascii-icon text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">
          {currentWeather.icon}
        </div>

        {/* Temperature - Responsive font size */}
        <div className="terminal-text text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2">
          {currentWeather.temp}°C
        </div>

        {/* Condition - Responsive font size */}
        <div className="terminal-text text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6">
          {currentWeather.condition}
        </div>

        {/* Divider - Only show on larger screens */}
        <div className="terminal-divider w-full hidden sm:block"></div>

        {/* Forecast - Grid responsive */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 mt-3 sm:mt-4 md:mt-6 w-full">
          {forecast.map((day, index) => (
            <div key={index} className="text-center">
              <div className="terminal-text text-xs sm:text-sm mb-1">
                {day.day}
              </div>
              <div className="ascii-icon text-xl sm:text-2xl mb-1">
                {day.icon}
              </div>
              <div className="terminal-text text-sm sm:text-base">
                {day.temp}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
