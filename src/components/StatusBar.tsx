import { useEffect, useState } from "react";
import { Wifi, Shield, Cpu, Activity } from "lucide-react";

const StatusBar = () => {
  const [time, setTime] = useState(new Date());
  const [packets, setPackets] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date());
      setPackets((p) => p + Math.floor(Math.random() * 50 + 10));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-1.5 bg-terminal-block/90 backdrop-blur-sm border-t border-border text-[10px] text-muted-foreground font-mono">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-terminal-success">
          <Shield className="w-3 h-3" /> SECURE
        </span>
        <span className="flex items-center gap-1">
          <Wifi className="w-3 h-3 text-primary" /> 142.250.190.78
        </span>
        <span className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-terminal-warning" /> {packets.toLocaleString()} packets
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Cpu className="w-3 h-3" /> SYS 23%
        </span>
        <span className="text-primary">
          {time.toLocaleTimeString("en-US", { hour12: false })}
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
