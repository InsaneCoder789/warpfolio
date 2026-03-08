import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "[    0.000000] Linux version 6.1.0-kali9-amd64 (devel@kali.org)", delay: 0 },
  { text: "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0-kali9-amd64 root=/dev/sda1", delay: 100 },
  { text: "[    0.234521] ACPI: RSDP 0x00000000000F6A10 000024 (v02 VBOX  )", delay: 200 },
  { text: "[    0.456123] CPU: Intel Core i9-13900K (24 cores) @ 5.800GHz", delay: 350 },
  { text: "[    0.567234] Memory: 32768MB DDR5 available", delay: 500 },
  { text: "[    0.678345] GPU: NVIDIA RTX 4090 [GeForce RTX 4090]", delay: 600 },
  { text: "[    1.012456] NET: Registered PF_INET protocol family", delay: 750 },
  { text: "[    1.234567] EXT4-fs (sda1): mounted filesystem", delay: 900 },
  { text: "[    1.456789] systemd[1]: Detected architecture x86-64.", delay: 1050 },
  { text: "[    1.567890] systemd[1]: Set hostname to <kali-rochiee>.", delay: 1150 },
  { text: "[    2.012345] systemd[1]: Starting Kali GNU/Linux...", delay: 1300 },
  { text: "[  OK  ] Started OpenSSH server.", delay: 1500, ok: true },
  { text: "[  OK  ] Started Metasploit Framework.", delay: 1650, ok: true },
  { text: "[  OK  ] Started Network Manager.", delay: 1800, ok: true },
  { text: "[  OK  ] Reached target Multi-User System.", delay: 1950, ok: true },
  { text: "", delay: 2100 },
  { text: "  ██╗  ██╗ █████╗ ██╗     ██╗", delay: 2200, ascii: true },
  { text: "  ██║ ██╔╝██╔══██╗██║     ██║", delay: 2250, ascii: true },
  { text: "  █████╔╝ ███████║██║     ██║", delay: 2300, ascii: true },
  { text: "  ██╔═██╗ ██╔══██║██║     ██║", delay: 2350, ascii: true },
  { text: "  ██║  ██╗██║  ██║███████╗██║", delay: 2400, ascii: true },
  { text: "  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝", delay: 2450, ascii: true },
  { text: "", delay: 2500 },
  { text: "  rochiee24@kali:~$ ./portfolio.sh", delay: 2650, cmd: true },
  { text: "  [*] Initializing portfolio environment...", delay: 2800 },
  { text: "  [+] All systems operational. Welcome.", delay: 2950, success: true },
];

const KaliBootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });
    timers.push(setTimeout(() => setDone(true), 3400));
    timers.push(setTimeout(() => onComplete(), 4000));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-start justify-start p-6 md:p-12 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-[10px] md:text-xs leading-relaxed max-w-4xl">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="whitespace-pre">
                {line.ok ? (
                  <span>
                    <span className="text-terminal-success">[  OK  ]</span>
                    <span className="text-foreground">{line.text.replace("[  OK  ]", "")}</span>
                  </span>
                ) : line.ascii ? (
                  <span className="text-primary terminal-glow">{line.text}</span>
                ) : line.cmd ? (
                  <span className="text-terminal-success">{line.text}</span>
                ) : line.success ? (
                  <span className="text-terminal-success font-bold">{line.text}</span>
                ) : (
                  <span className="text-muted-foreground">{line.text}</span>
                )}
              </div>
            ))}
            <span className="animate-blink text-terminal-success">█</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default KaliBootScreen;
