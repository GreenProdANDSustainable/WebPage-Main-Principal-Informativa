'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/shared/Reveal';

interface NewsSectionProps {
  dict: any;
}

// Los dos videos mas recientes de campo, ya verticales (9:16) y con su
// propia caratula: sin ella el segundo se veia en negro antes de tocarlo.
const VIDEOS = [
  { src: '/videos/ultima-novedad-1.mp4', poster: '/videos/ultima-novedad-1-poster.jpg' },
  { src: '/videos/ultima-novedad-2.mp4', poster: '/videos/ultima-novedad-2-poster.jpg' },
];

export default function NewsSection({ dict }: NewsSectionProps) {
  return (
    <section id="casos-exito" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal preset="growUp">
          <h2 className="font-display text-ink mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {dict.News.title}
          </h2>
        </Reveal>
        <Reveal preset="growUp" delay={0.1}>
          <p className="text-ink/60 mb-12 text-lg">{dict.News.subtitle}</p>
        </Reveal>

        <Reveal preset="growUp" delay={0.15}>
          <NewsPlaylist />
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Los dos videos van en fila, pero se reproducen como una sola lista: el
 * primero arranca al entrar en pantalla, y al terminar sigue el segundo.
 * Al terminar el segundo, ahí se queda —no vuelve a empezar solo—. Si la
 * sección sale de vista se pausa el que esté activo, y retoma justo donde
 * quedó al volver a entrar. Va con sonido activo desde el inicio; solo si
 * el navegador bloquea el autoplay con sonido (exige un toque antes) se
 * silencia y queda a la espera de ese primer toque.
 */
function NewsPlaylist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const startedRef = useRef<boolean[]>(VIDEOS.map(() => false));
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRefs.current[active];
    if (!el) return;

    if (!inView) {
      el.pause();
      return;
    }

    if (!startedRef.current[active]) {
      startedRef.current[active] = true;
      el.currentTime = 0;
      el.muted = false;
    }
    void el.play().catch(() => {
      el.muted = true;
      setNeedsTap(true);
      void el.play().catch(() => {});
    });
  }, [active, inView]);

  return (
    <div ref={containerRef} className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
      {VIDEOS.map((v, i) => (
        <div key={v.src} className="relative overflow-hidden rounded-3xl bg-black shadow-xl">
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={v.src}
            poster={v.poster}
            playsInline
            preload="none"
            onEnded={() => {
              // Solo avanza al siguiente; en el ultimo se queda ahi, sin
              // volver a empezar la lista.
              if (i < VIDEOS.length - 1) setActive(i + 1);
            }}
            onClick={() => {
              const el = videoRefs.current[i];
              if (!el || i !== active) return;
              if (needsTap) {
                el.muted = false;
                setNeedsTap(false);
              }
              if (el.paused) void el.play().catch(() => {});
              else el.pause();
            }}
            className="aspect-[9/16] w-full cursor-pointer object-cover"
          />
          {needsTap && i === active && (
            <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              Toca para activar el sonido
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
