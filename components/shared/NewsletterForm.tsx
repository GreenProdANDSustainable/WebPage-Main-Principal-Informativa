'use client';

import { useState } from 'react';
import { Check, Mail } from 'lucide-react';

interface NewsletterFormProps {
  dict: any;
  className?: string;
}

const WHATSAPP_NUMBER = '51919514085';

/**
 * Suscripción a novedades y descuentos.
 *
 * Va aparte del aviso de cookies a propósito: aceptar cookies no es aceptar
 * publicidad. Acá la persona escribe su correo y marca una casilla que dice
 * exactamente qué va a recibir — es el único consentimiento que la Ley 29733
 * da por válido para enviar correos comerciales, y la casilla arranca
 * desmarcada porque una premarcada no vale como aceptación.
 *
 * Todavía no hay servicio de envío conectado (Mailchimp, Brevo o similar),
 * así que la suscripción le llega al asesor por WhatsApp y él la anota. Al
 * conectar el servicio, lo único que cambia es el envío.
 */
export default function NewsletterForm({ dict, className = '' }: NewsletterFormProps) {
  const n = dict.Newsletter;
  const [correo, setCorreo] = useState('');
  const [acepta, setAcepta] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  const enviar = (evento: React.FormEvent) => {
    evento.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())) {
      setError(n.errorEmail);
      return;
    }
    if (!acepta) {
      setError(n.errorConsent);
      return;
    }

    setError(null);
    const mensaje = `${n.title}: ${correo.trim()}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setListo(true);
  };

  if (listo) {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <span className="bg-gp-green flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="text-paper text-sm font-bold">{n.pendingTitle}</p>
          <p className="text-paper/60 mt-1 text-xs">{n.pendingBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className={`space-y-3 ${className}`}>
      <div>
        <label
          htmlFor="boletin-correo"
          className="text-paper/80 mb-1.5 block text-sm font-semibold"
        >
          {n.emailLabel}
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="text-ink/30 pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              id="boletin-correo"
              type="email"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                setError(null);
              }}
              placeholder={n.emailPlaceholder}
              autoComplete="email"
              className="text-ink focus:border-gp-green w-full rounded-full border-2 border-transparent bg-white py-2.5 pr-4 pl-9 text-sm transition-colors outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-gp-green hover:bg-husk hover:text-ink shrink-0 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors"
          >
            {n.submit}
          </button>
        </div>
      </div>

      {/* Desmarcada de origen: una casilla premarcada no es consentimiento. */}
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={acepta}
          onChange={(e) => {
            setAcepta(e.target.checked);
            setError(null);
          }}
          className="accent-gp-green mt-0.5 h-4 w-4 shrink-0"
        />
        <span className="text-paper/60 text-xs leading-snug">{n.consent}</span>
      </label>

      {error && <p className="text-gp-green text-xs font-bold">{error}</p>}

      <p className="text-paper/40 text-xs">{n.unsubscribe}</p>
    </form>
  );
}
