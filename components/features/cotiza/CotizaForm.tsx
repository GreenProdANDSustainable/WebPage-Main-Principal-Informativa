'use client';

import { useState } from 'react';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import { leerUtm, trackLead } from '@/lib/track';

const WHATSAPP_NUMBER = '51919514085';

interface Formulario {
  nombre: string;
  cultivo: string;
  hectareas: string;
  zona: string;
  telefono: string;
  problema: string;
  mensaje: string;
}

const VACIO: Formulario = {
  nombre: '',
  cultivo: '',
  hectareas: '',
  zona: '',
  telefono: '',
  problema: '',
  mensaje: '',
};

const OBLIGATORIOS: (keyof Formulario)[] = ['nombre', 'cultivo', 'zona', 'telefono', 'problema'];

interface CotizaFormProps {
  /** Sub-diccionario dictionary.Pages.cotiza. */
  d: any;
}

/**
 * Pide una cotización de bioinsumos. Igual que el checkout del sitio, no hay
 * backend todavía: el botón arma un mensaje ordenado y abre WhatsApp con el
 * asesor. Además adjunta el origen (UTM) para saber si el lead vino de
 * Instagram, Facebook o Google Ads, y registra el evento de conversión.
 */
export default function CotizaForm({ d }: CotizaFormProps) {
  const [datos, setDatos] = useState<Formulario>(VACIO);
  const [errores, setErrores] = useState<Partial<Record<keyof Formulario, string>>>({});
  const [intentado, setIntentado] = useState(false);

  const set = (campo: keyof Formulario) => (valor: string) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    if (intentado) setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  const validar = () => {
    const e: Partial<Record<keyof Formulario, string>> = {};
    for (const campo of OBLIGATORIOS) {
      if (!datos[campo].trim()) e[campo] = d.form.errorRequired;
    }
    if (datos.telefono.trim() && datos.telefono.replace(/\D/g, '').length !== 9) {
      e.telefono = d.form.errorPhone;
    }
    return e;
  };

  /** El pedido tal cual le llega al asesor por WhatsApp. */
  const armarMensaje = () => {
    const utm = leerUtm();
    const origen = utm.utm_source
      ? `${utm.utm_source}${utm.utm_campaign ? ` / ${utm.utm_campaign}` : ''}`
      : d.form.origenDirecto;

    const partes: (string | null)[] = [
      `*${d.form.mensajeTitulo}*`,
      '',
      `${d.form.nombre}: ${datos.nombre}`,
      `${d.form.cultivo}: ${datos.cultivo}`,
      datos.hectareas.trim() ? `${d.form.hectareas}: ${datos.hectareas}` : null,
      `${d.form.zona}: ${datos.zona}`,
      `${d.form.telefono}: ${datos.telefono}`,
      `${d.form.problema}: ${datos.problema}`,
      datos.mensaje.trim() ? `${d.form.mensaje}: ${datos.mensaje}` : null,
      '',
      `${d.form.origen}: ${origen}`,
    ];

    return partes.filter((linea) => linea !== null).join('\n');
  };

  const enviar = (evento: React.FormEvent) => {
    evento.preventDefault();
    setIntentado(true);

    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) {
      document.querySelector('[data-error="true"]')?.scrollIntoView({ block: 'center' });
      return;
    }

    trackLead('cotizacion_enviada', {
      cultivo: datos.cultivo.toLowerCase(),
      problema: datos.problema,
      zona: datos.zona.toLowerCase(),
      ...leerUtm(),
    });

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(armarMensaje())}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <form
      onSubmit={enviar}
      className="border-line-warm/40 bg-husk/20 space-y-5 rounded-2xl border p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Campo
          id="nombre"
          etiqueta={d.form.nombre}
          valor={datos.nombre}
          onChange={set('nombre')}
          error={errores.nombre}
          autoComplete="name"
        />
        <Campo
          id="telefono"
          etiqueta={d.form.telefono}
          tipo="tel"
          inputMode="tel"
          valor={datos.telefono}
          onChange={set('telefono')}
          error={errores.telefono}
          autoComplete="tel"
          maxLength={12}
        />
        <Campo
          id="cultivo"
          etiqueta={d.form.cultivo}
          placeholder={d.form.cultivoPlaceholder}
          valor={datos.cultivo}
          onChange={set('cultivo')}
          error={errores.cultivo}
        />
        <Campo
          id="hectareas"
          etiqueta={`${d.form.hectareas} (${d.form.opcional})`}
          inputMode="numeric"
          valor={datos.hectareas}
          onChange={set('hectareas')}
        />
        <Campo
          id="zona"
          etiqueta={d.form.zona}
          placeholder={d.form.zonaPlaceholder}
          valor={datos.zona}
          onChange={set('zona')}
          error={errores.zona}
          className="sm:col-span-2"
        />
        <div
          className="space-y-1.5 sm:col-span-2"
          data-error={errores.problema ? 'true' : undefined}
        >
          <label htmlFor="problema" className="text-ink/70 block text-sm font-semibold">
            {d.form.problema}
          </label>
          <select
            id="problema"
            value={datos.problema}
            onChange={(e) => set('problema')(e.target.value)}
            className={`text-ink focus:border-gp-green w-full rounded-xl border-2 bg-white px-4 py-3 transition-colors outline-none ${
              errores.problema ? 'border-gp-blue' : 'border-line-warm/50'
            }`}
          >
            <option value="">{d.form.problemaPlaceholder}</option>
            {(d.form.problemaOpciones as string[]).map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
          {errores.problema && (
            <p className="text-gp-blue text-xs font-semibold">{errores.problema}</p>
          )}
        </div>
        <Campo
          id="mensaje"
          etiqueta={`${d.form.mensaje} (${d.form.opcional})`}
          valor={datos.mensaje}
          onChange={set('mensaje')}
          multilinea
          className="sm:col-span-2"
        />
      </div>

      <p className="text-ink/50 text-xs">{d.form.aviso}</p>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#1ebe5b]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {d.form.enviar}
      </button>

      {intentado && Object.keys(errores).length > 0 && (
        <p className="text-gp-blue text-center text-sm font-semibold">{d.form.errorResumen}</p>
      )}
    </form>
  );
}

interface CampoProps {
  id: string;
  etiqueta: string;
  valor: string;
  onChange: (valor: string) => void;
  error?: string;
  tipo?: string;
  multilinea?: boolean;
  className?: string;
  placeholder?: string;
  inputMode?: 'numeric' | 'tel';
  autoComplete?: string;
  maxLength?: number;
}

/** Un campo del formulario, con su etiqueta y su aviso de error. */
function Campo({
  id,
  etiqueta,
  valor,
  onChange,
  error,
  tipo = 'text',
  multilinea = false,
  className = '',
  ...resto
}: CampoProps) {
  const clases = `w-full rounded-xl border-2 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-gp-green ${
    error ? 'border-gp-blue' : 'border-line-warm/50'
  }`;

  return (
    <div className={`space-y-1.5 ${className}`} data-error={error ? 'true' : undefined}>
      <label htmlFor={id} className="text-ink/70 block text-sm font-semibold">
        {etiqueta}
      </label>
      {multilinea ? (
        <textarea
          id={id}
          rows={3}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className={`${clases} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={tipo}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className={clases}
          {...resto}
        />
      )}
      {error && <p className="text-gp-blue text-xs font-semibold">{error}</p>}
    </div>
  );
}
