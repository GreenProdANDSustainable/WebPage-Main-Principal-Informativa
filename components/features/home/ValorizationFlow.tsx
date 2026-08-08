'use client';

import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { ease } from '@/lib/motion';

interface FlowDict {
  inputsLabel: string;
  inputPesca: string;
  inputAgro: string;
  inputCarnico: string;
  process: string;
  outputsLabel: string;
  outputBioinsumos: string;
  outputFertilizantes: string;
  outputConservas: string;
  stat: string;
  statLabel: string;
}

// Divide una etiqueta en 1-2 líneas cortando en el primer espacio.
function Label({
  x,
  y,
  text,
  anchor,
}: {
  x: number;
  y: number;
  text: string;
  anchor: 'start' | 'middle' | 'end';
}) {
  const parts = text.includes(' ') && text.length > 11 ? text.split(/ (.*)/).slice(0, 2) : [text];
  const twoLine = parts.length === 2;
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-husk text-[20px] lg:text-[15px]"
      style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.005em' }}
    >
      <tspan x={x} dy={twoLine ? '-0.12em' : '0.34em'}>
        {parts[0]}
      </tspan>
      {parts[1] && (
        <tspan x={x} dy="1.05em">
          {parts[1]}
        </tspan>
      )}
    </text>
  );
}

function Node({ x, y, w = 145, h = 52 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <rect
      x={x}
      y={y - h / 2}
      width={w}
      height={h}
      rx={h / 2}
      className="fill-ink-soft stroke-line-warm/40"
      strokeWidth={1}
    />
  );
}

/**
 * Cifra del centro que sube desde cero al entrar en pantalla.
 * Se escribe directamente en el nodo de texto para no re-renderizar React
 * en cada fotograma. Si no hay animación, muestra el valor final tal cual.
 */
function CountUpText({ value, animated }: { value: string; animated: boolean }) {
  const ref = useRef<SVGTextElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : '';
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!animated || target === null) return;
    const node = ref.current;
    if (!node) return;

    const unsubscribe = rounded.on('change', (v) => {
      node.textContent = v;
    });
    const controls = animate(count, target, { duration: 1.4, ease: ease.growth, delay: 0.45 });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [animated, target, count, rounded]);

  return (
    <text
      ref={ref}
      x={280}
      y={156}
      textAnchor="middle"
      className="fill-gp-green"
      style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 600 }}
    >
      {value}
    </text>
  );
}

