import { motion } from "framer-motion";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { useMemo } from "react";

const LANG_ICONS: Record<string, { ascii: string; label: string }> = {
  Python: {
    label: "Python",
    ascii: `  ╔══╗
  ║Py║
  ╚══╝`,
  },
  TypeScript: {
    label: "TypeScript",
    ascii: `  ╔══╗
  ║TS║
  ╚══╝`,
  },
  JavaScript: {
    label: "JavaScript",
    ascii: `  ╔══╗
  ║JS║
  ╚══╝`,
  },
  Kotlin: {
    label: "Kotlin",
    ascii: `  ╔══╗
  ║Kt║
  ╚══╝`,
  },
  Dart: {
    label: "Dart",
    ascii: `  ╔══╗
  ║Da║
  ╚══╝`,
  },
  HTML: {
    label: "HTML",
    ascii: `  ╔════╗
  ║HTML║
  ╚════╝`,
  },
  CSS: {
    label: "CSS",
    ascii: `  ╔═══╗
  ║CSS║
  ╚═══╝`,
  },
  Tcl: {
    label: "Tkinter",
    ascii: `  ╔══╗
  ║Tk║
  ╚══╝`,
  },
  Shell: {
    label: "Shell",
    ascii: `  ╔══╗
  ║Sh║
  ╚══╝`,
  },
  Java: {
    label: "Java",
    ascii: `  ╔════╗
  ║Java║
  ╚════╝`,
  },
  C: {
    label: "C",
    ascii: `  ╔══╗
  ║ C║
  ╚══╝`,
  },
  "C++": {
    label: "C++",
    ascii: `  ╔═══╗
  ║C++║
  ╚═══╝`,
  },
};

// Extra known tools/frameworks to always show
const EXTRA_TECH = ["Flutter", "Firebase", "React", "Git", "Linux", "MySQL"];

const EXTRA_ICONS: Record<string, { ascii: string; label: string }> = {
  Flutter: {
    label: "Flutter",
    ascii: `  ╔══╗
  ║Fl║
  ╚══╝`,
  },
  Firebase: {
    label: "Firebase",
    ascii: `  ╔══╗
  ║Fb║
  ╚══╝`,
  },
  React: {
    label: "React",
    ascii: `  ╔══╗
  ║Re║
  ╚══╝`,
  },
  Git: {
    label: "Git",
    ascii: `  ╔═══╗
  ║Git║
  ╚═══╝`,
  },
  Linux: {
    label: "Linux",
    ascii: `  ╔══╗
  ║Lx║
  ╚══╝`,
  },
  MySQL: {
    label: "MySQL",
    ascii: `  ╔═══╗
  ║SQL║
  ╚═══╝`,
  },
};

const TechLogosSection = ({ delay = 1.4 }: { delay?: number }) => {
  const { data: repos } = useGithubRepos();

  const allLangs = useMemo(() => {
    const langSet = new Set<string>();
    repos?.forEach((repo) => {
      if (repo.language) langSet.add(repo.language);
    });
    // Add extra tech
    EXTRA_TECH.forEach((t) => langSet.add(t));
    return Array.from(langSet);
  }, [repos]);

  const items = useMemo(() => {
    return allLangs
      .map((lang) => LANG_ICONS[lang] || EXTRA_ICONS[lang])
      .filter(Boolean);
  }, [allLangs]);

  return (
    <div className="mt-1">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-primary text-xs font-semibold terminal-glow">
          ▸ Technologies detected across repositories:
        </span>
        <span className="text-muted-foreground text-[10px]">
          ({items.length} found)
        </span>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent pb-2">
        <div className="flex gap-4 min-w-max">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delay + i * 0.05 }}
              className="flex flex-col items-center gap-1 group"
            >
              <pre className="text-primary/70 group-hover:text-primary text-[9px] leading-tight font-mono transition-colors duration-200 terminal-glow select-none">
                {item.ascii}
              </pre>
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors font-medium">
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
