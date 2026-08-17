import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { PERU_VIEWBOX, PERU_DEPT_PATHS, PERU_CITIES } from '@/lib/peru-map-data';

// El relleno se arma con las mismas 26 piezas departamentales que se
// dibujan como líneas divisorias, así el contorno nunca puede quedar por
// fuera de las líneas: son literalmente los mismos trazos.
const PERU_FILL_PATH = PERU_DEPT_PATHS.join(' ');

interface ReachMapSectionProps {
  dict: any;
}

/** Glifo de pin (mismo trazo que lucide "map-pin"), con la punta en (12, 21.8). */
const PIN_PATH =
  'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0';
const PIN_SCALE = 0.85;

/** Caída de la primera línea de texto respecto de la guía (ver el script que
 *  genera peru-map-data: reserva blockH = 22 / 37 contando este valor). */
const TEXT_DY = 18;

const socials = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/greenprodsustainable' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/greenprodsustainable' },
];

/** "GreenProd llegó hasta": mapa del Perú con las ciudades cubiertas. */
export default function ReachMapSection({ dict }: ReachMapSectionProps) {
  const r = dict.Home.reach;

  return (
    <section id="cobertura" className="bg-gp-blue py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal preset="growUp">
          <h2 className="font-display text-paper mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gp-green">{r.titleLead}</span> {r.titleTail}
          </h2>
        </Reveal>

        <div className="flex flex-col items-center gap-12 xl:flex-row xl:items-center xl:gap-16">
          <div className="w-full xl:flex-1">
            <Reveal preset="rootScale" soft>
              {/* Hasta lg el lienzo se agranda y se recorta el margen que
                  ocupan los rótulos (que ahí van en la lista de abajo), para
                  que el país se vea lo más grande posible. */}
              <div className="overflow-hidden lg:overflow-visible">
                {/* 145%: el país ocupa el 62.9% del lienzo, así llena el ancho
                    sin recortarse. El 46.2% (y no 50%) centra el PAÍS, no el
                    lienzo, que es más ancho del lado del rótulo de Junín. */}
                <svg
                  viewBox={PERU_VIEWBOX}
                  className="relative left-1/2 w-[145%] max-w-none -translate-x-[46.2%] lg:left-0 lg:w-full lg:translate-x-0"
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
                    const tailX =
                      city.side === 'left' ? city.railX - city.blockW : city.railX + city.blockW;
                    const anchor = city.side === 'left' ? 'end' : 'start';
                    return (
                      <g key={i} className="group cursor-default outline-none" tabIndex={0}>
                        {/* Guía y rótulo solo desde lg: por debajo de ese ancho el
                            mapa es chico y el texto quedaría ilegible. */}
                        <polyline
                          points={`${city.x},${city.y} ${city.railX},${city.labelY} ${tailX},${city.labelY}`}
                          fill="none"
                          className="stroke-ink/35 group-hover:stroke-gp-green hidden transition-colors duration-300 lg:block"
                          strokeWidth={1}
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
                          className="fill-ink group-hover:fill-gp-green font-display hidden text-[14px] font-semibold transition-colors duration-300 lg:block"
                        >
                          {city.label}
                          {city.detail && (
                            <tspan
                              x={city.railX}
                              dy="14"
                              className="fill-ink/60 font-display text-[11px] font-normal"
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

          <div className="flex flex-col items-center gap-8 text-center xl:items-start xl:text-left">
            <Reveal preset="slideInRight">
              <div className="relative h-14 w-40 md:h-16 md:w-44">
                <Image
                  src="/greenprod blanco png.png"
                  alt="Green Prod & Sustainable S.A.C"
                  fill
                  className="object-contain"
                />
              </div>
            </Reveal>

            <Reveal preset="slideInRight" delay={0.1}>
              <div className="flex flex-col items-center gap-3 xl:items-start">
                <span className="text-paper/70 font-display text-sm font-semibold tracking-wide uppercase">
                  {r.qrLabel}
                </span>
                <div className="h-36 w-36 overflow-hidden rounded-2xl bg-white p-2">
                  <Image
                    src="/images/home/qr-greenprod.jpg"
                    alt={r.qrLabel}
                    width={288}
                    height={288}
                    className="h-full w-full object-contain"
                  />
                </div>
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
