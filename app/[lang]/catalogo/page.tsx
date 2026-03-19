'use client';

import Link from 'next/link';
import { ArrowLeft, Wrench } from 'lucide-react';

interface CatalogoEnConstruccionProps {
  dict: any;
}

export default function CatalogoEnConstruccion({ dict }: CatalogoEnConstruccionProps) {
  const d = dict.Pages.construction;
  const currentLang = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'es' : 'es';

  return (
    <div className="min-h-screen bg-slate-50 py-24 flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 w-full text-center">

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 md:p-16 flex flex-col items-center">
          <div className="w-24 h-24 bg-gp-green/10 rounded-full flex items-center justify-center mb-8">
            <Wrench className="h-12 w-12 text-gp-green" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {d.title}
          </h1>

          <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
            {d.description}
          </p>

          <Link
            href={`/${currentLang}`}
            className="inline-flex items-center justify-center rounded-full bg-gp-green hover:bg-gp-blue text-white font-bold py-4 px-8 transition-colors duration-300 gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            {d.backButton}
          </Link>
        </div>

      </div>
    </div>
  );
}
