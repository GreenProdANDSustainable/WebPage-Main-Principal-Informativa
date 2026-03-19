'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, ChevronDown, Search, Globe, Phone, Mail } from 'lucide-react';

type Dictionary = {
  Navbar: {
    about: string;
    catalog: string;
    sustainability: string;
    contact: string;
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
    carniprod: string;
    carniprod_desc: string;
    proveeduria: string;
    proveeduria_desc: string;
    proyectos: string;
    proyectos_desc: string;
    [key: string]: any;
  };
};

interface NavbarProps {
  dictionary: Dictionary;
}

export default function Navbar({ dictionary }: NavbarProps) {
  const d = dictionary.Navbar;
  
  const navLinks = [
    { name: d.about, href: '/nosotros' },
    { name: d.catalog, href: '/catalogo' },
    { name: d.sustainability, href: '/sostenibilidad' },
  ];

  const productsMenu = [
    {
      category: d.products,
      items: [
        { name: d.balik, desc: d.balik_desc, href: '/productos-y-servicios/balik' },
        { name: d.Ceprobio, desc: d.Ceprobio_desc, href: '/productos-y-servicios/ceprobio' },
        { name: d.planta, desc: d.planta_desc, href: '/productos-y-servicios/planta-tratamiento' },
        { name: d.carniprod, desc: d.carniprod_desc, href: '/productos-y-servicios/carniprod' },
      ]
    },
    {
      category: d.services,
      items: [
        { name: d.proveeduria, desc: d.proveeduria_desc, href: '/productos-y-servicios/proveeduria' },
        { name: d.proyectos, desc: d.proyectos_desc, href: '/productos-y-servicios/proyectos' },
      ]
    }
  ];

  const aboutMenu = {
    main: [
      { name: d.who_we_are, desc: d.who_we_are_desc, href: '/nosotros/quienes-somos' },
      { name: d.our_history, desc: d.our_history_desc, href: '/nosotros/nuestra-trayectoria' }
    ],
    sidebar: [
      { name: d.work_with_us, href: '/empleos', icon: Phone },
      { name: d.contacts, href: '/contacto', icon: Mail }
    ]
  };

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Extract current language from pathname (e.g. /es/nosotros -> es)
  const currentLang = pathname.split('/')[1] || 'es';
  // Helper to get raw path without lang prefix for language switching
  const rawPath = pathname.replace(`/${currentLang}`, '') || '/';

  useEffect(() => {
    const handleScroll = () => {
      // 15% of the viewport height
      setIsScrolled(window.scrollY > window.innerHeight * 0.10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = rawPath === '/';
  const transparentPages = ['/'];
  const isTransparentPage = transparentPages.includes(rawPath);
  const isSolid = isScrolled || !isTransparentPage || isOpen;
  const transparentMode = isTransparentPage && !isSolid;

  const textColorClass = transparentMode ? 'text-white' : 'text-slate-900';
  const hoverColorClass = transparentMode ? 'hover:text-gp-green' : 'hover:text-gp-blue';

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
    }, 300); // 0.3 seconds delay
  };

  return (
    <>
      {/* Background Blur Overlay for Mega Menu */}
      <AnimatePresence>
        {(activeDropdown === 'productos' || activeDropdown === 'nosotros') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gp-green/30 backdrop-blur-md pointer-events-none"
          //className="fixed inset-0 z-40 bg-gp-blue/30 backdrop-blur-md pointer-events-none"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 z-50 w-full transition-all duration-700 ${isSolid
          ? 'bg-white shadow-md'
          : 'bg-transparent'
          }`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Bar - Hidden on mobile */}
        <div className={`hidden md:flex justify-end items-center px-8 py-2 text-xs transition-colors duration-700 ${isSolid ? 'bg-slate-100 text-slate-600' : 'bg-black/20 text-white backdrop-blur-sm'}`}>
          <div className="flex items-center gap-6">
            <Link href={`/${currentLang}/contacto`} className="flex items-center gap-2 hover:text-gp-green transition-colors">
              <Mail className="h-3 w-3" /> {d.contact}
            </Link>
            <Link href={`/${currentLang === 'es' ? 'en' : 'es'}${rawPath}`} className="flex items-center gap-2 hover:text-gp-green transition-colors cursor-pointer">
              <Globe className="h-3 w-3" /> {currentLang === 'es' ? 'English (EN)' : 'Español (ES)'}
            </Link>
          </div>
        </div>

        {/* Main Nav */}
        <div className={`mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isSolid ? 'h-20' : 'h-24'}`}>
          <Link href={`/${currentLang}`} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className={`relative transition-all duration-700 ${isSolid ? 'h-12 w-32 md:h-14 md:w-36' : 'h-16 w-40 md:h-20 md:w-48'}`}>
              <Image
                src={transparentMode ? "/greenprod blanco png.png" : "/greenprod png.png"}
                alt="Green Prod & Sustainable S.A.C Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center h-full gap-1 lg:gap-2 relative">
            {/* About Us Mega Menu Trigger */}
            <div
              className="h-full flex items-center"
              onMouseEnter={() => handleMouseEnter('nosotros')}
            >
              <button
                className={`px-4 lg:px-6 h-full flex items-center gap-1 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${activeDropdown === 'nosotros' || rawPath === '/nosotros' ? (transparentMode ? 'text-gp-green' : 'text-gp-blue') : textColorClass} ${hoverColorClass}`}
              >
                {d.about} <ChevronDown className={`h-4 w-4 transition-transform duration-700 ${activeDropdown === 'nosotros' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Mega Menu Trigger */}
            <div
              className="h-full flex items-center"
              onMouseEnter={() => handleMouseEnter('productos')}
            >
              <button
                className={`px-4 lg:px-6 h-full flex items-center gap-1 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${activeDropdown === 'productos' ? (transparentMode ? 'text-gp-green' : 'text-gp-blue') : textColorClass} ${hoverColorClass}`}
              >
                {d.products_services_title} <ChevronDown className={`h-4 w-4 transition-transform duration-700 ${activeDropdown === 'productos' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link
              href={`/${currentLang}/catalogo`}
              className={`px-4 lg:px-6 h-full flex items-center text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${rawPath === '/catalogo' ? (transparentMode ? 'text-gp-green' : 'text-gp-blue') : textColorClass} ${hoverColorClass}`}
            >
              {d.catalog}
            </Link>

            <Link
              href={`/${currentLang}/sostenibilidad`}
              className={`px-4 lg:px-6 h-full flex items-center text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${rawPath === '/sostenibilidad' ? (transparentMode ? 'text-gp-green' : 'text-gp-blue') : textColorClass} ${hoverColorClass}`}
            >
              {d.sustainability}
            </Link>

            <div className="ml-4 flex items-center gap-4 border-l border-slate-300/30 pl-6">
              <button className={`p-2 transition-colors duration-300 ${transparentMode ? 'text-white hover:text-gp-green' : 'text-slate-600 hover:text-gp-blue'}`}>
                <Search className="h-5 w-5" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button className={`p-2 transition-colors duration-700 ${transparentMode ? 'text-white hover:text-gp-green' : 'text-slate-600 hover:text-gp-blue'}`}>
              <Search className="h-5 w-5" />
            </button>
            <button
              className={`p-2 transition-colors duration-700 ${transparentMode ? 'text-white hover:text-gp-green' : 'text-slate-600 hover:text-gp-blue'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeDropdown === 'productos' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100/50"
              onMouseEnter={() => handleMouseEnter('productos')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto max-w-7xl px-8 py-10">
                <div className="grid grid-cols-2 gap-12">
                  {productsMenu.map((column, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-serif font-bold text-gp-blue mb-6 pb-2 border-b border-slate-100">{column.category}</h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        {column.items.map((item, idxi) => (
                          <Link
                            key={idxi}
                            href={`/${currentLang}${item.href}`}
                            className="group block"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <h4 className="text-base font-bold text-slate-800 group-hover:text-gp-green transition-colors mb-1">{item.name}</h4>
                            <p className="text-sm text-slate-500 leading-snug">{item.desc}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mega Menu Footer Banner */}
              <div className="bg-slate-50 border-t border-slate-100 px-8 py-4">
                <div className="mx-auto max-w-7xl flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">{d.industry_solutions}</span>
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
              className="hidden md:block absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100/50"
              onMouseEnter={() => handleMouseEnter('nosotros')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto max-w-7xl px-8 py-10">
                <div className="flex gap-12">
                  <div className="flex-1 border-r border-slate-100 pr-12">
                    <h3 className="text-xl font-serif font-bold text-gp-blue mb-6 pb-2 border-b border-slate-100">Green Prod & Sustainable S.A.C</h3>
                    <div className="grid grid-cols-2 gap-8">
                      {aboutMenu.main.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/${currentLang}${item.href}`}
                          className="group block"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <h4 className="text-base font-bold text-slate-800 group-hover:text-gp-green transition-colors mb-2">{item.name}</h4>
                          <p className="text-sm text-slate-500 leading-snug">{item.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="w-64 shrink-0 pl-12 flex flex-col justify-center space-y-4">
                    {aboutMenu.sidebar.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={`/${currentLang}${item.href}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-gp-blue transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="p-2 bg-slate-100 rounded-md text-slate-500">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 border-t border-slate-100 px-8 py-4">
                <div className="mx-auto max-w-7xl flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">{d.learn_more_vision}</span>
                  <Link href={`/${currentLang}/nosotros`} className="text-gp-blue font-bold hover:text-gp-green flex items-center gap-1 transition-colors" onClick={() => setActiveDropdown(null)}>
                    {d.view_about_page} <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white absolute w-full shadow-xl left-0 top-full overflow-hidden"
            >
              <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto">
                {/* Mobile Top Bar */}
                <div className="bg-slate-50 flex justify-between px-6 py-4 border-b border-slate-100 text-sm font-medium text-slate-600">
                  <Link href={`/${currentLang}/contacto`} onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> {d.contact}
                  </Link>
                  <Link href={`/${currentLang === 'es' ? 'en' : 'es'}${rawPath}`} className="flex items-center gap-2">
                    <Globe className="h-4 w-4" /> {currentLang === 'es' ? 'EN' : 'ES'}
                  </Link>
                </div>

                <div className="flex-1 py-4">
                  {/* Mobile Accordion for About Us */}
                  <div className="border-b border-slate-50">
                    <button
                      className={`w-full px-6 py-4 flex justify-between items-center text-lg font-bold uppercase tracking-wide text-slate-800`}
                      onClick={() => setActiveDropdown(activeDropdown === 'mobile-nosotros' ? null : 'mobile-nosotros')}
                    >
                      {d.about}
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === 'mobile-nosotros' ? 'rotate-180 text-gp-green' : 'text-slate-400'}`} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'mobile-nosotros' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-slate-50"
                        >
                          <div className="px-6 py-2 pb-6 space-y-6">
                            <div>
                              <h3 className="text-sm font-bold text-gp-blue uppercase tracking-wider mb-3">CONOCE MÁS</h3>
                              <div className="space-y-4 pl-2 border-l-2 border-slate-200">
                                {aboutMenu.main.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    href={`/${currentLang}${item.href}`}
                                    className="block pl-3"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <div className="font-bold text-slate-700">{item.name}</div>
                                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                                  </Link>
                                ))}
                                {aboutMenu.sidebar.map((item, idx) => (
                                  <Link
                                    key={`sb-${idx}`}
                                    href={`/${currentLang}${item.href}`}
                                    className="block pl-3"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <div className="font-bold text-slate-700">{item.name}</div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="border-b border-slate-50">
                    <button
                      className={`w-full px-6 py-4 flex justify-between items-center text-lg font-bold uppercase tracking-wide text-slate-800`}
                      onClick={() => setActiveDropdown(activeDropdown === 'mobile-productos' ? null : 'mobile-productos')}
                    >
                      {d.products_services_title}
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === 'mobile-productos' ? 'rotate-180 text-gp-green' : 'text-slate-400'}`} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'mobile-productos' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-slate-50"
                        >
                          <div className="px-6 py-2 pb-6 space-y-6">
                            {productsMenu.map((column, idx) => (
                              <div key={idx}>
                                <h3 className="text-sm font-bold text-gp-blue uppercase tracking-wider mb-3">{column.category}</h3>
                                <div className="space-y-4 pl-2 border-l-2 border-slate-200">
                                  {column.items.map((item, idxi) => (
                                    <Link
                                      key={idxi}
                                      href={`/${currentLang}${item.href}`}
                                      className="block pl-3"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <div className="font-bold text-slate-700">{item.name}</div>
                                      <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
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

                  <Link
                    href={`/${currentLang}/catalogo`}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 text-lg font-bold uppercase tracking-wide border-b border-slate-50 ${rawPath === '/catalogo' ? 'text-gp-green' : 'text-slate-800'}`}
                  >
                    {d.catalog}
                  </Link>

                  <Link
                    href={`/${currentLang}/sostenibilidad`}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 text-lg font-bold uppercase tracking-wide ${rawPath === '/sostenibilidad' ? 'text-gp-green' : 'text-slate-800'}`}
                  >
                    {d.sustainability}
                  </Link>
                </div>

                {/* Mobile Footer Area */}
                <div className="bg-slate-900 px-6 py-8 mt-auto">
                  <Link
                    href={`/${currentLang}/contacto`}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex justify-center items-center py-4 rounded-xl bg-gp-green text-white font-bold text-lg hover:bg-gp-blue transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-2" />
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
