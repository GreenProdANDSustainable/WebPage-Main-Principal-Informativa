import { Handshake } from 'lucide-react';
import * as motion from 'motion/react-client';
import Reveal from '@/components/shared/Reveal';

interface PartnersSectionProps {
  dict: any;
}

export default function PartnersSection({ dict }: PartnersSectionProps) {
  return (
    <section id="aliados" className="border-line-warm/20 bg-paper border-y py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal preset="rootScale">
          <div className="border-line-warm/50 text-ink/40 hover:border-gp-green/50 hover:text-ink/60 inline-flex items-center gap-3 rounded-full border-2 border-dashed px-8 py-4 transition-colors duration-500">
            <motion.span
              animate={{ rotate: [0, -8, 0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
            >
              <Handshake className="h-5 w-5" />
            </motion.span>
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {dict.Partners.title}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
