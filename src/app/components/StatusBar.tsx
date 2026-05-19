import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="status-bar text-xs sm:text-sm p-2 sm:p-3 border-t border-[var(--pipboy-green-dark)]">
      {isMobile ? (
        <>
          <span>HOUSE TERMINAL | </span>
          <span className="toggle-on">ONLINE</span>
          <div className="mt-1">
            {formatDate(time)} | {formatTime(time)}
          </div>
        </>
      ) : (
        <>
          HOUSE TERMINAL | {formatDate(time)} | {formatTime(time)} |{" "}
          <span className="toggle-on">ONLINE</span>
        </>
      )}
    </div>
  );
}
