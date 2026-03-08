import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface CommandInputProps {
  onCommand: (cmd: string) => void;
}

const COMMANDS: Record<string, string> = {
  help: "Available commands: about, projects, skills, contact, clear, whoami, uname, help",
  about: "Scrolling to about section...",
  projects: "Scrolling to projects section...",
  skills: "Scrolling to skills section...",
  contact: "Scrolling to contact section...",
  whoami: "root",
  uname: "Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
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
      const cmd = input.trim().toLowerCase().slice(0, 50);
      // Only allow known commands — prevent injection
      const safeCmd = cmd.replace(/[^a-z0-9\-_ ]/g, "");
      if (safeCmd === "clear") {
        setHistory([]);
      } else {
        const output = COMMANDS[safeCmd] || `bash: ${safeCmd}: command not found. Type 'help' for available commands.`;
        setHistory((h) => [...h.slice(-20), { cmd: safeCmd, output }]);
      }
      onCommand(safeCmd);
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
        <div key={i} className="mb-2 animate-fade-in-up">
          <div className="text-xs">
            <span className="text-terminal-prompt">┌──(</span>
            <span className="text-primary font-bold">root㉿kali</span>
            <span className="text-terminal-prompt">)-[</span>
            <span className="text-foreground">~</span>
            <span className="text-terminal-prompt">]</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-terminal-prompt">└─$</span>
            <span className="text-terminal-command ml-1">{h.cmd}</span>
          </div>
          {h.output && <div className="text-terminal-output text-xs pl-5 mt-0.5">{h.output}</div>}
        </div>
      ))}
      {/* Active prompt */}
      <div>
        <div className="text-xs">
          <span className="text-terminal-prompt">┌──(</span>
          <span className="text-primary font-bold">root㉿kali</span>
          <span className="text-terminal-prompt">)-[</span>
          <span className="text-foreground">~</span>
          <span className="text-terminal-prompt">]</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-terminal-prompt">└─$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-terminal-command caret-terminal-cursor text-sm ml-1"
            spellCheck={false}
            autoComplete="off"
            placeholder="type 'help' for commands..."
          />
        </div>
      </div>
    </div>
  );
};

export default CommandInput;
