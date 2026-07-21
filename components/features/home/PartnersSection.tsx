import { Handshake } from 'lucide-react';

interface PartnersSectionProps {
  dict: any;
}

export default function PartnersSection({ dict }: PartnersSectionProps) {
  return (
    <section className="border-line-warm/20 bg-paper border-y py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="border-line-warm/50 text-ink/40 inline-flex items-center gap-3 rounded-full border-2 border-dashed px-8 py-4">
          <Handshake className="h-5 w-5" />
          <span
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-plex-mono)' }}
          >
            {dict.Partners.title}
          </span>
        </div>
      </div>
    </section>
  );
}
