import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import * as motion from 'motion/react-client';

interface CertificationsSectionProps {
  dict: any;
  certifications: any[];
}

export default function CertificationsSection({
  dict,
  certifications,
}: CertificationsSectionProps) {
  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div
            className="text-gp-green mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-plex-mono)' }}
          >
            {dict.Home.certifications.label}
          </div>
          <h2 className="font-display text-paper mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {dict.Home.certifications.title}
          </h2>
          <p className="text-husk/70 mx-auto max-w-3xl text-lg">
            {dict.Home.certifications.subtitle}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="border-line-warm/15 bg-ink-soft hover:border-gp-green/40 group flex h-full flex-col items-center rounded-3xl border p-8 text-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-husk mb-6 flex h-32 w-full items-center justify-center rounded-2xl p-4">
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
                  <ShieldCheck className="text-ink h-16 w-16" />
                )}
              </div>
              <h3 className="font-display text-paper mb-3 text-xl font-semibold">{cert.name}</h3>
              <p className="text-husk/70 text-sm leading-relaxed">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
