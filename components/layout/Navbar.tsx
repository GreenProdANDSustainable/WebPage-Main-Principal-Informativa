'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu as MenuIcon,
  X,
  ChevronDown,
  Search,
  Globe,
  Phone,
  Mail,
  Bot,
  Leaf,
  Gauge,
  ShoppingCart,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';

type Dictionary = {
  Navbar: {
    about: string;
    catalog: string;
    sustainability: string;
    contact: string;
    assistant: string;
    products: string;
    services: string;
    products_services_title: string;
    work_with_us: string;
    contacts: string;
    who_we_are: string;
    who_we_are_desc: string;
    our_history: string;
    our_history_desc: string;
    industry_solutions: string;
    learn_more_vision: string;
    view_about_page: string;
    balik: string;
    balik_desc: string;
    Ceprobio: string;
    Ceprobio_desc: string;
    planta: string;
    planta_desc: string;
    proveeduria: string;
    proveeduria_desc: string;
    proyectos: string;
    proyectos_desc: string;
    home: string;
    home_solutions: string;
    home_mission_vision: string;
    home_commitment: string;
    home_partners: string;
    home_success_stories: string;
    our_capacity: string;
    clients: string;
    certifications: string;
    impact_indicators: string;
    view_sustainability_page: string;
    cart_view: string;
    [key: string]: any;
  };
};

interface NavbarProps {
  dictionary: Dictionary;
}

