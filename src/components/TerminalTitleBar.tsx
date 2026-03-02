const TerminalTitleBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-terminal-block border-b border-border rounded-t-xl">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-terminal-error opacity-80" />
        <div className="w-3 h-3 rounded-full bg-terminal-warning opacity-80" />
        <div className="w-3 h-3 rounded-full bg-terminal-success opacity-80" />
      </div>
      <span className="text-muted-foreground text-xs tracking-wide">portfolio — zsh — 120×40</span>
      <div className="w-16" />
    </div>
  );
};

export default TerminalTitleBar;
