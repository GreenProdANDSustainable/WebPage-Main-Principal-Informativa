import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Linkedin,
  Factory,
  FlaskConical,
  Microscope,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import TikTokIcon from '@/components/shared/TikTokIcon';
import { PERU_DEPT_PATHS, PERU_CITIES } from '@/lib/peru-map-data';

/** Iconos del bloque "Contamos con:", por clave del diccionario. */
const ICONOS_CAPACIDAD: Record<string, LucideIcon> = {
  planta: Factory,
  bioinsumos: FlaskConical,
  laboratorio: Microscope,
  equipo: Users,
};

interface Capacidad {
  icon: string;
  text: string;
  figure?: string;
}

// El relleno se arma con las mismas 26 piezas departamentales que se
// dibujan como líneas divisorias, así el contorno nunca puede quedar por
// fuera de las líneas: son literalmente los mismos trazos.
const PERU_FILL_PATH = PERU_DEPT_PATHS.join(' ');

/**
 * El lienzo original (0 0 1017 967) lo llenaba justo el rótulo más largo de
 * cada lado. Con los rótulos 1.36x más grandes hace falta margen a ambos
 * costados: sin él, el propio `svg` recorta el texto que se sale.
 */
const VIEWBOX_ROTULOS = '-45 0 1140 967';

interface ReachMapSectionProps {
  dict: any;
}

/** Glifo de pin (mismo trazo que lucide "map-pin"), con la punta en (12, 21.8). */
const PIN_PATH =
  'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0';
const PIN_SCALE = 1.2;

/** Caída de la primera línea de texto respecto de la guía (ver el script que
 *  genera peru-map-data: reserva blockH = 22 / 37 contando este valor). */
const TEXT_DY = 24;

/** Salto a la segunda línea del rótulo (el departamento). */
const TEXT_DY2 = 19;

/**
 * Los rótulos se veían diminutos, así que crecen 1.36x. `blockW` de
 * peru-map-data se calculó para el tamaño anterior, de modo que la cola de
 * la guía se estira en la misma proporción para seguir quedando debajo del
 * texto. El hueco vertical más justo entre dos rótulos es de 33 unidades
 * contra un bloque de 22, así que a 1.36x todavía no se tocan.
 */
const LABEL_SCALE = 1.36;

const socials = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/greenprodsustainable' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/greenprodsustainable' },
  { Icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@greenprodsustainable' },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/greenprod-sustainable-6a28663bb',
  },
];

