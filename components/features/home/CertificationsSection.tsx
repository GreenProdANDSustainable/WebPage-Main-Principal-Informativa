import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

interface CertificationsSectionProps {
  dict: any;
  certifications: any[];
}

export default function CertificationsSection({
  dict,
  certifications,
}: CertificationsSectionProps) {
  return (
    <section className="bg-[#112a1f] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 text-[11px] leading-[12px] font-bold tracking-[2px] text-[#e8e4db] uppercase md:text-[12px]">
            {dict.Home.certifications.label}
          </div>
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#beede0] md:text-5xl">
            {dict.Home.certifications.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[#e8e4db]/90">
            {dict.Home.certifications.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex h-full flex-col items-center rounded-2xl border border-white/5 bg-[#1a4430] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="mb-6 flex h-32 w-full items-center justify-center rounded-xl bg-[#e8e4db] p-4">
                {cert.logo ? (
                  <div className="relative h-20 w-full max-w-[200px]">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      fill
                      className="object-contain mix-blend-multiply"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ) : (
                  <ShieldCheck className="h-16 w-16 text-[#1a4430]" />
                )}
              </div>
              <h3 className="mb-3 font-serif text-xl font-bold text-[#beede0]">{cert.name}</h3>
              <p className="text-sm leading-relaxed text-[#e8e4db]/80">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
