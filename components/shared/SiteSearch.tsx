'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ease } from '@/lib/motion';

interface Resultado {
  label: string;
  sub?: string;
  href: string;
  group: string;
  /** Palabras extra por las que también debe encontrarse la entrada. */
  keywords?: string;
  /** Desempate cuando dos resultados puntúan igual (menor = primero). */
  priority: number;
}

interface SiteSearchProps {
  open: boolean;
  onClose: () => void;
  dictionary: any;
  lang: string;
}

/** Sin tildes y en minúsculas, para que "organico" encuentre "orgánico". */
function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Además sin espacios ni signos, para que "greenprod" encuentre "Green Prod". */
function clave(texto: string) {
  return normalizar(texto).replace(/[^a-z0-9]/g, '');
}

/**
 * Menor puntaje = más relevante. Se mira primero el nombre, después las
 * palabras clave y recién al final la descripción. Así, al buscar la marca,
 * gana la página principal y no una sección interna que solo la menciona de
 * paso en su texto.
 */
function puntuar(r: Resultado, q: string) {
  const nombre = clave(r.label);
  if (nombre === q) return 0;
  if (nombre.startsWith(q)) return 1;
  if (nombre.includes(q)) return 2;
  if (r.keywords && clave(r.keywords).includes(q)) return 3;
  if (r.sub && clave(r.sub).includes(q)) return 4;
  return -1;
}

/**
 * Buscador del sitio. El índice se arma con el propio diccionario, así que no
 * hay una lista aparte que se pueda desincronizar de lo que se publica.
 *
 * El panel vive en un componente propio que solo existe mientras está
 * abierto: así arranca siempre vacío sin tener que reiniciar estado a mano.
 */
export default function SiteSearch({ open, onClose, dictionary, lang }: SiteSearchProps) {
  // El bloqueo del scroll y la tecla Escape se manejan acá y no dentro del
  // panel: así se liberan apenas se cierra, sin esperar a que termine la
  // animación de salida. Si esa animación no llegara a completarse, la
  // página quedaría trabada sin poder desplazarse.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previo;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && <PanelBusqueda onClose={onClose} dictionary={dictionary} lang={lang} />}
    </AnimatePresence>
  );
}

