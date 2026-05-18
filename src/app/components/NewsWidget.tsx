import React, { useState, useEffect } from "react";

export function NewsWidget() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);

  // Load saved API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("newsApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiInput(true);
    }
  }, []);

  // Fetch news when API key is available
  useEffect(() => {
    if (apiKey) {
      fetchNews();
    }
  }, [apiKey]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`,
      );
      const data = await response.json();

      if (data.status === "ok") {
        // Format the news data to match your UI
        const formattedNews = data.articles.slice(0, 8).map((article) => ({
          time: new Date(article.publishedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          headline: article.title.toUpperCase(),
        }));
        setNewsItems(formattedNews);
      } else {
        setError("Failed to fetch news: " + data.message);
      }
    } catch (err) {
      setError("Failed to fetch news. Check your API key and network.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("newsApiKey", apiKey);
    setShowApiInput(false);
    fetchNews();
  };

  // --- UI for API Key Input ---
  if (showApiInput) {
    return (
      <div className="widget-border p-4 h-full flex flex-col items-center justify-center">
        <h2 className="terminal-header text-xl mb-4">
          ENTER NEWS API KEY<span className="cursor-blink">_</span>
        </h2>
        <form
          onSubmit={handleApiKeySubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="NewsAPI Key"
            className="p-2 mb-4 text-[var(--pipboy-white)] rounded border-2 border-[var(--pipboy-green-dark)] w-full"
          />
          <button
            type="submit"
            className="bg-[var(--pipboy-green-dark)] text-[var(--pipboy-white)] p-2 rounded w-full"
          >
            SAVE_API_KEY
          </button>
        </form>
      </div>
    );
  }

  // --- Loading State ---
  if (loading) {
    return (
      <div className="widget-border p-4 h-full flex items-center justify-center">
        <div className="terminal-text">LOADING_NEWS...</div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="widget-border p-4 h-full flex flex-col items-center justify-center">
        <div className="terminal-text mb-4">{error}</div>
        <button
          onClick={() => setShowApiInput(true)}
          className="bg-gray-500 text-white p-2 rounded"
        >
          CHANGE_API_KEY
        </button>
      </div>
    );
  }

  // --- News Feed UI ---
  return (
    <div className="widget-border p-4 h-full flex flex-col">
      <h2 className="terminal-header text-xl mb-4">
        NEWS_FEED<span className="cursor-blink">_</span>
      </h2>

      <div className="flex-1 overflow-y-auto terminal-scrollbar space-y-2">
        {newsItems.map((item, index) => (
          <div key={index} className="terminal-text text-sm">
            <span className="text-[#008000]">[{item.time}]</span>{" "}
            {item.headline}
          </div>
        ))}
      </div>
    </div>
  );
}
