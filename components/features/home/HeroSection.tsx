'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
  dict: any;
  lang: string;
}

// Para agregar más imágenes, simplemente añádelas a esta lista:
const bannerImages = [
  '/images/home/banners/BannerPrincipal.jpg',
  '/images/home/banners/PancaCampo.jpg',
];

export default function HeroSection({ dict, lang }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 6000); // Cambia cada 6 segundos
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <section className="relative flex h-[90vh] min-h-[600px] items-center justify-center overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={bannerImages[currentIndex]}
              alt={`${dict.Home.hero.imageAlt} - Imagen ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-[1] bg-black/60" />

      {/* Carousel Indicators */}
      {bannerImages.length > 1 && (
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-gp-green w-8' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Ir a la imagen ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-7xl"
        >
          {dict.Home.hero.title} <br />
          <span className="text-gp-green">{dict.Home.hero.titleHighlight}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-slate-200 md:text-xl"
        >
          {dict.Home.hero.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            href={`/${lang}/catalogo`}
            className="bg-gp-green hover:bg-gp-blue shadow-gp-green/30 inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
          >
            {dict.Home.hero.primaryCta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href={`/${lang}/nosotros`}
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20"
          >
            {dict.Home.hero.secondaryCta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
