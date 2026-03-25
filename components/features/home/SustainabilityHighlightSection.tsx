import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

interface SustainabilityHighlightSectionProps {
    dict: any;
    lang: string;
}

export default function SustainabilityHighlightSection({ dict, lang }: SustainabilityHighlightSectionProps) {
    const d = dict.Home.sustainability.highlight;
    
    return (
        <section className="bg-gp-neutral py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Column */}
                    <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl order-last lg:order-first">
                        <Image
                            src="/images/home/sostenibilidad-banner.jpg"
                            alt={d.imageAlt}
                            fill
                            className="object-cover"
                        />
                        {/* Decorative badge */}
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gp-green flex items-center justify-center shrink-0">
                                <Leaf className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{d.our_commitment}</p>
                                <p className="text-sm font-bold text-slate-900">{d.sustainable_agriculture_fishing}</p>
                            </div>
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="flex flex-col gap-6">
                        <span className="inline-flex items-center gap-2 text-gp-green text-sm font-bold uppercase tracking-widest">
                            <span className="h-px w-8 bg-gp-green"></span>
                            {d.sustainability}
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                            {d.title}{' '}
                            <span className="text-gp-green">{d.titleHighlight}</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            {d.description}
                        </p>
                        <ul className="space-y-3 text-slate-700">
                            {d.items.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="mt-1 h-5 w-5 rounded-full bg-gp-green/20 flex items-center justify-center shrink-0">
                                        <span className="h-2 w-2 rounded-full bg-gp-green block"></span>
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-2">
                            <Link
                                href={`/${lang}/sostenibilidad`}
                                className="inline-flex items-center justify-center rounded-full bg-gp-blue px-8 py-4 text-base font-semibold text-white transition-all hover:bg-gp-green hover:scale-105 shadow-lg shadow-gp-blue/20"
                            >
                                {d.cta}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
