import { useState } from "react";
import { Power } from "lucide-react";

export function PowerButton() {
  const [isOn, setIsOn] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handlePowerClick = () => {
    setIsClosing(true);
    setIsOn(false);

    // Try to close the tab
    try {
      window.close();
    } catch (e) {
      // If close() fails (main tab), do nothing
    }

    // Reset state after a delay if tab didn't close
    setTimeout(() => {
      if (!window.closed) {
        setIsClosing(false);
        setIsOn(true);
      }
    }, 1000);
  };

  return (
    <button
      className={`
        power-button
        ${isOn ? "text-[var(--pipboy-green)]" : "text-red-500"}
        ${isClosing ? "animate-pulse" : ""}
        hover:text-[var(--pipboy-green-dark)]
        transition-all duration-200
        p-1 sm:p-2 rounded
        border border-[var(--pipboy-green-dark)]
      `}
      onClick={handlePowerClick}
      aria-label={isOn ? "Power off - Close terminal" : "Powering down..."}
      title={isOn ? "Close this terminal" : "Powering down..."}
      disabled={isClosing}
    >
      <Power size={16} className="sm:size-20" />
    </button>
  );
}
