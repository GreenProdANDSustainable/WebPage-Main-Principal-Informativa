'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  imageSeed: string;
  features: string[];
}

export default function ProductAccordion({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 p-6 pt-0">
              <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="relative h-48 overflow-hidden rounded-xl md:h-full">
                  <Image
                    src={`https://picsum.photos/seed/${product.imageSeed}/400/400`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-6 md:col-span-2">
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
                    <Link
                      href="/contacto"
                      className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                    >
                      Solicitar Cotización
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