/** "GreenProd llegó hasta": mapa del Perú con las ciudades cubiertas. */
export default function ReachMapSection({ dict }: ReachMapSectionProps) {
  const r = dict.Home.reach;

  return (
    <section id="cobertura" className="relative overflow-hidden py-24">
      {/* Foto de campo como fondo del apartado (no del mapa, que sigue
          blanco): lleva un velo oscuro encima para que el texto blanco y
          los verdes de acento sigan leyéndose bien. */}
      <Image
        src="/images/home/banners/fondo-hero.webp"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="object-cover"
      />
      <div className="bg-ink-soft/75 absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal preset="growUp">
          <h2 className="font-display text-paper mb-10 flex flex-wrap items-center justify-center gap-3 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="relative h-12 w-40 shrink-0 sm:h-16 sm:w-56">
              <Image
                src="/greenprod blanco png.png"
                alt={`${r.titleLead} ${r.titleTail}`}
                fill
                sizes="224px"
                className="object-contain"
              />
            </span>
            {r.titleTail}
          </h2>
        </Reveal>

        {/* El mapa se lleva todo el ancho que sobra y la columna de la derecha
            queda fija y angosta: así el mapa corre hacia la izquierda. */}
        <div className="flex flex-col items-center gap-12 xl:flex-row xl:items-center xl:gap-12">
          <div className="w-full xl:min-w-0 xl:flex-1">
            <Reveal preset="rootScale" soft>
              {/* Hasta lg el lienzo se agranda y se recorta el margen que
                  ocupan los rótulos (que ahí van en la lista de abajo), para
                  que el país se vea lo más grande posible. */}
              <div className="overflow-hidden lg:overflow-visible">
                {/* 145%: el país ocupa el 62.9% del lienzo, así llena el ancho
                    sin recortarse. El 46.2% (y no 50%) centra el PAÍS, no el
                    lienzo, que es más ancho del lado del rótulo de Junín. */}
                <svg
                  viewBox={VIEWBOX_ROTULOS}
                  className="relative left-1/2 w-[162%] max-w-none -translate-x-[45.2%] lg:left-0 lg:w-[108%] lg:-translate-x-[4%] xl:w-[110%] xl:-translate-x-[6%] 2xl:w-[122%] 2xl:-translate-x-[14%]"
                  aria-hidden="true"
                >
                  <path d={PERU_FILL_PATH} className="fill-paper/90" />
                  {/* Límites departamentales, como en la referencia del usuario. */}
                  {PERU_DEPT_PATHS.map((d, i) => (
                    <path
                      key={i}
                      d={d}
                      fill="none"
                      className="stroke-gp-blue/45"
                      strokeWidth={1.25}
                      strokeLinejoin="round"
                    />
                  ))}

                  {PERU_CITIES.map((city, i) => {
                    // La guía sale del pin, llega al costado del mapa y sigue
                    // en horizontal a lo ancho del rótulo, que va justo debajo.
                    const ancho = city.blockW * LABEL_SCALE;
                    const tailX = city.side === 'left' ? city.railX - ancho : city.railX + ancho;
                    const anchor = city.side === 'left' ? 'end' : 'start';
                    return (
                      <g key={i} className="group cursor-default outline-none" tabIndex={0}>
                        {/* Guía y rótulo solo desde lg: por debajo de ese ancho el
                            mapa es chico y el texto quedaría ilegible. Va en dos
                            tramos porque cruza dos fondos distintos: el primero
                            sobre el país blanco, el segundo sobre la foto oscura
                            del apartado. */}
                        <polyline
                          points={`${city.x},${city.y} ${city.railX},${city.labelY}`}
                          fill="none"
                          className="stroke-ink/35 group-hover:stroke-gp-green hidden transition-colors duration-300 lg:block"
                          strokeWidth={1.4}
                          strokeLinejoin="round"
                        />
                        <polyline
                          points={`${city.railX},${city.labelY} ${tailX},${city.labelY}`}
                          fill="none"
                          className="stroke-paper/40 group-hover:stroke-gp-green hidden transition-colors duration-300 lg:block"
                          strokeWidth={1.4}
                          strokeLinejoin="round"
                        />

                        {/* Pin: la punta queda exactamente sobre (city.x, city.y). */}
                        <g transform={`translate(${city.x}, ${city.y}) scale(${PIN_SCALE})`}>
                          <g
                            className="transition-transform duration-300 ease-out group-hover:[transform:scale(1.35)] group-focus:[transform:scale(1.35)]"
                            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                          >
                            <path
                              d={PIN_PATH}
                              transform="translate(-12,-21.8)"
                              className="fill-ink group-hover:fill-gp-green transition-colors duration-300"
                            />
                            <circle
                              cx={0}
                              cy={-11.8}
                              r={2.6}
                              className="fill-gp-green transition-colors duration-300 group-hover:fill-white"
                            />
                          </g>
                        </g>

                        <text
                          x={city.railX}
                          y={city.labelY + TEXT_DY}
                          textAnchor={anchor}
                          className="fill-paper group-hover:fill-gp-green font-display hidden text-[19px] font-semibold transition-colors duration-300 lg:block"
                        >
                          {city.label}
                          {city.detail && (
                            <tspan
                              x={city.railX}
                              dy={TEXT_DY2}
                              className="fill-paper/60 font-display text-[15px] font-normal"
                            >
                              {city.detail}
                            </tspan>
                          )}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </Reveal>

            {/* Hasta lg los nombres van aquí, a tamaño legible, en vez de
                dentro del mapa. */}
            <Reveal preset="growUp">
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3.5 lg:hidden">
                {PERU_CITIES.map((city) => (
                  <div key={city.label} className="flex items-start gap-2">
                    <span
                      className="bg-gp-green mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    {/* Tamaños en píxeles a propósito: en celular la raíz baja
                        a 13px (globals.css) y un text-xs quedaría en 9.75px. */}
                    <span className="text-paper text-[13px] leading-snug font-semibold">
                      {city.label}
                      {city.detail && (
                        <span className="text-paper/60 block text-[11px] font-normal">
                          {city.detail}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex w-full flex-col items-center gap-8 text-center xl:w-[17rem] xl:shrink-0 xl:items-start xl:text-left">
            <Reveal preset="slideInRight">
              <div className="w-full text-left">
                <h3 className="text-gp-green font-display mb-5 text-lg font-semibold">
                  {r.capabilities.title}
                </h3>
                <ul className="space-y-5">
                  {(r.capabilities.items as Capacidad[]).map((item) => {
                    const Icon = ICONOS_CAPACIDAD[item.icon] ?? Factory;
                    return (
                      <li key={item.text} className="flex items-start gap-3">
                        <Icon
                          className="text-gp-green mt-0.5 h-7 w-7 shrink-0"
                          strokeWidth={1.75}
                        />
                        <div>
                          <p className="text-paper text-base leading-snug">{item.text}</p>
                          {item.figure && (
                            <p className="text-gp-green mt-1 text-4xl font-bold sm:text-5xl">
                              {item.figure}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal preset="slideInRight" delay={0.2}>
              <div className="flex gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="border-paper/20 text-paper/70 hover:border-gp-green hover:bg-gp-green hover:text-ink flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
