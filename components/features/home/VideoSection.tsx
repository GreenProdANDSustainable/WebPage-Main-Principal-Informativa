import * as motion from 'motion/react-client';
import Reveal from '@/components/shared/Reveal';
import { viewport } from '@/lib/motion';

interface VideoSectionProps {
  dict: any;
}

export default function VideoSection({ dict }: VideoSectionProps) {
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal group gap={0.12}>
          <Reveal preset="child">
            <h2 className="font-display text-ink mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
              {dict.Video.title}
            </h2>
          </Reveal>
          <Reveal preset="child">
            <p className="text-ink/60 mb-10">{dict.Video.subtitle}</p>
          </Reveal>
        </Reveal>

        <Reveal preset="rootScale">
          <div className="border-line-warm/30 bg-ink-soft group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border">
            <div className="text-husk/50 flex flex-col items-center gap-4">
              <div className="relative flex h-20 w-20 items-center justify-center">
                {/* Onda que se expande: invita a reproducir. */}
                <motion.span
                  className="border-gp-green/40 absolute inset-0 rounded-full border"
                  initial={{ scale: 1, opacity: 0.5 }}
                  whileInView={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                  viewport={viewport}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
                <div className="border-line-warm/40 group-hover:border-gp-green/70 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed transition-colors duration-500">
                  <span className="text-gp-green text-4xl transition-transform duration-500 group-hover:scale-110">
                    ▶
                  </span>
                </div>
              </div>
              <span
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {dict.Video.placeholder}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
