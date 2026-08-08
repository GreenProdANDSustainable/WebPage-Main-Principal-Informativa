'use client';

import { useEffect, useRef } from 'react';

/**
 * Polen suspendido en el aire.
 *
 * Capa decorativa del hero: partículas que ascienden despacio y se mecen,
 * como semillas o polen sobre un campo. Está en canvas (no en DOM) para que
 * el movimiento sea fluido y no cueste caro en celulares gama media.
 *
 * Se detiene sola cuando no está a la vista o cuando la pestaña pasa a
 * segundo plano, y no se dibuja si la persona pidió menos movimiento.
 */
export default function AmbientSpores() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;

    type Spore = {
      x: number;
      y: number;
      r: number;
      speed: number;
      drift: number;
      phase: number;
      alpha: number;
    };
    let spores: Spore[] = [];

    const makeSpores = () => {
      // Menos partículas en pantallas chicas: rinde mejor en el celular.
      const count = width < 640 ? 14 : width < 1280 ? 22 : 30;
      spores = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 1.9,
        speed: 0.12 + Math.random() * 0.28,
        drift: 0.25 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.16 + Math.random() * 0.3,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeSpores();
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const s of spores) {
        s.y -= s.speed;
        s.phase += 0.01;
        const x = s.x + Math.sin(s.phase) * s.drift * 14;

        // Al salir por arriba, reaparece abajo: el ciclo no se corta.
        if (s.y < -6) {
          s.y = height + 6;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(169, 214, 140, ${s.alpha})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    frame = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    // Fuera de pantalla no hace falta gastar batería.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    const onReducedChange = () => {
      if (prefersReduced.matches) {
        stop();
        ctx.clearRect(0, 0, width, height);
      } else {
        start();
      }
    };
    prefersReduced.addEventListener('change', onReducedChange);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      prefersReduced.removeEventListener('change', onReducedChange);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
