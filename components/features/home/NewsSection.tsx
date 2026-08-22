'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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

        <Reveal
          group
          gap={0.12}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2"
        >
          {VIDEOS.map((v) => (
            <Reveal key={v.src} preset="child">
              <NewsVideo {...v} />
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Arranca solo cuando entra en pantalla (mudo, como pide el navegador para
 * autoplay) y se pausa al salir, para no seguir sonando fuera de vista. La
 * barra nativa del navegador se reemplaza por un botón propio: tocar el
 * video pausa o retoma, y el botón de volumen activa el sonido.
 */
function NewsVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-black shadow-xl">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        onClick={(e) => {
          const el = e.currentTarget;
          if (el.paused) void el.play().catch(() => {});
          else el.pause();
        }}
        className="aspect-[9/16] w-full cursor-pointer object-cover"
      />
      <button
        type="button"
        onClick={() => {
          const el = ref.current;
          if (!el) return;
          const next = !muted;
          el.muted = next;
          setMuted(next);
          if (el.paused) void el.play().catch(() => {});
        }}
        aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform duration-300 hover:scale-105"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </div>
  );
}
