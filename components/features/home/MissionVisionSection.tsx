'use client';

import { Target, Eye } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import KineticHeading from '@/components/shared/KineticHeading';
import VideoBackdrop from '@/components/shared/VideoBackdrop';
import { ease, viewport } from '@/lib/motion';

interface MissionVisionSectionProps {
  dict: any;
}

/**
 * Misión y Visión sobre el campo en movimiento.
 *
 * Detrás corre una secuencia agrícola —brote, riego, cosecha— que enseña
 * hacia dónde apunta la empresa. Encima, dos tarjetas independientes de
 * vidrio: cada una vive por su cuenta, se levanta al acercarse el cursor
 * y deja pasar el video por debajo. El contraste entre el fondo vivo y la
 * quietud de las tarjetas es lo que genera el impacto.
 */
export default function MissionVisionSection({ dict }: MissionVisionSectionProps) {
  const d = dict.Home.missionVision;

  const panels = [
    { key: 'mission', Icon: Target, title: d.mission.title, text: d.mission.text },
    { key: 'vision', Icon: Eye, title: d.vision.title, text: d.vision.text },
  ];

  return (
    <section id="mision-vision" className="bg-ink relative isolate overflow-hidden py-24 md:py-32">
      <VideoBackdrop
        sources={[
          '/videos/agro-1-germinacion.mp4',
          '/videos/agro-2-riego.mp4',
          '/videos/agro-3-cosecha.mp4',
        ]}
        poster="/images/ProductosServicios/Banner.jpg"
        posterAlt=""
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.p
            className="text-gp-green mb-3 text-sm font-semibold tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: ease.growth }}
          >
            {d.essence_title}
          </motion.p>
          <KineticHeading
            text={d.title}
            as="h2"
            className="font-display text-paper mb-4 text-4xl font-semibold tracking-tight md:text-5xl"
          />
          <motion.p
            className="text-husk/75 mx-auto max-w-2xl text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {d.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {panels.map(({ key, ...panel }, i) => (
            <GlassPanel key={key} {...panel} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GlassPanel({
  Icon,
  title,
  text,
  delay,
}: {
  Icon: typeof Target;
  title: string;
  text: string;
  delay: number;
}) {
  const reduced = useReducedMotion();

  // Reflejo que sigue al cursor sobre el cristal.
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 150, damping: 25 });
  const sy = useSpring(my, { stiffness: 150, damping: 25 });
  const sheen = useMotionTemplate`radial-gradient(460px circle at ${sx}% ${sy}%, rgba(109,190,81,0.28), transparent 62%)`;

  return (
    <motion.article
      className="group border-paper/15 relative overflow-hidden rounded-[28px] border bg-white/10 shadow-2xl backdrop-blur-xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      whileHover={reduced ? undefined : { y: -8 }}
      transition={{
        opacity: { duration: 0.7, delay, ease: ease.growth },
        y: { duration: 0.7, delay, ease: ease.growth },
      }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: sheen }}
        />
      )}

      {/* Filo superior iluminado: da el aspecto de cristal biselado. */}
      <span className="via-gp-green/70 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col p-8 md:p-11">
        <div className="mb-7 flex items-start">
          <motion.span
            className="border-paper/25 flex h-[70px] w-[70px] items-center justify-center rounded-2xl border bg-white/15 backdrop-blur-sm"
            whileHover={reduced ? undefined : { rotate: 6, scale: 1.07 }}
            transition={{ duration: 0.45, ease: ease.sprout }}
          >
            <Icon className="text-gp-green h-9 w-9" />
          </motion.span>
        </div>

        <h3 className="font-display text-paper mb-4 text-2xl font-semibold md:text-3xl">{title}</h3>
        <p className="text-husk/85 text-base leading-relaxed md:text-lg">{text}</p>

        <span className="bg-gp-green mt-8 block h-[3px] w-10 rounded-full transition-all duration-500 group-hover:w-24" />
      </div>
    </motion.article>
  );
}
