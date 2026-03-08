import { useEffect, useState } from "react";
import { Radar, Eye, Radio } from "lucide-react";

const SurveillanceWidget = () => {
  const [angle, setAngle] = useState(0);
  const [blips, setBlips] = useState<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((a) => (a + 3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlips((prev) => {
        const filtered = prev.map((b) => ({ ...b, opacity: b.opacity - 0.02 })).filter((b) => b.opacity > 0);
        if (Math.random() > 0.6) {
          filtered.push({
            x: Math.random() * 60 + 10,
            y: Math.random() * 60 + 10,
            opacity: 1,
          });
        }
        return filtered;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col items-end gap-2">
      {/* Radar scope */}
      <div className="w-28 h-28 rounded-full border border-primary/30 bg-terminal-bg/90 backdrop-blur-sm relative overflow-hidden terminal-box-glow">
        {/* Grid lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px bg-primary/10" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px bg-primary/10" />
        </div>
        <div className="absolute inset-3 rounded-full border border-primary/10" />
        <div className="absolute inset-7 rounded-full border border-primary/10" />

        {/* Sweep line */}
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-px origin-left"
          style={{
            transform: `rotate(${angle}deg)`,
            background: "linear-gradient(90deg, hsl(var(--primary) / 0.8), transparent)",
          }}
        />

        {/* Sweep trail */}
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-1/2 origin-top-left"
          style={{
            transform: `rotate(${angle - 30}deg)`,
            background: `conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.15) 30deg, transparent 30deg)`,
          }}
        />

        {/* Blips */}
        {blips.map((blip, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary"
            style={{
              left: `${blip.x}%`,
              top: `${blip.y}%`,
              opacity: blip.opacity,
              boxShadow: "0 0 4px hsl(var(--primary))",
            }}
          />
        ))}

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" style={{ boxShadow: "0 0 6px hsl(var(--primary))" }} />
      </div>

      {/* Status indicators */}
      <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-mono bg-terminal-block/80 backdrop-blur-sm border border-border rounded px-2 py-1">
        <Eye className="w-3 h-3 text-primary animate-pulse" />
        <span className="text-primary">WATCHING</span>
        <Radio className="w-3 h-3 text-terminal-success" />
      </div>
    </div>
  );
};

export default SurveillanceWidget;
