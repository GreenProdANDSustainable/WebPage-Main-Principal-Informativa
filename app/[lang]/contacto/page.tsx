import { Mail, MapPin, Phone } from 'lucide-react';
import * as motion from 'motion/react-client';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';
import ContactForm from '@/components/features/contact/ContactForm';
import { ease, viewport } from '@/lib/motion';

export default async function Contacto({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.contact;

  const contactItems = [
    { Icon: MapPin, iconClass: 'text-gp-green', title: d.mainOffice, html: d.address },
    { Icon: Phone, iconClass: 'text-gp-blue', title: d.phone, html: d.phoneDetail },
    { Icon: Mail, iconClass: 'text-gp-green', title: d.email, html: d.emailDetail },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal group gap={0.12} className="mb-16 text-center">
          <Reveal preset="child">
            <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
              {d.title}
            </h1>
          </Reveal>
          <Reveal preset="child">
            <p className="mx-auto max-w-2xl text-lg text-slate-600">{d.subtitle}</p>
          </Reveal>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Información de Contacto */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-8 font-serif text-3xl font-bold text-slate-900">{d.contactInfo}</h2>
              <div className="space-y-6">
                {contactItems.map(({ Icon, iconClass, title, html }, idx) => (
                  <motion.div
                    key={title}
                    className="group flex items-start gap-4"
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.55, delay: idx * 0.12, ease: ease.growth }}
                  >
                    <div className="bg-gp-neutral flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                      <Icon className={`h-6 w-6 ${iconClass}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                      <p
                        className="mt-1 text-slate-600"
                        dangerouslySetInnerHTML={{ __html: html }}
                      ></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mapa */}
            <Reveal
              preset="rootScale"
              className="relative h-64 overflow-hidden rounded-2xl bg-slate-200"
            >
              <iframe
                src="https://www.google.com/maps?q=AA.HH.%20Tres%20Estrellas,%20Nuevo%20Chimbote,%20Ancash,%20Peru&output=embed"
                title="Ubicación de Green Prod & Sustainable"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </Reveal>
          </div>

          {/* Formulario */}
          <Reveal
            preset="slideInRight"
            className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl md:p-12"
          >
            <h2 className="mb-8 font-serif text-2xl font-bold text-slate-900">{d.formTitle}</h2>
            <ContactForm dict={dictionary} lang={lang} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
