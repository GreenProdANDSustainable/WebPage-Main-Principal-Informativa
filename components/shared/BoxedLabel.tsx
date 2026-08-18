import type { ElementType, ReactNode } from 'react';

type Tamano = 'sm' | 'md' | 'lg';

interface BoxedLabelProps {
  children: ReactNode;
  /** Etiqueta HTML a usar; por defecto `span`. Los títulos pasan `h1`…`h3`. */
  as?: ElementType;
  size?: Tamano;
  className?: string;
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
}: BoxedLabelProps) {
  return (
    <Tag
      className={`bg-gp-green font-display inline-block rounded-xl font-semibold tracking-wide text-white shadow-lg ${tamanos[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
