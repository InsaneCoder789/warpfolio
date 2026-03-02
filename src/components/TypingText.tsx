import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingText = ({ text, speed = 40, delay = 0, className = "", onComplete }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [displayed, started, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-2 h-4 bg-terminal-cursor animate-blink ml-0.5 align-middle" />
      )}
    </span>
  );
};

export default TypingText;
