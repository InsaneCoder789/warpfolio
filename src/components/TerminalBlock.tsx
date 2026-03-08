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
      className="group rounded-lg bg-terminal-block/70 backdrop-blur-sm border border-border hover:bg-terminal-block-hover/80 hover:terminal-border-glow transition-all duration-200 mb-3"
    >
      {/* Kali-style command header */}
      <div className="px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1">
        <div className="flex items-center gap-0 text-[10px] sm:text-xs">
          <span className="text-terminal-prompt">┌──(</span>
          <span className="text-primary font-bold">root㉿kali</span>
          <span className="text-terminal-prompt">)-[</span>
          <span className="text-foreground font-semibold">{prompt}</span>
          <span className="text-terminal-prompt">]</span>
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <span className="text-terminal-prompt">└─$</span>
          <span className="text-terminal-command font-medium ml-1 break-all">{command}</span>
        </div>
      </div>
      {/* Output */}
      <div className="px-3 sm:px-4 pb-3 pt-1 text-xs sm:text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalBlock;
