'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Leaf } from 'lucide-react';
import Image from 'next/image';

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
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-shadow hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{product.shortDesc}</p>
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
            <div className="p-6 pt-0 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                <div className="relative h-48 md:h-full rounded-xl overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${product.imageSeed}/400/400`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Descripción Detallada</h4>
                    <p className="text-slate-600 leading-relaxed">{product.fullDesc}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Características Principales</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                          <span className="text-green-500 font-bold">•</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4">
                    <a
                      href="/contacto"
                      className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                    >
                      Solicitar Cotización
                    </a>
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
