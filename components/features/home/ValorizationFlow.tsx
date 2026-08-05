'use client';

import { motion } from 'motion/react';

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

export default function ValorizationFlow({ dict }: { dict: FlowDict }) {
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full"
    >
      <svg
        viewBox="0 0 560 340"
        className="w-full"
        role="img"
        aria-label={dict.stat + ' ' + dict.statLabel}
      >
        <title>{dict.process}</title>

        {[...inPaths, ...outPaths].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#3a4030" strokeWidth={1.5} />
        ))}

        {[...inPaths, ...outPaths].map((d, i) => (
          <circle key={`dot-${i}`} r={3.5} className="fill-gp-green">
            <animateMotion
              dur={`${2.6 + (i % 3) * 0.4}s`}
              begin={`${i * 0.35}s`}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
        ))}

        {inputs.map((n, i) => (
          <g key={`in-${i}`}>
            <Node x={10} y={n.y} />
            <Label x={82} y={n.y} text={n.label} anchor="middle" />
          </g>
        ))}
        {outputs.map((n, i) => (
          <g key={`out-${i}`}>
            <Node x={405} y={n.y} />
            <Label x={478} y={n.y} text={n.label} anchor="middle" />
          </g>
        ))}

        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-ink stroke-gp-green"
          strokeWidth={1.5}
          animate={{ strokeOpacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text
          x={cx}
          y={cy - 14}
          textAnchor="middle"
          className="fill-gp-green"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 600 }}
        >
          {dict.stat}
        </text>
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
      </svg>

      <div className="mt-2 flex justify-between px-1">
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
      </div>
    </motion.div>
  );
}
