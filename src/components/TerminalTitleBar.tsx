import { Shield, Skull } from "lucide-react";

const TerminalTitleBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-terminal-block border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-terminal-error opacity-80" />
        <div className="w-3 h-3 rounded-full bg-terminal-warning opacity-80" />
        <div className="w-3 h-3 rounded-full bg-terminal-success opacity-80" />
      </div>
      <span className="text-muted-foreground text-xs tracking-wide flex items-center gap-2">
        <Skull className="w-4 h-4 text-primary" />
        <span className="text-primary font-semibold">root@kali</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-primary">~/portfolio</span>
        <Shield className="w-3 h-3 text-terminal-success ml-2" />
      </span>
      <div className="w-16" />
    </div>
  );
};

export default TerminalTitleBar;