export default function ValorizationFlow({ dict }: { dict: FlowDict }) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const animated = !reduced;

  const inputs = [
    { y: 55, label: dict.inputPesca },
    { y: 170, label: dict.inputAgro },
    { y: 285, label: dict.inputCarnico },
  ];
  const outputs = [
    { y: 55, label: dict.outputBioinsumos },
    { y: 170, label: dict.outputFertilizantes },
    { y: 285, label: dict.outputConservas },
  ];
  const cx = 280;
  const cy = 170;
  const r = 62;

  const inPaths = inputs.map((n) => `M 155 ${n.y} C 210 ${n.y}, 210 ${cy}, ${cx - r} ${cy}`);
  const outPaths = outputs.map((n) => `M ${cx + r} ${cy} C 350 ${cy}, 350 ${n.y}, 405 ${n.y}`);

  // Guion del diagrama: primero late el núcleo, entran los subproductos,
  // se procesan y recién entonces salen convertidos en recursos.
  const T = {
    core: 0.05,
    inNodes: 0.28,
    inPaths: 0.52,
    outPaths: 0.86,
    outNodes: 1.02,
    particles: 1.35,
  };

  // Sin animación todo aparece ya montado, en su estado final.
  const reveal = (delay: number) =>
    animated
      ? {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: ease.growth },
        }
      : {};

  const drawPath = (delay: number) =>
    animated
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration: 0.85, delay, ease: ease.flow },
            opacity: { duration: 0.25, delay },
          },
        }
      : {};

  return (
    <motion.div
      ref={containerRef}
      initial={animated ? { opacity: 0, scale: 0.96 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: ease.growth }}
      className="w-full"
    >
      <svg
        viewBox="0 0 560 340"
        className="w-full"
        role="img"
        aria-label={dict.stat + ' ' + dict.statLabel}
      >
        <title>{dict.process}</title>

        {/* Cauces: se trazan solos, de la fuente al proceso y del proceso al producto. */}
        {inPaths.map((d, i) => (
          <motion.path
            key={`in-path-${i}`}
            d={d}
            fill="none"
            stroke="#3a4030"
            strokeWidth={1.5}
            {...drawPath(T.inPaths + i * 0.12)}
          />
        ))}
        {outPaths.map((d, i) => (
          <motion.path
            key={`out-path-${i}`}
            d={d}
            fill="none"
            stroke="#3a4030"
            strokeWidth={1.5}
            {...drawPath(T.outPaths + i * 0.12)}
          />
        ))}

        {/* Materia en tránsito: el ciclo que nunca se detiene. */}
        {animated &&
          [...inPaths, ...outPaths].map((d, i) => (
            <circle key={`dot-${i}`} r={3.5} className="fill-gp-green">
              <animateMotion
                dur={`${2.6 + (i % 3) * 0.4}s`}
                begin={`${T.particles + i * 0.35}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          ))}

        {inputs.map((n, i) => (
          <motion.g key={`in-${i}`} {...reveal(T.inNodes + i * 0.12)}>
            <Node x={10} y={n.y} />
            <Label x={82} y={n.y} text={n.label} anchor="middle" />
          </motion.g>
        ))}
        {outputs.map((n, i) => (
          <motion.g key={`out-${i}`} {...reveal(T.outNodes + i * 0.12)}>
            <Node x={405} y={n.y} />
            <Label x={478} y={n.y} text={n.label} anchor="middle" />
          </motion.g>
        ))}

        {/* Órbita: gira muy despacio y recuerda que el proceso es circular. */}
        {animated && (
          <motion.circle
            cx={cx}
            cy={cy}
            r={r + 15}
            fill="none"
            className="stroke-gp-green/25"
            strokeWidth={1}
            strokeDasharray="2 10"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{
              opacity: { duration: 1, delay: T.core + 0.5 },
              rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            }}
          />
        )}

        {/* Núcleo: el proceso de valorización. */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-ink stroke-gp-green"
          strokeWidth={1.5}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          initial={animated ? { scale: 0.6, opacity: 0 } : false}
          animate={
            animated
              ? { scale: 1, opacity: 1, strokeOpacity: [0.4, 0.9, 0.4] }
              : { strokeOpacity: 0.7 }
          }
          transition={{
            scale: { duration: 0.8, delay: T.core, ease: ease.sprout },
            opacity: { duration: 0.5, delay: T.core },
            strokeOpacity: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: T.core + 0.8,
            },
          }}
        />

        <motion.g {...reveal(T.core + 0.35)}>
          <CountUpText value={dict.stat} animated={animated && inView} />
          <text
            x={cx}
            y={cy + 9}
            textAnchor="middle"
            className="fill-husk text-[12.5px] lg:text-[10.5px]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {dict.statLabel}
          </text>
          <text
            x={cx}
            y={cy + 30}
            textAnchor="middle"
            className="fill-husk/70 text-[11px] lg:text-[9.5px]"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}
          >
            {dict.process.toUpperCase()}
          </text>
        </motion.g>
      </svg>

      <motion.div className="mt-2 flex justify-between px-1" {...reveal(T.outNodes + 0.3)}>
        <span
          className="text-line-warm text-[11px] tracking-wide"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {dict.inputsLabel}
        </span>
        <span
          className="text-line-warm text-[11px] tracking-wide"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {dict.outputsLabel}
        </span>
      </motion.div>
    </motion.div>
  );
}
