import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="relative h-12 w-32 md:h-14 md:w-36 transition-all duration-300 brightness-0 invert">
                <Image
                  src="/greenprod blanco png.png"
                  alt="Green Prod & Sustainable"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Producción de bioinsumos, conservas y proyectos ambientales. Comprometidos con un futuro más verde y sostenible para las próximas generaciones.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gp-green transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-gp-green transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-gp-green transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              <li><Link href="/nosotros" className="text-sm hover:text-gp-green transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/catalogo" className="text-sm hover:text-gp-green transition-colors">Catálogo de Productos</Link></li>
              <li><Link href="/contacto" className="text-sm hover:text-gp-green transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Categorías</h3>
            <ul className="space-y-4">
              <li><Link href="/catalogo#bioinsumos" className="text-sm hover:text-gp-green transition-colors">Bioinsumos</Link></li>
              <li><Link href="/catalogo#conservas" className="text-sm hover:text-gp-green transition-colors">Conservas</Link></li>
              <li><Link href="/catalogo#proyectos" className="text-sm hover:text-gp-green transition-colors">Proyectos Ambientales</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gp-green shrink-0" />
                <span className="text-sm">Av. Sostenibilidad 123, Distrito Verde, Lima, Perú</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gp-green shrink-0" />
                <span className="text-sm">+51 987 654 321</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gp-green shrink-0" />
                <span className="text-sm">contacto@greenprod.pe</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Green Prod & Sustainable. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
