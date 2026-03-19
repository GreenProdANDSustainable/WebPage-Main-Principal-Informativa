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

  return (
    <footer className="bg-gp-blue text-[#e8e4db]/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="relative h-12 w-32 md:h-14 md:w-36 transition-all duration-300 ">
                <Image
                  src="/greenprod blanco png.png"
                  alt="Green Prod & Sustainable S.A.C"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#e8e4db]/70">
              {d.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#beede0] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#beede0] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#beede0] transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#beede0] mb-6">{d.quick_links_title}</h3>
            <ul className="space-y-4">
              <li><Link href="/nosotros" className="text-sm hover:text-[#beede0] transition-colors">{d.about_us}</Link></li>
              <li><Link href="/catalogo" className="text-sm hover:text-[#beede0] transition-colors">{d.product_catalog}</Link></li>
              <li><Link href="/contacto" className="text-sm hover:text-[#beede0] transition-colors">{d.contact_label}</Link></li>
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#beede0] mb-6">{d.categories_title}</h3>
            <ul className="space-y-4">
              <li><Link href="/catalogo#bioinsumos" className="text-sm hover:text-[#beede0] transition-colors">{d.bioinsumos}</Link></li>
              <li><Link href="/catalogo#conservas" className="text-sm hover:text-[#beede0] transition-colors">{d.conservas}</Link></li>
              <li><Link href="/catalogo#proyectos" className="text-sm hover:text-[#beede0] transition-colors">{d.environmental_projects}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#beede0] mb-6">{d.contact_title}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gp-green shrink-0" />
                <span className="text-sm text-[#e8e4db]/80">{d.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gp-green shrink-0" />
                <span className="text-sm text-[#e8e4db]/80">{d.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gp-green shrink-0" />
                <span className="text-sm text-[#e8e4db]/80">{d.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a4430] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#e8e4db]/50">
            &copy; {new Date().getFullYear()} Green Prod & Sustainable S.A.C. {d.copyright}
          </p>
          <div className="flex gap-6 text-sm text-[#e8e4db]/50">
            <a href="#" className="hover:text-[#beede0] transition-colors">{d.privacy_policy}</a>
            <a href="#" className="hover:text-[#beede0] transition-colors">{d.terms_of_service}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
