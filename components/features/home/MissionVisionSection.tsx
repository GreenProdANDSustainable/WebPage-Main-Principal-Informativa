import * as motion from 'motion/react-client';
import { Target, Eye } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import TiltCard from '@/components/shared/TiltCard';

interface MissionVisionSectionProps {
  dict: any;
}

export default function MissionVisionSection({ dict }: MissionVisionSectionProps) {
  const d = dict.Home.missionVision;

  return (
    <section className="bg-paper relative overflow-hidden py-16 md:py-24">
      {/* Halos que respiran despacio: dan una atmósfera viva al fondo. */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
        <motion.div
          className="bg-gp-green/10 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
          animate={{ scale: [1, 1.12, 1], x: [0, -18, 0], y: [0, 14, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-gp-blue/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], x: [0, 22, 0], y: [0, -12, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <Reveal group gap={0.12} className="mb-16 text-center">
          <Reveal preset="child">
            <p className="text-gp-green mb-3 text-base font-semibold tracking-wide md:text-lg">
              {d.essence_title}
            </p>
          </Reveal>
          <Reveal preset="child">
            <h2 className="font-display text-ink mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {d.title}
            </h2>
          </Reveal>
          <Reveal preset="child">
            <p className="text-ink/60 mx-auto max-w-2xl">{d.subtitle}</p>
          </Reveal>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal preset="slideInLeft">
            <TiltCard className="group relative h-full overflow-hidden rounded-3xl shadow-xl transition-shadow duration-500 hover:shadow-2xl">
              <div className="bg-gp-blue absolute inset-0"></div>

              <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Target className="h-10 w-10 text-white" />
                </div>

                <h3 className="font-display mb-6 text-2xl font-semibold text-white md:text-3xl">
                  {d.mission.title}
                </h3>

                <p className="text-lg leading-relaxed text-white/90">{d.mission.text}</p>

                <div className="absolute right-0 bottom-0 h-32 w-32 opacity-20">
                  <div className="absolute right-0 bottom-0 h-full w-full rounded-tl-3xl border-r-4 border-b-4 border-white"></div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal preset="slideInRight">
            <TiltCard className="group relative h-full overflow-hidden rounded-3xl shadow-xl transition-shadow duration-500 hover:shadow-2xl">
              <div className="bg-gp-green absolute inset-0"></div>

              <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Eye className="h-10 w-10 text-white" />
                </div>

                <h3 className="font-display mb-6 text-2xl font-semibold text-white md:text-3xl">
                  {d.vision.title}
                </h3>

                <p className="text-lg leading-relaxed text-white/90">{d.vision.text}</p>

                <div className="absolute right-0 bottom-0 h-32 w-32 opacity-20">
                  <div className="absolute right-0 bottom-0 h-full w-full rounded-tl-3xl border-r-4 border-b-4 border-white"></div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
