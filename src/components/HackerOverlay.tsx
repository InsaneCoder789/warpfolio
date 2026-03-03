import { useEffect, useRef } from "react";

const HackerOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Matrix rain columns
    const fontSize = 14;
    const cols = Math.floor(w / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    // Satellite scanner state
    let scanAngle = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 12, 18, 0.06)";
      ctx.fillRect(0, 0, w, h);

      // Matrix rain (subtle)
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = `hsla(187, 80%, 55%, ${Math.random() * 0.15 + 0.02})`;
        ctx.fillText(char, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      // Satellite scanner (top-right)
      const cx = w - 90;
      const cy = 90;
      const radius = 60;

      // Scanner circle
      ctx.strokeStyle = "hsla(187, 80%, 55%, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
      ctx.stroke();

      // Cross hairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweep line
      scanAngle += 0.02;
      const sx = cx + Math.cos(scanAngle) * radius;
      const sy = cy + Math.sin(scanAngle) * radius;
      const gradient = ctx.createLinearGradient(cx, cy, sx, sy);
      gradient.addColorStop(0, "hsla(187, 80%, 55%, 0.2)");
      gradient.addColorStop(1, "hsla(187, 80%, 55%, 0)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      // Sweep arc (trailing glow)
      ctx.fillStyle = "hsla(187, 80%, 55%, 0.03)";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, scanAngle - 0.5, scanAngle);
      ctx.closePath();
      ctx.fill();

      // Blips on scanner
      const blips = [0.3, 1.2, 2.5, 4.1];
      blips.forEach((b) => {
        const dist = radius * (0.3 + Math.sin(b * 2) * 0.3);
        const bx = cx + Math.cos(b + scanAngle * 0.1) * dist;
        const by = cy + Math.sin(b + scanAngle * 0.1) * dist;
        const alpha = Math.max(0, 0.4 - Math.abs(((scanAngle % (Math.PI * 2)) - b) % (Math.PI * 2)) * 0.15);
        ctx.fillStyle = `hsla(187, 80%, 55%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Data rake lines (bottom-left)
      const rakeY = h - 60;
      const rakeX = 30;
      ctx.strokeStyle = "hsla(135, 60%, 55%, 0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const yOff = i * 6;
        ctx.beginPath();
        ctx.moveTo(rakeX, rakeY + yOff);
        for (let x = 0; x < 200; x += 3) {
          const noiseVal = Math.sin(x * 0.1 + scanAngle * 2 + i) * (3 + Math.sin(scanAngle + i) * 2);
          ctx.lineTo(rakeX + x, rakeY + yOff + noiseVal);
        }
        ctx.stroke();
      }

      // Hex data stream (left edge)
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "hsla(187, 80%, 55%, 0.06)";
      const hexChars = "0123456789ABCDEF";
      for (let i = 0; i < 20; i++) {
        let hex = "";
        for (let j = 0; j < 8; j++) hex += hexChars[Math.floor(Math.random() * 16)];
        if (Math.random() > 0.85) {
          ctx.fillStyle = `hsla(187, 80%, 55%, ${Math.random() * 0.08 + 0.02})`;
          ctx.fillText(`0x${hex}`, 10, 200 + i * 16);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default HackerOverlay;
