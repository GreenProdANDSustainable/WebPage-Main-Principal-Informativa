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
    '/images/home/banners/PancaCampo.jpg'
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
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Image Carousel */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
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

            <div className="absolute inset-0 bg-black/60 z-[1]" />

            {/* Carousel Indicators */}
            {bannerImages.length > 1 && (
                <div className="absolute z-20 bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                    {bannerImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                ? 'w-8 bg-gp-green'
                                : 'w-2 bg-white/50 hover:bg-white'
                                }`}
                            aria-label={`Ir a la imagen ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    {dict.Home.hero.title} <br />
                    <span className="text-gp-green">{dict.Home.hero.titleHighlight}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-lg md:text-xl text-slate-200 mb-10"
                >
                    {dict.Home.hero.subtitle}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href={`/${lang}/catalogo`}
                        className="inline-flex items-center justify-center rounded-full bg-gp-green px-8 py-4 text-base font-semibold text-white transition-all hover:bg-gp-blue hover:scale-105 shadow-lg shadow-gp-green/30"
                    >
                        {dict.Home.hero.primaryCta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        href={`/${lang}/nosotros`}
                        className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/20 hover:scale-105"
                    >
                        {dict.Home.hero.secondaryCta}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
