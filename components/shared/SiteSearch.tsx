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

/**
 * Buscador del sitio. El índice se arma con el propio diccionario, así que no
 * hay una lista aparte que se pueda desincronizar de lo que se publica.
 *
 * El panel vive en un componente propio que solo existe mientras está
 * abierto: así arranca siempre vacío sin tener que reiniciar estado a mano.
 */
export default function SiteSearch({ open, onClose, dictionary, lang }: SiteSearchProps) {
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
    }));

    const productos: Resultado[] = categorias.flatMap((c) =>
      c.products.map((prod) => ({
        label: prod,
        sub: c.name,
        href: p(`/catalogo/${c.slug}`),
        group: d.products,
      }))
    );

    const servicios: Resultado[] = [
      { label: d.balik, sub: d.balik_desc, href: p('/productos-y-servicios/balik') },
      { label: d.Ceprobio, sub: d.Ceprobio_desc, href: p('/productos-y-servicios/ceprobio') },
      { label: d.planta, sub: d.planta_desc, href: p('/productos-y-servicios/planta-tratamiento') },
      { label: d.proyectos, sub: d.proyectos_desc, href: p('/productos-y-servicios/proyectos') },
    ].map((x) => ({ ...x, group: d.services }));

    const paginas: Resultado[] = [
      { label: d.home, href: p('') },
      { label: d.about, href: p('/nosotros') },
      { label: d.who_we_are, sub: d.who_we_are_desc, href: p('/nosotros/quienes-somos') },
      { label: d.our_history, sub: d.our_history_desc, href: p('/nosotros/nuestra-trayectoria') },
      { label: dictionary.Catalog.title, href: p('/catalogo') },
      { label: d.contact, href: p('/contacto') },
      { label: d.assistant, href: p('/asistente-ia') },
    ].map((x) => ({ ...x, group: d.products_services_title }));

    return [...lineas, ...productos, ...servicios, ...paginas];
  }, [dictionary, lang, d]);

  const resultados = useMemo(() => {
    const q = normalizar(consulta.trim());
    if (!q) return [];
    return indice.filter((r) => normalizar(`${r.label} ${r.sub ?? ''}`).includes(q)).slice(0, 8);
  }, [consulta, indice]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // Con el buscador abierto, la página de atrás no debe desplazarse.
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previo;
    };
  }, [onClose]);

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
