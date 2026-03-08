import { motion } from "framer-motion";

const TECH_ITEMS = [
  { label: "Python", logo: "/logos/python.svg" },
  { label: "TypeScript", logo: "/logos/typescript.svg" },
  { label: "JavaScript", logo: "/logos/javascript.svg" },
  { label: "Kotlin", logo: "/logos/kotlin.svg" },
  { label: "Dart", logo: "/logos/dart.svg" },
  { label: "Flutter", logo: "/logos/flutter.svg" },
  { label: "React", logo: "/logos/react.svg" },
  { label: "HTML", logo: "/logos/html.svg" },
  { label: "CSS", logo: "/logos/css.svg" },
  { label: "Firebase", logo: "/logos/firebase.svg" },
  { label: "Git", logo: "/logos/git.svg" },
  { label: "Linux", logo: "/logos/linux.svg" },
  { label: "MySQL", logo: "/logos/mysql.svg" },
];

const TechLogosSection = ({ delay = 1.4 }: { delay?: number }) => {
  return (
    <div className="mt-1">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-primary text-xs font-semibold terminal-glow">
          ▸ Technologies detected across repositories:
        </span>
        <span className="text-muted-foreground text-[10px]">
          ({TECH_ITEMS.length} found)
        </span>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent pb-2 -mx-1">
        <div className="flex gap-3 sm:gap-5 min-w-max px-1">
          {TECH_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delay + i * 0.05 }}
              className="flex flex-col items-center gap-1 sm:gap-1.5 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md border border-border bg-terminal-block/50 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-200">
                <img
                  src={item.logo}
                  alt={item.label}
                  className="w-5 h-5 sm:w-6 sm:h-6 opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechLogosSection;
