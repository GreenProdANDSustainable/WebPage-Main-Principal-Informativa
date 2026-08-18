'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Cookie } from 'lucide-react';
import {
  guardarConsentimiento,
  hayDecision,
  hayDecisionEnServidor,
  suscribirConsentimiento,
} from '@/lib/consentimiento';

interface CookieBannerProps {
  dict: any;
  lang: string;
}

/**
 * El aviso de cookies.
 *
 * Aparece solo si todavía no hay una decisión vigente, y las tres salidas
 * pesan lo mismo: aceptar todo no está más a mano que aceptar lo mínimo. Es
 * lo que pide la ley y, de paso, lo que evita que la gente acepte sin leer.
 *
 * No se escribe nada de medición hasta que la persona diga que sí.
 */
export default function CookieBanner({ dict, lang }: CookieBannerProps) {
  const c = dict.Cookies;
  const [detalle, setDetalle] = useState(false);
  const [medicion, setMedicion] = useState(true);

  // localStorage es un sistema externo: se lee así, sin efecto que copie el
  // valor a un estado. El aviso solo aparece si no hay decisión vigente.
  const decidido = useSyncExternalStore(
    suscribirConsentimiento,
    hayDecision,
    hayDecisionEnServidor
  );
  const visible = !decidido;

  const decidir = (aceptaMedicion: boolean) => {
    guardarConsentimiento(aceptaMedicion);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label={c.title}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="border-line-warm/50 bg-paper pointer-events-auto mx-auto max-w-3xl rounded-2xl border p-5 shadow-2xl sm:p-6">
            <div className="flex items-start gap-4">
              <span className="bg-gp-green/10 text-gp-green hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:flex">
                <Cookie className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-ink text-base font-bold">{c.title}</h2>
                <p className="text-ink/70 mt-1.5 text-sm">{c.body}</p>

                <AnimatePresence>
                  {detalle && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-line-warm/40 mt-4 space-y-3 border-t pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-ink text-sm font-bold">{c.essentialTitle}</p>
                            <p className="text-ink/60 text-xs">{c.essentialDesc}</p>
                          </div>
                          <span className="text-gp-green shrink-0 text-xs font-bold">
                            {c.essentialAlways}
                          </span>
                        </div>
                        <label className="flex cursor-pointer items-start justify-between gap-4">
                          <span className="min-w-0">
                            <span className="text-ink block text-sm font-bold">
                              {c.analyticsTitle}
                            </span>
                            <span className="text-ink/60 block text-xs">{c.analyticsDesc}</span>
                          </span>
                          <input
                            type="checkbox"
                            checked={medicion}
                            onChange={(e) => setMedicion(e.target.checked)}
                            className="accent-gp-green mt-1 h-4 w-4 shrink-0"
                          />
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Lo que las cookies no hacen, dicho donde se lee. */}
                <p className="text-ink/50 mt-3 text-xs">{c.note}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {detalle ? (
                    <button
                      type="button"
                      onClick={() => decidir(medicion)}
                      className="bg-gp-green hover:bg-husk hover:text-ink rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors"
                    >
                      {c.save}
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => decidir(true)}
                        className="bg-gp-green hover:bg-husk hover:text-ink rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors"
                      >
                        {c.accept}
                      </button>
                      <button
                        type="button"
                        onClick={() => decidir(false)}
                        className="border-line-warm/60 text-ink hover:border-gp-green hover:text-gp-green rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors"
                      >
                        {c.essentialOnly}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetalle(true)}
                        className="text-ink/60 hover:text-gp-green px-3 py-2.5 text-sm font-semibold underline transition-colors"
                      >
                        {c.settings}
                      </button>
                    </>
                  )}
                  <Link
                    href={`/${lang}/privacidad`}
                    className="text-ink/50 hover:text-gp-green w-full text-xs font-semibold underline transition-colors sm:ml-auto sm:w-auto"
                  >
                    {c.privacyLink}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
