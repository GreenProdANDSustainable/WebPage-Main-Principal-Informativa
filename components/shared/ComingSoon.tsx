import type { LucideIcon } from 'lucide-react';
import * as motion from 'motion/react-client';
import Reveal from '@/components/shared/Reveal';

interface ComingSoonProps {
  id?: string;
  icon: LucideIcon;
  label: string;
  className?: string;
}

/** Misma "píldora punteada" que ya usan Aliados y Casos de Éxito en el inicio. */
export default function ComingSoon({ id, icon: Icon, label, className = '' }: ComingSoonProps) {
  return (
    <div id={id} className={`text-center ${className}`}>
      <Reveal preset="rootScale">
        <div className="border-line-warm/50 text-ink/40 hover:border-gp-green/50 hover:text-ink/60 inline-flex items-center gap-3 rounded-full border-2 border-dashed px-8 py-4 transition-colors duration-500">
          <motion.span
            animate={{ rotate: [0, -8, 0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
          >
            <Icon className="h-5 w-5" />
          </motion.span>
          <span
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {label}
          </span>
        </div>
      </Reveal>
    </div>
  );
}
