import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

interface CertificationsSectionProps {
    dict: any;
    certifications: any[];
}

export default function CertificationsSection({ dict, certifications }: CertificationsSectionProps) {
    return (
        <section className="py-16 md:py-24 bg-[#112a1f]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="text-[11px] md:text-[12px] leading-[12px] tracking-[2px] font-bold uppercase mb-4 text-[#e8e4db]">
                        CALIDAD GARANTIZADA
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#beede0] mb-4">
                        {dict.Home.certifications.title}
                    </h2>
                    <p className="text-lg text-[#e8e4db]/90 max-w-3xl mx-auto">
                        {dict.Home.certifications.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="flex flex-col items-center text-center p-8 bg-[#1a4430] border border-white/5 rounded-2xl hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="mb-6 flex items-center justify-center p-4 rounded-xl bg-[#e8e4db] w-full h-32">
                                {cert.logo ? (
                                    <div className="relative w-full max-w-[200px] h-20">
                                        <Image src={cert.logo} alt={cert.name} fill className="object-contain mix-blend-multiply" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw" />
                                    </div>
                                ) : (
                                    <ShieldCheck className="w-16 h-16 text-[#1a4430]" />
                                )}
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#beede0] mb-3">
                                {cert.name}
                            </h3>
                            <p className="text-[#e8e4db]/80 leading-relaxed text-sm">
                                {cert.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
