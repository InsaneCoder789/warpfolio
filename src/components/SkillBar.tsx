import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

const SkillBar = ({ name, level, delay = 0 }: SkillBarProps) => {
  const blocks = 15;
  const filled = Math.round((level / 100) * blocks);

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-xs min-w-0">
      <span className="w-16 sm:w-20 md:w-28 text-terminal-output text-right shrink-0 truncate text-[10px] sm:text-xs">{name}</span>
      <div className="flex gap-px shrink-0">
        {Array.from({ length: blocks }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.05, delay: delay + i * 0.03 }}
            className={`w-1.5 sm:w-2 md:w-2.5 h-3.5 sm:h-4 rounded-[1px] ${
              i < filled ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>
      <span className="text-muted-foreground w-8 sm:w-10 shrink-0 text-[10px] sm:text-xs">{level}%</span>
    </div>
  );
};

export default SkillBar;
