'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

function getConnection(): NetworkInfo | undefined {
  return (navigator as Navigator & { connection?: NetworkInfo }).connection;
}

/** ¿La conexión pide ahorrar datos? Se lee del navegador, no del estado. */
function readFrugal() {
  const conn = getConnection();
  return conn?.saveData === true || /(^|-)2g$/.test(conn?.effectiveType ?? '');
}

interface VideoBackdropProps {
  /** Clips que se encadenan en bucle. */
  sources: string[];
  /** Imagen que se ve mientras carga y cuando no se reproduce video. */
  poster: string;
  posterAlt?: string;
  /** Segundos que se muestra cada clip antes de fundir al siguiente. */
  hold?: number;
  /** Oscurece arriba y abajo para que el texto encima sea legible. Por defecto sí. */
  veil?: boolean;
}

/**
 * Fondo de video encadenado.
 *
 * Varios clips se funden uno en otro para contar una progresión —brote,
 * riego, cosecha— en vez de repetir una sola toma. Sobre él se apoyan las
 * tarjetas de contenido, así que va oscurecido para no pelearse con el texto.
 *
 * No descarga video si la persona pidió menos movimiento o si su conexión
 * avisa que quiere ahorrar datos: en ese caso queda la foto de portada.
 * Importa, porque buena parte del público entra desde el celular.
 */
export default function VideoBackdrop({
  sources,
  poster,
  posterAlt = '',
  hold = 7000,
  veil = true,
}: VideoBackdropProps) {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  // El estado de la red es un sistema externo: se lee directamente del
  // navegador. En el servidor se asume "ahorra datos" para que el HTML
  // inicial no incluya el video.
  const subscribe = useCallback((onChange: () => void) => {
    const conn = getConnection() as (NetworkInfo & EventTarget) | undefined;
    conn?.addEventListener?.('change', onChange);
    return () => conn?.removeEventListener?.('change', onChange);
  }, []);
  const frugal = useSyncExternalStore(subscribe, readFrugal, () => true);

  const playVideo = !reduced && !frugal;

  // Turno de cada clip.
  useEffect(() => {
    if (!playVideo || sources.length < 2) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % sources.length), hold);
    return () => clearInterval(id);
  }, [playVideo, sources.length, hold]);

  // Solo se reproduce el clip visible: los demás se pausan y no gastan CPU.
  useEffect(() => {
    if (!playVideo) return;
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        v.currentTime = 0;
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [current, playVideo]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image src={poster} alt={posterAlt} fill priority className="object-cover" />

      {playVideo &&
        sources.map((src, i) => (
          <motion.video
            key={src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={src}
            muted
            loop
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        ))}

      {/* Velo: oscurece arriba y abajo, donde va el texto, y deja el centro
          despejado para que el campo se vea de verdad. */}
      {veil && (
        <div className="from-ink/85 via-ink/35 to-ink/80 absolute inset-0 bg-gradient-to-b" />
      )}
    </div>
  );
}
