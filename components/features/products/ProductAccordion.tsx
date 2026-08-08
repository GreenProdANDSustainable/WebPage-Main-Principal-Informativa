'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ease, stagger, staggerChild } from '@/lib/motion';

interface Product {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  imageSeed: string;
  features: string[];
}

export default function ProductAccordion({ product, lang }: { product: Product; lang: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`overflow-hidden rounded-2xl border bg-white transition-[box-shadow,border-color] duration-300 hover:shadow-md ${
        isOpen ? 'border-gp-green/40 shadow-md' : 'border-slate-200'
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: ease.growth }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="focus-visible:ring-gp-green/60 flex w-full items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50"
            animate={isOpen ? { scale: 1.08, rotate: -8 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.45, ease: ease.sprout }}
          >
            <Leaf className="h-6 w-6 text-green-600" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{product.shortDesc}</p>
          </div>
        </div>
        <ChevronDown
          className={`h-6 w-6 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: ease.growth }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 p-6 pt-0">
              <motion.div
                className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3"
                variants={stagger(0.1, 0.08)}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={staggerChild}
                  className="relative h-48 overflow-hidden rounded-xl md:h-full"
                >
                  <Image
                    src={`https://picsum.photos/seed/${product.imageSeed}/400/400`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <motion.div variants={staggerChild} className="space-y-6 md:col-span-2">
                  <div>
                    <h4 className="mb-2 font-bold text-slate-900">Descripción Detallada</h4>
                    <p className="leading-relaxed text-slate-600">{product.fullDesc}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-bold text-slate-900">Características Principales</h4>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                          <span className="font-bold text-green-500">•</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4">
                    <motion.span
                      className="inline-block"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.25, ease: ease.growth }}
                    >
                      <Link
                        href={`/${lang}/contacto`}
                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                      >
                        Solicitar Cotización
                      </Link>
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
