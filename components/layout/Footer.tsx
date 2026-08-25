import Link from 'next/link';
import { Leaf, Mail, MapPin, Phone } from 'lucide-react';
import NewsletterForm from '@/components/shared/NewsletterForm';

type Dictionary = {
  Footer: {
    contact_title: string;
    address: string;
    phone: string;
    email: string;
    copyright: string;
    privacy_policy: string;
    terms_of_service: string;
  };
  Newsletter: {
    title: string;
    subtitle: string;
    [key: string]: any;
  };
};

interface FooterProps {
  dictionary: Dictionary;
  lang: string;
}

export default function Footer({ dictionary, lang }: FooterProps) {
  const d = dictionary.Footer;

  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Chimbote, Perú');

  return (
    <footer className="bg-gp-blue text-paper/70 relative overflow-hidden">
      <div className="from-gp-green via-gp-blue to-gp-green h-1 w-full bg-gradient-to-r" />
      <div className="bg-gp-green/10 pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-20">
          {/* Novedades: el correo se deja acá, con su propia casilla. Es
              el consentimiento que las cookies no dan. */}
          <div>
            <h3 className="font-display text-paper mb-6 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
              <span className="bg-gp-green h-3 w-1 rounded-full" />
              {dictionary.Newsletter.title}
            </h3>
            <p className="text-paper/60 mb-4 text-sm">{dictionary.Newsletter.subtitle}</p>
            <NewsletterForm dict={dictionary} lang={lang} />
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-paper mb-6 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
              <span className="bg-gp-green h-3 w-1 rounded-full" />
              {d.contact_title}
            </h3>
            <ul className="space-y-4">
              {/* La dirección abre el mapa; el teléfono y el correo se
                  pueden pulsar directamente desde el celular. */}
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:text-paper flex items-start gap-3 transition-colors"
                >
                  <MapPin className="text-gp-green mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-paper/70 group-hover:text-paper text-sm underline-offset-4 transition-colors group-hover:underline">
                    {d.address}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${d.phone.replace(/\s+/g, '')}`}
                  className="group flex items-center gap-3 transition-colors"
                >
                  <Phone className="text-gp-green h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-paper/70 group-hover:text-paper text-sm underline-offset-4 transition-colors group-hover:underline">
                    {d.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${d.email}`}
                  className="group flex items-center gap-3 transition-colors"
                >
                  <Mail className="text-gp-green h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-paper/70 group-hover:text-paper text-sm underline-offset-4 transition-colors group-hover:underline">
                    {d.email}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-paper/10 mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-paper/50 flex items-center gap-2 text-sm">
            <Leaf className="text-gp-green h-4 w-4" />
            &copy; {new Date().getFullYear()} Green Prod & Sustainable S.A.C. {d.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href={`/${lang}/privacidad`}
              className="text-paper/50 hover:text-gp-green transition-colors"
            >
              {d.privacy_policy}
            </Link>
            <a href="#" className="text-paper/50 hover:text-gp-green transition-colors">
              {d.terms_of_service}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
