'use client';

import { useState } from 'react';
import { Target, Eye } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import KineticHeading from '@/components/shared/KineticHeading';
import { ease, viewport } from '@/lib/motion';

interface MissionVisionSectionProps {
  dict: any;
}

type PanelId = 'mission' | 'vision';

/**
 * Misión y Visión como dos paneles vivos.
 *
 * En vez de dos tarjetas quietas, cada panel reacciona: se ensancha al
 * acercarse el cursor, un foco de luz sigue el puntero y el aro del icono
 * se expande. En el celular se apilan y se abren al tocarlos, así que la
 * interacción existe en ambos mundos.
 */
export default function MissionVisionSection({ dict }: MissionVisionSectionProps) {
  const d = dict.Home.missionVision;
  const reduced = useReducedMotion();
  const [active, setActive] = useState<PanelId | null>(null);

  const panels = [
    {
      id: 'mission' as PanelId,
      index: '01',
      Icon: Target,
      title: d.mission.title,
      text: d.mission.text,
      base: 'bg-gp-blue',
      glow: 'rgba(255,255,255,0.22)',
    },
    {
      id: 'vision' as PanelId,
      index: '02',
      Icon: Eye,
      title: d.vision.title,
      text: d.vision.text,
      base: 'bg-gp-green',
      glow: 'rgba(255,255,255,0.26)',
    },
  ];

  return (
    <section className="bg-paper relative overflow-hidden py-20 md:py-28">
      {/* Atmósfera: masas de color que se desplazan muy despacio. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="bg-gp-green/10 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl"
          animate={reduced ? undefined : { scale: [1, 1.15, 1], x: [0, -24, 0], y: [0, 18, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-gp-blue/10 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"
          animate={reduced ? undefined : { scale: [1, 1.18, 1], x: [0, 28, 0], y: [0, -16, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

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
            className="font-display text-ink mb-4 text-4xl font-semibold tracking-tight md:text-6xl"
          />
          <motion.p
            className="text-ink/60 mx-auto max-w-2xl text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {d.subtitle}
          </motion.p>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
          {panels.map((panel) => (
            <Panel
              key={panel.id}
              {...panel}
              isActive={active === panel.id}
              isDimmed={active !== null && active !== panel.id}
              onActivate={() => setActive(panel.id)}
              onRelease={() => setActive(null)}
              reduced={!!reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({
  index,
  Icon,
  title,
  text,
  base,
  glow,
  isActive,
  isDimmed,
  onActivate,
  onRelease,
  reduced,
}: {
  index: string;
  Icon: typeof Target;
  title: string;
  text: string;
  base: string;
  glow: string;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onRelease: () => void;
  reduced: boolean;
}) {
  // Foco de luz que persigue al cursor dentro del panel.
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 150, damping: 25 });
  const sy = useSpring(my, { stiffness: 150, damping: 25 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${sx}% ${sy}%, ${glow}, transparent 65%)`;

  return (
    <motion.div
      className="group relative flex-1 overflow-hidden rounded-[28px] shadow-xl"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      animate={{
        flexGrow: reduced ? 1 : isActive ? 1.45 : isDimmed ? 0.8 : 1,
        opacity: isDimmed ? 0.86 : 1,
      }}
      transition={{
        opacity: { duration: 0.4 },
        y: { duration: 0.7, ease: ease.growth },
        flexGrow: { duration: 0.6, ease: ease.growth },
      }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') onActivate();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') onRelease();
      }}
      onClick={() => (isActive ? onRelease() : onActivate())}
    >
      <div className={`absolute inset-0 ${base}`} />
      {!reduced && <motion.div className="absolute inset-0" style={{ background: spotlight }} />}

      {/* Trama diagonal muy tenue: textura, no ruido. */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 12px)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
        <div className="mb-7 flex items-center justify-between">
          <div className="relative">
            <motion.div
              className="flex h-[74px] w-[74px] items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm"
              animate={{
                rotate: isActive && !reduced ? 6 : 0,
                scale: isActive && !reduced ? 1.06 : 1,
              }}
              transition={{ duration: 0.5, ease: ease.sprout }}
            >
              <Icon className="h-9 w-9 text-white" />
            </motion.div>
            {/* Aro que se expande al activar el panel. */}
            {!reduced && (
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-2xl border border-white/50"
                animate={isActive ? { scale: 1.35, opacity: 0 } : { scale: 1, opacity: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              />
            )}
          </div>
          <span
            className="text-6xl font-bold text-white/15 md:text-7xl"
            style={{ fontFamily: 'var(--font-mono)' }}
            aria-hidden="true"
          >
            {index}
          </span>
        </div>

        <h3 className="font-display mb-5 text-2xl font-semibold text-white md:text-3xl">{title}</h3>
        <p className="max-w-2xl text-lg leading-relaxed text-white/90">{text}</p>

        {/* Barra que crece al activar: señal de que el panel está vivo. */}
        <motion.span
          className="mt-8 block h-[3px] rounded-full bg-white/70"
          animate={{ width: isActive && !reduced ? 96 : 40 }}
          transition={{ duration: 0.5, ease: ease.growth }}
        />
      </div>
    </motion.div>
  );
}
