import { useState } from "react";

export function TerminalCLI() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle command input
    console.log("Command:", input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-[#00ff41]">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="> ENTER COMMAND..."
        className="terminal-input w-full"
      />
    </form>
  );
}
