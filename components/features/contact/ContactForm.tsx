'use client';

import { useState } from 'react';
import * as motion from 'motion/react-client';
import { AlertCircle, Check } from 'lucide-react';
import { ease } from '@/lib/motion';

interface ContactFormProps {
  dict: any;
  lang: string;
  className?: string;
}

type Estado = 'inicial' | 'enviando' | 'listo' | 'error';

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Formulario de contacto. Antes era un `<button type="button">` sin acción:
 * cualquier lead que lo llenara se perdía. Ahora manda los datos a
 * `/api/contacto`, que los envía por correo a ventas@ y gerencia@greenprod.pe.
 */
export default function ContactForm({ dict, lang, className = '' }: ContactFormProps) {
  const d = dict.Pages.contact;

  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState(d.subjectOptions[0] as string);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [estado, setEstado] = useState<Estado>('inicial');

  const enviar = async (evento: React.FormEvent) => {
    evento.preventDefault();

    if (!nombre.trim() || !mensaje.trim()) {
      setError(d.formErrorRequired);
      return;
    }
    if (!CORREO_VALIDO.test(correo.trim())) {
      setError(d.formErrorEmail);
      return;
    }

    setError(null);
    setEstado('enviando');

    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre.trim(),
          company: empresa.trim(),
          email: correo.trim(),
          subject: asunto,
          message: mensaje.trim(),
          lang,
        }),
      });
      setEstado(respuesta.ok ? 'listo' : 'error');
    } catch {
      setEstado('error');
    }
  };

  if (estado === 'listo') {
    return (
      <div className={`flex items-start gap-4 ${className}`}>
        <span className="bg-gp-green flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <p className="text-lg font-bold text-slate-900">{d.formOkTitle}</p>
          <p className="mt-1 text-slate-600">{d.formOkBody}</p>
        </div>
      </div>
    );
  }

  if (estado === 'error') {
    return (
      <div className={`flex items-start gap-4 ${className}`}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <AlertCircle className="h-5 w-5" />
        </span>
        <div>
          <p className="text-lg font-bold text-slate-900">{d.formErrorTitle}</p>
          <p className="mt-1 text-slate-600">{d.formErrorBody}</p>
          <button
            type="button"
            onClick={() => setEstado('inicial')}
            className="text-gp-green mt-3 text-sm font-bold underline"
          >
            {d.formRetry}
          </button>
        </div>
      </div>
    );
  }

  const enviando = estado === 'enviando';

  return (
    <form onSubmit={enviar} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
            {d.name}
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setError(null);
            }}
            disabled={enviando}
            className="focus:ring-gp-green focus:border-gp-green w-full rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-60"
            placeholder={d.namePlaceholder}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="empresa" className="text-sm font-medium text-slate-700">
            {d.company}
          </label>
          <input
            type="text"
            id="empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            disabled={enviando}
            className="focus:ring-gp-green focus:border-gp-green w-full rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-60"
            placeholder={d.companyPlaceholder}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          {d.emailLabel}
        </label>
        <input
          type="email"
          id="email"
          value={correo}
          onChange={(e) => {
            setCorreo(e.target.value);
            setError(null);
          }}
          disabled={enviando}
          className="focus:ring-gp-green focus:border-gp-green w-full rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-60"
          placeholder={d.emailPlaceholder}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="asunto" className="text-sm font-medium text-slate-700">
          {d.subject}
        </label>
        <select
          id="asunto"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          disabled={enviando}
          className="focus:ring-gp-green focus:border-gp-green w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-60"
        >
          {d.subjectOptions.map((option: string, idx: number) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="mensaje" className="text-sm font-medium text-slate-700">
          {d.message}
        </label>
        <textarea
          id="mensaje"
          rows={5}
          value={mensaje}
          onChange={(e) => {
            setMensaje(e.target.value);
            setError(null);
          }}
          disabled={enviando}
          className="focus:ring-gp-green focus:border-gp-green w-full resize-none rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:ring-2 disabled:opacity-60"
          placeholder={d.messagePlaceholder}
        ></textarea>
      </div>

      {error && <p className="text-sm font-bold text-red-600">{error}</p>}

      <motion.button
        type="submit"
        disabled={enviando}
        className="bg-gp-green hover:bg-gp-blue shadow-gp-green/30 w-full rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-colors duration-300 disabled:opacity-60"
        whileHover={enviando ? undefined : { y: -2, scale: 1.01 }}
        whileTap={enviando ? undefined : { scale: 0.99 }}
        transition={{ duration: 0.25, ease: ease.growth }}
      >
        {enviando ? d.formSending : d.submitButton}
      </motion.button>
    </form>
  );
}
