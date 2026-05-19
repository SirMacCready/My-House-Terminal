import { useEffect, useState } from "react";

interface BootScreenProps {
  onBootComplete: () => void;
}

export function BootScreen({ onBootComplete }: BootScreenProps) {
  const [bootProgress, setBootProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const bootMessages = [
    "> INITIALIZING HOUSE TERMINAL...",
    "> LOADING SYSTEM MODULES...",
    "> CONNECTING TO DEVICES...",
    "> ESTABLISHING NETWORK CONNECTION...",
    "> CHECKING SECURITY PROTOCOLS...",
    "> SYNCING WEATHER DATA...",
    "> LOADING NEWS FEED...",
    "> SYSTEM READY.",
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < bootMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 300); // Faster on mobile

    const progressInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(() => onBootComplete(), 500);
          return 100;
        }
        return prev + (window.innerWidth < 768 ? 3 : 2); // Faster progress on mobile
      });
    }, 40); // Faster updates on mobile

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onBootComplete]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-xl sm:max-w-2xl p-4 sm:p-6 md:p-8">
        <div className="terminal-header text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-center">
          HOUSE TERMINAL
        </div>

        <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
          {bootMessages.slice(0, currentMessage + 1).map((message, index) => (
            <div key={index} className="terminal-text text-xs sm:text-sm">
              {message}
              {index === currentMessage && (
                <span className="cursor-blink">_</span>
              )}
            </div>
          ))}
        </div>

        <div className="widget-border p-3 sm:p-4">
          <div className="terminal-text text-xs sm:text-sm mb-2">
            LOADING: {bootProgress}%
          </div>
          <div className="w-full bg-black border border-[#008000] h-4 sm:h-6">
            <div
              className="h-full bg-[#00ff41] transition-all duration-100"
              style={{
                width: `${bootProgress}%`,
                boxShadow: "0 0 10px #00ff41",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
