'use client';

import Link from 'next/link';
import {
  CalendarCheck,
  MapPin,
  MessageCircle,
  Newspaper,
  PackageSearch,
  Sprout,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { trackLead } from '@/lib/track';

const WHATSAPP =
  'https://wa.me/51919514085?text=' +
  encodeURIComponent('Hola GreenProd, los encontré por redes y quiero más información.');

const MAPS = 'https://www.google.com/maps?q=AA.HH.+Tres+Estrellas,+Nuevo+Chimbote,+Ancash,+Peru';

interface EnlacesDict {
  whatsapp: string;
  cotiza: string;
  catalogo: string;
  nosotros: string;
  novedades: string;
  ubicacion: string;
}

const ICONOS: Record<keyof EnlacesDict, LucideIcon> = {
  whatsapp: MessageCircle,
  cotiza: CalendarCheck,
  catalogo: PackageSearch,
  nosotros: Sprout,
  novedades: Newspaper,
  ubicacion: MapPin,
};

/**
 * El "árbol de enlaces" que va en el enlace de la biografía de Instagram y
 * Facebook. Cada botón registra desde dónde salió el toque para poder medir
 * qué mueve a la gente.
 */
export default function LinkTree({ d, lang }: { d: EnlacesDict; lang: string }) {
  const registrar = (destino: string) => () => trackLead('enlace_bio_click', { destino });

  return (
    <nav className="flex w-full max-w-md flex-col gap-3">
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        onClick={registrar('whatsapp')}
        className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-5 w-5 shrink-0" />
        {d.whatsapp}
      </a>

      <BotonInterno href={`/${lang}/cotiza`} onClick={registrar('cotiza')} icono={ICONOS.cotiza}>
        {d.cotiza}
      </BotonInterno>
      <BotonInterno
        href={`/${lang}/catalogo`}
        onClick={registrar('catalogo')}
        icono={ICONOS.catalogo}
      >
        {d.catalogo}
      </BotonInterno>
      <BotonInterno
        href={`/${lang}/nosotros`}
        onClick={registrar('nosotros')}
        icono={ICONOS.nosotros}
      >
        {d.nosotros}
      </BotonInterno>
      <BotonInterno
        href={`/${lang}/nosotros/nuestra-trayectoria`}
        onClick={registrar('novedades')}
        icono={ICONOS.novedades}
      >
        {d.novedades}
      </BotonInterno>

      <a
        href={MAPS}
        target="_blank"
        rel="noopener noreferrer"
        onClick={registrar('ubicacion')}
        className="border-line-warm/50 text-ink hover:border-gp-green flex items-center gap-3 rounded-2xl border-2 bg-white px-5 py-4 font-bold transition-colors"
      >
        <MapPin className="h-5 w-5 shrink-0" />
        {d.ubicacion}
      </a>
    </nav>
  );
}

function BotonInterno({
  href,
  onClick,
  icono: Icono,
  children,
}: {
  href: string;
  onClick: () => void;
  icono: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="border-line-warm/50 text-ink hover:border-gp-green flex items-center gap-3 rounded-2xl border-2 bg-white px-5 py-4 font-bold transition-colors"
    >
      <Icono className="h-5 w-5 shrink-0" />
      {children}
    </Link>
  );
}
