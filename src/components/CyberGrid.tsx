import { useEffect, useRef } from "react";
import gsap from "gsap";

const CyberGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const particleCount = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 20000));
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    // Hex grid
    const hexSize = 70;
    const hexNodes: { x: number; y: number; baseOpacity: number }[] = [];
    const rows = Math.ceil(canvas.height / (hexSize * 0.866)) + 2;
    const cols = Math.ceil(canvas.width / hexSize) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const offset = r % 2 === 0 ? 0 : hexSize * 0.5;
        hexNodes.push({
          x: c * hexSize + offset,
          y: r * hexSize * 0.866,
          baseOpacity: 0.1 + Math.random() * 0.06,
        });
      }
    }

    // GSAP pulse
    const pulse = { value: 0, wave: 0 };
    gsap.to(pulse, { value: 1, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(pulse, { wave: Math.PI * 2, duration: 8, repeat: -1, ease: "none" });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const maxDist = 150;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const time = Date.now() * 0.001;

      // Hex grid
      for (const node of hexNodes) {
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = dist < 250 ? (1 - dist / 250) * 0.35 : 0;
        const waveEffect = Math.sin(node.x * 0.012 + node.y * 0.012 + pulse.wave) * 0.06;
        const opacity = node.baseOpacity + proximity + waveEffect;

        // Hex shape
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const angle = (Math.PI / 3) * a - Math.PI / 6;
          const hx = node.x + Math.cos(angle) * 8;
          const hy = node.y + Math.sin(angle) * 8;
          if (a === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = `hsla(142, 70%, 45%, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glow node on proximity
        if (dist < 200) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2 + proximity * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(142, 70%, 60%, ${proximity * 2})`;
          ctx.fill();
        }
      }

      // Particles & connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse repulsion
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const distM = Math.sqrt(dmx * dmx + dmy * dmy);
        if (distM < 150) {
          p.vx += (dmx / distM) * 0.03;
          p.vy += (dmy / distM) * 0.03;
        }
        p.vx *= 0.998;
        p.vy *= 0.998;

        const breathe = Math.sin(time * 1.5 + i * 0.5) * 0.2 + 0.8;
        const glowOpacity = p.opacity * (0.6 + pulse.value * 0.4) * breathe;

        // Particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(142, 70%, 50%, ${glowOpacity * 0.15})`;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(142, 70%, 55%, ${glowOpacity})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < maxDist) {
            const lineOpacity = (1 - dist / maxDist) * 0.2 * (0.4 + pulse.value * 0.6);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(142, 70%, 50%, ${lineOpacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // (scan line removed)

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default CyberGrid;
