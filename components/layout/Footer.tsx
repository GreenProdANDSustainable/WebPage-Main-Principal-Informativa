import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Mail, MapPin, Phone, Facebook, Instagram } from 'lucide-react';

type Dictionary = {
  Footer: {
    description: string;
    quick_links_title: string;
    about_us: string;
    product_catalog: string;
    contact_label: string;
    categories_title: string;
    bioinsumos: string;
    conservas: string;
    environmental_projects: string;
    contact_title: string;
    address: string;
    phone: string;
    email: string;
    copyright: string;
    privacy_policy: string;
    terms_of_service: string;
  };
  Navbar: {
    about: string;
    catalog: string;
    [key: string]: any;
  };
};

interface FooterProps {
  dictionary: Dictionary;
  lang: string;
}

export default function Footer({ dictionary, lang }: FooterProps) {
  const d = dictionary.Footer;
  const nav = dictionary.Navbar;

  const socials = [
    { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/greenprodsustainable' },
    { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/greenprodsustainable' },
  ];

  const quickLinks = [
    { label: d.about_us, href: `/${lang}/nosotros` },
    { label: d.product_catalog, href: `/${lang}/catalogo` },
    { label: d.contact_label, href: `/${lang}/contacto` },
  ];

  // Misma ubicación que el mapa de la página de contacto.
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('AA.HH. Tres Estrellas, Nuevo Chimbote, Áncash, Perú');

  const categories = [
    { label: d.bioinsumos, href: `/${lang}/catalogo#bioinsumos` },
    { label: d.conservas, href: `/${lang}/catalogo#conservas` },
    { label: d.environmental_projects, href: `/${lang}/catalogo#proyectos` },
  ];

  return (
    <footer className="bg-ink text-paper/70 relative overflow-hidden">
      <div className="from-gp-green via-gp-blue to-gp-green h-1 w-full bg-gradient-to-r" />
      <div className="bg-gp-green/10 pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-white">
              <div className="relative h-12 w-32 transition-transform duration-300 hover:scale-105 md:h-14 md:w-36">
                <Image
                  src="/greenprod blanco png.png"
                  alt="Green Prod & Sustainable S.A.C"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-paper/60 max-w-xs text-sm leading-relaxed">{d.description}</p>
            <div className="flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-paper/10 text-paper/70 hover:border-gp-green hover:bg-gp-green hover:text-ink flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-paper mb-6 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
              <span className="bg-gp-green h-3 w-1 rounded-full" />
              {d.quick_links_title}
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group hover:text-gp-green inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    <span className="bg-gp-green/50 h-px w-0 transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-paper mb-6 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
              <span className="bg-gp-green h-3 w-1 rounded-full" />
              {d.categories_title}
            </h3>
            <ul className="space-y-3.5">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group hover:text-gp-green inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    <span className="bg-gp-green/50 h-px w-0 transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
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
            <a href="#" className="text-paper/50 hover:text-gp-green transition-colors">
              {d.privacy_policy}
            </a>
            <a href="#" className="text-paper/50 hover:text-gp-green transition-colors">
              {d.terms_of_service}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
