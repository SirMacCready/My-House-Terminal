import { useState } from "react";
import { ToDoWidget } from "./components/ToDoWidget";
import { WeatherWidget } from "./components/WeatherWidget";
import { NewsWidget } from "./components/NewsWidget";
import { StatusBar } from "./components/StatusBar";
import { PowerButton } from "./components/PowerButton";
import { BootScreen } from "./components/BootScreen";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  if (!isBooted) {
    return <BootScreen onBootComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="w-full min-h-screen bg-black p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
      <div className="crt-screen w-full max-w-7xl h-[90vh] sm:h-[95vh] flex flex-col relative">
        {/* CRT Effects */}
        <div className="scanlines"></div>
        <div className="vignette"></div>
        <div className="static-noise"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full screen-flicker">
          {/* Header */}
          <div className="p-3 sm:p-4 md:p-6 border-b border-[#00ff41] flex items-center justify-between">
            <h1 className="terminal-header text-lg sm:text-2xl md:text-3xl lg:text-4xl glitch truncate">
              HOUSE TERMINAL
            </h1>
            <PowerButton />
          </div>

          {/* Main Dashboard - THIS IS THE KEY FIX */}
          <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-6 overflow-y-auto">
            {" "}
            {/* Added overflow-y-auto here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 min-h-full">
              {/* Widgets - Each has its own scrollable area */}
              <div className="h-full min-h-[250px]">
                <ToDoWidget />
              </div>
              <div className="h-full min-h-[300px] order-first sm:order-none">
                <WeatherWidget />
              </div>
              <div className="h-full min-h-[250px]">
                <NewsWidget />
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <StatusBar />
        </div>
      </div>
    </div>
  );
}
