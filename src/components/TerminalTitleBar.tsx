const TerminalTitleBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-terminal-block border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-terminal-error opacity-80" />
        <div className="w-3 h-3 rounded-full bg-terminal-warning opacity-80" />
        <div className="w-3 h-3 rounded-full bg-terminal-success opacity-80" />
      </div>
      <span className="text-muted-foreground text-xs tracking-wide flex items-center gap-2">
        <svg className="w-4 h-4" viewBox="0 0 76 65" fill="currentColor"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z"/></svg>
        portfolio — zsh
      </span>
      <div className="w-16" />
    </div>
  );
};

export default TerminalTitleBar;
