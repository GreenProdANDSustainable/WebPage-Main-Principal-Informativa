import { Mail, MapPin, Phone } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import AIAssistant from '@/components/shared/AIAssistant';

export default async function Contacto({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.contact;

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
            {d.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">{d.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Información de Contacto */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-8 font-serif text-3xl font-bold text-slate-900">{d.contactInfo}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gp-neutral flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <MapPin className="text-gp-green h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{d.mainOffice}</h3>
                    <p
                      className="mt-1 text-slate-600"
                      dangerouslySetInnerHTML={{ __html: d.address }}
                    ></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gp-neutral flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <Phone className="text-gp-blue h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{d.phone}</h3>
                    <p
                      className="mt-1 text-slate-600"
                      dangerouslySetInnerHTML={{ __html: d.phoneDetail }}
                    ></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gp-neutral flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <Mail className="text-gp-green h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{d.email}</h3>
                    <p
                      className="mt-1 text-slate-600"
                      dangerouslySetInnerHTML={{ __html: d.emailDetail }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="relative h-64 overflow-hidden rounded-2xl bg-slate-200">
              <iframe
                src="https://www.google.com/maps?q=AA.HH.%20Tres%20Estrellas,%20Nuevo%20Chimbote,%20Ancash,%20Peru&output=embed"
                title="Ubicación de Green Prod & Sustainable"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Formulario */}
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl md:p-12">
            <h2 className="mb-8 font-serif text-2xl font-bold text-slate-900">{d.formTitle}</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
                    {d.name}
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="focus:ring-gp-green focus:border-gp-green w-full rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:ring-2"
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
                    className="focus:ring-gp-green focus:border-gp-green w-full rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:ring-2"
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
                  className="focus:ring-gp-green focus:border-gp-green w-full rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:ring-2"
                  placeholder={d.emailPlaceholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="asunto" className="text-sm font-medium text-slate-700">
                  {d.subject}
                </label>
                <select
                  id="asunto"
                  className="focus:ring-gp-green focus:border-gp-green w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition-all outline-none focus:ring-2"
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
                  className="focus:ring-gp-green focus:border-gp-green w-full resize-none rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:ring-2"
                  placeholder={d.messagePlaceholder}
                ></textarea>
              </div>
              <button
                type="button"
                className="bg-gp-green hover:bg-gp-blue shadow-gp-green/30 w-full rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all"
              >
                {d.submitButton}
              </button>
            </form>
          </div>
        </div>

        {/* Asistente Virtual con IA */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <h2 className="mb-3 font-serif text-3xl font-bold text-slate-900">
              {d.assistantTitle}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">{d.assistantSubtitle}</p>
          </div>
          <div className="mx-auto max-w-2xl">
            <AIAssistant />
          </div>
        </div>
      </div>
    </div>
  );
}
