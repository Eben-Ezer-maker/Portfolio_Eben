"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: Particle[] = [];
    const N = 70; // densité (augmente si tu veux + de "réseau")

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.35, 0.35),
          vy: rand(-0.35, 0.35),
          r: rand(1.2, 2.2),
        });
      }
    };

    const step = () => {
      // fond (transparent, ton bg principal reste)
      ctx.clearRect(0, 0, w, h);

      // léger voile pour un rendu "soft"
      ctx.fillStyle = "rgba(7, 10, 18, 0.35)";
      ctx.fillRect(0, 0, w, h);

      // mise à jour + dessin particules
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // connexions
      const maxDist = 140; // distance de connexion
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;

            // couleur "neural": cyan → violet
            ctx.strokeStyle = `rgba(56,189,248,${0.18 * alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // un 2e trait violet faible (effet profondeur)
            ctx.strokeStyle = `rgba(217,70,239,${0.10 * alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // points
      for (const p of particles) {
        // halo
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
        g.addColorStop(0, "rgba(56,189,248,0.10)");
        g.addColorStop(1, "rgba(56,189,248,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.fill();

        // point
        ctx.fillStyle = "rgba(226,232,240,0.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    init();
    raf = requestAnimationFrame(step);

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-80"
      aria-hidden="true"
    />
  );
}
