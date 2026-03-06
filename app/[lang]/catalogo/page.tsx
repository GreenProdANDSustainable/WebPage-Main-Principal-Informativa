'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileDown, CheckCircle2 } from 'lucide-react';

export default function LeadGenCatalogo({ params }: { params: Promise<{ lang: string }> }) {
  const [submitted, setSubmitted] = useState(false);
  const [lang, setLang] = useState('es');

  // Next.js 15: params is a promise. In client components, using `use()` or handling it via simple useEffect can be tricky, 
  // but since we only need lang for the back button, we can just grab it from window.location or assume 'es' initially
  // To keep it simple and safe for experimental purposes:
  const currentLang = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'es' : 'es';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Experimental B2B Lead Generation form integration would go here.
    // E.g., sending data to Resend or a CRM.
    setSubmitted(true);

    // Trigger abstract PDF download
    const link = document.createElement('a');
    link.href = '/dossier_institucional_dummy.pdf'; // Placeholder path
    link.download = 'GreenProd-Dossier-2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24 flex items-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 w-full">
        <Link href={`/${currentLang}/productos-y-servicios`} className="inline-flex items-center text-sm font-semibold text-gp-blue hover:text-gp-green mb-12 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Productos y Servicios
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-gp-blue p-8 md:p-12 text-center relative overflow-hidden">
            <div className="relative z-10 w-full">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Descarga el Dossier Corporativo</h1>
              <p className="text-gp-blue-100 text-lg max-w-xl mx-auto">
                Accede a nuestro catálogo técnico completo y descubre cómo nuestras soluciones pueden transformar tu empresa.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">Empresa / Razón Social</label>
                  <input
                    type="text"
                    id="company"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gp-green focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    placeholder="Ej. Agrícola del Norte S.A.C."
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico Corporativo</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gp-green focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    placeholder="contacto@empresa.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gp-green hover:bg-gp-blue text-white font-bold text-lg py-4 px-8 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 mt-4"
                >
                  <FileDown className="h-5 w-5" />
                  Descargar Catálogo (PDF)
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">
                  * Al descargar, aceptas recibir información relevante para el sector B2B. No enviamos spam.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-gp-green" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Descarga Iniciada!</h3>
                <p className="text-slate-600 mb-8">
                  El dossier corporativo se está descargando en tu dispositivo. También hemos enviado una copia a tu correo.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-gp-blue hover:text-gp-green font-semibold underline transition-colors"
                >
                  Descargar de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
