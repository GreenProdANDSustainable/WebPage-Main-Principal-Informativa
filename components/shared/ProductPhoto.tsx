import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { fotoDe } from '@/lib/tienda';

interface ProductPhotoProps {
  /** Slug del producto: la clave con la que se busca su foto. */
  id: string;
  name: string;
  /** Ancho reservado, para que Next no descargue una imagen enorme. */
  sizes: string;
  /** Texto del recuadro vacío. Se omite en las miniaturas del menú. */
  pendingLabel?: string;
  className?: string;
}

/**
 * El espacio de la foto de un producto, esté o no la foto.
 *
 * Mientras `FOTOS` no tenga el archivo, deja el hueco marcado en vez de un
 * enlace roto: así el sitio ya está armado para el día que lleguen las fotos
 * y se ve igual en el menú, en el catálogo y en la ficha.
 */
export default function ProductPhoto({
  id,
  name,
  sizes,
  pendingLabel,
  className = '',
}: ProductPhotoProps) {
  const foto = fotoDe(id);

  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-xl ${
        foto
          ? // Las fotos vienen recortadas sobre blanco: si el hueco fuera de
            // otro color, se veria el recuadro de la foto contra el fondo.
            'bg-white'
          : 'bg-husk/30 border-line-warm/50 flex flex-col items-center justify-center gap-2 border-2 border-dashed'
      } ${className}`}
    >
      {foto ? (
        <Image src={foto} alt={name} fill sizes={sizes} className="object-contain p-2" />
      ) : (
        <>
          <ImageOff className="text-ink/25 h-1/4 max-h-8 min-h-4 w-auto" />
          {pendingLabel && (
            <p className="text-ink/35 px-2 text-center text-[11px] tracking-wide uppercase">
              {pendingLabel}
            </p>
          )}
        </>
      )}
    </div>
  );
}
