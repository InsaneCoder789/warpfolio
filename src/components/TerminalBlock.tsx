import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TerminalBlockProps {
  command: string;
  prompt?: string;
  children: ReactNode;
  delay?: number;
}

const TerminalBlock = ({ command, prompt = "~", children, delay = 0 }: TerminalBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group rounded-lg bg-terminal-block border border-border hover:bg-terminal-block-hover hover:terminal-border-glow transition-all duration-200 mb-3"
    >
      {/* Command header */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-1">
        <span className="text-terminal-prompt text-sm font-semibold">❯</span>
        <span className="text-muted-foreground text-xs">{prompt}</span>
        <span className="text-terminal-command text-sm font-medium">{command}</span>
      </div>
      {/* Output */}
      <div className="px-4 pb-3 pt-1 text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalBlock;
