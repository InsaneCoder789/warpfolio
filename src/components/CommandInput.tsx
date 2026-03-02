import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface CommandInputProps {
  onCommand: (cmd: string) => void;
}

const COMMANDS: Record<string, string> = {
  help: "Available commands: about, projects, skills, contact, clear, help",
  about: "Scrolling to about section...",
  projects: "Scrolling to projects section...",
  skills: "Scrolling to skills section...",
  contact: "Scrolling to contact section...",
  clear: "",
};

const CommandInput = ({ onCommand }: CommandInputProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim().toLowerCase();
      if (cmd === "clear") {
        setHistory([]);
      } else {
        const output = COMMANDS[cmd] || `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
        setHistory((h) => [...h, { cmd: input.trim(), output }]);
      }
      onCommand(cmd);
      setInput("");
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={containerRef}
      className="rounded-lg bg-terminal-block border border-border p-4 mt-3 max-h-48 overflow-y-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((h, i) => (
        <div key={i} className="mb-1 animate-fade-in-up">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-terminal-prompt font-semibold">❯</span>
            <span className="text-terminal-command">{h.cmd}</span>
          </div>
          {h.output && <div className="text-terminal-output text-xs pl-5 mt-0.5">{h.output}</div>}
        </div>
      ))}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-terminal-prompt font-semibold">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-terminal-command caret-terminal-cursor text-sm"
          spellCheck={false}
          autoComplete="off"
          placeholder="type 'help' for commands..."
        />
      </div>
    </div>
  );
};

export default CommandInput;
