import { useState, useEffect } from "react";

type NewsItem = {
  time: string;
  headline: string;
};

type NewsApiArticle = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
};

export function NewsWidget() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiInput, setShowApiInput] = useState<boolean>(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("newsApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiInput(true);
    }
  }, []);

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
      const data: NewsApiResponse = await response.json();

      if (data.status === "ok") {
        const formattedNews: NewsItem[] = data.articles
          .slice(0, 8)
          .map((article: NewsApiArticle) => ({
            time: new Date(article.publishedAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            headline: article.title.toUpperCase(),
          }));
        setNewsItems(formattedNews);
      } else {
        setError(
          "Failed to fetch news: " + (data as { message?: string }).message,
        );
      }
    } catch (err) {
      setError("Failed to fetch news. Check your API key and network.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("newsApiKey", apiKey);
    setShowApiInput(false);
    fetchNews();
  };

  if (showApiInput) {
    return (
      <div className="widget-border p-3 sm:p-4 h-full flex flex-col items-center justify-center">
        <h2 className="terminal-header text-lg sm:text-xl mb-3 sm:mb-4">
          ENTER_NEWS_API_KEY<span className="cursor-blink">_</span>
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
            className="p-2 mb-3 sm:mb-4 text-[var(--pipboy-white)] rounded border-2 border-[var(--pipboy-green-dark)] w-full text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="bg-[var(--pipboy-green-dark)] text-[var(--pipboy-white)] p-2 rounded w-full text-xs sm:text-sm"
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
        <div className="terminal-text text-xs sm:text-sm">LOADING_NEWS...</div>
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
        NEWS_FEED<span className="cursor-blink">_</span>
      </h2>

      {/* Add flex-1 and overflow-y-auto to the news list container */}
      <div className="flex-1 overflow-y-auto terminal-scrollbar space-y-1 sm:space-y-2">
        {newsItems.length > 0 ? (
          newsItems.map((item, index) => (
            <div
              key={index}
              className="terminal-text text-xs sm:text-sm p-2 border border-[var(--pipboy-green-dark)] rounded"
            >
              <span className="text-[#008000]">[{item.time}]</span>{" "}
              {item.headline}
            </div>
          ))
        ) : (
          <div className="terminal-text text-center py-3 sm:py-4 text-xs sm:text-sm">
            NO_NEWS_ITEMS
          </div>
        )}
      </div>
    </div>
  );
}
