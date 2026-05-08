import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import { ExperienceItem as ExpItem } from "@/data/linkedin";

interface Props {
  item: ExpItem;
  delay?: number;
}

// Pick an emoji based on company/role keywords so fallback never looks blank.
const pickEmoji = (item: ExpItem) => {
  const s = `${item.company} ${item.role}`.toLowerCase();
  if (/cyber|security|ctf|hack/.test(s)) return "🛡️";
  if (/android|mobile|app/.test(s)) return "📱";
  if (/flutter|dart/.test(s)) return "💙";
  if (/web|frontend|react/.test(s)) return "🌐";
  if (/market|growth|strategy/.test(s)) return "📈";
  if (/volunt|ngo|charity|help/.test(s)) return "💚";
  if (/design|ui|ux/.test(s)) return "🎨";
  if (/teach|mentor|edu|school|kiit/.test(s)) return "🎓";
  if (/lab|research/.test(s)) return "🧪";
  return "💼";
};

const ExperienceItemCard = ({ item, delay = 0 }: Props) => {
  const [failed, setFailed] = useState(false);
  const emoji = pickEmoji(item);
  const initials = item.company
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay }}
      className="flex items-start gap-3 p-3 rounded-md border border-border bg-terminal-block/60 hover:bg-terminal-block-hover/80 hover:terminal-border-glow transition-all"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-secondary border border-border flex items-center justify-center">
        {failed || !item.logo ? (
          <div
            className="flex items-center justify-center w-full h-full text-base sm:text-lg select-none"
            title={item.company}
            aria-label={`${item.company} logo placeholder`}
          >
            <span className="leading-none">{emoji}</span>
            <span className="sr-only">{initials}</span>
          </div>
        ) : (
          <img
            src={item.logo}
            alt={`${item.company} logo`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
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
