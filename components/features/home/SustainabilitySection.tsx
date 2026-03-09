import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SustainabilitySectionProps {
    dict: any;
    initiatives: any[];
    lang: string;
}

export default function SustainabilitySection({ dict, initiatives, lang }: SustainabilitySectionProps) {
    return (
        <section className="relative py-16 md:py-24 bg-slate-900">
            <Image src="/images/sustainability-bg.jpg" alt="Sustainability" fill className="object-cover" priority={false} />
            <div className="absolute inset-0 bg-[#112a1f]/80" />
            <div className="relative z-10 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left mb-12 lg:mb-0">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#beede0] mb-6">{dict.Home.sustainability.title}</h2>
                        <p className="text-lg text-[#e8e4db]/90 mb-8 max-w-xl">{dict.Home.sustainability.subtitle}</p>
                        <Link href={`/${lang}/sostenibilidad`} className="inline-flex items-center justify-center rounded-full bg-gp-green px-8 py-4 text-base font-semibold text-white transition-all hover:bg-gp-blue hover:scale-105">
                            {dict.Home.sustainability.learnMore}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-white">
                        {initiatives.map((ini) => {
                            const Icon = ini.icon;
                            return (
                                <div key={ini.id} className="flex flex-col items-start p-6 bg-[#1a4430]/60 rounded-2xl backdrop-blur-md border border-white/10">
                                    <div className="mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-[#beede0]" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-[#beede0] mb-2">{ini.title}</h3>
                                    <p className="text-sm text-[#e8e4db]/80 leading-relaxed">{ini.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
