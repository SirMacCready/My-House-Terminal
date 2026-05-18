import { useState } from "react";
import { DeviceWidget } from "./components/DeviceWidget";
import { WeatherWidget } from "./components/WeatherWidget";
import { NewsWidget } from "./components/NewsWidget";
import { StatusBar } from "./components/StatusBar";
import { PowerButton } from "./components/PowerButton";
import { TerminalCLI } from "./components/TerminalCLI";
import { BootScreen } from "./components/BootScreen";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  if (!isBooted) {
    return <BootScreen onBootComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="w-full min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
      <div className="crt-screen w-full max-w-7xl h-[95vh] flex flex-col relative">
        {/* CRT Effects */}
        <div className="scanlines"></div>
        <div className="vignette"></div>
        <div className="static-noise"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full screen-flicker">
          {/* Header with Power Button */}
          <div className="p-4 md:p-6 border-b border-[#00ff41] flex items-center justify-between">
            <h1 className="terminal-header text-2xl md:text-4xl glitch">
              HOUSE TERMINAL
            </h1>
            <PowerButton />
          </div>

          {/* Main Dashboard Grid */}
          <div className="flex-1 p-4 md:p-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-full">
              {/* Left Column - Device Controls */}
              <div className="h-full min-h-[300px] md:min-h-0">
                <DeviceWidget />
              </div>

              {/* Center Column - Weather */}
              <div className="h-full min-h-[400px] md:min-h-0">
                <WeatherWidget />
              </div>

              {/* Right Column - News Feed */}
              <div className="h-full min-h-[300px] md:min-h-0">
                <NewsWidget />
              </div>
            </div>
          </div>

          {/* Terminal Input */}
          <TerminalCLI />

          {/* Status Bar */}
          <StatusBar />
        </div>
      </div>
    </div>
  );
}
