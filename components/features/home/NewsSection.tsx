import { Newspaper } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

interface NewsSectionProps {
  dict: any;
}

export default function NewsSection({ dict }: NewsSectionProps) {
  return (
    <section id="casos-exito" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal group gap={0.12}>
          <Reveal preset="child">
            <h2 className="font-display text-ink/30 mb-8 text-4xl font-semibold tracking-tight">
              {dict.News.title}
            </h2>
          </Reveal>
          <Reveal preset="child">
            <div className="border-line-warm/50 text-ink/40 hover:border-gp-green/50 hover:text-ink/60 inline-flex items-center gap-3 rounded-full border-2 border-dashed px-8 py-4 transition-colors duration-500">
              <Newspaper className="h-5 w-5" />
              <span
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {dict.News.subtitle}
              </span>
            </div>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
