import { Shield, Skull } from "lucide-react";

const TerminalTitleBar = () => {
  return (
    <div className="flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-2.5 bg-terminal-block border-b border-border">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-error opacity-80" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-warning opacity-80" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-success opacity-80" />
      </div>
      <span className="text-muted-foreground text-[10px] sm:text-xs tracking-wide flex items-center gap-1.5 sm:gap-2">
        <Skull className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
        <span className="text-primary font-semibold">root@kali</span>
        <span className="text-muted-foreground hidden sm:inline">:</span>
        <span className="text-primary hidden sm:inline">~/portfolio</span>
        <Shield className="w-3 h-3 text-terminal-success ml-1 sm:ml-2" />
      </span>
      <div className="w-8 sm:w-16" />
    </div>
  );
};

export default TerminalTitleBar;
