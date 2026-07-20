import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

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
}

export default function Footer({ dictionary }: FooterProps) {
  const d = dictionary.Footer;
  const nav = dictionary.Navbar;

  const socials = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Linkedin, label: 'LinkedIn' },
  ];

  const quickLinks = [
    { label: d.about_us, href: '/nosotros' },
    { label: d.product_catalog, href: '/catalogo' },
    { label: d.contact_label, href: '/contacto' },
  ];

  const categories = [
    { label: d.bioinsumos, href: '/catalogo#bioinsumos' },
    { label: d.conservas, href: '/catalogo#conservas' },
    { label: d.environmental_projects, href: '/catalogo#proyectos' },
  ];

  return (
    <footer className="bg-ink text-paper/70 relative overflow-hidden">
      <div className="from-gp-green via-gp-blue to-gp-green h-1 w-full bg-gradient-to-r" />
      <div className="bg-gp-green/10 pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 text-white">
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
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
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
              <li className="flex items-start gap-3">
                <MapPin className="text-gp-green mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-paper/70 text-sm">{d.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gp-green h-5 w-5 shrink-0" />
                <span className="text-paper/70 text-sm">{d.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gp-green h-5 w-5 shrink-0" />
                <span className="text-paper/70 text-sm">{d.email}</span>
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
