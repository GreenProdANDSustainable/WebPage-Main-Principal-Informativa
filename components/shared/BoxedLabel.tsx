import type { ElementType, ReactNode } from 'react';
import { Leaf } from 'lucide-react';

type Tamano = 'sm' | 'md' | 'lg';

interface BoxedLabelProps {
  children: ReactNode;
  /** Etiqueta HTML a usar; por defecto `span`. Los títulos pasan `h1`…`h3`. */
  as?: ElementType;
  size?: Tamano;
  className?: string;
  /** Tres hojas leves flotando dentro del recuadro. Ver ProductsSection. */
  animated?: boolean;
}

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
        <span className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Leaf className="leaf-drift-1 absolute top-1.5 left-2.5 h-3 w-3 text-white" />
          <Leaf className="leaf-drift-2 absolute right-3 bottom-2 h-2.5 w-2.5 text-white" />
          <Leaf className="leaf-drift-3 absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 text-white" />
        </span>
      )}
      <span className="relative">{children}</span>
    </Tag>
  );
}
