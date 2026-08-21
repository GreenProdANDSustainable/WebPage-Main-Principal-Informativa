import type { ElementType, ReactNode } from 'react';

type Tamano = 'sm' | 'md' | 'lg';

interface BoxedLabelProps {
  children: ReactNode;
  /** Etiqueta HTML a usar; por defecto `span`. Los títulos pasan `h1`…`h3`. */
  as?: ElementType;
  size?: Tamano;
  className?: string;
  /** Algas creciendo desde el borde inferior del recuadro. Ver ProductsSection. */
  animated?: boolean;
}

/**
 * Quince láminas de alga repartidas a lo ancho del recuadro (viewBox 0 0
 * 200 100): anchas y finas intercaladas, para que se lea como un manojo
 * tupido y no como hojas sueltas. `preserveAspectRatio="none"` las estira
 * al ancho real del recuadro, así que quedan repartidas sin importar cuán
 * largo sea el nombre del producto.
 */
const ALGAE_BLADES: { d: string; fill: string; sway: string }[] = [
  { d: 'M2,100 Q3,89 8,78 Q9,89 6,100 Z', fill: 'fill-white/40', sway: 'algae-sway-2' },
  { d: 'M11,100 Q3,79 20,58 Q13,79 17,100 Z', fill: 'fill-white/80', sway: 'algae-sway-1' },
  { d: 'M26,100 Q23,87 24,74 Q29,87 30,100 Z', fill: 'fill-white/45', sway: 'algae-sway-3' },
  { d: 'M39,100 Q39,84 34,68 Q49,84 45,100 Z', fill: 'fill-white/55', sway: 'algae-sway-2' },
  { d: 'M54,100 Q56,86 61,72 Q62,86 58,100 Z', fill: 'fill-white/40', sway: 'algae-sway-4' },
  { d: 'M67,100 Q61,78 78,55 Q71,78 73,100 Z', fill: 'fill-white/70', sway: 'algae-sway-3' },
  { d: 'M79,100 Q80,85 85,70 Q86,85 83,100 Z', fill: 'fill-white/60', sway: 'algae-sway-4' },
  { d: 'M95,100 Q95,85 90,70 Q105,85 101,100 Z', fill: 'fill-white/50', sway: 'algae-sway-1' },
  { d: 'M110,100 Q107,88 107,76 Q113,88 114,100 Z', fill: 'fill-white/45', sway: 'algae-sway-2' },
  { d: 'M123,100 Q117,80 134,60 Q127,80 129,100 Z', fill: 'fill-white/75', sway: 'algae-sway-2' },
  { d: 'M139,100 Q136,86 133,73 Q131,86 135,100 Z', fill: 'fill-white/35', sway: 'algae-sway-1' },
  { d: 'M151,100 Q151,84 146,68 Q161,84 157,100 Z', fill: 'fill-white/55', sway: 'algae-sway-3' },
  { d: 'M166,100 Q168,87 173,74 Q174,87 170,100 Z', fill: 'fill-white/40', sway: 'algae-sway-1' },
  { d: 'M179,100 Q173,78 190,56 Q183,78 185,100 Z', fill: 'fill-white/70', sway: 'algae-sway-4' },
  { d: 'M192,100 Q193,88 198,76 Q199,88 196,100 Z', fill: 'fill-white/45', sway: 'algae-sway-3' },
];

/**
 * El recuadro verde con letra blanca que estrenó la placa "Certificado por:".
 * Todo rótulo del sitio que vaya encerrado en un recuadro sale de aquí, para
 * que el relleno, el radio y el color no se separen entre secciones.
 */
const tamanos: Record<Tamano, string> = {
  sm: 'px-3 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm',
  md: 'px-4 py-2 text-base sm:px-6 sm:py-2.5 sm:text-lg',
  lg: 'px-5 py-2.5 text-xl sm:px-8 sm:py-3 sm:text-3xl',
};

export default function BoxedLabel({
  children,
  as: Tag = 'span',
  size = 'md',
  className = '',
  animated = false,
}: BoxedLabelProps) {
  return (
    <Tag
      className={`bg-gp-green font-display relative inline-block overflow-hidden rounded-xl font-semibold tracking-wide text-white shadow-lg ${tamanos[size]} ${className}`}
    >
      {animated && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {ALGAE_BLADES.map((blade, i) => (
            <g
              key={i}
              className={blade.sway}
              style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            >
              <path d={blade.d} className={blade.fill} />
            </g>
          ))}
        </svg>
      )}
      <span className="relative">{children}</span>
    </Tag>
  );
}
