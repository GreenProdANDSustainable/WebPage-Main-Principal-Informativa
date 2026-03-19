import { Mail, MapPin, Phone } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function Contacto({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.contact;

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {d.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {d.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Información de Contacto */}
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">{d.contactInfo}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-gp-neutral flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-gp-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{d.mainOffice}</h3>
                    <p className="text-slate-600 mt-1" dangerouslySetInnerHTML={{ __html: d.address }}></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-gp-neutral flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-gp-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{d.phone}</h3>
                    <p className="text-slate-600 mt-1" dangerouslySetInnerHTML={{ __html: d.phoneDetail }}></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-gp-neutral flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-gp-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{d.email}</h3>
                    <p className="text-slate-600 mt-1" dangerouslySetInnerHTML={{ __html: d.emailDetail }}></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa (Placeholder) */}
            <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium">
                {d.mapPlaceholder}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">{d.formTitle}</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-slate-700">{d.name}</label>
                  <input
                    type="text"
                    id="nombre"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gp-green focus:border-gp-green outline-none transition-all"
                    placeholder={d.namePlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="empresa" className="text-sm font-medium text-slate-700">{d.company}</label>
                  <input
                    type="text"
                    id="empresa"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gp-green focus:border-gp-green outline-none transition-all"
                    placeholder={d.companyPlaceholder}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">{d.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gp-green focus:border-gp-green outline-none transition-all"
                  placeholder={d.emailPlaceholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="asunto" className="text-sm font-medium text-slate-700">{d.subject}</label>
                <select
                  id="asunto"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gp-green focus:border-gp-green outline-none transition-all bg-white"
                >
                  {d.subjectOptions.map((option: string, idx: number) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-slate-700">{d.message}</label>
                <textarea
                  id="mensaje"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gp-green focus:border-gp-green outline-none transition-all resize-none"
                  placeholder={d.messagePlaceholder}
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full rounded-xl bg-gp-green px-8 py-4 text-base font-bold text-white transition-all hover:bg-gp-blue shadow-lg shadow-gp-green/30"
              >
                {d.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
