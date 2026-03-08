import { useEffect, useState } from "react";
import { Wifi, Shield, Cpu, Activity, Skull, Lock } from "lucide-react";

const StatusBar = () => {
  const [time, setTime] = useState(new Date());
  const [packets, setPackets] = useState(0);
  const [mem, setMem] = useState(23);

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date());
      setPackets((p) => p + Math.floor(Math.random() * 50 + 10));
      setMem(Math.floor(Math.random() * 15 + 18));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between px-2 sm:px-4 py-1.5 bg-terminal-block/90 backdrop-blur-sm border-t border-border text-[9px] sm:text-[10px] text-muted-foreground font-mono">
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="flex items-center gap-1 text-primary">
          <Skull className="w-3 h-3" /> KALI
        </span>
        <span className="flex items-center gap-1 text-terminal-success">
          <Shield className="w-3 h-3" /> ROOT
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <Lock className="w-3 h-3 text-terminal-success" /> TLS 1.3
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <Wifi className="w-3 h-3 text-primary" /> 10.0.2.15
        </span>
        <span className="flex items-center gap-1 hidden md:flex">
          <Activity className="w-3 h-3 text-terminal-warning" /> {packets.toLocaleString()} pkts
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="flex items-center gap-1 hidden md:flex">
          <Cpu className="w-3 h-3" /> MEM {mem}%
        </span>
        <span className="text-terminal-success">
          eth0:UP
        </span>
        <span className="text-primary">
          {time.toLocaleTimeString("en-US", { hour12: false })}
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
