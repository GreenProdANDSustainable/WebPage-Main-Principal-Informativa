'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Nosotros', href: '/nosotros' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const isSolid = isScrolled || !isHome || isOpen;
  const transparentMode = isHome && !isSolid;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isSolid
        ? 'border-b border-white/20 bg-white/80 backdrop-blur-md shadow-sm'
        : 'bg-transparent border-transparent'
        }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-primary" onClick={() => setIsOpen(false)}>
          <Leaf className={`h-8 w-8 transition-colors duration-300 ${transparentMode ? 'text-green-400' : 'text-green-600'}`} />
          <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${transparentMode ? 'text-white' : 'text-slate-900'}`}>
            Green Prod <span className={transparentMode ? 'text-green-400' : 'text-green-600'}>&</span> Sustainable
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            let linkColor = '';
            if (isActive) {
              linkColor = transparentMode ? 'text-green-400' : 'text-green-600';
            } else {
              linkColor = transparentMode ? 'text-slate-200 hover:text-white' : 'text-slate-600 hover:text-green-600';
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${linkColor}`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 shadow-sm"
          >
            Contáctanos
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${transparentMode ? 'text-white hover:text-green-400' : 'text-slate-600 hover:text-green-600'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md absolute w-full shadow-lg left-0 top-20"
          >
            <nav className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium ${pathname === link.href ? 'text-green-600' : 'text-slate-600'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/contacto"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  Contáctanos
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
