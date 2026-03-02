import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

const SkillBar = ({ name, level, delay = 0 }: SkillBarProps) => {
  const blocks = 20;
  const filled = Math.round((level / 100) * blocks);

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-28 text-terminal-output text-right shrink-0">{name}</span>
      <div className="flex gap-px">
        {Array.from({ length: blocks }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.05, delay: delay + i * 0.03 }}
            className={`w-2.5 h-4 rounded-[1px] ${
              i < filled ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>
      <span className="text-muted-foreground w-10">{level}%</span>
    </div>
  );
};

export default SkillBar;
