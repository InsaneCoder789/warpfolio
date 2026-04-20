import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import { ExperienceItem as ExpItem } from "@/data/linkedin";

interface Props {
  item: ExpItem;
  delay?: number;
}

const ExperienceItemCard = ({ item, delay = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay }}
      className="flex items-start gap-3 p-3 rounded-md border border-border bg-terminal-block/60 hover:bg-terminal-block-hover/80 hover:terminal-border-glow transition-all"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-md overflow-hidden bg-secondary border border-border flex items-center justify-center">
        <img
          src={item.logo}
          alt={`${item.company} logo`}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const parent = e.currentTarget.parentElement;
            if (parent) parent.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01"/></svg>';
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="min-w-0">
            <div className="text-foreground font-semibold text-xs sm:text-sm truncate">
              {item.role}
            </div>
            <div className="text-primary text-[11px] sm:text-xs flex items-center gap-1.5">
              <Briefcase className="w-3 h-3 shrink-0" />
              <span className="truncate">{item.company}</span>
              <span className="text-muted-foreground">· {item.type}</span>
            </div>
          </div>
          <span className="text-[10px] sm:text-xs text-terminal-warning font-mono shrink-0">
            {item.duration}
          </span>
        </div>
        <div className="text-muted-foreground text-[10px] sm:text-xs mt-1 flex items-center gap-1.5 flex-wrap">
          <MapPin className="w-3 h-3 shrink-0" />
          <span>{item.location}</span>
          <span>·</span>
          <span className="text-terminal-success">{item.mode}</span>
        </div>
        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.skills.map((s) => (
              <span
                key={s}
                className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary text-primary font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceItemCard;