function PanelBusqueda({
  onClose,
  dictionary,
  lang,
}: {
  onClose: () => void;
  dictionary: any;
  lang: string;
}) {
  const d = dictionary.Navbar;
  const router = useRouter();
  const [consulta, setConsulta] = useState('');
  const [activo, setActivo] = useState(0);

  const indice = useMemo<Resultado[]>(() => {
    const categorias = dictionary.Catalog.categories as {
      slug: string;
      name: string;
      products: string[];
    }[];
    const p = (ruta: string) => `/${lang}${ruta}`;

    const lineas: Resultado[] = categorias.map((c) => ({
      label: c.name,
      sub: c.products.join(' · '),
      href: p(`/catalogo/${c.slug}`),
      group: d.products,
      priority: 2,
    }));

    const productos: Resultado[] = categorias.flatMap((c) =>
      c.products.map((prod) => ({
        label: prod,
        sub: c.name,
        href: p(`/catalogo/${c.slug}`),
        group: d.products,
        priority: 3,
      }))
    );

    const servicios: Resultado[] = [
      { label: d.balik, sub: d.balik_desc, href: p('/productos-y-servicios/balik') },
      { label: d.Ceprobio, sub: d.Ceprobio_desc, href: p('/productos-y-servicios/ceprobio') },
      { label: d.planta, sub: d.planta_desc, href: p('/productos-y-servicios/planta-tratamiento') },
      { label: d.proyectos, sub: d.proyectos_desc, href: p('/productos-y-servicios/proyectos') },
    ].map((x) => ({ ...x, group: d.services, priority: 4 }));

    // La portada lleva el nombre de la empresa como palabra clave: buscar la
    // marca tiene que llevar a la página principal, no a una sección interna
    // que solo la nombra dentro de su descripción.
    const paginas: Resultado[] = [
      {
        label: d.home,
        href: p(''),
        keywords: 'greenprod green prod sustainable sac principal portada home',
        priority: 0,
      },
      { label: d.about, href: p('/nosotros'), keywords: 'nosotros empresa', priority: 1 },
      {
        label: d.who_we_are,
        sub: d.who_we_are_desc,
        href: p('/nosotros/quienes-somos'),
        keywords: 'quienes somos mision vision valores',
        priority: 1,
      },
      {
        label: d.our_history,
        sub: d.our_history_desc,
        href: p('/nosotros/nuestra-trayectoria'),
        keywords: 'historia trayectoria',
        priority: 1,
      },
      {
        label: dictionary.Catalog.title,
        href: p('/catalogo'),
        keywords: 'catalogo productos lineas bioinsumos',
        priority: 1,
      },
      {
        label: d.contact,
        href: p('/contacto'),
        // "contacto" no es subcadena de "Contáctanos": sin esto no se encuentra.
        keywords: 'contacto contactanos telefono correo email direccion ubicacion whatsapp',
        priority: 1,
      },
      {
        label: d.assistant,
        href: p('/asistente-ia'),
        keywords: 'asistente ia inteligencia artificial chat ayuda',
        priority: 1,
      },
    ].map((x) => ({ ...x, group: d.products_services_title }));

    return [...lineas, ...productos, ...servicios, ...paginas];
  }, [dictionary, lang, d]);

  const resultados = useMemo(() => {
    const q = clave(consulta);
    if (!q) return [];
    return indice
      .map((r) => ({ r, s: puntuar(r, q) }))
      .filter((x) => x.s >= 0)
      .sort(
        (a, b) => a.s - b.s || a.r.priority - b.r.priority || a.r.label.localeCompare(b.r.label)
      )
      .slice(0, 8)
      .map((x) => x.r);
  }, [consulta, indice]);

  const ir = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActivo((i) => Math.min(i + 1, resultados.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActivo((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && resultados[activo]) {
      e.preventDefault();
      ir(resultados[activo].href);
    }
  };

  const hayConsulta = consulta.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-24 sm:pt-32"
    >
      <button
        type="button"
        aria-label={d.search_close}
        onClick={onClose}
        className="bg-ink/50 absolute inset-0 cursor-default backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25, ease: ease.growth }}
        className="bg-paper relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={d.search}
      >
        <div className="border-line-warm/40 flex items-center gap-3 border-b px-4 py-3">
          <Search className="text-ink/40 h-5 w-5 shrink-0" />
          <input
            // Es un diálogo de búsqueda: al abrirlo, el foco en el campo es
            // justamente lo que se espera.
            autoFocus
            type="text"
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value);
              setActivo(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={d.search_placeholder}
            aria-label={d.search}
            className="text-ink placeholder:text-ink/40 min-w-0 flex-1 bg-transparent text-base outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={d.search_close}
            className="text-ink/40 hover:text-ink shrink-0 rounded-full p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {!hayConsulta && <p className="text-ink/45 px-5 py-6 text-sm">{d.search_hint}</p>}

          {hayConsulta && resultados.length === 0 && (
            <p className="text-ink/60 px-5 py-6 text-sm">
              {d.search_no_results} <span className="font-semibold">«{consulta.trim()}»</span>
            </p>
          )}

          {resultados.map((r, i) => (
            <button
              key={`${r.href}-${r.label}`}
              type="button"
              onMouseEnter={() => setActivo(i)}
              onClick={() => ir(r.href)}
              className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${
                i === activo ? 'bg-gp-green/15' : 'hover:bg-husk/40'
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="text-ink block text-sm font-semibold">{r.label}</span>
                {r.sub && <span className="text-ink/50 block truncate text-xs">{r.sub}</span>}
              </span>
              <span className="text-ink/35 shrink-0 text-[10px] tracking-wide uppercase">
                {r.group}
              </span>
              {i === activo && <CornerDownLeft className="text-gp-green h-4 w-4 shrink-0" />}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
