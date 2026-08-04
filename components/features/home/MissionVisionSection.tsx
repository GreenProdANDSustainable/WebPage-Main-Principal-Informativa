import * as motion from 'motion/react-client';
import { Target, Eye } from 'lucide-react';

interface MissionVisionSectionProps {
  dict: any;
}

export default function MissionVisionSection({ dict }: MissionVisionSectionProps) {
  return (
    <section className="bg-paper relative overflow-hidden py-16 md:py-24">
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="bg-gp-green/10 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"></div>
        <div className="bg-gp-blue/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-gp-green mb-3 text-base font-semibold tracking-wide md:text-lg">
            {dict.Home.missionVision.essence_title}
          </p>
          <h2 className="font-display text-ink mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
            {dict.Home.missionVision.title}
          </h2>
          <p className="text-ink/60 mx-auto max-w-2xl">{dict.Home.missionVision.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl"
          >
            <div className="bg-gp-blue absolute inset-0"></div>

            <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Target className="h-10 w-10 text-white" />
              </div>

              <h3 className="font-display mb-6 text-2xl font-semibold text-white md:text-3xl">
                {dict.Home.missionVision.mission.title}
              </h3>

              <p className="text-lg leading-relaxed text-white/90">
                {dict.Home.missionVision.mission.text}
              </p>

              <div className="absolute right-0 bottom-0 h-32 w-32 opacity-20">
                <div className="absolute right-0 bottom-0 h-full w-full rounded-tl-3xl border-r-4 border-b-4 border-white"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl"
          >
            <div className="bg-gp-green absolute inset-0"></div>

            <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <Eye className="h-10 w-10 text-white" />
              </div>

              <h3 className="font-display mb-6 text-2xl font-semibold text-white md:text-3xl">
                {dict.Home.missionVision.vision.title}
              </h3>

              <p className="text-lg leading-relaxed text-white/90">
                {dict.Home.missionVision.vision.text}
              </p>

              <div className="absolute right-0 bottom-0 h-32 w-32 opacity-20">
                <div className="absolute right-0 bottom-0 h-full w-full rounded-tl-3xl border-r-4 border-b-4 border-white"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
