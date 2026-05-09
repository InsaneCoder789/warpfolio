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
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group relative rounded-lg bg-terminal-block/70 backdrop-blur-sm border border-border hover:border-primary/40 hover:terminal-border-glow transition-all duration-300 mb-3 overflow-hidden"
    >
      {/* subtle accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
      {/* Kali-style command header */}
      <div className="px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1.5">
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
      <div className="mx-3 sm:mx-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      {/* Output */}
      <div className="px-3 sm:px-4 pb-3 pt-2.5 text-xs sm:text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalBlock;