export default function Navbar({ dictionary }: NavbarProps) {
  const d = dictionary.Navbar;
  const { count, openCart } = useCart();

  const homeMenu = [
    { name: d.home, href: '#inicio' },
    { name: d.home_solutions, href: '#soluciones' },
    { name: d.home_mission_vision, href: '#mision-vision' },
    { name: d.home_commitment, href: '#compromiso' },
    { name: d.home_partners, href: '#aliados' },
    { name: d.home_success_stories, href: '#casos-exito' },
  ];

  const sostenibilidadMenu = [
    { name: d.view_sustainability_page, href: '/sostenibilidad' },
    { name: d.impact_indicators, href: '/sostenibilidad#impacto' },
    { name: d.certifications, href: '/sostenibilidad#certificaciones' },
  ];

  const productsMenu = [
    {
      category: d.products,
      items: [
        { name: d.balik, desc: d.balik_desc, href: '/productos-y-servicios/balik' },
        { name: d.Ceprobio, desc: d.Ceprobio_desc, href: '/productos-y-servicios/ceprobio' },
        { name: d.planta, desc: d.planta_desc, href: '/productos-y-servicios/planta-tratamiento' },
      ],
    },
    {
      category: d.services,
      items: [
        {
          name: d.proveeduria,
          desc: d.proveeduria_desc,
          href: '/productos-y-servicios/proveeduria',
        },
        { name: d.proyectos, desc: d.proyectos_desc, href: '/productos-y-servicios/proyectos' },
      ],
    },
  ];

  const aboutMenu = {
    main: [
      { name: d.who_we_are, desc: d.who_we_are_desc, href: '/nosotros/quienes-somos' },
      { name: d.our_history, desc: d.our_history_desc, href: '/nosotros/nuestra-trayectoria' },
    ],
    sidebar: [
      { name: d.our_capacity, href: '/nosotros#capacidad', icon: Gauge },
      { name: d.work_with_us, href: '/empleos', icon: Phone },
      { name: d.contacts, href: '/contacto', icon: Mail },
    ],
  };

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const currentLang = pathname.split('/')[1] || 'es';
  const rawPath = pathname.replace(`/${currentLang}`, '') || '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.1);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparentPages = ['/'];
  const isTransparentPage = transparentPages.includes(rawPath);
  const isSolid = isScrolled || !isTransparentPage || isOpen;
  // Arriba del todo (sobre el video del hero) va 100% opaco para que se lea
  // limpio; recién al bajar se afloja un poco la opacidad. En el resto de
  // páginas, sin hero detrás, se queda siempre opaco.
  const headerBgClass = isTransparentPage && isScrolled && !isOpen ? 'bg-paper/65' : 'bg-paper';

  const textColorClass = 'text-ink';

  // Pastilla verde al pasar el mouse: el mismo gesto en cada link del menú,
  // ya sea disparador de dropdown o enlace simple.
  const pillClass = `inline-flex items-center gap-1.5 rounded-full px-4 lg:px-5 py-2.5 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 hover:bg-gp-green hover:text-ink`;

  const activeTextClass = 'text-gp-blue';

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (dropdownStr: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdownStr);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const dropdownsWithBackdrop = ['productos', 'nosotros', 'inicio', 'sostenibilidad'];

  return (
    <>
      <AnimatePresence>
        {activeDropdown && dropdownsWithBackdrop.includes(activeDropdown) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-ink/40 pointer-events-none fixed inset-0 z-40 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <header
        className={`${headerBgClass} border-line-warm/40 fixed top-0 z-50 w-full border-b shadow-[0_10px_40px_-20px_rgba(20,23,15,0.25)] backdrop-blur-xl transition-all duration-700`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="text-ink/70 hidden items-center justify-end px-8 py-2 text-xs tracking-wide transition-colors duration-700 md:flex">
          <div className="flex items-center gap-6">
            <Link
              href={`/${currentLang}/asistente-ia`}
              className="hover:text-gp-green flex items-center gap-2 transition-colors"
            >
              <Bot className="h-3 w-3" /> {d.assistant}
            </Link>
            <Link
              href={`/${currentLang === 'es' ? 'en' : 'es'}${rawPath}`}
              className="hover:text-gp-green flex cursor-pointer items-center gap-2 transition-colors"
            >
              <Globe className="h-3 w-3" /> {currentLang === 'es' ? 'English (EN)' : 'Español (ES)'}
            </Link>
          </div>
        </div>

        <div
          className={`mx-auto flex items-center justify-between px-4 transition-all duration-700 sm:px-6 lg:px-8 ${isSolid ? 'h-20' : 'h-24'}`}
        >
          <Link
            href={`/${currentLang}`}
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`relative transition-all duration-700 ${isSolid ? 'h-12 w-32 md:h-14 md:w-36' : 'h-16 w-40 md:h-20 md:w-48'}`}
            >
              <Image
                src="/greenprod png.png"
                alt="Green Prod & Sustainable S.A.C Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <nav className="relative hidden h-full items-center md:flex">
            <div
              className="flex h-full items-center"
              onMouseEnter={() => handleMouseEnter('inicio')}
            >
              <button
                className={`${pillClass} ${activeDropdown === 'inicio' || rawPath === '/' ? activeTextClass : textColorClass}`}
              >
                {d.home}{' '}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-700 ${activeDropdown === 'inicio' ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <div
              className="flex h-full items-center"
              onMouseEnter={() => handleMouseEnter('nosotros')}
            >
              <button
                className={`${pillClass} ${activeDropdown === 'nosotros' || rawPath === '/nosotros' ? activeTextClass : textColorClass}`}
              >
                {d.about}{' '}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-700 ${activeDropdown === 'nosotros' ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <div
              className="flex h-full items-center"
              onMouseEnter={() => handleMouseEnter('productos')}
            >
              <button
                className={`${pillClass} ${activeDropdown === 'productos' ? activeTextClass : textColorClass}`}
              >
                {d.products_services_title}{' '}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-700 ${activeDropdown === 'productos' ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <div
              className="flex h-full items-center"
              onMouseEnter={() => handleMouseEnter('sostenibilidad')}
            >
              <button
                className={`${pillClass} ${activeDropdown === 'sostenibilidad' || rawPath === '/sostenibilidad' ? activeTextClass : textColorClass}`}
              >
                {d.sustainability}{' '}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-700 ${activeDropdown === 'sostenibilidad' ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <Link href={`/${currentLang}#aliados`} className={`${pillClass} ${textColorClass}`}>
              {d.clients}
            </Link>

            <Link
              href={`/${currentLang}/sostenibilidad#certificaciones`}
              className={`${pillClass} ${textColorClass}`}
            >
              {d.certifications}
            </Link>

            <Link
              href={`/${currentLang}/contacto`}
              className={`${pillClass} ${rawPath === '/contacto' ? activeTextClass : textColorClass}`}
            >
              {d.contact}
            </Link>

            <div className="border-line-warm/40 ml-2 flex items-center gap-2 border-l pl-4">
              <button className="hover:text-gp-blue hover:bg-husk/40 text-ink/70 rounded-full p-2 transition-colors duration-300">
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={openCart}
                aria-label={d.cart_view}
                className="hover:text-gp-blue hover:bg-husk/40 text-ink/70 relative rounded-full p-2 transition-colors duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                  <span className="bg-gp-green text-ink absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={openCart}
              aria-label={d.cart_view}
              className="hover:text-gp-blue text-ink/70 relative rounded-full p-2 transition-colors duration-700"
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="bg-gp-green text-ink absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
            <button
              className="hover:text-gp-blue text-ink/70 rounded-full p-2 transition-colors duration-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeDropdown === 'inicio' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-line-warm/40 bg-paper/98 absolute top-full left-0 hidden w-full border-t shadow-2xl backdrop-blur-xl md:block"
              onMouseEnter={() => handleMouseEnter('inicio')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto max-w-7xl px-8 py-8">
                <div className="flex flex-wrap gap-2">
                  {homeMenu.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/${currentLang}${item.href}`}
                      className="text-ink hover:bg-gp-green hover:text-ink rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeDropdown === 'sostenibilidad' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-line-warm/40 bg-paper/98 absolute top-full left-0 hidden w-full border-t shadow-2xl backdrop-blur-xl md:block"
              onMouseEnter={() => handleMouseEnter('sostenibilidad')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto max-w-7xl px-8 py-8">
                <div className="flex flex-wrap gap-2">
                  {sostenibilidadMenu.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/${currentLang}${item.href}`}
                      className="text-ink hover:bg-gp-green hover:text-ink rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeDropdown === 'productos' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-line-warm/40 bg-paper/98 absolute top-full left-0 hidden w-full border-t shadow-2xl backdrop-blur-xl md:block"
              onMouseEnter={() => handleMouseEnter('productos')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto max-w-7xl px-8 py-10">
                <div className="grid grid-cols-2 gap-12">
                  {productsMenu.map((column, idx) => (
                    <div key={idx}>
                      <h3 className="font-display text-ink border-line-warm/50 mb-6 border-b pb-2 text-xl font-bold">
                        {column.category}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {column.items.map((item, idxi) => (
                          <Link
                            key={idxi}
                            href={`/${currentLang}${item.href}`}
                            className="group hover:bg-gp-green/15 flex items-start gap-3 rounded-xl p-3 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="bg-gp-green/10 text-gp-green group-hover:bg-gp-green group-hover:text-paper mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors">
                              <Leaf className="h-4 w-4" />
                            </span>
                            <span>
                              <h4 className="group-hover:text-gp-green text-ink mb-1 text-base font-bold transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-ink/60 text-sm leading-snug">{item.desc}</p>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-line-warm/40 bg-husk/20 border-t px-8 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between text-sm">
                  <span className="text-ink/70 font-medium">{d.industry_solutions}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeDropdown === 'nosotros' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-line-warm/40 bg-paper/98 absolute top-full left-0 hidden w-full border-t shadow-2xl backdrop-blur-xl md:block"
              onMouseEnter={() => handleMouseEnter('nosotros')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto max-w-7xl px-8 py-10">
                <div className="flex gap-12">
                  <div className="border-line-warm/40 flex-1 border-r pr-12">
                    <h3 className="font-display text-ink border-line-warm/50 mb-6 border-b pb-2 text-xl font-bold">
                      Green Prod & Sustainable S.A.C
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {aboutMenu.main.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/${currentLang}${item.href}`}
                          className="group hover:bg-gp-green/15 block rounded-xl p-3 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <h4 className="group-hover:text-gp-green text-ink mb-2 text-base font-bold transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-ink/60 text-sm leading-snug">{item.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex w-64 shrink-0 flex-col justify-center space-y-4 pl-12">
                    {aboutMenu.sidebar.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={`/${currentLang}${item.href}`}
                          className="hover:text-ink text-ink/70 hover:bg-gp-green flex items-center gap-3 rounded-lg p-3 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="bg-husk/50 text-ink/60 rounded-md p-2">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="border-line-warm/40 bg-husk/20 border-t px-8 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between text-sm">
                  <span className="text-ink/70 font-medium">{d.learn_more_vision}</span>
                  <Link
                    href={`/${currentLang}/nosotros`}
                    className="text-gp-blue hover:text-gp-green flex items-center gap-1 font-bold transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {d.view_about_page} <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-paper absolute top-full left-0 w-full overflow-hidden shadow-2xl md:hidden"
            >
              <div className="flex h-[calc(100vh-80px)] flex-col overflow-y-auto">
                <div className="border-line-warm/40 text-ink/70 flex justify-between border-b px-6 py-4 text-sm font-medium">
                  <Link
                    href={`/${currentLang}/asistente-ia`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <Bot className="h-4 w-4" /> {d.assistant}
                  </Link>
                  <Link
                    href={`/${currentLang === 'es' ? 'en' : 'es'}${rawPath}`}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" /> {currentLang === 'es' ? 'EN' : 'ES'}
                  </Link>
                </div>

                <div className="flex-1 py-4">
                  <div className="border-line-warm/30 border-b">
                    <button
                      className="text-ink flex w-full items-center justify-between px-6 py-4 text-lg font-bold tracking-wide uppercase"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === 'mobile-inicio' ? null : 'mobile-inicio'
                        )
                      }
                    >
                      {d.home}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === 'mobile-inicio' ? 'text-gp-green rotate-180' : 'text-ink/40'}`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === 'mobile-inicio' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-husk/20 overflow-hidden"
                        >
                          <div className="space-y-1 px-6 py-2 pb-6">
                            {homeMenu.map((item, idx) => (
                              <Link
                                key={idx}
                                href={`/${currentLang}${item.href}`}
                                className="text-ink/80 hover:text-gp-green block py-2 font-semibold"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-line-warm/30 border-b">
                    <button
                      className="text-ink flex w-full items-center justify-between px-6 py-4 text-lg font-bold tracking-wide uppercase"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === 'mobile-nosotros' ? null : 'mobile-nosotros'
                        )
                      }
                    >
                      {d.about}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === 'mobile-nosotros' ? 'text-gp-green rotate-180' : 'text-ink/40'}`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'mobile-nosotros' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-husk/20 overflow-hidden"
                        >
                          <div className="space-y-6 px-6 py-2 pb-6">
                            <div>
                              <h3 className="text-gp-blue mb-3 text-sm font-bold tracking-wider uppercase">
                                CONOCE MÁS
                              </h3>
                              <div className="border-line-warm/40 space-y-4 border-l-2 pl-2">
                                {aboutMenu.main.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    href={`/${currentLang}${item.href}`}
                                    className="block pl-3"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <div className="text-ink/80 font-bold">{item.name}</div>
                                    <div className="text-ink/50 mt-1 text-xs">{item.desc}</div>
                                  </Link>
                                ))}
                                {aboutMenu.sidebar.map((item, idx) => (
                                  <Link
                                    key={`sb-${idx}`}
                                    href={`/${currentLang}${item.href}`}
                                    className="block pl-3"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <div className="text-ink/80 font-bold">{item.name}</div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="border-line-warm/30 border-b">
                    <button
                      className="text-ink flex w-full items-center justify-between px-6 py-4 text-lg font-bold tracking-wide uppercase"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === 'mobile-productos' ? null : 'mobile-productos'
                        )
                      }
                    >
                      {d.products_services_title}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === 'mobile-productos' ? 'text-gp-green rotate-180' : 'text-ink/40'}`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'mobile-productos' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-husk/20 overflow-hidden"
                        >
                          <div className="space-y-6 px-6 py-2 pb-6">
                            {productsMenu.map((column, idx) => (
                              <div key={idx}>
                                <h3 className="text-gp-blue mb-3 text-sm font-bold tracking-wider uppercase">
                                  {column.category}
                                </h3>
                                <div className="border-line-warm/40 space-y-4 border-l-2 pl-2">
                                  {column.items.map((item, idxi) => (
                                    <Link
                                      key={idxi}
                                      href={`/${currentLang}${item.href}`}
                                      className="block pl-3"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <div className="text-ink/80 font-bold">{item.name}</div>
                                      <div className="text-ink/50 mt-1 text-xs">{item.desc}</div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-line-warm/30 border-b">
                    <button
                      className="text-ink flex w-full items-center justify-between px-6 py-4 text-lg font-bold tracking-wide uppercase"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === 'mobile-sostenibilidad'
                            ? null
                            : 'mobile-sostenibilidad'
                        )
                      }
                    >
                      {d.sustainability}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === 'mobile-sostenibilidad' ? 'text-gp-green rotate-180' : 'text-ink/40'}`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === 'mobile-sostenibilidad' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-husk/20 overflow-hidden"
                        >
                          <div className="space-y-1 px-6 py-2 pb-6">
                            {sostenibilidadMenu.map((item, idx) => (
                              <Link
                                key={idx}
                                href={`/${currentLang}${item.href}`}
                                className="text-ink/80 hover:text-gp-green block py-2 font-semibold"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href={`/${currentLang}#aliados`}
                    onClick={() => setIsOpen(false)}
                    className="border-line-warm/30 text-ink block border-b px-6 py-4 text-lg font-bold tracking-wide uppercase"
                  >
                    {d.clients}
                  </Link>

                  <Link
                    href={`/${currentLang}/sostenibilidad#certificaciones`}
                    onClick={() => setIsOpen(false)}
                    className="border-line-warm/30 text-ink block border-b px-6 py-4 text-lg font-bold tracking-wide uppercase"
                  >
                    {d.certifications}
                  </Link>

                  <Link
                    href={`/${currentLang}/contacto`}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 text-lg font-bold tracking-wide uppercase ${rawPath === '/contacto' ? 'text-gp-green' : 'text-ink'}`}
                  >
                    {d.contact}
                  </Link>
                </div>

                <div className="bg-ink mt-auto px-6 py-8">
                  <Link
                    href={`/${currentLang}/contacto`}
                    onClick={() => setIsOpen(false)}
                    className="bg-gp-green text-ink hover:bg-husk flex w-full items-center justify-center rounded-xl py-4 text-lg font-bold transition-colors"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    {d.work_with_us}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
