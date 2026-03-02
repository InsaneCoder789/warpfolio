import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Star } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  stars?: number;
  url?: string;
  delay?: number;
}

const ProjectCard = ({ name, description, tech, stars, url, delay = 0 }: ProjectCardProps) => {
  return (
    <motion.a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="block rounded-md border border-border bg-terminal-block hover:bg-terminal-block-hover hover:terminal-box-glow transition-all duration-200 p-4 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-terminal-prompt" />
          <span className="text-primary font-semibold text-sm group-hover:terminal-glow transition-all">{name}</span>
        </div>
        <div className="flex items-center gap-3">
          {stars !== undefined && (
            <span className="flex items-center gap-1 text-terminal-warning text-xs">
              <Star className="w-3 h-3" /> {stars}
            </span>
          )}
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <p className="text-terminal-output text-xs mb-3 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-sm bg-secondary text-primary font-medium">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
};

export default ProjectCard;
